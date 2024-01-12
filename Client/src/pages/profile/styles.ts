import { css } from "@emotion/react";

export const editProfileButtonStyles = css({
    fontSize: '0.8rem',
    height: '1.7rem',
    width: '8rem',
    padding: '0 0.6rem 0 0.6rem',
});

export const profileContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: "40vw",
    borderRight: "1px solid rgba(239,243,244,1.00)",
    borderLeft: "1px solid rgba(239,243,244,1.00)",
});

export const profileDataContainerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem'
});

export const profileDataStyles = css({
    display: 'flex',
    gap: '1rem'
});

export const profilePictureStyles = css({
    width: '5rem',
    height: '5rem'
});

export const fullNameStyles = css({
    fontWeight: 'bold',
    fontSize: '1.2rem'
});

export const userNameStyles = css({
    fontSize: '0.9rem'
});

export const postsTitleStyles = css({
    fontSize: '1.3rem',
    fontWeight: 'bold',
    paddingLeft: 20
});