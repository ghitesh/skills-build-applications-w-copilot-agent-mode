import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="app-root">
        <div className="container app-container">
          <header className="d-flex align-items-center justify-content-between app-header">
            <h1 className="h3 mb-0">Octofit Tracker</h1>
            <nav>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end>Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/teams" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/activities" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/leaderboard" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/workouts" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Workouts</NavLink>
                </li>
              </ul>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
