import { css } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";

export const sidebarContainerStyles = css({
    width: '20vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
});

export const titleStyles = css({
    alignSelf: 'center',
    color: deepPurple[500],
    fontSize: "2rem",
    marginTop: 15,
    marginBottom: 10
});

export const navigationButtonStyles = css({
    height: '8vh',
    width: '10vw',
    fontSize: "1.2rem",
    border: 0,
});

export const buttonsContainerStyles = css({
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
})

export const activeButtonStyles = css({
    height: '8vh',
    width: '14vw',
    fontSize: '1.2rem',
    marginBottom: 10,
});