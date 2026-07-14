import React, { useEffect, useState } from 'react';

const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/leaderboard/`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setEntries(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-3"><div className="spinner-border text-secondary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="p-3"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="card table-card">
      <div className="card-body">
        <h2 className="h5 card-title">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, idx) => (
                <tr key={e.id || e._id || idx}>
                  <td>{e.rank || idx + 1}</td>
                  <td>{e.user?.username || e.username || 'User'}</td>
                  <td>{e.score ?? e.points ?? 'n/a'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
