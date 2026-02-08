"use client";

import { useState } from "react";
import { toast } from "sonner";
import "./translate.scss";

export default function TextTranslatePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("ur");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!input.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          source: from,
          target: to,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Translation failed");
      }

      setOutput(data.translatedText || "");
      toast.success("Translation completed!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Translation failed");
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="text-translate">
      <header className="page-header">
        <h1>Text Translator</h1>
        <p>Translate text instantly with AI precision</p>
      </header>

      <div className="translator-card">
        <div className="language-bar">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="hi">Hindi</option>
          </select>

          <button
            className="swap"
            onClick={() => {
              setFrom(to);
              setTo(from);
              setInput(output);
              setOutput(input);
            }}
            title="Swap languages"
          >
            ⇄
          </button>

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="ur">Urdu</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="text-area">
          <div className="input-section">
            <textarea
              placeholder="Type text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  translateText();
                }
              }}
            />
            <div className="char-count">{input.length} characters</div>
          </div>

          <div className="output-section">
            <textarea
              placeholder="Translation will appear here..."
              value={output}
              readOnly
            />
            {output && (
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard!");
                }}
                title="Copy translation"
              >
                📋 Copy
              </button>
            )}
          </div>
        </div>

        <button className="translate-btn" onClick={translateText} disabled={loading || !input.trim()}>
          {loading ? (
            <>
              <span className="spinner"></span>
              Translating…
            </>
          ) : (
            "✨ Translate (Ctrl+Enter)"
          )}
        </button>
      </div>
    </main>
  );
}
