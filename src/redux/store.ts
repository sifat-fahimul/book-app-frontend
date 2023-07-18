import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import userSlice from "./features/user/userSlice";
import themeSlice from "./features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
