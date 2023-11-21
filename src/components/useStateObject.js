//https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-26-integrating-google-maps-search-with-a-react-app-f380d2c6cb83
// ./useStateObject.js
// See Section 4.1
import {useReducer} from 'react';
const reducer = (state, action) => ({...state, ...action});
export const useStateObject = initialState => {
  const [state, setState] = useReducer(reducer, initialState);
  return [state, setState];
};