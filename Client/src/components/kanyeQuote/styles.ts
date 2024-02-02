import { css } from "@emotion/react";
import tooltipClasses from "@mui/material/Tooltip/tooltipClasses";

export const containerStyles = css({
  marginRight: "8vw",
  "@media (max-width: 700px)": {
    marginRight: "1vw",
  },
});

export const tooltipStyles = css({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1rem",
    maxWidth: 220,
  },
});

export const cardStyles = css({
  backgroundColor: "#F6F9F9",
  height: "fit-content",
  padding: 15,
  margin: 15,
  borderRadius: 10,
  width: "20vw",
});

export const iconStyles = css({
  margin: "3vw",
  fontSize: "2em",
  marginTop: "2vh",
  color: "#6e6767",
});

export const titleStyles = css({
  fontWeight: "bold",
  color: "#0F141A",
  fontSize: "20px",
});

export const quoteStyles = css({
  margin: 10,
  color: "#536371",
});
