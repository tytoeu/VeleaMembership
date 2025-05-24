import { configureStore } from '@reduxjs/toolkit'
import storage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import createCacheSlice from '../redux/cache'
import createMenuSlice from '../redux/menu'
import createTempSlice from '../redux/temp'

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const cachePersistReducers = persistReducer(persistConfig, createCacheSlice)

export const store = configureStore({
    reducer: {
        cache: cachePersistReducers,
        menu: createMenuSlice,
        temp: createTempSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)