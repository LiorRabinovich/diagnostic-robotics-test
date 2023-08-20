import { configureStore } from "@reduxjs/toolkit";
import { drugApiSlice } from "@/store/slices/drugApiSlice";
import globalSlice from '@/store/slices/globalSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    [drugApiSlice.reducerPath]: drugApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(drugApiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
