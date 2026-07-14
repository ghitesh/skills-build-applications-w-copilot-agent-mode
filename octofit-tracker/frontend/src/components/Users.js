import React, { useEffect, useState } from 'react';

const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/users/`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setUsers(normalized);
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
        <h2 className="h5 card-title">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email / Info</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id || u._id}>
                  <td>{u.id || u._id || '-'}</td>
                  <td>{u.username || u.name || 'User'}</td>
                  <td className="small-muted">{u.email || u.email_address || u.profile?.bio || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
