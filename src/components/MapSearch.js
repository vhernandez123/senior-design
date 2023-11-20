//const { Component } = require('react')
//const { GoogleMap, LoadScript } = require("../../");
//const ScriptLoaded = require("../../docs/ScriptLoaded").default;


import * as React from "react";
import {Component} from "react";
import { useState, useRef, useEffect} from "react";
//import {Loader} from '@googlemaps/js-api-loader';
import { GoogleMap, useJsApiLoader, useGoogleMap, LoadScript, useLoadScript, Autocomplete, InfoBox, MarkerClusterer, GoogleMarkerClusterer } from '@react-google-maps/api';


const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 38.685,
  lng: -115.234
}

 class MapSearch extends Component {
  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  render () {
    return (
      //<ScriptLoaded>
        <GoogleMap
          id="searchbox-example"
          mapContainerStyle={mapContainerStyle}
          zoom={2.5}
          center={center}
        >
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete>
        </GoogleMap>
      //</ScriptLoaded>
    )
  }
}

export default <MapSearch />