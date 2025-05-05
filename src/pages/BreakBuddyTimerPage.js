// src/pages/BreakBuddyTimerPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useTheme,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { Settings, PlayArrow, Pause, Replay, FastForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// replace with your own chime file under public/
const CHIME_URL = '/chime.mp3';

// A handful of quick motivational quotes
const QUOTES = [
  "“Rest is productive too.”",
  "“Take a breath, then get back to it!”",
  "“Breaks fuel breakthroughs.”",
  "“You deserve this pause.”",
  "“Recharge your mind.”"
];

export default function BreakBuddyTimerPage() {
  const theme = useTheme();
  const audioRef = useRef(new Audio(CHIME_URL));

  // settings & timer state
  const [inputMin, setInputMin]     = useState(25);
  const [inputSec, setInputSec]     = useState(0);
  const [totalSeconds, setTotal]    = useState(inputMin * 60 + inputSec);
  const [remaining, setRemaining]   = useState(totalSeconds);
  const [isRunning, setIsRunning]   = useState(false);
  const [sessionCount, setSession]  = useState(0);

  // UI state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [quote, setQuote]               = useState("");

  // Handlers
  const start = () => {
    // pick a fresh quote
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setIsRunning(true);
  };
  const stop  = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setRemaining(totalSeconds);
  };
  const skip  = () => setRemaining(0);

  // Countdown effect
  useEffect(() => {
    let timer;
    if (isRunning && remaining > 0) {
      timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    } else if (remaining === 0 && isRunning) {
      // Time’s up
      audioRef.current.play();
      setIsRunning(false);
      setSession((c) => c + 1);
      setSnackbarOpen(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, remaining]);

  // Recalculate when settings change
  useEffect(() => {
    const tot = inputMin * 60 + inputSec;
    setTotal(tot);
    setRemaining(tot);
  }, [inputMin, inputSec]);

  // Format helpers
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');
  const pct  = totalSeconds > 0 ? remaining / totalSeconds : 0;

  return (
    <Box
      component="section"
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Heading with Animated Underline */}
      <Box mb={3} width="100%" textAlign="center">
        <Typography
          variant="h3"
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ fontWeight: 700, color: 'primary.main', display: 'inline-block' }}
        >
          Break Buddy
        </Typography>
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ duration: 0.6 }}
          sx={{
            height: 4,
            bgcolor: 'primary.main',
            mx: 'auto',
            mt: 1,
            borderRadius: 2,
          }}
        />
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          Total breaks taken: <strong>{sessionCount}</strong>
        </Typography>
      </Box>

      {/* Circular Timer */}
      <Box position="relative" display="inline-flex" mb={4}>
        <Box
          component="svg"
          viewBox="0 0 100 100"
          width={220}
          height={220}
        >
          {/* background */}
          <circle cx="50" cy="50" r="45" fill="none"
            stroke={theme.palette.grey[800]} strokeWidth="10" />
          {/* progress */}
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth="10" strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: pct }}
            transition={{ ease: 'linear', duration: 0.3 }}
            style={{ rotate: -90, originX: '50%', originY: '50%' }}
          />
        </Box>
        <Box
          position="absolute" top={0} left={0}
          width="100%" height="100%"
          display="flex" alignItems="center" justifyContent="center"
        >
          <Typography variant="h2" fontFamily="monospace">
            {mins}:{secs}
          </Typography>
        </Box>
      </Box>

      {/* Motivational Quote */}
      <AnimatePresence>
        {isRunning && quote && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            mb={3}
            px={3}
            py={2}
            bgcolor="secondary.dark"
            borderRadius={2}
          >
            <Typography variant="body1" color="secondary.contrastText">
              {quote}
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      {/* Controls */}
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<PlayArrow />}
          variant="contained"
          onClick={start}
          disabled={isRunning || remaining === 0}
        >
          Start
        </Button>
        <Button
          startIcon={<Pause />}
          variant="contained"
          color="secondary"
          onClick={stop}
          disabled={!isRunning}
        >
          Stop
        </Button>
        <Button
          startIcon={<FastForward />}
          variant="outlined"
          onClick={skip}
          disabled={!isRunning}
        >
          Skip
        </Button>
        <Button
          startIcon={<Replay />}
          variant="outlined"
          onClick={reset}
        >
          Reset
        </Button>
        <IconButton onClick={() => setSettingsOpen(true)}>
          <Settings />
        </IconButton>
      </Stack>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle>Timer Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} mt={1}>
            <TextField
              type="number" label="Minutes"
              value={inputMin}
              onChange={(e) => setInputMin(Math.max(0, +e.target.value))}
            />
            <TextField
              type="number" label="Seconds"
              value={inputSec}
              onChange={(e) => {
                const s = Math.min(59, Math.max(0, +e.target.value));
                setInputSec(s);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" variant="filled">
          🎉 Break time is over! Great job.
        </Alert>
      </Snackbar>
    </Box>
  );
}

