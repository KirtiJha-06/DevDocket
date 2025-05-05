
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Toolbar, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Sidebar from './pages/SideBar';
import Dashboard from './pages/Dashboard';
import CodingPracticeTracker from './pages/CodingPracticeTracker';
import MicroJournal from './pages/MicroJournal';
import BugVault from './pages/BugVault';
import TechStackSwitchPlanner from './pages/TechStackSwitchPlanner';
import BreakBuddy from './pages/BreakBuddyTimerPage';

import ThemeContextProvider, { ColorModeContext } from './theme/ThemeContext';

// ThemeToggle component
const ThemeToggle = () => {
  const colorMode = useContext(ColorModeContext);
  const mode = localStorage.getItem('mui-mode') || 'dark';

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{ ml: 'auto' }}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

// AppContent component
function AppContent({ darkMode, toggleDarkMode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 'bold', fontSize: 18 }}>DevDocket</Box>
          <ThemeToggle />
        </Toolbar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coding-practice-tracker" element={<CodingPracticeTracker />} />
          <Route path="/micro-journal" element={<MicroJournal />} />
          <Route path="/bug-vault" element={<BugVault />} />
          <Route path="/break-buddy" element={<BreakBuddy />} />
          <Route path="/tech-stack-switch-planner" element={<TechStackSwitchPlanner />} />
        </Routes>
      </Box>
    </Box>
  );
}

// Main App component
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContextProvider>
      <Router>
        <AppContent darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
