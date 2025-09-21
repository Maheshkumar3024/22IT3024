import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import logger from "../utils/logger";

const UrlForm = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.startsWith("http")) {
      enqueueSnackbar("Invalid URL. Must start with http/https.", { variant: "error" });
      return;
    }
    if (validity <= 0) {
      enqueueSnackbar("Validity must be positive.", { variant: "error" });
      return;
    }

    const data = { url, validity, shortcode };
    logger("Submitting URL for shortening", data);
    onSubmit(data);

    enqueueSnackbar("URL shortened successfully!", { variant: "success" });

    setUrl("");
    setValidity(30);
    setShortcode("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="Original URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <TextField
        label="Validity (minutes)"
        type="number"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <TextField
        label="Preferred Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Shorten
      </Button>
    </Box>
  );
};

export default UrlForm;
