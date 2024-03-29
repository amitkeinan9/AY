import { css } from "@emotion/react";

export const layoutContainerStyles = css({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
  gap: 0,
  overflowX: "hidden",
});

export const outletContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
  flex: 1,
  overflowY: 'auto',
  "&::-webkit-scrollbar": {
    width: 0 /* Width of the invisible scrollbar */
  }
});
