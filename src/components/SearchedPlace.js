//https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-26-integrating-google-maps-search-with-a-react-app-f380d2c6cb83

//added
import PushPin from '@mui/icons-material/';

import {useContext, useRef, useState, useEffect} from 'react';

// for using Google Maps's place ID set by another React component in the app (Section 2.2)
import {PlaceIdContext} from './PlaceIdContext'; 

// for managing UI states (Section 4.1)
import {useStateObject} from './useStateObject'; 

// for handling error responses (Section 2.4)
import FocusLock from 'react-focus-lock'; 

export const SearchedPlace = ({mapObject}) => {
  // Manage UI changes (Sections 2.2 and 4.1)
  const [state, setState] = useStateObject({ 
    status: 'closed',
    placeData: null,
  });
  const {status, placeData} = state;

  // Receive Google Maps's place ID from another React component in the app (Section 2.2)
  const [placeId, setPlaceId] = useContext(PlaceIdContext);

  // Prepare for dropping a marker to the searched place location (Section 3.3)
  const marker = useRef();

  // Make an API call after the component gets rendered (Section 2.2)
  useEffect(() => {
    if (!placeId) return; 
    setState({status: 'loading'});

    // Remove the marker from Google Maps for the previously searched place (Section 3.3)
    if (marker.current) { 
      marker.current.setMap(null);
    }          

    // Fetch place detail from Google Maps server (Section 2.1)
    const google = window.google;
    const service = new google.maps.places.PlacesService(mapObject);
    const request = {
      placeId: placeId,
      fields: [
        'formatted_address',
        'geometry',
        'name',
        'url',
        //ADD OTHER INFO TO RETRIEVE HERE
      ],
    };
    service.getDetails(request, handleResponse);
    function handleResponse(place, placesServiceStatus) {
      // Handle successful responses (Section 2.3)
      if (placesServiceStatus === 'OK') {
        const searchedPlace = {
          address: place.formatted_address,
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          name: place.name,
          url: place.url,
          //HANDLE ANY OTHER REQUESTED INFO HERE
        };
        // Customize the place marker with an SVG icon(Section 3.4)
        const searchedPlaceMarker = {
          filePath: '/searched-place-mark.svg',
          height: 37.876, 
          width: 39.644,
        }
        marker.current = new google.maps.Marker({
          icon: {
            //changed from a png to the below with https://developers.google.com/maps/documentation/javascript/examples/marker-modern#maps_marker_modern-javascript
            label: {
                text: "\f10d", // codepoint from https://fonts.google.com/icons
                fontFamily: "Material Icons",
                color: "#ffffff",
                fontSize: "18px",
              },
            anchor: new google.maps.Point(  
              searchedPlaceMarker.width / 2,
              searchedPlaceMarker.height / 2,
            ),            
          },
          // For reopening the place detail popup by cliking the place mark (Section 4.4)
          optimized: false, 
          // Prepare to drop the marker to the searched place location (Section 3.1)
          position: searchedPlace.coordinates,
          title: searchedPlace.name,
        });
        // Allow the user to open the place detail popup by clicking the place mark (Section 4.4)
        marker.current.addListener('click', () => {
          setState({status: 'open'});
        });
        // Drop the marker to the searched place location (Section 3.1)
        marker.current.setMap(mapObject);
        // Snap the map to the area around the searched place (Section 3.2)
        mapObject.panTo(searchedPlace.coordinates);
        // Open the popup window for the detail of the searched place (Section 4.2)
        setState({
          status: 'open',
          placeData: searchedPlace
        });           
      // Handle error responses (Section 2.4)
      } else {
        console.error('Google Maps Place Details API call has failed.');
        setState({status: 'error'});
      }
    }
  }, [mapObject, placeId]);

  // For closing the place detail popup (Section 4.3)
  const closePlaceInfo = () => {
    setState({
      status: 'closed',
    });
  };
  // Close the popup by pressing the outside of it (Section 4.3)
  const dialogDiv = useRef(null); 
  useEffect(() => {
    const listener = event => {
      if (!dialogDiv.current || dialogDiv.current.contains(event.target)) {
        return;
      }
      closePlaceInfo();
    };
    document.addEventListener('pointerdown', listener);
    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [closePlaceInfo, dialogDiv]);
  // Close the popup by pressing the ESC key (Section 4.3)
  useEffect(() => {
    const closeByEsc = event => {
      if (event.key === 'Escape') {
        closePlaceInfo();
      }
    };
    if (status === 'open') {
      document.addEventListener('keydown', closeByEsc);
    } else {
      document.removeEventListener('keydown', closeByEsc);
    }
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [closePlaceInfo, status]);

  // Render no HTML element by default (Section 2.2)
  if (status === 'closed') {
    return null;
  // Render a loading message while making an API request (Section 2.2)
  } else if (status === 'loading') {
    return (
      <div>
        <p aria-live="polite" role="status">Getting more information about this place...</p>
      </div>
    )
  // Handle error responses (Section 2.4)
  } else if (status === 'error') {
    return (
      <FocusLock>
        <div role="alertdialog" aria-describedby="error-message" aria-labelledby="error-title">
          <h2 id="error-title">
            Unable to get place detail
          </h2>
          <p id="error-message">
            Google Maps server is currently down. <a
              href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
              rel="noreferrer"
              target="_blank"
            >
              Please check its status
            </a>, and try again once they fix the problem (usually within a few hours).
          </p>
          <button 
            data-autofocus
            onClick={() => setState('closed')} 
            type="button"
          >
            Got It
          </button>
        </div>
      </FocusLock> 
    )
  // Show the detail of the searched place in a popup window (Section 4.2)
  } else if (status === 'open') {
    return (
      <FocusLock>
        <div 
          aria-label={placeData.name}
          ref={dialogDiv} // For closing the popup by pressing the outside of it (Section 4.3)
          role="dialog" 
        >
          <h2>{placeData.name}</h2>
          <p>{placeData.address}</p>
          <button 
            data-autofocus 
            //commented out the below due to errors
           // onClick={
              /* Click handler to save the searched place 
                 into the user's database in the server 
                 (to be specified in a future post of this blog series) 
              */
           // }
            type="button"
          >
            Save
          </button>
          <a href={placeData.url} rel="noreferrer" target="_blank">More Info</a>
          {/* Close the popup by pressing the close button (Section 4.3) */}
          <button aria-label="Close the place detail" onClick={closePlaceInfo} type="button">
            {/* Insert the SVG code for close button icon */}
          </button>
        </div>
      </FocusLock>
    )
  }
}