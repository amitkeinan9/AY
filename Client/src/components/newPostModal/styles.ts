import { css } from "@emotion/react";

export const modalStyles = css({
  margin: "40px auto",
  backgroundColor: "white",
  width: "560px",
  padding: "10px",
  borderRadius: "15px",
  "@media (max-width: 700px)": {
    width: "100%",
    height: "100%",
    borderRadius: "0",
    margin: "0",
    boxSizing: "border-box",
  },
});

export const avatarStyles = css({
  width: 48,
  height: 48,
});

export const modalContentStyles = css({
  display: "flex",
  flexDirection: "row",
  gap: 15,
  padding: "10px",
  maxHeight: "60vh",
  "@media (max-width: 700px)": {
    maxHeight: "calc(100vh - 130px)",
  },
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "2rem"
  },
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
