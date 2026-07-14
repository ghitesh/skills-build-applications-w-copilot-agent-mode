import React, { useEffect, useState } from 'react';

const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/workouts/`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setWorkouts(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-3"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="p-3"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="card table-card">
      <div className="card-body">
        <h2 className="h5 card-title">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Workout</th>
                <th scope="col">Duration / Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w) => (
                <tr key={w.id || w._id}>
                  <td>{w.id || w._id || '-'}</td>
                  <td>{w.name || w.title || 'Workout'}</td>
                  <td className="small-muted">{w.duration || w.length || w.notes || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
