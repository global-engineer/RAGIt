import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');  // React state for controlled input :contentReference[oaicite:2]{index=2}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();                 // Prevent full page reload :contentReference[oaicite:3]{index=3}
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/answer', {
        method: 'Get',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();    // Parse JSON response :contentReference[oaicite:4]{index=4}

      setResponse(data['message']);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          Enter text:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}  // Controlled input pattern :contentReference[oaicite:5]{index=5}
            placeholder="Type something…"
          />
        </label>
      </p>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting…' : 'Submit'}
      </button>
      <p>
        <br></br>
        <label>
          <input
            type="text"
            value={response}
            onChange={e => setText(e.target.value)}  // Controlled input pattern :contentReference[oaicite:5]{index=5}
            placeholder="Answer"
            style={{ width: '90%', height: '300px', marginLeft: '4%' }}
          />
        </label>
      </p>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {/* {response && <pre>{JSON.stringify(response, null, 2)}</pre>} */}
    </form>
  );
}

