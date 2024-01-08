import { css } from "@emotion/react";
import { deepPurple } from "@mui/material/colors";

export const sidebarContainerStyles = css({
    width: '20vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

export const titleStyles = css({
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: deepPurple[500],
    fontSize: "2rem",
    marginTop: 15,
    marginBottom: 10
});

export const navigationButtonStyles = css({
    display: 'flex',
    height: '7vh',
    alignItems: 'flex-end',
    justifyContent: 'center',
    textDecorationLine: 'none'

});

export const buttonsContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

export const activeButtonStyles = css({
    height: '6vh',
    width: '12vw',
    fontSize: '1.2rem',
    marginBottom: 10,
});