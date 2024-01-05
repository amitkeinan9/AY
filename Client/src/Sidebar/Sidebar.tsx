import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Button, Box, Typography, IconButton } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon } from '@mui/icons-material';

export const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left" >
        <Box style={{width: '20vw', display: 'flex', flexDirection: 'column'}}>
            <Typography style={{fontSize: "2rem"}}>AY</Typography>
            
        <Button startIcon={< HomeIcon style={{fontSize: "2rem"}}/>} style={{textTransform: "none", height: '10vh', fontSize: "1.3rem"}}>Home</Button>
        <Button startIcon={< PersonIcon style={{fontSize: "2rem"}}/>} style={{textTransform: "none", height: '10vh', fontSize: "1.3rem"}}>Profile</Button>
        </Box>
      {/* <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <Button variant="outlined" onClick={() => console.log('Logout')}>
        Logout
      </Button> */}
    </Drawer>
  );
};
