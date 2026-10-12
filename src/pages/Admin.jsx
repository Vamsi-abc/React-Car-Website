import React, { useState, useRef } from 'react';
import { useShowroom } from '../context/ShowroomContext';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking, removeContact } from '../redux/store';

export default function Admin() {
  const { cars, addCar, updateCar, deleteCar } = useShowroom();
  const [editingId, setEditingId] = useState(null);
  const nameInputRef = useRef(null);

  // Redux: Read Bookings & Contact Inquiries
  const bookings = useSelector((state) => state.testDrives.bookings);
  const contacts = useSelector((state) => state.testDrives.contacts || []);
  const reduxDispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    category: 'sports',
    price: '',
    power: '',
    fuel: 'Petrol',
    transmission: 'Automatic',
    topSpeed: '',
    image: 'https://www.supercars.net/blog/wp-content/uploads/2024/03/2015-Jaguar-C-X75-Bond-Concept-003-1440.jpg',
    description: ''
  });

  const handleEdit = (car) => {
    setEditingId(car.id);
    setForm(car);
    nameInputRef.current?.focus();
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      name: '', category: 'sports', price: '', power: '', 
      fuel: 'Petrol', transmission: 'Automatic', topSpeed: '',
      image: 'https://www.supercars.net/blog/wp-content/uploads/2024/03/2015-Jaguar-C-X75-Bond-Concept-003-1440.jpg',
      description: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingId) {
      updateCar(editingId, { ...form, price: Number(form.price) });
    } else {
      addCar({ ...form, price: Number(form.price) });
    }
    handleCancel();
  };

  return (
    <div>
      <h1 className="sectionTitle">Showroom Management</h1>

      {/* --- SECTION 1: CUSTOMER CONTACT INQUIRIES --- */}
      <div className="cardBox" style={{ marginBottom: '28px' }}>
        <h3>📩 Customer Contact Enquiries : {contacts.length}</h3>
        {contacts.length === 0 ? (
          <p style={{ marginTop: '12px', color: '#64748b', fontSize: '0.9rem' }}>
            No Messages Yet. Send a Message from the Contact page to View Here
          </p>
        ) : (
          <div className="tableWrap" style={{ marginTop: '16px' }}>
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Sender Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td><strong style={{ color: '#10428e' }}>{c.name}</strong></td>
                    <td>{c.email}</td>
                    <td style={{ fontWeight: 600 }}>{c.subject}</td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{c.message}</td>
                    <td>
                      <button 
                        onClick={() => reduxDispatch(removeContact(c.id))} 
                        className="buttonDelete"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- SECTION 2: TEST DRIVE BOOKINGS --- */}
      <div className="cardBox" style={{ marginBottom: '28px' }}>
        <h3>📅 Test Drive Bookings : {bookings.length}</h3>
        {bookings.length === 0 ? (
          <p style={{ marginTop: '12px', color: '#64748b', fontSize: '0.9rem' }}>
            No Test Drives Booked. Open Any Car Details Page to Schedule Test Drive
          </p>
        ) : (
          <div className="tableWrap" style={{ marginTop: '16px' }}>
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Appointment Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td><strong style={{ color: '#10428e' }}>{b.carName}</strong></td>
                    <td>{b.name}</td>
                    <td>{b.phone}</td>
                    <td style={{ color: '#059669', fontWeight: 700 }}>{b.date}</td>
                    <td>
                      <button 
                        onClick={() => reduxDispatch(removeBooking(b.id))} 
                        className="buttonDelete"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- SECTION 3: ADD / EDIT FLEET FORM --- */}
      <div className="cardBox">
        <h3>{editingId ? 'Edit Vehicle' : 'Add New Car to ShowRoom'}</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div className="formGrid">
            <div className="formGroup">
              <label>Model Name</label>
              <input 
                ref={nameInputRef}
                type="text" 
                required 
                className="formControl" 
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })} 
              />
            </div>

            <div className="formGroup">
              <label>Price (₹ INR)</label>
              <input 
                type="number" 
                required 
                className="formControl" 
                value={form.price} 
                onChange={e => setForm({ ...form, price: e.target.value })} 
              />
            </div>

            <div className="formGroup">
              <label>Category</label>
              <select className="formControl" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="sports">Sports</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Horsepower (Ex :- 500 HP)</label>
              <input type="text" className="formControl" value={form.power} onChange={e => setForm({ ...form, power: e.target.value })} />
            </div>

            <div className="formGroup">
              <label>Top Speed (Ex :- 290 km/h)</label>
              <input type="text" className="formControl" value={form.topSpeed} onChange={e => setForm({ ...form, topSpeed: e.target.value })} />
            </div>

            <div className="formGroup">
              <label>Fuel Type</label>
              <select className="formControl" value={form.fuel} onChange={e => setForm({ ...form, fuel: e.target.value })}>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="buttonFirst">
              {editingId ? 'Update Car' : 'Save Car'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="buttonSecond">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- SECTION 4: CURRENT STOCK TABLE --- */}
      <div className="cardBox" style={{ marginTop: '32px' }}>
        <h3>Current Stock : {cars.length}</h3>
        <div className="tableWrap" style={{ marginTop: '16px' }}>
          <table className="dataTable">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Category</th>
                <th>Price</th>
                <th>Fuel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td style={{ textTransform: 'uppercase', color: '#5c8914' }}>{c.category}</td>
                  <td>₹{Number(c.price).toLocaleString()}</td>
                  <td>{c.fuel}</td>
                  <td>
                    <button onClick={() => handleEdit(c)} className="buttonEdit">Edit</button>
                    <button onClick={() => deleteCar(c.id)} className="buttonDelete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}