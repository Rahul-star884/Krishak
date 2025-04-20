


import React, { useState } from 'react';
import axios from 'axios';

const AdviceDetail = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: query }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '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', 
          },
        }
      );

      const answer = res.data.choices[0].message.content;
      setResponse(answer);
      setHistory(prev => [...prev, { question: query, answer }]);
      setQuery('');
    } catch (err) {
      console.error(err);
      setResponse('Kuch galat ho gaya, dubara try karo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>Expert Advice (AI Powered)</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <textarea
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            fontFamily: 'Arial',
            minHeight: '100px',
          }}
          placeholder="Poocho kuch bhi farming ya schemes se related..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Soch raha hai...' : 'Get Expert Advice'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ccc' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>AI ka Jawaab:</h2>
          <p>{response}</p>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Pehle ke Sawal:</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} style={{ padding: '15px', marginBottom: '10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontWeight: 'bold' }}>Q: {item.question}</p>
                <p>A: {item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdviceDetail;