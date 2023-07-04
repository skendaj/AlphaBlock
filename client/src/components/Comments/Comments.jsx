import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Grid, Avatar } from '@mui/material';

const Comment = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      return;
    }

    try {
      await axios.post('/api/comments', { name, photo, comment });
      setName('');
      setPhoto('');
      setComment('');
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Comment Section
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Photo URL"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box bgcolor="whitesmoke" minHeight="300px" p={2} borderRadius={4}>
            {comments.map((comment) => (
              <Box key={comment._id} mb={2} p={1} bgcolor="white" borderRadius={4}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar alt={comment.name} src={comment.photo} />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                      {comment.name}
                    </Typography>
                    <Typography variant="body2">{comment.comment}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Comment;
