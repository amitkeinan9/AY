import { Drawer, Button, Box, Typography, Alert, AlertTitle } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import { navigationButtonStyles, titleStyles, activeButtonStyles, sidebarContainerStyles, buttonsContainerStyles } from './styles';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useLogout } from './useLogout';
import { NavLink } from "react-router-dom";

const Title = styled(Typography)(titleStyles);
const NavigationLink = styled(NavLink)(navigationButtonStyles);
const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles)

export const Sidebar = () => {
    const [error, setError] = useState<string>("");
    const { handleLogout } = useLogout(setError);

    return (
        <Drawer variant="permanent" anchor="left" >
            <SidebarContainer>
                <ButtonsContainer>
                    <Title>AY</Title>
                    <NavigationLink
                        to='/home'
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#673ab7' : '#D9D9D9'
                            };
                        }}
                    >
                        < HomeIcon sx={{ fontSize: "2rem", marginRight: 1 }} />
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }}>Home</Typography>
                    </NavigationLink>
                    <NavigationLink
                        to='/profile'
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#673ab7' : '#D9D9D9'
                            };
                        }}
                    >
                        <PersonIcon sx={{ fontSize: "2rem", marginRight: 1 }} />
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 'bold' }}>Profile</Typography>
                    </NavigationLink>
                </ButtonsContainer>
                <ButtonsContainer>
                    <ActiveButton>New post</ActiveButton>
                    <ActiveButton onClick={handleLogout}>Log out</ActiveButton>
                    {error && (
                        <Alert severity="error" sx={{ mb: 1, width: '60%' }}>
                            <AlertTitle>Oof</AlertTitle>
                            {error}
                        </Alert>
                    )}
                </ButtonsContainer>
            </SidebarContainer>
        </Drawer>
    );
};
