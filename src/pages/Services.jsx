import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Services() {
  return (
    <div>
      <h1 className="sectionTitle">Showroom Services</h1>
      <p style={{ color: '#566c8d', marginBottom: '20px' }}>Your investment deserves world-class care. Experience seamless optimization and long-term peace of mind in one complete service.</p>

      {/* Nested Route Tabs */}
      <div className="subTabs">
        <NavLink to="/services" end className={({ isActive }) => `subTab ${isActive ? 'active' : ''}`}>
          Detailing & Ceramic
        </NavLink>
        <NavLink to="/services/maintenance" className={({ isActive }) => `subTab ${isActive ? 'active' : ''}`}>
          Diagnostics
        </NavLink>
        <NavLink to="/services/warranty" className={({ isActive }) => `subTab ${isActive ? 'active' : ''}`}>
          Warranty
        </NavLink>
      </div>

      {/* Renders child views */}
      <Outlet />
    </div>
  );
}

export function ServiceDetailing() {
  return (
    <div className="cardBox">
      <h3>Premium Ceramic Coating & PPF</h3>
      <p style={{ color: '#3c5478', marginTop: '10px' }}>Multi-stage Paint Correction, 9H ceramic coating protection, and heat-resistant brake caliper coating to keep vehicles in showroom shine.</p>
    </div>
  );
}

export function ServiceMaintenance() {
  return (
    <div className="cardBox">
      <h3>Track Diagnostics & Calibration</h3>
      <p style={{ color: '#4a5e7b', marginTop: '10px' }}>Manufacturer-grade computer diagnostics, computerized suspension setup, and bi-turbo engine balancing.</p>
    </div>
  );
}

export function ServiceWarranty() {
  return (
    <div className="cardBox">
      <h3>Extended 5-Year Showroom Warranty</h3>
      <p style={{ color: '#21467b', marginTop: '10px' }}>Zero-deductible mechanical coverage and 24/7 dedicated luxury flatbed towing across all regions.</p>
    </div>
  );
}