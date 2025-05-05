// src/pages/CodingPracticeTrackerPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Chip,
  Snackbar,
  Alert,
  Stack,
  Divider,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add, Edit, Delete, Link as LinkIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'devdocket_coding_problems';
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function CodingPracticeTrackerPage() {
  const [problems, setProblems] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[1]);
  const [link, setLink] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState('All');
  const [snackbar, setSnackbar] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProblems(JSON.parse(saved));
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
  }, [problems]);

  const resetForm = () => {
    setName(''); setTime(''); setDifficulty(DIFFICULTIES[1]); setLink(''); setEditingIndex(null);
  };

  const handleAddOrUpdate = () => {
    if (!name.trim() || !time) {
      setSnackbar({ severity: 'warning', msg: 'Name and time are required.' });
      return;
    }
    const entry = { name, time: Number(time), difficulty, link, date: new Date() };
    setProblems(prev => {
      if (editingIndex != null) {
        const copy = [...prev]; copy[editingIndex] = entry; return copy;
      }
      return [entry, ...prev];
    });
    setSnackbar({ severity: 'success', msg: editingIndex != null ? 'Updated entry' : 'Added problem' });
    resetForm();
  };

  const handleEdit = idx => {
    const p = problems[idx];
    setName(p.name); setTime(p.time.toString()); setDifficulty(p.difficulty); setLink(p.link); setEditingIndex(idx);
  };

  const handleDelete = idx => {
    setProblems(prev => prev.filter((_, i) => i !== idx));
    setSnackbar({ severity: 'info', msg: 'Deleted entry' });
    if (editingIndex === idx) resetForm();
  };

  const filtered = filter === 'All' ? problems : problems.filter(p => p.difficulty === filter);

  // Stats
  const total = problems.length;
  const totalTime = problems.reduce((sum, p) => sum + p.time, 0);
  const avgTime = total ? Math.round(totalTime / total) : 0;

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" color="primary" gutterBottom>
          {'</>'} Coding Practice Tracker
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Chip label={`Total: ${total}`} />
          <Chip label={`Time: ${totalTime}m`} color="info" />
          <Chip label={`Avg: ${avgTime}m`} color="secondary" />
        </Stack>
      </Box>

      {/* Form */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField label="Problem Name" fullWidth value={name} onChange={e => setName(e.target.value)} />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              label="Time (min)"
              type="number"
              fullWidth
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              select
              label="Difficulty"
              fullWidth
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Problem Link"
              fullWidth
              value={link}
              onChange={e => setLink(e.target.value)}
              InputProps={{ endAdornment: link && <IconButton href={link} target="_blank"><LinkIcon /></IconButton> }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Filter by Difficulty"
              fullWidth
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              {DIFFICULTIES.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Button startIcon={editingIndex != null ? <Edit /> : <Add />} variant="contained" fullWidth sx={{ height: '100%' }} onClick={handleAddOrUpdate}>
              {editingIndex != null ? 'Update Problem' : 'Add Problem'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* List */}
      <AnimatePresence>
        {filtered.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}>
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ textDecoration: p.completed ? 'line-through' : 'none' }}>
                    {p.name}
                  </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography>{p.time}m</Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Chip label={p.difficulty} color={ p.difficulty==='Easy'? 'success': p.difficulty==='Medium'? 'warning':'error'} />
                </Grid>
                <Grid item xs={4} md={1}>
                  {p.link && <IconButton href={p.link} target="_blank"><LinkIcon /></IconButton>}
                </Grid>
                <Grid item xs={12} md={1}>
                  <IconButton onClick={() => handleEdit(i)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(i)}><Delete /></IconButton>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Snackbar */}
      <Snackbar open={!!snackbar} autoHideDuration={3000} onClose={() => setSnackbar(null)}>
        {snackbar && <Alert severity={snackbar.severity}>{snackbar.msg}</Alert>}
      </Snackbar>
    </Box>
  );
}
