// import React, { useState , useEffect} from "react";
// import "./NewsFeed.css";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";

// const NewsFeed = ({ isUser, isNewsadmin }) => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedText, setEditedText] = useState("");
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [error, setError] = useState("");
//   const [confirmationMessage, setConfirmationMessage] = useState("");

//   const hideMessageAfterDuration = (messageStateSetter) => {
//     setTimeout(() => {
//       messageStateSetter("");
//     },5000); 
//   };

//   const handleCreatePost = () => {
//     if (newPost.trim() === "") {
//       setError("Empty post is not accepted!!!");
//       hideMessageAfterDuration(setError);
//       return;
//     }

//     const newPostObj = {
//       id: Date.now(),
//       text: newPost,
//     };

//     setPosts([...posts, newPostObj]);
//     setNewPost("");
//     setError("");
//   };

//   const handleDeletePost = (postId) => {
//     setPosts(posts.filter((post) => post.id !== postId));
//   };

//   const handleEditPost = (postId, text) => {
//     setEditingPostId(postId);
//     setEditedText(text);
//   };

//   const handleSavePost = (postId) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId ? { ...post, text: editedText } : post
//       )
//     );
//     setEditingPostId(null);
//     setEditedText("");
//   };

//   const handleShowConfirmation = () => {
//     setShowConfirmation(true);
//   };

//   const handleConfirmPost = () => {
//     setConfirmationMessage("Your request has been sent to admin");
//     hideMessageAfterDuration(setConfirmationMessage);
//     setShowConfirmation(false);
//   };

//   const handleCancelConfirmation = () => {
//     setShowConfirmation(false);
//   };
//   useEffect(() => {
//     if (error) {
//       hideMessageAfterDuration(setError);
//     }
//     if (confirmationMessage) {
//       hideMessageAfterDuration(setConfirmationMessage);
//     }
//   }, [error, confirmationMessage]);

//   return (
//     <Container>
//       <Typography
//         variant="h5"
//         component="h2"
//         gutterBottom
//         style={{ color: "white", marginTop: "10px", textAlign: "center" }}
//       >
//         News Feed
//       </Typography>
//       <div>
//         {posts.map((post) => (
//           <Paper key={post.id} className="post">
//             {editingPostId === post.id ? (
//               <>
//                 <TextField
//                   fullWidth
//                   value={editedText}
//                   onChange={(e) => setEditedText(e.target.value)}
//                 />
//                 <Button onClick={() => handleSavePost(post.id)}>Save</Button>
//               </>
//             ) : (
//               <>
//                 {post.text}
//                 <IconButton onClick={() => handleEditPost(post.id, post.text)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeletePost(post.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </>
//             )}
//           </Paper>
//         ))}
//       </div>
//       {/* to Conditionally render the "Post" input and button based on newsfeedadmin */}
//       {isNewsadmin && (
//         <>
//           <TextField
//             label="New Post"
//             margin='normal'
//             color='secondary'
//             multiline minRows={3}
//             value={newPost}
//             InputLabelProps={{ style: { color: 'white', } }}
//             InputProps={{ style: { color: 'white' }}}
//             className="input-text-color"
//             onChange={(e) => setNewPost(e.target.value)}
//             fullWidth
//             variant="outlined"
//           />
//           <Button
//             variant="contained"
//             onClick={handleCreatePost}
//             style={{ margin: "10px" }}
//           >
//             Post
//           </Button>
//           {error && <Typography style={{ color: "red" }}>{error}</Typography>}
//         </>
//       )}

