import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
	popup: {
		isPopup  : boolean;
		text     : string;
		isLoading: boolean;
	}
};

const initialState: InitialState = {
  // Your initial state here
	popup: {
		isPopup  : false,
		text     : ``,
		isLoading: false,
	}
};

export const popup = createSlice({
  name: 'popup',
  initialState,
	reducers: {
		changeIsPopup(state, action) {
      state.popup.isPopup = action.payload;
    },
		changeText(state, action) {
      state.popup.text = action.payload;
		},
		changeIsLoading(state, action) {
      state.popup.isLoading = action.payload;
		}
	}
});



export const {changeText, changeIsPopup, changeIsLoading} = popup.actions;
export default popup.reducer;