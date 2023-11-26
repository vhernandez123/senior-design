import * as React from "react";
import Map from "../components/Map";
import Navbar from "../components/navbar";
const VetFinder5 =() => {
    return (
        <div>
            <Navbar />
            <br/><br/>
            <h2>Veterinarians Near You</h2>
            <br/><br/>
            <Map></Map>
        </div>
    )
}
export default VetFinder5;