import { css } from "@emotion/react";

export const postContainerStyles = css({
  display: "flex",
  flexDirection: "row",
  gap: 10,
  border: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "0px",
  borderTop: 0,
  padding: 15,
});

export const postContainerHoverStyles = css({
  backgroundColor: "rgba(0, 0, 0, 0.03)",
  cursor: "pointer",
});

export const usernameStyles = css({
  color: "GrayText",
});

export const postHeaderStyles = css({
  marginBottom: 1,
});

export const postFooterStyles = css({
  marginTop: 15,
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  color: "GrayText",
});

export const imageStyles = css({
  marginTop: 10,
  width: "100%",
  borderRadius: 10,
});

export const commentIconStyles = css({
  height: "1.2rem",
  marginRight: 3,
});
