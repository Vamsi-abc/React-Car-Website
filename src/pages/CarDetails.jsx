import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShowroom } from '../context/ShowroomContext';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../redux/store';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars } = useShowroom();
  
  // Redux hooks
  const reduxDispatch = useDispatch();
  const totalBookings = useSelector((state) => state.testDrives.bookings.length);

  const car = cars.find((c) => c.id === Number(id));

  // Current date in YYYY-MM-DD format to disable previous dates
  const today = new Date().toISOString().split('T')[0];

  // Form Validation State
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!car) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>Car Not Found</h2>
        <button onClick={() => navigate('/inventory')} className="buttonFirst" style={{ marginTop: '16px' }}>
          Back to Inventory
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is Required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = '10-digit Mobile No. Required';
    
    // Date checks: required and cannot be before today
    if (!formData.date) {
      newErrors.date = 'Select a Date';
    } else if (formData.date < today) {
      newErrors.date = 'Booking date cannot be in the past. Select today or a future date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Dispatches directly to the Redux Store
    reduxDispatch(addBooking({ ...formData, carId: car.id, carName: car.name }));
    setSubmitted(true);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="buttonSecond" style={{ marginBottom: '20px' }}>
        Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        <div>
          <img src={car.image} alt={car.name} style={{ width: '100%', borderRadius: '14px', maxHeight: '350px', objectFit: 'cover' }} />
          <h1 style={{ color: '#69c1d3', marginTop: '16px' }}>{car.name}</h1>
          <p className="price" style={{ margin: '8px 0' }}>₹ {car.price.toLocaleString()}</p>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{car.description}</p>
        </div>

        <div className="cardBox">
          <h3>Book a Test Drive</h3>
          <p style={{ fontSize: '0.8rem', color: '#0d5162', marginTop: '6px' }}>
            Confirmed Car Bookings across Showroom : <strong>{totalBookings}</strong>
          </p>

          {submitted ? (
            <div style={{ background: '#064e3b', color: '#6ee7b7', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
              Confirmed! Booking has been Registered.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="formGroup">
                <label>Your Full Name</label>
                <input 
                  type="text" 
                  className="formControl" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
                {errors.name && <small style={{ color: '#ef4444' }}>{errors.name}</small>}
              </div>

              <div className="formGroup">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  className="formControl" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                />
                {errors.phone && <small style={{ color: '#ef4444' }}>{errors.phone}</small>}
              </div>

              <div className="formGroup">
                <label>Select Date</label>
                <input 
                  type="date" 
                  min={today}
                  className="formControl" 
                  value={formData.date} 
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                />
                {errors.date && <small style={{ color: '#ef4444' }}>{errors.date}</small>}
              </div>

              <button type="submit" className="buttonFirst" style={{ marginTop: '8px' }}>
                Confirm Car Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}