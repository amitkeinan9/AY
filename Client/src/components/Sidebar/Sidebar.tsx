import { Drawer, Button, Box, Typography, Alert, AlertTitle } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import { navigationButtonStyles, titleStyles, activeButtonStyles, sidebarContainerStyles, buttonsContainerStyles } from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLogout } from './useLogout';

const Title = styled(Typography)(titleStyles);
const NavigationButton = styled(Button)<{ isClicked: boolean }>((props) => navigationButtonStyles(props.isClicked));
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
                    <NavigationButton
                        isClicked={isHomePage}
                        onClick={() => handleChangePage('/home', true)}
                        startIcon={< HomeIcon style={{ fontSize: "2rem" }} />}
                    >
                        Home
                    </NavigationButton>
                    <NavigationButton
                        isClicked={!isHomePage}
                        onClick={() => handleChangePage('/profile', false)}
                        startIcon={< PersonIcon style={{ fontSize: "2rem" }} />}>
                        Profile
                    </NavigationButton>
                </ButtonsContainer>
                <ButtonsContainer>
                    <ActiveButton>New post</ActiveButton>
                    <ActiveButton onClick={handleLogout}>Log out</ActiveButton>
                    {error && (
                        <Alert severity="error" sx={{mb:1}}>
                            <AlertTitle>Oof</AlertTitle>
                            {error}
                        </Alert>
                    )}
                </ButtonsContainer>
            </SidebarContainer>
        </Drawer>
    );
};
