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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UpdateBathroom from "./UpdateBathroom.js";

<Router><Routes>
  <Route path="/UpdateBathroom" element={<UpdateBathroom />} />
</Routes></Router>

const UpdateFood = () => {
  const [foodType, setFoodType] = useState("Food type");
  //const [foodTypeError, setFoodTypeError] = useState(false)
  const [foodAmt, setFoodAmt] = useState("0");
  const [foodUnit, setFoodUnit] = useState("");
  const [drank, setDrank] = useState("0");
  const [ateBad, setAteBad] = useState("");
  const [ateBadDesc, setAteBadDesc] = useState("");

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log(foodType, foodAmt, foodUnit, drank, ateBad, ateBadDesc);

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
    <div className="UpdateFood">
      <form onSubmit={handleSubmit}>
      <Stack spacing={3} direction="column" sx={{ marginBottom: 4, marginLeft:4, marginTop: 4, marginRight: 4}}>
        <h2>Food Habits</h2>
        <FormLabel>What did your pet eat today?</FormLabel>
        <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            onChange={(e) => setFoodType(e.target.value)}
            value={foodType}
          />
          <TextField
            type="number"
            onChange={(e) => setFoodAmt(e.target.value)}
            value={foodAmt}
          />
          <Select
            //id="demo-simple-select"
            value={foodUnit}
            label="unit"
            onChange={(e) => setFoodUnit(e.target.value)}
          >
            <MenuItem value={"oz"}>oz</MenuItem>
            <MenuItem value={"g"}>g</MenuItem>
            <MenuItem value={"cups"}>cups</MenuItem>
            <MenuItem value={"other"}>other</MenuItem>
          </Select>
        </Stack>
        <FormLabel>How many times did your pet drink today?</FormLabel>
        <TextField
          type="number"
          onChange={(e) => setDrank(e.target.value)}
          value={drank}
        />
        <FormLabel>Did your pet eat something it wasn't supposed to?</FormLabel>
        <RadioGroup
          value={ateBad}
          onChange={(e) => setAteBad(e.target.value)}
        >
          <FormControlLabel value="no" control={<Radio />} label="no" />
          <FormControlLabel value="yes" control={<Radio />} label="yes" />
        </RadioGroup>
        <FormLabel>If yes, describe it here:</FormLabel>
        <TextField
          type="text"
          onChange={(e) => setAteBadDesc(e.target.value)}
          value={ateBadDesc}
        />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          className="button"
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="button"
          href="./UpdateBathroom"
        >
          Next
        </Button>
        </Stack>
      </form>
    </div>
  );
};
export default UpdateFood;
