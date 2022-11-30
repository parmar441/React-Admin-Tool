import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
// import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "flex-end",
    padding: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(1),
    },
  },
}));

function AddInviteForm({ handleClose, inviteData }) {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  const mode = inviteData === undefined ? 0 : 1;

  const onSubmit = async (data) => {
    try {
      var isDocExist =
        mode === 0
          ? await docExists("invites", data.subjectId.toLowerCase()).then(
              function (data) {
                return data;
              }
            )
          : false;

      if (!isDocExist) {
        await setDoc(
          doc(db, "invites", data.subjectId.toLowerCase()),
          {
            subjectId: data.subjectId,
            pin: data.pin,
            mode: data.Mode,
          },
          { merge: true }
        );
        handleClose();
      } else {
        setErrorMessage("Participant Id is already taken");
      }
    } catch (error) {
      setErrorMessage("Error in adding data");
    }
  };

  async function docExists(docName, docId) {
    const docRef = doc(db, docName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }

  const handleLocalClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleLocalClose}
      >
        <Alert
          onClose={handleLocalClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid Participant Id / Pin.
        </Alert>
      </Snackbar>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="subjectId"
          control={control}
          defaultValue={mode === 0 ? "" : inviteData.subjectId}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Participant Id"
              variant="filled"
              value={value}
              disabled={mode === 0 ? false : true}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            required: "Participant Id required",
          }}
        />
        <Controller
          name="pin"
          control={control}
          defaultValue={mode === 0 ? "" : inviteData.pin}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Pin"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{
            required: "Pin required",
          }}
        />
        <Controller
          name="Mode"
          control={control}
          defaultValue={
            mode === 0
              ? 0
              : inviteData?.mode === undefined
              ? 0
              : inviteData?.mode
          }
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Mode"
                onChange={onChange}
                //error={!!error}
              >
                <MenuItem value={0}>Event</MenuItem>
                <MenuItem value={1}>Interval</MenuItem>
              </Select>
            </FormControl>
          )}
          rules={{
            required: "Mode required",
          }}
        />
        <div style={{ color: "red" }}>{errorMessage}</div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Ok
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddInviteForm;
