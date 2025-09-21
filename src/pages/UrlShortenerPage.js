import React, { useState, useEffect } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";

const STORAGE_KEY = "shortenedUrls";

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([]);

  // ✅ Load saved data on page load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUrls(parsed);
        } else {
          console.warn("Saved data is not an array", parsed);
        }
      } catch (err) {
        console.error("Failed to parse saved URLs", err);
      }
    }
  }, []);

  // ✅ Save whenever urls changes
  useEffect(() => {
    if (urls.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
    }
  }, [urls]);

  const handleAddUrl = (data) => {
    const shortCode =
      data.shortcode && data.shortcode.trim()
        ? data.shortcode
        : Math.random().toString(36).substring(2, 8);

    const now = new Date();
    const createdAt = now.toLocaleString();
    const expiresAt = new Date(
      now.getTime() + data.validity * 60000
    ).toLocaleString();

    const newUrl = {
      original: data.url,
      short: `http://short.ly/${shortCode}`,
      createdAt,
      expiresAt,
      clicks: 0,
    };

    setUrls((prev) => [...prev, newUrl]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Shortener</h2>
      <UrlForm onSubmit={handleAddUrl} />
<UrlList urls={urls} setUrls={setUrls} />
    </div>
  );
};

export default UrlShortenerPage;
