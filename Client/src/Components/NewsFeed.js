import React, { useState , useEffect} from "react";
import "./NewsFeed.css";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const NewsFeed = ({ isUser, isNewsadmin }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const hideMessageAfterDuration = (messageStateSetter) => {
    setTimeout(() => {
      messageStateSetter("");
    },5000); 
  };

  const handleCreatePost = () => {
    if (newPost.trim() === "") {
      setError("Empty post is not accepted!!!");
      hideMessageAfterDuration(setError);
      return;
    }

    const newPostObj = {
      id: Date.now(),
      text: newPost,
    };

    setPosts([...posts, newPostObj]);
    setNewPost("");
    setError("");
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
    setEditedText("");
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPost = () => {
    setConfirmationMessage("Your request has been sent to admin");
    hideMessageAfterDuration(setConfirmationMessage);
    setShowConfirmation(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  useEffect(() => {
    if (error) {
      hideMessageAfterDuration(setError);
    }
    if (confirmationMessage) {
      hideMessageAfterDuration(setConfirmationMessage);
    }
  }, [error, confirmationMessage]);

  return (
    <Container>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        style={{ color: "white", marginTop: "10px", textAlign: "center" }}
      >
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
            color='secondary'
            multiline minRows={3}
            value={newPost}
            InputLabelProps={{ style: { color: 'white', } }}
            InputProps={{ style: { color: 'white' }}}
            className="input-text-color"
            onChange={(e) => setNewPost(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleCreatePost}
            style={{ margin: "10px" }}
          >
            Post
          </Button>
          {error && <Typography style={{ color: "red" }}>{error}</Typography>}
        </>
      )}

      {/* to Conditionally render the button based on user */}
      {isUser && (
        <div>
          <IconButton
            onClick={handleShowConfirmation}
            style={{
              backgroundColor: "blue", 
              color: "white", 
              borderRadius: "30px", 
              padding: "8px", 
              cursor: "pointer", 
            }}
          >
            <AddIcon />
          </IconButton>
          <Dialog open={showConfirmation} onClose={handleCancelConfirmation}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <Typography>Do you want to post?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelConfirmation}>No</Button>
              <Button onClick={handleConfirmPost}>Yes</Button>
            </DialogActions>
          </Dialog>
          {confirmationMessage && (
            <Typography style={{ color: "green", textAlign: "center" }}>
              {confirmationMessage}
            </Typography>
          )}
        </div>
      )}
    </Container>
  );
};

export default NewsFeed;