//       {/* to Conditionally render the button based on user */}
//       {isUser && (
//         <div>
//           <IconButton
//             onClick={handleShowConfirmation}
//             style={{
//               backgroundColor: "blue", 
//               color: "white", 
//               borderRadius: "30px", 
//               padding: "8px", 
//               cursor: "pointer", 
//             }}
//           >
//             <AddIcon />
//           </IconButton>
//           <Dialog open={showConfirmation} onClose={handleCancelConfirmation}>
//             <DialogTitle>Confirmation</DialogTitle>
//             <DialogContent>
//               <Typography>Do you want to post?</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCancelConfirmation}>No</Button>
//               <Button onClick={handleConfirmPost}>Yes</Button>
//             </DialogActions>
//           </Dialog>
//           {confirmationMessage && (
//             <Typography style={{ color: "green", textAlign: "center" }}>
//               {confirmationMessage}
//             </Typography>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default NewsFeed;

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const NewsFeed = ({ isNewsadmin }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  const [showInputArea, setShowInputArea] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
    setAnchorEl(null); // Close the menu after deleting
  };

  const handleEditPost = (postId, text) => {
    setEditingPostId(postId);
    setEditedText(text);
    setAnchorEl(null); // Close the menu after selecting Edit
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

  const toggleInputArea = () => {
    setShowInputArea(!showInputArea);
  };

  return (
    <Container>
      
      <div style={{ display: 'flex', marginBottom: '10px' ,flexDirection:'row'}}>
      <Typography variant="h5" component="h2" gutterBottom style={{ color: 'white', marginTop: '2vw', fontWeight: 'bolder', fontFamily: 'Poppins', fontSize: '1.3vw' }}>
        News Feed
       </Typography>
      <Fab color="primary" aria-label="add" onClick={toggleInputArea} style={{height:'30px',width:'40px' ,marginLeft:'155px',marginTop:'22px'}}>
        <AddIcon />
      </Fab>
      </div>

      
      {isNewsadmin && showInputArea && (
        <>
          <TextField
            label="New Post"
            multiline
            minRows={2}
            value={newPost}
            InputLabelProps={{ style: { color: 'white' } }}
            onChange={(e) => setNewPost(e.target.value)}
            
            variant="outlined"
            style={{ borderRadius: '4px', border: '2px solid #EBEBEB', width: '300px', height: '80px', flexShrink: 0, marginTop: '2vw' }}
          />
          <Button variant="contained" onClick={handleCreatePost} style={{ marginTop: '19px', backgroundColor: 'white', color: '#0071BA', height: '1.5vw' }}>
            Post
          </Button>
          <Divider style={{ marginTop: '10px', backgroundColor: 'rgba(199, 199, 199, 0.30)', marginTop: '2vw' }} />
        </>
      )}

      <div>
        {posts.map((post) => (
          <Paper key={post.id} className="post">
            {editingPostId === post.id ? (
              <div style={{ width: '409px', height: '966px', borderRadius: '4px', background: '#DCF1FF' }}>
                <TextField
                  value={editedTitle}
                onChange={(e)=> setEditedTitle(e.target.value)}/>

                
                <TextField
                  fullWidth
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <Button onClick={() => handleSavePost(post.id)}>Save</Button>
              </div>
            ) : (
              <div style={{ width: '306px', height: '78px', borderRadius: '4px', background: '#DCF1FF', marginBottom: '0.4vw' }}>
                <div
                style={{display:'flex', flexDirection:'row',marginTop:'26px'}}>
                <div>
                  <p style={{ fontSize: '1vw', paddingLeft: '1vw', paddingTop: '0.6vw', color: 'black', fontWeight: 'bold' }}>{post.text}</p>
                </div>
                <div style={{ position:'relative' ,paddingLeft: '14vw' ,paddingTop:'1px'}}>


                  {/* 3dot wala menu */}
                  <IconButton
                    aria-controls={`menu-${post.id}`}
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${post.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    {/* Edit option */}
                    <MenuItem onClick={() => handleEditPost(post.id, post.text)}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </MenuItem>
                    {/* Delete option */}
                    <MenuItem onClick={() => handleDeletePost(post.id)}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </MenuItem>
                  </Menu>
                </div>
                </div>
              </div>
            )}
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default NewsFeed;