import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box } from '@mui/material';

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Box sx={{ marginLeft: '20vw' }}>
        <Outlet />
      </Box>
    </>
  );
};
