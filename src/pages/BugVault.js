// src/pages/BugVaultPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Grid,
  Stack,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Collapse,
  useTheme,
} from '@mui/material';
import { Add, ExpandMore, ExpandLess } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_STACKS = ['React', 'JavaScript', 'Node.js', 'Python', 'CSS'];
const ERROR_TYPES = ['Runtime', 'Syntax', 'Logic', 'Network', 'Other'];

export default function BugVaultPage() {
  const theme = useTheme();

  // --- data state ---
  const [bugs, setBugs] = useState([
    {
      id: 1,
      title: 'TypeError: undefined is not a function',
      techStack: 'React',
      errorType: 'Runtime',
      solution: 'Checked method call and fixed the binding.',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Cannot read property "map" of undefined',
      techStack: 'JavaScript',
      errorType: 'Logic',
      solution: 'Added null check before mapping.',
      status: 'Resolved',
    },
  ]);

  // --- filter/search state ---
  const [search, setSearch] = useState('');
  const [stackFilter, setStackFilter] = useState('All');
  const [errorFilter, setErrorFilter] = useState('All');

  // --- add-bug dialog state ---
  const [openDialog, setOpenDialog] = useState(false);
  const [newBug, setNewBug] = useState({
    title: '',
    techStack: TECH_STACKS[0],
    errorType: ERROR_TYPES[0],
    solution: '',
  });
  const [snackbar, setSnackbar] = useState(null);

  // --- card expansion ---
  const [expandedId, setExpandedId] = useState(null);

  // --- filtering & stats ---
  const filtered = bugs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) &&
    (stackFilter === 'All' || b.techStack === stackFilter) &&
    (errorFilter === 'All' || b.errorType === errorFilter)
  );
  const stats = {
    total: bugs.length,
    pending: bugs.filter((b) => b.status === 'Pending').length,
    resolved: bugs.filter((b) => b.status === 'Resolved').length,
  };

  const toggleStatus = (id) =>
    setBugs((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === 'Pending' ? 'Resolved' : 'Pending' }
          : b
      )
    );

  const handleAddBug = () => {
    if (!newBug.title.trim()) {
      setSnackbar({ severity: 'error', msg: 'Title cannot be empty.' });
      return;
    }
    setBugs((prev) => [
      { id: Date.now(), status: 'Pending', ...newBug },
      ...prev,
    ]);
    setOpenDialog(false);
    setNewBug({
      title: '',
      techStack: TECH_STACKS[0],
      errorType: ERROR_TYPES[0],
      solution: '',
    });
    setSnackbar({ severity: 'success', msg: 'Bug added!' });
  };

  return (
    <Box p={{ xs: 2, sm: 4 }}>
      {/* Header / Actions / Stats */}
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
        gap={2}
      >
        <Box>
          <Typography
            variant="h3"
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ display: 'inline-block', fontWeight: 700, color: 'primary.main' }}
          >
            🐞 Bug Vault
          </Typography>
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.6 }}
            sx={{
              height: 4,
              bgcolor: 'primary.main',
              borderRadius: 2,
              mt: 1,
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label={`Total: ${stats.total}`} color="default" />
          <Chip label={`Pending: ${stats.pending}`} color="warning" />
          <Chip label={`Resolved: ${stats.resolved}`} color="success" />
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => setOpenDialog(true)}
          >
            Add Bug
          </Button>
        </Stack>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} mb={4} alignItems="stretch">
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label="Search bugs..."
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <TextField
            select
            label="Tech"
            fullWidth
            value={stackFilter}
            onChange={(e) => setStackFilter(e.target.value)}
            sx={{ height: '100%' }}
          >
            <MenuItem value="All">All</MenuItem>
            {TECH_STACKS.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} md={3} lg={2}>
          <TextField
            select
            label="Error"
            fullWidth
            value={errorFilter}
            onChange={(e) => setErrorFilter(e.target.value)}
            sx={{ height: '100%' }}
          >
            <MenuItem value="All">All</MenuItem>
            {ERROR_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Bug Cards */}
      <Grid container spacing={3} justifyContent="center">
        <AnimatePresence>
          {filtered.map((bug) => (
            <Grid item xs={12} md={10} lg={8} key={bug.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                    overflow: 'visible',
                    '&:hover': { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6">{bug.title}</Typography>
                      <Chip
                        label={bug.status}
                        color={bug.status === 'Resolved' ? 'success' : 'warning'}
                        clickable
                        onClick={() => toggleStatus(bug.id)}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      <strong>Stack:</strong> {bug.techStack} &nbsp;|&nbsp;
                      <strong>Type:</strong> {bug.errorType}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() =>
                        setExpandedId(expandedId === bug.id ? null : bug.id)
                      }
                      aria-expanded={expandedId === bug.id}
                    >
                      {expandedId === bug.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <Typography variant="button">Solution</Typography>
                  </CardActions>
                  <Collapse in={expandedId === bug.id} timeout="auto" unmountOnExit>
                    <Box px={3} pb={2}>
                      <Typography variant="body2">{bug.solution}</Typography>
                    </Box>
                  </Collapse>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <Typography mt={4} textAlign="center" width="100%">
            No bugs match your filters.
          </Typography>
        )}
      </Grid>

      {/* Add Bug Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add a New Bug</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={newBug.title}
              onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
            />
            <TextField
              select
              label="Tech Stack"
              fullWidth
              value={newBug.techStack}
              onChange={(e) =>
                setNewBug({ ...newBug, techStack: e.target.value })
              }
            >
              {TECH_STACKS.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Error Type"
              fullWidth
              value={newBug.errorType}
              onChange={(e) =>
                setNewBug({ ...newBug, errorType: e.target.value })
              }
            >
              {ERROR_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Solution"
              fullWidth
              multiline
              minRows={2}
              value={newBug.solution}
              onChange={(e) =>
                setNewBug({ ...newBug, solution: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddBug}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

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



  
  