import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const initalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initalState,
  reducers: {
    setIsOpenToTrue(state) {
      state.isOpen = true;
    },
    setIsOpenToFalse(state) {
      state.isOpen = false;
    },
  },
});

const inputSlice = createSlice({
  name: "input",
  initialState: {
    isValid: false,
    value: "",
    error: null,
    isBlured: false,
    items: [],
  },

  reducers: {
    setIsValidToFalse(state) {
      state.isValid = false;
    },
    setIsValidTotrue(state) {
      state.isValid = true;
    },
    setIsBluredIsTrue(state) {
      state.isBlured = true;
    },
    setIsBluredIsFalse(state) {
      state.isBlured = false;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    id: null,
    date: undefined,
  },
  reducers: {
    logout(state) {
      state.isLogin = false;
      state.id = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("exp");
      localStorage.removeItem("id");
    },
    login(state, action) {
      if (action.payload) state.isLogin = action.payload;
      state.isLogin = true;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});
const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoadingToFalse(state) {
      state.isLoading = false;
    },
    setLoadingToTrue(state) {
      state.isLoading = true;
    },
  },
});
const reducers = combineReducers({
  modal: modalSlice.reducer,
  input: inputSlice.reducer,
  login: loginSlice.reducer,
  loading: loadingSlice.reducer,
});
const store = configureStore({
  reducer: reducers,
});
export const modalActions = modalSlice.actions;
export const inputActions = inputSlice.actions;
export const loginActions = loginSlice.actions;
export const loadingActions = loadingSlice.actions;
export default store;
