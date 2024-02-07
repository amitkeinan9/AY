import { css } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";

export const profilePicContainerStyles = css({
  position: "relative",
});

export const editProfileContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "40vw",
});

export const editProfileHeaderStyles = css({
  display: "flex",
  flexDirection: "row",
  fontSize: "1.5rem",
  alignItems: "center",
});

export const backButtonStyles = css({
  margin: 10,
});

export const formContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  paddingLeft: "2rem",
  paddingTop: "0.3rem",
});

export const fieldStyles = css({
  width: "15rem",
  ".MuiFormLabel-root": {
    textAlign: "center",
    fontSize: "0.85rem",
  },
});

export const profilePicStyles = css({
  width: "5.5rem",
  height: "5.5rem",
});

export const editProfilePicIconButtonStyles = css({
  width: "1.7rem",
  height: "1.7rem",
  borderRadius: "50%",
  backgroundColor: deepPurple[600],
  "&:hover": {
    backgroundColor: deepPurple[500],
  },
});

export const editProfilePicIconStyles = css({
  color: "white",
  fontSize: "1rem",
});
export const editImageContainer = css({
  position: "absolute",
  top: "3.8rem",
  left: "3.8rem",
});

export const saveButtonStyles = css({
  fontSize: "1rem",
  width: "6rem",
  height: "2.5rem",
});
