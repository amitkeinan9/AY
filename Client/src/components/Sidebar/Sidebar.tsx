import { Drawer, Button, Box, Typography, Alert, AlertTitle } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import { navigationButtonStyles, titleStyles, activeButtonStyles, sidebarContainerStyles, buttonsContainerStyles } from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLogout } from './useLogout';
import { NavLink } from "react-router-dom";

const Title = styled(Typography)(titleStyles);
const NavigationButton = styled(NavLink)<{ isClicked: boolean }>((props) => navigationButtonStyles(props.isClicked));
const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles)

export const Sidebar = () => {
    const [isHomePage, setIsHomePage] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { handleLogout } = useLogout(setError);
    const navigate = useNavigate();

    const handleChangePage = (route: string, isHomePage: boolean) => {
        setIsHomePage(isHomePage);
        navigate(route);
    }
    return (
        <Drawer variant="permanent" anchor="left" >
            <SidebarContainer>
                <ButtonsContainer>
                    <Title>AY</Title>
                    <NavLink
                        // isClicked={isHomePage}
                        to='/home'
                        style={( {isActive }) => {                            
                            return {
                                color: isActive ? '#D9D9D9': '#D9D9D9'
                            };
                        }}
                    >
                        < HomeIcon style={{ fontSize: "2rem" }} />
                        Home
                    </NavLink>
                    <NavigationButton
                        isClicked={!isHomePage}
                        to='/profile'
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#D9D9D9': 'none'
                            };
                        }}
                    // onClick={() => handleChangePage('/profile', false)}
                    // startIcon={< PersonIcon style={{ fontSize: "2rem" }} />}>
                    >
                        < PersonIcon style={{ fontSize: "2rem" }} />
                        Profile
                    </NavigationButton>
                </ButtonsContainer>
                <ButtonsContainer>
                    <ActiveButton>New post</ActiveButton>
                    <ActiveButton onClick={handleLogout}>Log out</ActiveButton>
                    {error && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            <AlertTitle>Oof</AlertTitle>
                            {error}
                        </Alert>
                    )}
                </ButtonsContainer>
            </SidebarContainer>
        </Drawer>
    );
};
