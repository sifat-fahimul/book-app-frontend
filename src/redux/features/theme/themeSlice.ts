import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme ? JSON.parse(storedTheme) : "light";
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(state.mode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
