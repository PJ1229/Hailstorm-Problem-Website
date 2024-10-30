import React, { useState } from 'react';

const NumberEntry = () => {
  const [number, setNumber] = useState('');
  const [exists, setExists] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setExists(null);

    try {
      // Change the URL to include the port number if needed
      const response = await fetch(`http://localhost:5050/numbers/check/${number}`);
      const data = await response.json();

      if (response.ok) {
        setExists(data.exists);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h1>Enter a Number</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          required
        />
        <button type="submit">Check Number</button>
      </form>
      {exists !== null && (
        <div>
          {exists ? (
            <p>The number {number} exists in the database.</p>
          ) : (
            <p>The number {number} does not exist in the database.</p>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default NumberEntry;
