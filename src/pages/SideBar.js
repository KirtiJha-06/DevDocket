import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';

import {
  Dashboard as DashboardIcon,
  Code as CodeIcon,
  Note as NoteIcon,
  BugReport as BugReportIcon,
  Timer as TimerIcon,
  SwapHoriz as SwapHorizIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = () => setOpen(!open);
  const handleProfileMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const drawerWidth = open ? 220 : 72;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Coding Tracker', icon: <CodeIcon />, path: '/coding-practice-tracker' },
    { text: 'Micro-Journal', icon: <NoteIcon />, path: '/micro-journal' },
    { text: 'Bug Vault', icon: <BugReportIcon />, path: '/bug-vault' },
    { text: 'Break Timer', icon: <TimerIcon />, path: '/break-buddy' },
    { text: 'Tech Stack Planner', icon: <SwapHorizIcon />, path: '/tech-stack-switch-planner' },
  ];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' ? '#0d1117' : '#f4f4f4',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          transition: '0.3s',
        },
      }}
    >
      {/* Header */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00dfd8, #007cf0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            DevDocket
          </Typography>
        )}
        <IconButton onClick={toggleDrawer} size="small">
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Divider />

      {/* Menu */}
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip key={item.text} title={!open ? item.text : ''} placement="right">
              <ListItem
                component={Link}
                to={item.path}
                sx={{
                  color: isActive ? '#00dfd8' : 'inherit',
                  backgroundColor: isActive ? 'rgba(0,223,216,0.1)' : 'transparent',
                  borderLeft: isActive ? '4px solid #00dfd8' : '4px solid transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
                  pl: open ? 3 : 2,
                  py: 1.5,
                  transition: '0.2s ease',
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#00dfd8' : '#94a3b8', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: isActive ? 'bold' : 'medium', fontSize: '0.95rem' }}
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Footer/Profile */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Box
          onClick={handleProfileMenu}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', justifyContent: open ? 'flex-start' : 'center' }}
        >
          <Avatar
            src="https://api.dicebear.com/7.x/notionists/svg?seed=devuser"
            sx={{ width: 36, height: 36 }}
          />
          {open && (
            <Box>
              <Typography fontWeight="bold" fontSize="0.9rem">
                Kirti Jha
              </Typography>
              <Typography fontSize="0.75rem" color="gray">
                Developer
              </Typography>
            </Box>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
