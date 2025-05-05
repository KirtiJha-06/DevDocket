// src/pages/TechStackSwitchPlannerPage.jsx
// src/pages/TechStackSwitchPlannerPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Checkbox,
  Chip,
  Snackbar,
  Alert,
  Stack,
  Grid,
  MenuItem
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'devdocket_tech_plans';
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TechStackSwitchPlannerPage() {
  const [stack, setStack] = useState('');
  const [resource, setResource] = useState('');
  const [goal, setGoal] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPlans(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const resetForm = () => {
    setStack('');
    setResource('');
    setGoal('');
    setPriority('Medium');
    setEditingId(null);
  };

  const handleAddOrUpdate = () => {
    if (!stack.trim()) {
      setSnackbar({ severity: 'warning', msg: 'Stack name is required' });
      return;
    }
    const newPlan = {
      id: editingId || Date.now(),
      stack,
      resource,
      goal,
      priority,
      completed: false,
      createdAt: editingId ? plans.find(p => p.id === editingId).createdAt : new Date()
    };
    setPlans(prev => {
      if (editingId) {
        return prev.map(p => p.id === editingId ? newPlan : p);
      }
      return [newPlan, ...prev];
    });
    setSnackbar({ severity: 'success', msg: editingId ? 'Plan updated' : 'Plan added' });
    resetForm();
  };

  const handleEdit = id => {
    const p = plans.find(p => p.id === id);
    setStack(p.stack);
    setResource(p.resource);
    setGoal(p.goal);
    setPriority(p.priority);
    setEditingId(id);
  };

  const handleDelete = id => {
    setPlans(prev => prev.filter(p => p.id !== id));
    setSnackbar({ severity: 'info', msg: 'Plan removed' });
    if (editingId === id) resetForm();
  };

  const toggleComplete = id => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  const stats = {
    total: plans.length,
    done: plans.filter(p => p.completed).length,
    pending: plans.filter(p => !p.completed).length
  };

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ color: 'primary.main', fontWeight: 700 }}
        >
          🔄 Tech Stack Planner
        </Typography>
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 0.6 }}
          sx={{ height: 4, bgcolor: 'primary.main', mx: 'auto', mt: 1, borderRadius: 2 }}
        />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
        <Chip label={`Total: ${stats.total}`} />
        <Chip label={`Done: ${stats.done}`} color="success" />
        <Chip label={`Pending: ${stats.pending}`} color="warning" />
      </Stack>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Target Stack"
              fullWidth
              value={stack}
              onChange={e => setStack(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Resource"
              fullWidth
              value={resource}
              onChange={e => setResource(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Goal"
              fullWidth
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Priority"
              fullWidth
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              {PRIORITIES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Button
              startIcon={<Add />}
              variant="contained"
              sx={{ height: '100%' }}
              fullWidth
              onClick={handleAddOrUpdate}
            >
              {editingId ? 'Update Plan' : 'Add Plan'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <List>
        <AnimatePresence>
          {plans.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Paper sx={{ mb: 2, p: 2 }} elevation={2}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={p.completed}
                    onChange={() => toggleComplete(p.id)}
                  />
                  <Box flexGrow={1}>
                    <Typography
                      variant="h6"
                      sx={{ textDecoration: p.completed ? 'line-through' : 'none' }}
                    >
                      {p.stack} <Chip label={p.priority} size="small" sx={{ ml: 1 }} />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Resource:</strong> {p.resource} <br/>
                      <strong>Goal:</strong> {p.goal}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEdit(p.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(p.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
      >
        {snackbar && <Alert severity={snackbar.severity}>{snackbar.msg}</Alert>}
      </Snackbar>
    </Box>
  );
}
