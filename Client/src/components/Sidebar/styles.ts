import { css } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";

export const sidebarContainerStyles = css({
  width: "15vw",
  marginLeft: "8vw",
  padding: "30px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const titleStyles = css({
  fontWeight: "bold",
  color: deepPurple[500],
  fontSize: "2rem",
  marginTop: 15,
  marginBottom: 10,
});

export const navigationLinkStyles = css({
  display: "flex",
  height: "7vh",
  alignItems: "flex-end",
  justifyContent: "start",
  textDecorationLine: "none",
});

export const navigationLinkTextStyles = css({
  fontSize: "1.2rem",
  fontWeight: "bold",
});

export const buttonsContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

export const activeButtonStyles = css({
  fontSize: "1rem",
  marginBottom: 10,
});
