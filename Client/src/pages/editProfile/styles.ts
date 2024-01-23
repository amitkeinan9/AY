import { css } from "@emotion/react";
import { purple } from "@mui/material/colors";

export const editProfileContainerStyles = css({
    display: "flex",
    flexDirection: "column",
    gap: 0,
    width: "40vw",
    borderRight: "1px solid rgba(239,243,244,1.00)",
    borderLeft: "1px solid rgba(239,243,244,1.00)",
});

export const editProfileHeaderStyles = css({
    display: "flex",
    flexDirection: "row",
    fontSize: "1.5rem",
    alignItems: "center",
});

export const backButtonStyles = css({
    margin: 10,
});

export const formContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    paddingLeft: '2rem',
    paddingTop: '0.3rem'
})

export const fieldStyles = css({
    width: '15rem',
    ".MuiFormLabel-root": {
        textAlign: 'center',
        fontSize: '0.85rem'
    }
})

export const editImageContainer = css ({ 
    position: 'absolute', 
    top: '3.8rem', 
    left: '3.8rem' 
});

export const saveButtonStyles = css({
    fontSize: "1rem",
    width: '6rem',
    height: '2.5rem'
});