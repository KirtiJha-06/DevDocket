// src/pages/MicroJournalPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'devdocket_micro_journal';
const CHAR_LIMIT = 200;

export default function MicroJournalPage() {
  // --- state & persistence ---
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // --- handlers ---
  const handleSave = () => {
    if (!entry.trim()) {
      setSnackbar({ severity: 'warning', msg: 'Entry cannot be empty.' });
      return;
    }
    if (editingId != null) {
      // update existing
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId ? { ...e, text: entry, date: new Date() } : e
        )
      );
      setSnackbar({ severity: 'success', msg: 'Entry updated.' });
    } else {
      // new
      setEntries((prev) => [
        {
          id: Date.now(),
          text: entry,
          date: new Date(),
        },
        ...prev,
      ]);
      setSnackbar({ severity: 'success', msg: 'Entry saved.' });
    }
    setEntry('');
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const toEdit = entries.find((e) => e.id === id);
    setEntry(toEdit.text);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setSnackbar({ severity: 'info', msg: 'Entry deleted.' });
    if (editingId === id) {
      setEditingId(null);
      setEntry('');
    }
  };

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h3"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ color: 'primary.main', fontWeight: 700 }}
        >
          📝 Micro-Journal
        </Typography>
        <Divider
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.6 }}
          sx={{
            height: 4,
            bgcolor: 'primary.main',
            mx: 'auto',
            mt: 1,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Input Form */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{ p: 3, mb: 4 }}
      >
        <TextField
          label="What did you learn today?"
          multiline
          rows={4}
          fullWidth
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          helperText={`${entry.length}/${CHAR_LIMIT} chars`}
          error={entry.length > CHAR_LIMIT}
        />
        <Button
          startIcon={<Save />}
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleSave}
          disabled={entry.length > CHAR_LIMIT}
        >
          {editingId != null ? 'Update Entry' : 'Save Entry'}
        </Button>
      </Paper>

      {/* Entries List */}
      <List>
        <AnimatePresence>
          {entries.map(({ id, text, date }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                component={Paper}
                sx={{ mb: 2, p: 2, position: 'relative' }}
              >
                <ListItemText
                  primary={text}
                  secondary={new Date(date).toLocaleString()}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEdit(id)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
        {entries.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No entries yet—start journaling!
          </Typography>
        )}
      </List>

      {/* Snackbar */}
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
      >
        {snackbar && (
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.msg}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
