import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';

const ShowroomContext = createContext();

const DEFAULT_CARS = [
  {
    id: 1,
    name: "BMW 7",
    category: "Sports",
    price: 35999999,
    fuel: "Petrol",
    power: "597 HP",
    topSpeed: "240 km/h",
    transmission: "9G-Tronic",
    image: "https://media.wired.com/photos/59325d1ca3126458449944dd/master/pass/bmwi8-ft.jpg",
    description: "The timeless luxury on wheels with twin-turbocharged BMW7 performance."
  },
  {
    id: 2,
    name: "Audi A8",
    category: "Sedan",
    price: 25999999,
    fuel: "Petrol",
    power: "518 HP",
    topSpeed: "180 km/h",
    transmission: "ZF-sourced 8-speed Tiptronic",
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/124141/a8-l-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    description: "Built for racetrack precision with road-legal balance and immense aero downforce."
  }, 
  {
    id: 3,
    name: "Ferrari",
    category: "electric",
    price: 29999999,
    fuel: "Electric",
    power: "637 HP",
    topSpeed: "250 km/h",
    transmission: "2-Speed Auto",
    image: "https://www.rushlane.com/wp-content/uploads/2026/05/ferrari-luce-unveiled-exterior-interior-design-10.jpg",
    description: "Electrifying acceleration combined with long-distance luxury Grand Touring."
  },
  {
    id: 4,
    name: "Lamborghini Urus",
    category: "SUV",
    price: 39999999,
    fuel: "Petrol",
    power: "617 HP",
    topSpeed: "305 km/h",
    transmission: "M Steptronic",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRupxemdUWIH6HOXBWgrsv2kDmR1Jaol_axhxtSJzWSaQ&s=10",
    description: "Track performance meets luxury comfort in a high-octane 4-door package."
  } 
];

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    case 'BOOK_DRIVE':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    default:
      return state;
  }
}

export function ShowroomProvider({ children }) {
  const [cars, setCars] = useState(() => {
    try {
      const saved = localStorage.getItem('vamsi_cars_v3');
      return saved ? JSON.parse(saved) : DEFAULT_CARS;
    } catch {
      return DEFAULT_CARS;
    }
  });

  const [state, dispatch] = useReducer(reducer, { favorites: [], bookings: [] });

  useEffect(() => {
    try {
      localStorage.setItem('vamsi_cars_v3', JSON.stringify(cars));
    } catch (e) {
      console.error(e);
    }
  }, [cars]);

  const addCar = (newCar) => {
    setCars(prev => [{ ...newCar, id: Date.now() }, ...prev]);
  };

  const updateCar = (id, updatedCar) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, ...updatedCar } : c));
  };

  const deleteCar = (id) => {
    setCars(prev => prev.filter(c => c.id !== id));
  };

  return (
    <ShowroomContext.Provider value={{ cars, addCar, updateCar, deleteCar, state, dispatch }}>
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  return useContext(ShowroomContext);
}
