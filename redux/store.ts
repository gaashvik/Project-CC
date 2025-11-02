import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dateReducer from "./calender/dateSlice";
import viewReducer from "./calender/viewSlice";
import sidebarReducer from "./calender/sidebarSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
  version: 1,
};

const rootReducer = combineReducers({
  auth: authReducer,
  view:viewReducer,
  date:dateReducer,
  sidebar:sidebarReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;