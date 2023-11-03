import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Link,
  Stack,
  Select,
  RadioGroup,
  Radio
} from "@mui/material";

const UpdateBehavior = () => {
  const [activity, setActivity] = useState("");
  const [aggression, setAggression] = useState("");
  const [behaviorChanges, setBehaviorChanges] = useState("");
  const [symptoms, setSymptoms] = useState({
    cut: false,
    bruise: false,
    bump: false,
    sore: false,
    bite: false,
    missingFur: false,
    difficultyBreathing: false,
    bugTick: false,
    other: false
  });

  const { cut, bruise, bump, sore, bite, missingFur, difficultyBreathing, bugTick, other } = symptoms;

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log(activity, aggression, behaviorChanges, symptoms);

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
    <div className="Update Behavior">
    <h2>Behaviors</h2>
    <form onSubmit={handleSubmit}>
    <Stack spacing={3} direction="column" sx={{ marginBottom: 4 }}>
      <FormLabel>Select any behaviors your pet exhibited today</FormLabel>
      <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
      <RadioGroup
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      >
        <FormControlLabel value="active" control={<Radio />} label="active" />
        <FormControlLabel value="lazy" control={<Radio />} label="lazy" />
        <FormControlLabel value="both" control={<Radio />} label="both" />
      </RadioGroup>
      </Stack>
      <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
      <RadioGroup
        value={aggression}
        onChange={(e) => setAggression(e.target.value)}
      >
        <FormControlLabel value="increased aggression" control={<Radio />} label="increased aggression" />
        <FormControlLabel value="decreased aggression" control={<Radio />} label="decreased aggression" />
        <FormControlLabel value="neither" control={<Radio />} label="neither" />
      </RadioGroup>
      </Stack>
      <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
      <RadioGroup
        value={behaviorChanges}
        onChange={(e) => setBehaviorChanges(e.target.value)}
      >
        <FormControlLabel value="routine change" control={<Radio />} label="routine change" />
        <FormControlLabel value="other behavioral change" control={<Radio />} label="other behavioral change" />
        <FormControlLabel value="no behavioral change" control={<Radio />} label="no behavioral change" />
      </RadioGroup>
      </Stack>
      <h2>Symptoms</h2>
      <FormLabel>Select any symptoms your pet exhibited today</FormLabel>
      <FormGroup
      value={symptoms}
      onChange={(e) => setSymptoms({...symptoms,
        [e.target.name]: e.target.checked,})}
      >
      <FormControlLabel name="cut" checked={cut} control={<Checkbox />} label="cut" />
      <FormControlLabel name="bruise" checked={bruise} control={<Checkbox />} label="bruise" />
      <FormControlLabel name="bump" checked={bump} control={<Checkbox />} label="bump" />
      <FormControlLabel name="sore" checked={sore} control={<Checkbox />} label="sore" />
      <FormControlLabel name="bite" checked={bite} control={<Checkbox />} label="bite" />
      <FormControlLabel name="missingFur" checked={missingFur} control={<Checkbox />} label="missing fur" />
      <FormControlLabel name="difficultyBreathing" checked={difficultyBreathing} control={<Checkbox />} label="difficulty breathing" />
      <FormControlLabel name="bugTick" checked={bugTick} control={<Checkbox />} label="bug/tick" />
      <FormControlLabel name="other" checked={other} control={<Checkbox />} label="other" />
    </FormGroup>

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
export default UpdateBehavior;
