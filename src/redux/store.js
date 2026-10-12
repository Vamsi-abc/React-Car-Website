import { configureStore, createSlice } from '@reduxjs/toolkit';

// Redux slice for VIP Bookings AND Contact Messages
const bookingSlice = createSlice({
  name: 'testDrives',
  initialState: {
    bookings: [],
    contacts: [] // Stores contact submissions
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push({ ...action.payload, id: Date.now() });
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    addContact: (state, action) => {
      state.contacts.push({ ...action.payload, id: Date.now() });
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    }
  }
});

export const { addBooking, removeBooking, addContact, removeContact } = bookingSlice.actions;

export const store = configureStore({
  reducer: {
    testDrives: bookingSlice.reducer
  }
});