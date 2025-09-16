import React, { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  { id: 1, q: "How comfortable are you with short-term losses?", options: [
    { t: "Not at all", v: 0 }, { t: "A little", v: 1 }, { t: "Moderately", v: 2 }, { t: "Very", v: 3 }
  ]},
  { id: 2, q: "Investment horizon for most goals?", options: [
    { t: "< 1 year", v: 0 }, { t: "1-3 years", v: 1 }, { t: "3-5 years", v: 2 }, { t: "> 5 years", v: 3 }
  ]},
  { id: 3, q: "Primary goal?", options: [
    { t: "Capital preservation", v: 0 }, { t: "Income", v: 1 }, { t: "Balanced growth", v: 2 }, { t: "Aggressive growth", v: 3 }
  ]},
  { id: 4, q: "How do you react to market dips?", options: [
    { t: "Sell immediately", v: 0 }, { t: "Wait & watch", v: 1 }, { t: "Buy more", v: 3 }, { t: "No idea", v: 1 }
  ]},
  { id: 5, q: "What portion of income can you invest monthly?", options: [
    { t: "< 5%", v: 0 }, { t: "5-10%", v: 1 }, { t: "10-20%", v: 2 }, { t: "> 20%", v: 3 }
  ]},
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});

  const score = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers]);
  const result = useMemo(() => {
    if (score <= 4) return "Low";
    if (score <= 8) return "Moderate";
    return "High";
  }, [score]);

  // Log to console and persist snapshots to localStorage on every change
  useEffect(() => {
    // Ensure visible log each time and a UI update rendered below
    const snapshot = {
      timestamp: new Date().toISOString(),
      totalScore: score,
      riskProfile: result,
      answers,
    };
    // Print to console
    // Using console.info for higher visibility and grouping
    console.info("[Quiz] Update =>", JSON.stringify(snapshot, null, 2));
    // Persist to localStorage (append-style)
    try {
      const key = "quiz_results";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(snapshot);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) {
      // Ignore storage errors
    }
  }, [answers, score, result]);

  function downloadResults() {
    const key = "quiz_results";
    const data = localStorage.getItem(key) || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <h3 style={{ marginTop: 0 }}>Risk Profiling Quiz</h3>
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{idx + 1}. {q.q}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {q.options.map(opt => (
                <button
                  key={opt.t}
                  className={answers[q.id] === opt.v ? "btn btn-primary" : "btn btn-secondary"}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.v }))}
                >{opt.t}</button>
              ))}
            </div>
          </div>
        ))}
        <div className="card" style={{ background: "#f8fbff" }}>
          <div className="card-body">
            <div><strong>Total score:</strong> {score}</div>
            <div><strong>Risk profile:</strong> {result}</div>
            <div style={{ marginTop: 8, color: "#555" }}>
              <small>Live summary printed to browser console on every selection.</small>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: 8 }} onClick={downloadResults}>Download responses.json</button>
          </div>
        </div>
      </div>
    </div>
  );
}


