import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import './BannerPage.css'; // Import the CSS file for custom styles

const BannerPage = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      onNameSubmit(name);
      // Save the user's name in local storage
      localStorage.setItem('userName', name);
    }
  };

  return (
    <Container className="banner-page">
      <Typography variant="h3" className="banner-title">
        Welcome to Your Materials Supplies Manager
      </Typography>
      <Typography variant="body1" className="banner-text">
        Please enter your name to get started:
      </Typography>
      <TextField
        type="text"
        placeholder="Your Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
      /><br/>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="get-started-btn"
      >
        Get Started
      </Button>
    </Container>
  );
};

export default BannerPage;
