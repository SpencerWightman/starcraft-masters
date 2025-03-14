"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaperPlaceholder } from "@/utils/PaperPlaceholder";
import { useSession } from "next-auth/react";

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
      | "Orders received"
      | "Extracting data..."
      | "Parsing gameplay..."
      | "Analyzing gameplay (this could take a while)..."
      | "Crafting a response..."
      | "Generating audio..."
      | "Job's finished"
      | "Job cancelled";
    audioData?: string;
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
    case "Extracting data...":
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

const Pod: React.FC = () => {
  const [url, setURL] = useState("");
  const [error, setError] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
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
      setError("Failed to submit URL. Try again in a moment.");
    },
  });

  const handleClick = async () => {
    setError("");
    await submitMutation.mutateAsync(url);
  };

  const { data: jobStatus } = useQuery<JobStatusResponse, Error>({
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
        (jobData.data.status === "Job's finished" ||
          jobData.data.status ===
            "Something broke. Try again in a few minutes and contact Lurkerbomb if the error persists.")
      ) {
        return false;
      }
      return 20000;
    },
  });

  if (status === "unauthenticated" || session?.username !== "Lurkerbomb") {
    return <PaperPlaceholder message="New feature coming soon" />;
  }

  return (
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
      <TextField
        label="YouTube video URL"
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
          {error}
        </Typography>
      )}
      {jobId && (
        <Box mt={2}>
          {jobStatus ? (
            <Box>
              <Typography color="white">
                Status: {jobStatus.data.status}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgressFromStatus(jobStatus.data.status)}
                sx={{ marginTop: 2 }}
              />
              {jobStatus.data.status === "Job's finished" &&
              jobStatus.data.audioData ? (
                <Box mt={2}>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ marginBottom: 1 }}
                  >
                    Processed Audio:
                  </Typography>
                  <audio
                    controls
                    src={`data:audio/wav;base64,${jobStatus.data.audioData}`}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              ) : null}
            </Box>
          ) : null}
        </Box>
      )}
    </Paper>
  );
};

export default Pod;
