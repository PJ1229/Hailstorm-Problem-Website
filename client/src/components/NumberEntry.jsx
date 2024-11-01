import React, { useState } from 'react';

const NumberEntry = () => {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`http://localhost:5050/api/numbers/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: parseInt(number, 10) }), // Ensure number is sent as an integer
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />
      <button type="submit">Add Number</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default NumberEntry;