import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Form from "./Form";
import MUIForm from "./MUIForm";

export default function New() {
  const [themeIsMUI, setTheme] = useState<boolean>(true);
  return (
    <>
      <h1>
        Add New Posting
        <span>
          <FormControlLabel
            control={<Switch checked={themeIsMUI} />}
            label="Use MUI"
            onChange={() => setTheme(!themeIsMUI)}
          />
        </span>
      </h1>
      {themeIsMUI ? <MUIForm /> : <Form />}
    </>
  );
}
