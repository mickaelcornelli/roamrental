// favoritesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Listing {
  id: number;
  // Autres propriétés de votre objet Listing
}

interface FavoritesState {
  favorites: Listing[]; // Assurez-vous que favorites est un tableau d'objets Listing
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Listing>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
