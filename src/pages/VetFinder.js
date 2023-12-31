import * as React from "react";
import Map from "../components/Map";
import { useState} from "react";
import Navbar from "../components/navbar";
import "../css/VetFinder.css"; //import css file

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	RadioGroup,
    Radio,
    FormControlLabel
  } from "@mui/material";


const VetFinder =() => {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const [showMap, setShowMap] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleClose = () => {
        setOpen(false);
    
        if (agree){
            setShowMap(true);
            } else {
                setShowMap(false);
            }
    }
    return (
        <div>
            <Navbar />
            <div className="content-container">
            <br/><br/>
            <h2>Veterinarians Near You</h2>
            <br/><br/>
            <Dialog open={open} onClose={handleClose}>
					<DialogTitle>Find Vets Near You</DialogTitle>
					<DialogContent>
					<DialogContentText>
						To discover veterenarians in your area, please agree to let access your browser location. 
					</DialogContentText>
					<br/>
                    <RadioGroup
                        aria-labelledby="location-consent"
                        value={agree}
                        name="location-consent"
                        onChange={(e) => setAgree(e.target.value)}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Agree" />
                        <FormControlLabel value={false} control={<Radio />} label="Do not use my browser location" />
                    </RadioGroup>
					</DialogContent>
					<DialogActions>
					<Button onClick={() => handleClose()}>Submit</Button>
					</DialogActions>
				</Dialog>	

                { //added
					showMap ? 
					<Map></Map> 
					: <div>
                        <h4>Allow browser location access to see the map</h4>
                        <Button onClick={() => handleOpen()}>Grant Access</Button>
                        </div>}
            </div>
        </div>
    )
}
export default VetFinder;