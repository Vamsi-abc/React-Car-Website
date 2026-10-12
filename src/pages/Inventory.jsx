import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShowroom } from '../context/ShowroomContext';

export default function Inventory() {
  const { cars, state, dispatch } = useShowroom();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('q') || '';

  const handleSearch = (e) => {
    const q = e.target.value;
    if (q) searchParams.set('q',q);
    else searchParams.delete('q');
    setSearchParams(searchParams);
  };

  const handleCategory = (e) => {
    const cat = e.target.value;
    if (cat !== 'all') searchParams.set('category',cat);
    else searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const filteredCars = cars.filter(car => {
    const matchesCategory =
      currentCategory === 'all' ||
      car.category?.toLowerCase() ===currentCategory.toLowerCase();
    const matchesQuery = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div>
      <h1 className="sectionTitle">Showroom Inventory : {filteredCars.length}</h1>

      <div className="filterBar">
        <input 
          type="text" 
          placeholder="Search By Car Name"
          className="filterInput"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select className="filterSelect" value={currentCategory} onChange={handleCategory}>
          <option value="all">All Categories</option>
          <option value="sports">Sports</option>
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      <div className="carGrid">
        {filteredCars.map(car => (
          <div key={car.id} className="carCard">
            <img src={car.image} alt={car.name} />
            <div className="carCardBody">
              <div className="carCardHeader">
                <span className="carCategory">{car.category}</span>
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: car.id })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  {state.favorites.includes(car.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <h3>{car.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>
                {car.description}
              </p>
              <div className="specsRow">
                <span>⚡ {car.power}</span>
                <span>⛽ {car.fuel}</span>
                <span>⚙️ {car.transmission}</span>
              </div>
              <div className="carCardFooter">
                <span className="price">₹{Number(car.price).toLocaleString()}</span>
                <Link to={`/car/${car.id}`} className="buttonFirst" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}