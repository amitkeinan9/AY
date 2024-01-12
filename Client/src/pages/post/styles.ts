import { css } from "@emotion/react";

export const postContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "40vw",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
});

export const postHeaderStyles = css({
  display: "flex",
  flexDirection: "row",
  fontSize: "1.5rem",
  alignItems: "center",
});

export const backButtonStyles = css({
  margin: 10,
});
