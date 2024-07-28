import { combineReducers, configureStore } from '@reduxjs/toolkit';
import popupReducer from '../reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  popupReducer
});

export const setupStore = () => configureStore ({
	reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
