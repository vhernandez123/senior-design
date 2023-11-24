/*global google*/
//100 Days in Kyoto to Create a Web App with Google Maps API

//my imports:
import * as React from "react";
import {Component} from "react";
import { useState, useRef, useEffect} from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Popover,
    Input,
    FormLabel,
    Stack,
    Container,
    TextField
  } from "@mui/material";
//end my imports

//added SearchBox, SearchedPlace import
import SearchBox from '../components/SearchBox';
import { SearchedPlace } from "../components/SearchedPlace";

//https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-25-adding-google-maps-autocomplete-search-to-a-react-app-8d238aa07288
//import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
export default function VetFinder3() {
    const google = window.google; //added to make tutorial work
  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, //changed to reference my environment variable
      version: 'weekly',
      libraries: ['places'],
    });
    let map;
    loader.load().then(() => {
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 42.687532, lng: -83.234103}, //updated to default to OU
        zoom: 8, // or any other zoom level
      });
      SearchedPlace(map);
    });
  });
  return (
    <div>
    <SearchBox></SearchBox>
    <div id="map" ref={googlemap} />
    </div>
  );
}