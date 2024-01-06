import { css } from "@emotion/react";
import { purple } from "@mui/material/colors";

export const pageWrapperStyles = css({
  height: "100%",
  width: "30%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const logoStyles = css({
  width: "40%",
  marginBottom: 40,
});

export const loginFormStyles = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "50%",
  width: "100%",
});

export const inputFieldsStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  paddingBottom: 10,
});

export const actionButtonsStyles = css({
  textAlign: "center",
});

export const textButtonStyles = css({
  textDecoration: "underline",
  fontSize: "0.8rem",
  cursor: "pointer",
  color: "gray",
  "&: hover": {
    color: purple[800],
  },
});

export const dividerStyles = css({
  margin: "20px 0",
});

export const googleButtonStyles = css({
  color: "#004C97",
  "&:hover": {
    borderColor: "#004C97",
    borderWidth: "2px",
    backgroundColor: "#004C97",
    color: "white",
  },
});

export const googleLoaderStyles = css({
  color: "#004C97",
  padding: 2,
});
