import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";

const STORAGE_KEY = "shortenedUrls";

const UrlList = ({ urls = [], setUrls }) => {
  if (!urls || urls.length === 0) {
    return <p>No URLs shortened yet.</p>;
  }

  // ✅ Increment clicks and persist
  const handleClick = (index) => {
    const updated = urls.map((u, i) =>
      i === index ? { ...u, clicks: u.clicks + 1 } : u
    );

    setUrls(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // persist
  };

  return (
    <div>
      {urls.map((item, idx) => (
        <Card key={idx} sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Short URL:{" "}
              <Link
                href={item.original}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick(idx)}
              >
                {item.short}
              </Link>
            </Typography>
            <Typography>Original: {item.original}</Typography>
            <Typography>Created At: {item.createdAt}</Typography>
            <Typography>Expires At: {item.expiresAt}</Typography>
            <Typography>Clicks: {item.clicks}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlList;
