import * as React from "react";
import Map from "../components/Map";
import Navbar from "../components/navbar.js";
const VetFinder5 =() => {
    return (
        <div>
            <Navbar />
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
                <br/><br/>
                { //added
					showMap ? 
					<Map></Map> 
					: <div>
                        <h3>Allow browser location access to see the map</h3>
                        <Button onClick={() => handleOpen()}>Grant Access</Button>
                        </div>}
        </div>
    )
}
export default VetFinder;