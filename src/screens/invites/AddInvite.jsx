import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddInviteForm from "./AddInviteForm";

const AddInvite = ({ open, inviteData, handleClose }) => {
  return (
    <Dialog
      container={() => document.getElementById("parentCo")}
      style={{ position: "absolute" }}
      open={open}
    >
      <DialogTitle>
        {inviteData === undefined ? "Add Invite" : "Edit Invite"}
      </DialogTitle>
      <DialogContent>
        <AddInviteForm handleClose={handleClose} inviteData={inviteData} />
      </DialogContent>
    </Dialog>
  );
};

export default AddInvite;
