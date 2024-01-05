import { Drawer, Button, Box, styled, Typography } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';
import { navigationButtonStyles, titleStyles, activeButtonStyles, sidebarContainerStyles, buttonsContainerStyles } from './styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Title = styled(Typography)(titleStyles);
const NavigationButton = styled(Button)(navigationButtonStyles);
const ButtonsContainer = styled(Box)(buttonsContainerStyles);
const ActiveButton = styled(Button)(activeButtonStyles);
const SidebarContainer = styled(Box)(sidebarContainerStyles)

export const Sidebar = () => {
    const [isHomePage, setIsHomePage] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleChangePage = (route: string, isHomePage: boolean) => {
        setIsHomePage(isHomePage);
        navigate(route);
    }
    return (
        <>
            <Drawer variant="permanent" anchor="left" >
                <SidebarContainer>
                    <ButtonsContainer>
                        <Title>AY</Title>
                        <NavigationButton
                            onClick={() => handleChangePage('/home', true)}
                            startIcon={< HomeIcon style={{ fontSize: "2rem" }} />}
                        >
                            Home
                        </NavigationButton>
                        <NavigationButton
                            onClick={() => handleChangePage('/profile', false)}
                            startIcon={< PersonIcon style={{ fontSize: "2rem" }} />}>
                            Profile
                        </NavigationButton>
                    </ButtonsContainer>
                    <ButtonsContainer>
                        <ActiveButton>New post</ActiveButton>
                        <ActiveButton>Log out</ActiveButton>
                    </ButtonsContainer>
                </SidebarContainer>
            </Drawer>
        </>
    );
};
