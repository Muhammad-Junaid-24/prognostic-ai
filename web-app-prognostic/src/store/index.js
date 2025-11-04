import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import {
  persistedAuthReducer,
  persistedFormReducer,
  persistedQuizReducer,
} from "./Slices/index";

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    form: persistedFormReducer,
    quiz: persistedQuizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
