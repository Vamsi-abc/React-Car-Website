import React from 'react';
import { Link } from 'react-router-dom';
import { useShowroom } from '../context/ShowroomContext';
import { useFetchCars } from '../hooks/useFetchCars';

export default function Home() {
  const { cars, state, dispatch } = useShowroom();
  
  // Custom Hook + API Integration
  const { loading, error } = useFetchCars(cars);

  return (
    <div className="homeContainer">
      {/* Hero Banner Section */}
      <section className="view">
        <h1>Welcome to <span className="textFont">Vamsi</span> Car Showroom Services</h1>
        <p>Explore Premium Luxury Supercars, Executive Sports and Ultra Responsive Electric Vehicles tested and Certified to Elite Standards.</p>
        <div className="heroActions">
          <Link to="/inventory" className="buttonFirst">View Inventory</Link>
          <Link to="/services" className="buttonSecond">View Services</Link>
        </div>
      </section>

      {/* API status indication */}
      {loading && (
        <p style={{ color: '#499c0e', marginBottom: '14px', fontSize: '0.9rem' }}>
           Loading live showroom server sync...
        </p>
      )}
      {error && (
        <p style={{ color: '#ef4444', marginBottom: '14px', fontSize: '0.9rem'}}>
           API Notice: {error}
        </p>
      )}

      {/* Spotlight Vehicles Section */}
      <div className="sectionHeader">
        <h2 className="sectionTitle">SpotLight Vehicles</h2>
        <Link to="/inventory" className="viewAllLink">View All →</Link>
      </div>

      <div className="carGrid">
        {cars.slice(0, 3).map((car) => (
          <div key={car.id} className="carCard">
            <div className="carCardImageWrap">
              <img src={car.image} alt={car.name} loading="lazy" />
            </div>
            
            <div className="carCardBody">
              <div className="carCardHeader">
                <span className="carCategory">{car.category}</span>
                <button 
                  type="button"
                  onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: car.id })}
                  className="favButton"
                  aria-label="Toggle Favorite"
                >
                  {state.favorites.includes(car.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <h3 className="carTitle">{car.name}</h3>

              <div className="specsRow">
                <span>⚡ {car.power}</span>
                <span>⛽ {car.fuel}</span>
                <span>🏁 {car.topSpeed}</span>
              </div>

              <div className="carCardFooter">
                <div className="priceContainer">
                  <span className="priceLabel">Starting at</span>
                  <span className="price">₹ {car.price.toLocaleString()}</span>
                </div>
                <Link to={`/car/${car.id}`} className="cardDetailsBtn">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}