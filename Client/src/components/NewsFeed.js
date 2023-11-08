import React, { useState } from 'react';
import './NewsFeed.css';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const NewsFeed = ({ isNewsadmin }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim() === '') {
      alert("Empty post is not accepted!!!");
      return; 
    }

    const newPostObj = {
      id: Date.now(),
      text: newPost,
    };

    setPosts([...posts, newPostObj]);
    setNewPost('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEditPost = (postId, text) => {
    setEditingPostId(postId);
    setEditedText(text);
  };

  const handleSavePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, text: editedText } : post
      )
    );
    setEditingPostId(null);
    setEditedText('');
  };
  
  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom style={{color:'white', marginTop:'10px', textAlign:'center'}}>
        News Feed
      </Typography>
      <div>
        {posts.map((post) => (
          <Paper key={post.id} className="post">
            {editingPostId === post.id ? (
              <>
                <TextField
                  fullWidth
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <Button onClick={() => handleSavePost(post.id)}>Save</Button>
              </>
            ) : (
              <>
                {post.text}
                <IconButton onClick={() => handleEditPost(post.id, post.text)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeletePost(post.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Paper>
        ))}
      </div>
      
      {/* to Conditionally render the "Post" input and button based on newsfeedadmin */}
      {isNewsadmin && (
        <>
          <TextField
            label="New Post"
            margin='normal'
            // color='secondary'
            multiline minRows={3}
            sx={{ input: { color: 'red' } }}
            value={newPost}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', border:'2px solid white'} }}
            className="input-text-color"
            onChange={(e) => setNewPost(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" onClick={handleCreatePost} style={{margin:'10px'}}>
            Post
          </Button>
        </>
      )}
    </Container>
  );
};

export default NewsFeed;