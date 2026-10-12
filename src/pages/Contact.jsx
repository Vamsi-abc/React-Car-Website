import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/store';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  const topicRef = useRef(null);
  const reduxDispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    reduxDispatch(addContact({
      ...formData,
      subject: topicRef.current ? topicRef.current.value : formData.subject
    }));
    setSent(true);
  };

  const setFastSubject = (title) => {
    if (topicRef.current) {
      topicRef.current.value = title;
      setFormData(prev => ({ ...prev, subject: title }));
      topicRef.current.focus();
    }
  };

  return (
    <div>
      <h1 className="sectionTitle">Contact Vamsi Showroom</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        {/* Dealership Info Card */}
        <div className="cardBox">
          <h3>Showroom Address</h3>
          <p style={{ color: '#22565f', marginTop: '12px', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Opp. TCS Company Building, HITECH City, Road No.42<br />
            Hyderabad, Telangana-500037<br />
            <strong style={{ color: '#0f172a' }}>Mobile No :- </strong> +91 9112421242<br />
            <strong style={{ color: '#0f172a' }}>Hours :- </strong> Mon - Sat 9:30 AM – 9:30 PM
          </p>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 750 }}>
              Quick Add On's :-
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '12px' }}>
              Click on Any Add On's to Prefill the Form :
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => setFastSubject('Purchase & Allocation Enquiry')} 
                className="buttonSecond" 
                style={{ fontSize: '0.82rem', padding: '8px 14px', margin: 0 }}
              >
                Purchase Enquiry
              </button>
              <button 
                type="button" 
                onClick={() => setFastSubject('Ex-change Vehicle')} 
                className="buttonSecond" 
                style={{ fontSize: '0.82rem', padding: '8px 14px', margin: 0 }}
              >
                Ex-change
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="cardBox">
          {sent ? (
            <div style={{ 
              background: '#ecfdf5', 
              border: '2px solid #a7f3d0', 
              color: '#065f46', 
              padding: '24px', 
              borderRadius: '16px', 
              textAlign: 'center' 
            }}>
              <h3 style={{ color: '#065f46', marginBottom: '6px' }}>Message Delivered!</h3>
              <p style={{ fontSize: '0.9rem' }}>Your Enquiry was sent to the Showroom Admin Dashboard.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="formGroup">
                <label>Your Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="formControl" 
                  placeholder="Ex :- Devapuja YugaRaja Vamsi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="formGroup">
                <label>Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="formControl" 
                  placeholder="Vamsi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="formGroup">
                <label>Enquiry Subject</label>
                <input 
                  ref={topicRef} 
                  required 
                  type="text" 
                  className="formControl" 
                  placeholder="Select a quick topic beside or type here..." 
                />
              </div>

              <div className="formGroup">
                <label>Message</label>
                <textarea 
                  required 
                  rows={3} 
                  className="formControl" 
                  placeholder="Tell us what you need..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                className="buttonFirst" 
                style={{ marginTop: '8px', width: '100%', textAlign: 'center' }}
              >
                Send Showroom Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
