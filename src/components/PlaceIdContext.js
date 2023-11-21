//https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-26-integrating-google-maps-search-with-a-react-app-f380d2c6cb83
// PlaceIdContext.js
// See Section 2.2
import {createContext, useState} from 'react';

export const PlaceIdContext = createContext();

export function PlaceIdProvider({...props}) {
  const [placeId, setPlaceId] = useState('');
  const value = [placeId, setPlaceId];
  return <PlaceIdContext.Provider value={value} {...props} />;
}
