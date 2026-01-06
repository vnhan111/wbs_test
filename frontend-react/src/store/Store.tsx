import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice"

const reducer = {
  auth: authReducer,
};

const Store =
  process.env.NODE_ENV === "development"
    ? configureStore({
        reducer: reducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
          }),
      })
    : configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
          }),
      });

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
