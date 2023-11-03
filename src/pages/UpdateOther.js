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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const UpdateOther = () => {
  const [otherText, setOtherText] = useState("");
  const [files, setFiles] = useState("");

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log(otherText, files);

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
    <div className="Other">
      <h2>Other</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction="column" sx={{ marginBottom: 4 }}>
          <FormLabel>
            If you want to include anything else, make note of it here
          </FormLabel>
          <TextField
            type="text"
            onChange={(e) => setOtherText(e.target.value)}
            value={otherText}
            multiline
            maxRows={4}
          />
          <FormLabel>Optional: Upload an image</FormLabel>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onChange={(e) => setFiles(e.target.value)}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            className="button"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};
export default UpdateOther;
