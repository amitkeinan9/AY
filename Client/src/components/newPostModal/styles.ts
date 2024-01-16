import { css } from "@emotion/react";

export const modalStyles = css({
  margin: "40px auto",
  backgroundColor: "white",
  width: "560px",
  padding: "10px",
  borderRadius: "15px",
});

export const modalHeaderStyles = css();

export const avatarStyles = css({
  width: 48,
  height: 48,
});

export const modalContentStyles = css({
  display: "flex",
  flexDirection: "row",
  gap: 15,
  padding: "10px",
});

export const modalFooterlStyles = css({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 10,
});

export const imageStyles = css({
  width: "100%",
  borderRadius: 10,
});

export const removeImageButtonStyles = css({
  backgroundColor: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.66)",
  },
  position: "absolute",
  top: 15,
  right: 15,
});

export const postContainerStyles = css({
  width: "100%",
});

export const previewContainerStyles = css({
  position: "relative",
});
