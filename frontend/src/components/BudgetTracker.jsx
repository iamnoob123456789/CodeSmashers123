import React, { useMemo, useState } from "react";

export default function BudgetTracker() {
  const [income, setIncome] = useState(50000);
  const [items, setItems] = useState([
    { id: 1, name: "Rent", amount: 12000 },
    { id: 2, name: "Food", amount: 6000 },
  ]);

  const totalExpense = useMemo(() => items.reduce((a, b) => a + (Number(b.amount) || 0), 0), [items]);
  const savings = useMemo(() => Math.max(income - totalExpense, 0), [income, totalExpense]);
  const savingsRate = useMemo(() => (income ? Math.round((savings / income) * 100) : 0), [income, savings]);

  function addItem() {
    setItems(prev => [...prev, { id: Date.now(), name: "", amount: 0 }]);
  }
  function updateItem(id, field, value) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: field === 'amount' ? Number(value) : value } : it));
  }
  function removeItem(id) { setItems(prev => prev.filter(it => it.id !== id)); }

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <h3 style={{ marginTop: 0 }}>Budget Tracker</h3>
        <div className="form-group">
          <label>Monthly income (₹)</label>
          <input className="form-control" type="number" value={income} onChange={e => setIncome(Number(e.target.value))} />
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Expenses</strong>
              <button className="btn btn-secondary" onClick={addItem}>Add item</button>
            </div>
            {items.map(it => (
              <div key={it.id} style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input className="form-control" placeholder="Name" value={it.name} onChange={e => updateItem(it.id, 'name', e.target.value)} />
                <input className="form-control" type="number" placeholder="Amount" value={it.amount} onChange={e => updateItem(it.id, 'amount', e.target.value)} />
                <button className="btn btn-secondary" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: "#f8fbff", marginTop: 12 }}>
          <div className="card-body">
            <div><strong>Total expenses:</strong> ₹{totalExpense.toLocaleString()}</div>
            <div><strong>Estimated savings:</strong> ₹{savings.toLocaleString()} ({savingsRate}%)</div>
            <div style={{ color: "#555", marginTop: 6 }}>Tip: Aim to save at least 20%—reduce non-essential spends if below.</div>
          </div>
        </div>
      </div>
    </div>
  );
}


