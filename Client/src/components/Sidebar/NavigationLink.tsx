import { Typography } from '@mui/material';
import { navigationLinkStyles, navigationLinkTextStyles } from './styles';
import styled from '@emotion/styled';
import { NavLink } from "react-router-dom";

const NavigationLinkButton = styled(NavLink)(navigationLinkStyles);
const NavigationLinkText = styled(Typography)(navigationLinkTextStyles);

interface Props {
    text: string;
    path: string;
    Icon: JSX.ElementType;
}

export const NavigationLink = ({ text, path, Icon }: Props) => {
    return (
        <NavigationLinkButton
            to={path}
            style={({ isActive }) => {
                return {
                    color: isActive ? '#673ab7' : '#D9D9D9'
                };
            }}
        >
            <Icon sx={{ fontSize: "2rem", marginRight: 1 }} />
            <NavigationLinkText>{text}</NavigationLinkText>
        </NavigationLinkButton>
    );
};
