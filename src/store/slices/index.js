// store/slices/index.js
import { combineReducers } from 'redux';
// import userReducer from './userSlice';
import productReducer from './productSlice';

const rootReducer = combineReducers({
//   user: userReducer,
  products: productReducer,
});

export default rootReducer;
