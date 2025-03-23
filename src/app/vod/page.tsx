"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
  Fade,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Waveform from "../../components/vod/Waveform";

interface SubmitURLResponse {
  data: {
    message: string;
    job_id: string;
  };
}

interface JobStatusResponse {
  data: {
    status:
      | "Something broke. Try again in a few minutes and contact Lurkerbomb if the error persists."
      | "Orders received. Extracting data..."
      | "Extracting data..."
      | "Parsing gameplay..."
      | "Analyzing gameplay (this could take a while)..."
      | "Crafting a response..."
      | "Generating audio..."
      | "Job's finished"
      | "Job cancelled";
    audioUrl?: string;
  };
}

const submitURL = async (url: string): Promise<SubmitURLResponse> => {
  const response = await fetch("/api/pod-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    throw new Error("Submission failed");
  }
  return response.json();
};

const getProgressFromStatus = (
  status: JobStatusResponse["data"]["status"]
): number => {
  switch (status) {
    case "Orders received. Extracting data...":
      return 20;
    case "Parsing gameplay...":
      return 40;
    case "Analyzing gameplay (this could take a while)...":
      return 60;
    case "Crafting a response...":
      return 80;
    case "Generating audio...":
      return 95;
    case "Job's finished":
      return 100;
    default:
      return 0;
  }
};

const Vod: React.FC = () => {
  const [url, setURL] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const savedURL = localStorage.getItem("youtubeUrl");
    if (savedURL) {
      setURL(savedURL);
    }
    const savedJobId = localStorage.getItem("jobId");
    if (savedJobId) {
      setJobId(savedJobId);
    }
  }, []);

  const submitMutation = useMutation<SubmitURLResponse, Error, string>({
    mutationFn: submitURL,
    onSuccess: (response) => {
      setJobId(response.data.job_id);
      localStorage.setItem("jobId", response.data.job_id);
    },
    onError: () => {
      setSubmitError("Failed to submit URL. Try again in a moment.");
    },
  });

  const handleClick = async () => {
    setSubmitError("");
    localStorage.setItem("youtubeUrl", url);
    await submitMutation.mutateAsync(url);
  };

  // Status polling
  const { data: jobStatus, error } = useQuery<JobStatusResponse, Error>({
    queryKey: ["jobStatus", jobId],
    queryFn: async () => {
      const res = await fetch(`/api/pod-status?job_id=${jobId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch job status");
      }
      return res.json();
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const jobData = query.state.data;
      if (
        jobData &&
        (jobData.data?.status === "Job's finished" ||
          jobData.data?.status ===
            "Something broke. Try again in a few minutes and contact Lurkerbomb if the error persists.")
      ) {
        return false; // Stop polling if finished or broken
      }
      return 20000; // 20s
    },
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem("jobId");
      setJobId(null);
    }
  }, [error]);

  return (
    <Fade in={status !== "loading"} timeout={500}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
        }}
      >
        {status === "unauthenticated" || session?.username !== "GoliathRush" ? (
          <Typography
            variant="body1"
            sx={{
              color: "#ffffff",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Feature temporarily restricted until my API limits increase...
          </Typography>
        ) : (
          <>
            <TextField
              label="YouTube Brood War Gameplay URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setURL(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              onClick={handleClick}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#10b981" }}
            >
              Submit
            </Button>
            {error && (
              <Typography color="error" sx={{ marginTop: 2 }}>
                {submitError}
              </Typography>
            )}
            {jobId && (
              <Box mt={2}>
                {jobStatus ? (
                  <Box>
                    <Typography color="rgba(243, 244, 246, 0.6)">
                      {jobStatus.data.status}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressFromStatus(jobStatus.data.status)}
                      sx={{ marginTop: 2 }}
                    />
                    {jobStatus.data.status === "Job's finished" &&
                    jobStatus.data.audioUrl ? (
                      <Box mt={2}>
                        <Waveform audioUrl={jobStatus.data.audioUrl} />
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
            )}
          </>
        )}
      </Paper>
    </Fade>
  );
};

export default Vod;
