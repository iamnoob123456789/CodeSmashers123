import React, { useMemo, useState } from "react";

// Simple planner: computes SIP needed using FV of annuity
// monthlyRate = annualRate / 12; months = years * 12
// SIP = Target / [ ((1 + r)^n - 1) / r * (1 + r) ]

export default function GoalPlanner() {
  const [goal, setGoal] = useState({ target: 500000, years: 5, annualRate: 12 });

  const monthlyContribution = useMemo(() => {
    const r = (goal.annualRate / 100) / 12;
    const n = goal.years * 12;
    if (r === 0) return Math.ceil(goal.target / n);
    const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return Math.ceil(goal.target / factor);
  }, [goal]);

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <h3 style={{ marginTop: 0 }}>Goal Planner</h3>
        <div className="form-group">
          <label>Target amount (₹)</label>
          <input className="form-control" type="number" value={goal.target}
                 onChange={e => setGoal({ ...goal, target: Number(e.target.value) })} />
        </div>
        <div className="form-group">
          <label>Time horizon (years)</label>
          <input className="form-control" type="number" value={goal.years}
                 onChange={e => setGoal({ ...goal, years: Number(e.target.value) })} />
        </div>
        <div className="form-group">
          <label>Expected annual return (%)</label>
          <input className="form-control" type="number" value={goal.annualRate}
                 onChange={e => setGoal({ ...goal, annualRate: Number(e.target.value) })} />
        </div>

        <div className="card" style={{ background: "#f8fbff" }}>
          <div className="card-body">
            <div><strong>Required monthly SIP:</strong> ₹{monthlyContribution.toLocaleString()}</div>
            <div style={{ color: "#555", marginTop: 6 }}>Assuming monthly compounding and consistent contributions.</div>
          </div>
        </div>
      </div>
    </div>
  );
}


