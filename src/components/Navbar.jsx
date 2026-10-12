import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useShowroom } from '../context/ShowroomContext';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { state } = useShowroom();
  // Read total bookings directly from Redux Store
  const bookingsCount = useSelector((s) => s.testDrives.bookings.length);

  return (
    <header className="navigator">
      <div className="navigatorIn">
        <Link to="/" className="brandSymbol">
          <div className="logo">Vamsi</div>
          <div>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>VAMSI</strong>
            <span style={{ display: 'block', color: '#267b95' }}>SHOWROOM</span>
          </div>
        </Link>

        <nav className="navigatorLink">
          <NavLink to="/" className={({ isActive }) => `navigatorList ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/inventory" className={({ isActive }) => `navigatorList ${isActive ? 'active' : ''}`}>Inventory</NavLink>
          <NavLink to="/services" className={({ isActive }) => `navigatorList ${isActive ? 'active' : ''}`}>Services</NavLink>
          <NavLink to="/admin" className={({ isActive }) => `navigatorList ${isActive ? 'active' : ''}`}>Admin</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `navigatorList ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </nav>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="navigatorFav"> Favorites
            ❤️ {state.favorites.length}
          </div>
          <div className="navigatorFav" style={{ color: 'rgb(191, 130, 23)', borderColor: '#cba666' }}> Bookings
            📅  {bookingsCount}
          </div>
        </div>
      </div>
    </header>
  );
}