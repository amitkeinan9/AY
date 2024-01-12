import { css } from "@emotion/react";

export const sidebarContainerStyles = css({
  width: "20vw",
  marginLeft: "8vw",
  padding: "30px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
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
