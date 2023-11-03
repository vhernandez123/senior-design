import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormLabel,
  FormControlLabel,
  Link,
  Stack,
  Select,
  RadioGroup,
  Radio
} from "@mui/material";

const UpdateBathroom = () => {
  const [bathroomTimes, setBathroomTimes] = useState("0");
  const [poopState, setPoopState] = useState("");
  const [urineState, setUrineState] = useState("");
  const [vomitAmt, setVomitAmt] = useState("0");

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log(bathroomTimes, poopState, urineState, vomitAmt);

    // Read the form data
    //const form = e.target;
    //const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    //fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);
  }

  return (
    <div className="Update Bathroom">
    <form onSubmit={handleSubmit}>
    <Stack spacing={3} direction="column" sx={{ marginBottom: 4, marginLeft:4, marginTop: 4, marginRight: 4}}>
      <h2>Bathroom Habits</h2>
      <FormLabel>How many times did your pet use the bathroom today?</FormLabel>
        <TextField
          type="number"
          onChange={(e) => setBathroomTimes(e.target.value)}
          value={bathroomTimes}
        />
      <FormLabel>Select the attributes that best describe your pet's bathroom production today</FormLabel>
      <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
      <RadioGroup
        value={poopState}
        onChange={(e) => setPoopState(e.target.value)}
      >
        <FormControlLabel value="runny" control={<Radio />} label="runny" />
        <FormControlLabel value="chunky" control={<Radio />} label="chunky" />
        <FormControlLabel value="no poop" control={<Radio />} label="no poop" />
        <FormControlLabel value="none" control={<Radio />} label="n/a" />
      </RadioGroup>
      </Stack>
      <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
      <RadioGroup
        value={urineState}
        onChange={(e) => setUrineState(e.target.value)}
      >
        <FormControlLabel value="off-color" control={<Radio />} label="off-color" />
        <FormControlLabel value="no urine" control={<Radio />} label="no urine" />
        <FormControlLabel value="none" control={<Radio />} label="n/a" />
      </RadioGroup>
      </Stack>
      <FormLabel>How many times did your pet vomit today?</FormLabel>
        <TextField
          type="number"
          onChange={(e) => setVomitAmt(e.target.value)}
          value={vomitAmt}
        />

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        className="button"
      >
        Next
      </Button>
      </Stack>
    </form>
  </div>
  );
};
export default UpdateBathroom;
