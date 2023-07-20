import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { IFormValues } from "./interfaces";
import { TYPE_OPTIONS, LEVEL_OPTIONS } from "./formSelectOptions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

export default function MUIForm() {
  const { control, handleSubmit, getValues, setValue } = useForm<IFormValues>({
    defaultValues: {
      url: "",
      position: "",
      company: "",
      location: "",
      type: ["Full-time"],
      level: "Junior",
      due_date: new Date().toISOString().split("T")[0],
      responsibilities: "",
      qualifications: "",
      skills: "",
      posting_password: "",
      other: "",
    },
  });
  const [dataJSON, setDataJSON] = useState<string>("");
  const [urlErrorStatus, setUrlErrorStatus] = useState<boolean>(false);
  const [urlCheckResult, setUrlCheckResult] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    setDataJSON(JSON.stringify(data));
    fetch("http://alexhyang.herokuapp.com/jobhunter-app/api/add-posting", {
      // fetch("http://localhost:8000/jobhunter-app/api/add-posting", {
      method: "POST",
      body: dataJSON,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((response) => {
        console.log(response);
        setResponseMessage(response.message);
        setAlertType("success");
      })
      .catch((error) => {
        console.log("Error: ", error);
        setAlertType("error");
        setResponseMessage("No Permission!");
      });
  };

  const checkUrl = () => {
    const urlStr = getValues("url");
    if (urlStr === "" || urlStr == undefined) {
      setUrlErrorStatus(false);
      setUrlCheckResult("");
    } else {
      try {
        const url = new URL(urlStr);
        const jobKey = url.searchParams.get("jk");
        if (jobKey !== null) {
          fetch(
            `http://alexhyang.herokuapp.com/jobhunter-app/add/check?jk=${jobKey}`
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.posting_is_new) {
                setUrlErrorStatus(false);
                setUrlCheckResult("Posting is new");
              } else {
                setUrlErrorStatus(true);
                setUrlCheckResult("Posting already exists");
              }
            })
            .catch((error) => console.log("Error: ", error));
        } else {
          setUrlErrorStatus(true);
          setUrlCheckResult(
            "Couldn't find job key in query parameters (jk=...)"
          );
        }
      } catch (error) {
        console.log("Error: ", error);
        setUrlErrorStatus(true);
        setUrlCheckResult("Invalid URL");
      }
    }
  };

  const convertToHTML = (text: string): string => {
    return (
      "- " +
      text
        .replaceAll(/[-·][\s]+/g, "")
        .replaceAll(/(\s*<br>)*[\n]+/g, " <br>\n- ")
    );
  };

  const formatTextArea = () => {
    setValue("responsibilities", convertToHTML(getValues("responsibilities")));
    setValue("qualifications", convertToHTML(getValues("qualifications")));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {responseMessage ? (
          <Grid item xs={12}>
            <Alert severity={alertType}>{responseMessage}</Alert>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <TextField
                error={urlErrorStatus}
                required
                fullWidth
                label="Url"
                type="url"
                variant="filled"
                helperText={urlCheckResult}
                autoFocus
                {...field}
                onBlur={() => {
                  field.onBlur();
                  checkUrl();
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Position"
                variant="filled"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Company"
                variant="filled"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                label="Location"
                variant="filled"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  multiple={true}
                  labelId="type-select-label"
                  label="TypeAAA"
                  {...field}
                >
                  {TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="level-select-label"
                  label="LevelAAA"
                  {...field}
                >
                  {LEVEL_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                label="Due Date"
                variant="filled"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="responsibilities"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                multiline
                rows={15}
                label="Responsibilities"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="qualifications"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                multiline
                rows={15}
                label="Qualifications"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                label="Skills"
                variant="filled"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="other"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="Other" variant="filled" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="posting_password"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                variant="filled"
                {...field}
              />
            )}
          />
        </Grid>
        {dataJSON ? <Grid item>{dataJSON}</Grid> : null}
        <Grid item>
          <Button type="button" variant="outlined" onClick={formatTextArea}>
            Format Textareas
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" variant="outlined" disabled={urlErrorStatus}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
