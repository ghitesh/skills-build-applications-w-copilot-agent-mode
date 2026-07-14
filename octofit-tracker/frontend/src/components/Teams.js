import React, { useEffect, useState } from 'react';

const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/teams/`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setTeams(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-3"><div className="spinner-border text-info" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="p-3"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="card table-card">
      <div className="card-body">
        <h2 className="h5 card-title">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.id || t._id}>
                  <td>{t.id || t._id || '-'}</td>
                  <td>{t.name || t.team_name || 'Team'}</td>
                  <td className="small-muted">{Array.isArray(t.members) ? t.members.length : t.member_count ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
