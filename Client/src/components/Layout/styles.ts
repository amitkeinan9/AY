import { css } from "@emotion/react";

export const layoutContainerStyles = css({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  gap: 0,
  overflowX: 'hidden'
});

export const outletContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  width: "40vw",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
});
