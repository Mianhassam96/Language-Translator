"use client";

import { useState } from "react";
import "./file.scss";

export default function FilePage() {
  const [file, setFile] = useState<File | null>(null);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("ur");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translatedFile, setTranslatedFile] = useState<Blob | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setTranslatedFile(null);
      setProgress(0);
    }
  };

  const translateFile = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);

    // Fake progress (replace with real API later)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);

          // Fake translated file
          const blob = new Blob(
            [`Translated version of ${file.name}`],
            { type: "text/plain" }
          );
          setTranslatedFile(blob);

          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  const downloadFile = () => {
    if (!translatedFile) return;

    const url = URL.createObjectURL(translatedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translated-${file?.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="file-translate">
      <header className="page-header">
        <h1>File Translator</h1>
        <p>Translate documents with AI accuracy</p>
      </header>

      <div className="file-card">
        {/* Upload */}
        <label className="upload-box">
          <input type="file" hidden onChange={handleFile} />
          <span className="icon">📄</span>
          <span className="text">
            {file ? file.name : "Click or drop a file here"}
          </span>
          <span className="sub">PDF, DOCX, TXT supported</span>
        </label>

        {/* Preview */}
        {file && (
          <div className="file-preview">
            <strong>File Preview</strong>
            <p>Name: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(1)} KB</p>
            <p>Type: {file.type || "Unknown"}</p>
          </div>
        )}

        {/* Language */}
        <div className="language-bar">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>

          <span>→</span>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="ur">Urdu</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Progress */}
        {loading && (
          <div className="progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Actions */}
        {!translatedFile ? (
          <button
            className="translate-btn"
            disabled={!file || loading}
            onClick={translateFile}
          >
            {loading ? "Translating..." : "Translate File"}
          </button>
        ) : (
          <button className="download-btn" onClick={downloadFile}>
            Download Translated File
          </button>
        )}
      </div>
    </main>
  );
}
