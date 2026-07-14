import React, { useEffect, useState } from 'react';

const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/activities/`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setActivities(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-3"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="p-3"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="card table-card">
      <div className="card-body">
        <h2 className="h5 card-title">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id || a._id}>
                  <td>{a.id || a._id || '-'}</td>
                  <td>{a.name || a.title || a.description || 'Activity'}</td>
                  <td className="small-muted">{a.description || a.detail || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
