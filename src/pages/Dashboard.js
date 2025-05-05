
import React from 'react';
import { Box, Grid, Paper, Typography, useTheme, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const Dashboard = () => {
  const theme = useTheme();

  const cardData = [
    {
      title: "Coding Stats",
      description: "🧠 Problems Solved: 50\n⏱️ Time Spent: 10 hrs",
    },
    {
      title: "Recent Micro-Journal",
      description: "📝 Learned about React Hooks today!",
    },
    {
      title: "Break Timer",
      description: "⏳ Ready for your next Pomodoro?",
    },
    {
      title: "Bug Vault Summary",
      description: "🐞 3 Bugs Fixed\n🚧 2 Pending",
    },
    {
      title: "Tech Stack Focus",
      description: "🧰 Exploring: Node.js + MongoDB",
    },
    {
      title: "Productivity Score",
      description: "🔥 Consistency: 80%\n📊 Goal: 90%",
    },
  ];

  return (
    <Box px={3} py={4}>
      {/* Animated Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: 'linear-gradient(90deg, #007cf0, #00dfd8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to DevDocket 🚀
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            color: '#bbb',
            maxWidth: '800px',
            mb: 1,
          }}
        >
          DevDocket is your all-in-one <strong>Developer Productivity OS</strong>. Track coding,
          log learnings, squash bugs, plan your stack, and master Pomodoro — all in one place.
        </Typography>

        <Divider sx={{ my: 2, borderColor: '#444' }} />

        <Typography variant="subtitle1" sx={{ color: '#aaa' }}>
          👇 Snapshot of your current momentum:
        </Typography>
      </motion.div>

      {/* Animated Cards Section */}
      <Grid container spacing={3} mt={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <MotionPaper
              elevation={6}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              sx={{
                p: 3,
                height: '180px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: '#00dfd8',
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ whiteSpace: 'pre-line', color: '#ddd' }}
              >
                {card.description}
              </Typography>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
