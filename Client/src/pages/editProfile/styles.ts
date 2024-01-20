import { css } from "@emotion/react";

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
    paddingTop: '1rem'
})

export const fieldStyles = css({
    width: '15rem',
    ".MuiFormLabel-root": {
        textAlign: 'center',
        fontSize: '0.85rem'
    }
})

export const saveButtonStyles = css({
    fontSize: "1rem",
    width: '6rem',
    marginTop: 30,
});