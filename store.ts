import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slice/favoritesSlice'; // Importez votre slice de favoris et d'autres slices si nécessaire

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    // Ajoutez d'autres reducers/slices ici si nécessaire
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
