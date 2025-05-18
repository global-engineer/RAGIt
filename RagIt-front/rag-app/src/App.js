import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [sources, setSources] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      const postData = {
        question: text,
        urls: sources,
      };


      const res = await fetch('http://127.0.0.1:8000/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(data);

      setResponse(data['message']);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ marginTop: '5%' }}>
        <label style={{ marginLeft: '5%' }}>
          Enter question:
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ width: '30%', height: '30px', borderRadius: '3px', marginLeft:'1%' }}
          />
        </label>
        <label style={{ marginLeft: '5%' }}>
          Enter sources:
          <input
            type="text"
            value={sources}
            onChange={e => setSources(e.target.value)}
            style={{ width: '40%', height: '100px', borderRadius: '3px', marginLeft:'1%' }}
            placeholder='Enter comma seperated web addresses to be used as context'
          />
        </label>
      </p>
      <p style={{ marginTop: '10%' }}>
        <button type="submit" disabled={loading}
          style={{ marginLeft: '40%', width: '10%', height: '30px', borderRadius: '5px' }}>
          {loading ? 'Submitting…' : 'Submit'}
        </button>
        <br></br>
        <br></br>
        <br></br>
        <label>
          <textarea
            type="text"
            value={response}
            onChange={e => setText(e.target.value)}
            placeholder="Answer goes here"
            style={{ width: '90%', height: '300px', marginLeft: '4%', borderRadius: '10px',overflowWrap: 'normal' }}
          />
        </label>
      </p>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </form>
  );
}

