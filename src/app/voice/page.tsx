"use client";

import { useState } from "react";
import "./voice.scss";

export default function VoicePage() {
  const [recording, setRecording] = useState(false);

  const handleRecord = () => {
    setRecording(!recording);
    // recording logic later
  };

  return (
    <main className="voice-translate">
      <header className="page-header">
        <h1>Voice Translator</h1>
        <p>Translate spoken language instantly with AI</p>
      </header>

      <div className="voice-card">
        <div className="voice-controls">
          <button
            onClick={handleRecord}
            className={`record-btn ${recording ? "active" : ""}`}
          >
            🎤 {recording ? "Recording..." : "Start Recording"}
          </button>

          <label className="upload-audio">
            Upload Audio
            <input type="file" accept="audio/*" hidden />
          </label>
        </div>

        <textarea
          placeholder="Translated text will appear here..."
          readOnly
        />

        <button className="translate-btn">Translate Voice</button>
      </div>
    </main>
  );
}
