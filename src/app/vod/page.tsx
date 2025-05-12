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
  nextAllowedSubmission: number;
}

interface JobStatusResponse {
  data: {
    status:
      | "Something went wrong. Contact Lurkerbomb if the error persists."
      | "Orders received. Extracting data..."
      | "Extracting data..."
      | "Parsing gameplay..."
      | "Analyzing gameplay..."
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
    let errorMessage = "Submission failed. Try again in a few minutes.";
    const errorData = await response.json();
    if (errorData.error) {
      errorMessage = errorData.error;
    }
    throw new Error(errorMessage);
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
    case "Analyzing gameplay...":
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
  const [url, setURL] = useState("https://www.youtube.com/watch?v=YnQd6qsJZC4");
  const [submitError, setSubmitError] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const { data: session, status, update } = useSession();

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
      if (update && response.nextAllowedSubmission) {
        update({
          ...session,
          nextSubmission: response.nextAllowedSubmission,
        });
      }
    },
    onError: (error: Error) => {
      setSubmitError(error.message);
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
            "Something went wrong. Contact Lurkerbomb if the error persists." ||
          jobData.data?.status === "Job cancelled")
      ) {
        return false;
      }
      return 20000;
    },
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem("jobId");
      setJobId(null);
    }
  }, [error]);

  const jobInProgress =
    jobId &&
    (!jobStatus ||
      (jobStatus.data.status !== "Job's finished" &&
        jobStatus.data.status !== "Job cancelled" &&
        jobStatus.data.status !==
          "Something went wrong. Contact Lurkerbomb if the error persists."));

  const isLastSubmissionRecent = session?.nextSubmission
    ? Date.now() < session?.nextSubmission
    : false;

  return (
    <Fade in={status !== "loading"} timeout={500}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          paddingTop: 2,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: "rgba(243, 244, 246, 0.6)",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 1,
            marginRight: "-0.8rem",
          }}
        >
          Gameplay Review
          <Typography
            variant="caption"
            component="span"
            sx={{ fontSize: "0.75rem", verticalAlign: "middle", ml: 1 }}
          >
            * experimental feature
          </Typography>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            display: "block",
            marginBottom: 4,
            color: "rgba(243, 244, 246, 0.6)",
            textAlign: "center",
          }}
        >
          Generate a brief AI audio summary of BW gameplay
        </Typography>
        {session?.username !== "Lurkerbomb" ? (
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: "rgba(243, 244, 246, 0.6)",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            This feature is currently unavailable.
          </Typography>
        ) : (
          <>
            {!jobInProgress && session?.nextSubmission && (
              <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(243, 244, 246, 0.6)",
                    textAlign: "left",
                    userSelect: "none",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  You can submit a video once every 24 hours
                </Typography>
              </Box>
            )}

            <TextField
              label="YouTube Brood War gameplay URL under 60 minutes"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setURL(e.target.value)}
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(243, 244, 246, 0.6)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#10b981",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#10b981",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#10b981",
                },
                input: {
                  color: "rgba(243, 244, 246, 0.6)",
                },
              }}
            />
            <Button
              onClick={handleClick}
              variant="contained"
              fullWidth
              disabled={!!jobInProgress || isLastSubmissionRecent}
              sx={{
                backgroundColor:
                  !!jobInProgress || isLastSubmissionRecent
                    ? "#9e9e9e"
                    : "#10b981",
              }}
            >
              Submit
            </Button>
            {submitError && (
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
                      sx={{
                        marginTop: 2,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#10b981",
                        },
                      }}
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
