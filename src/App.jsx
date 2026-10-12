// import React from 'react';
// import Greeting from './Greeting';
// import Hello from './Hello';
// import SelfIntroduction from './Selfintroduction';

// export default function App() {
//   return (
//     <div>
      
//     </div>
//   )
// }
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 1. Redux Setup (Wrapped directly inside App.jsx)
import { Provider } from 'react-redux';
import { store } from './redux/store';

// 2. Context Setup
import { ShowroomProvider } from './context/ShowroomContext';

// 3. Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 4. Pages
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetails from './pages/CarDetails';
import Services, { ServiceDetailing, ServiceMaintenance, ServiceWarranty } from './pages/Services';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

export default function App() {
  return (
    <ShowroomProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="website">
            <Navbar />
            
            <main className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/car/:id" element={<CarDetails />} />
                <Route path="/services" element={<Services />}>
                  <Route index element={<ServiceDetailing />} />
                  <Route path="maintenance" element={<ServiceMaintenance />} />
                  <Route path="warranty" element={<ServiceWarranty />} />
                </Route>
                <Route path="/admin" element={<Admin />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                  path="*" 
                  element={
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                      <h2>404 - Page Not Found</h2>
                      <p style={{ color: '#94a3b8', marginTop: '10px' }}>The page you are looking for does not exist.</p>
                    </div>
                  } 
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </ShowroomProvider>
  );
}