// import React, { useState } from 'react';
// import './NewsFeed.css';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';

// const NewsFeed = ({ isNewsadmin }) => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedText, setEditedText] = useState('');

//   const handleCreatePost = () => {
//     if (newPost.trim() === '') {
//       alert("Empty post is not accepted!!!");
//       return;
//     }

//     const newPostObj = {
//       id: Date.now(),
//       text: newPost,
//     };

//     setPosts([...posts, newPostObj]);
//     setNewPost('');
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
//     setEditedText('');
//   };

//   return (
//     <Container  >
//       <Typography variant="h5" component="h2" gutterBottom style={{color:'white', marginTop:'2vw',fontWeight:'bolder',fontFamily: 'Poppins',fontSize:'1.3vw'}}>
//         News Feed
//       </Typography>

//       {/* to Conditionally render the "Post" input and button based on newsfeedadmin */}
//       {isNewsadmin && (
//         <>
//           <TextField
//             label="New Post"
//             // margin='normal'
//             // color='secondary'
//             multiline minRows={2}
//             // sx={{ input: { color: 'red' } }}
//             value={newPost}
//             InputLabelProps={{ style: { color: 'white' } }}
//             // InputProps={{ style: { color: 'white', border:'2px solid white'} }}
//             // className="input-text-color"
//             onChange={(e) => setNewPost(e.target.value)}
//             fullWidth
//             variant="outlined"

//             style={{borderRadius:'4px',border: '2px solid #EBEBEB',  width:'300px',
//             height: '80px' , flexShrink:0,marginTop:'2vw'}}
//           />
//           <Button variant="contained" onClick={handleCreatePost} style={{marginTop:'19px',backgroundColor:'white',color:'#0071BA',height:'1.5vw'}}>
//           Post
//           </Button>
//           <Divider style={{ marginTop: '10px', backgroundColor: 'rgba(199, 199, 199, 0.30)',marginTop:'2vw' }} />
//         </>
//       )}

// <div >
//         {posts.map((post) => (
//           <Paper key={post.id} className="post">
//             {editingPostId === post.id ? (
//               <div style={{width: '353px',height: '78px',borderRadius: '4px',background: '#DCF1FF'}}>
//                 <TextField
//                   fullWidth
//                   value={editedText}
//                   onChange={(e) => setEditedText(e.target.value)}
//                 />
//                 <Button onClick={() => handleSavePost(post.id)}>Save</Button>
//               </div>
//             ) : (
//               <div style={{width: '306px',height: '78px',borderRadius: '4px',background: '#DCF1FF',marginBottom:'0.4vw'}}>
//                 <div>
//                   <p style={{fontSize:'1vw', paddingLeft:'1vw',paddingTop:'0.6vw' , color:'black',fontWeight:'bold'}}>{post.text}</p>

//                 </div>
//                 <div style={{paddingLeft:'14vw'}}>
//                 <IconButton onClick={() => handleEditPost(post.id, post.text)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeletePost(post.id)}>
//                   <DeleteIcon />
//                 </IconButton>

//                 </div>

//               </div>
//             )}
//           </Paper>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default NewsFeed;

// import React, { useState } from 'react';
// import './NewsFeed.css';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';

// const NewsFeed = ({ isNewsadmin }) => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [editingPostId, setEditingPostId] = useState(null);
//   const [editedText, setEditedText] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleCreatePost = () => {
//     if (newPost.trim() === '') {
//       alert("Empty post is not accepted!!!");
//       return;
//     }

//     const newPostObj = {
//       id: Date.now(),
//       text: newPost,
//     };

//     setPosts([...posts, newPostObj]);
//     setNewPost('');
//   };

//   const handleDeletePost = (postId) => {
//     setPosts(posts.filter((post) => post.id !== postId));
//     setAnchorEl(null);
//   };

//   const handleEditPost = (postId, text) => {
//     setEditingPostId(postId);
//     setEditedText(text);
//     setAnchorEl(null);
//   };

//   const handleSavePost = (postId) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId ? { ...post, text: editedText } : post
//       )
//     );
//     setEditingPostId(null);
//     setEditedText('');
//     setAnchorEl(null); // Close the menu after saving
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Container>
//       <Typography variant="h5" component="h2" gutterBottom style={{ color: 'white', marginTop: '2vw', fontWeight: 'bolder', fontFamily: 'Poppins', fontSize: '1.3vw' }}>
//         News Feed
//       </Typography>

//       {/* to Conditionally render the "Post" input and button based on newsfeedadmin */}
//       {isNewsadmin && (
//         <>
//           <TextField
//             label="New Post"
//             value={newPost}
//             InputLabelProps={{ style: { color: 'white' } }}
//             onChange={(e) => setNewPost(e.target.value)}
//             fullWidth
//             variant="outlined"
//             style={{ borderRadius: '4px', border: '2px solid #EBEBEB', width: '300px', height: '80px', flexShrink: 0, marginTop: '2vw' }}
//           />
//           <Button variant="contained" onClick={handleCreatePost} style={{ marginTop: '19px', backgroundColor: 'white', color: '#0071BA', height: '1.5vw' }}>
//             Post
//           </Button>
//           <Divider style={{ marginTop: '10px', backgroundColor: 'rgba(199, 199, 199, 0.30)', marginTop: '2vw' }} />
//         </>
//       )}

//       <div>
//         {posts.map((post) => (
//           <Paper key={post.id} className="post">
//             <div style={{ width: '306px', height: '78px', borderRadius: '4px', background: '#DCF1FF', marginBottom: '0.4vw' }}>
//               <div>
//                 <p style={{ fontSize: '1vw', paddingLeft: '1vw', paddingTop: '0.6vw', color: 'black', fontWeight: 'bold' }}>{post.text}</p>
//               </div>
//               <div style={{ paddingLeft: '14vw' }}>
//                 <IconButton onClick={handleMenuOpen}>
//                   <MoreVertIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   <MenuItem onClick={() => handleEditPost(post.id, post.text)}>Edit</MenuItem>
//                   <MenuItem onClick={() => handleDeletePost(post.id)}>Delete</MenuItem>
//                 </Menu>
//               </div>
//             </div>
//           </Paper>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default NewsFeed;

//3rd attempt

import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from "@mui/material/Fab";

const NewsFeed = ({ isNewsadmin }) => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [showInputArea, setShowInputArea] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});

  const handleCreatePost = () => {
    if (newPostTitle.trim() === "") {
      alert("Title is required!");
      return;
    }

    const newPostObj = {
      id: Date.now(),
      title: newPostTitle,
      description: newPostDescription,
      date: new Date().toLocaleDateString(),
    };

    setPosts([...posts, newPostObj]);
    setNewPostTitle("");
    setNewPostDescription("");
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [postId]: null,
    }));
  };

  const handleEditPost = (postId, title, text) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedText(text);
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [postId]: true,
    }));
  };

  const handleSavePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, title: editedTitle, description: editedText }
          : post
      )
    );
    setEditingPostId(null);
    setEditedTitle("");
    setEditedText("");
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [postId]: null,
    }));
  };

  const toggleInputArea = () => {
    setShowInputArea(!showInputArea);
  };

  const handleExpand = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  return (
    <Container style={{ height: "calc(100vh - 20px)", overflowY: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          style={{
            color: "white",
            marginTop: "2vw",
            fontWeight: "bolder",
            fontFamily: "Poppins",
            fontSize: "1.3vw",
          }}
        >
          News Feed
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={toggleInputArea}
          style={{
            height: "30px",
            width: "40px",
            marginLeft: "20px",
            marginTop: "22px",
          }}
        >
          <AddIcon />
        </Fab>
      </div>

      {isNewsadmin && showInputArea && (
        <>
          <TextField
            label="Title"
            placeholder="Enter title here..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            variant="outlined"
            style={{
              borderRadius: "4px",
              width: "20vw",
              flexShrink: 0,
              marginTop: "2vw",
            }}
          />
          <Divider style={{ margin: "10px" }} />
          <TextField
            label="Description"
            InputLabelProps={{ shrink: !!newPostDescription }}
            placeholder={!newPostDescription ? "Enter description here..." : ""}
            value={newPostDescription}
            onChange={(e) => setNewPostDescription(e.target.value)}
            variant="outlined"
            style={{
              borderRadius: "4px",
              height: "auto",
              width: "20vw",
              wordWrap: "break-word",
              color: "black",
            }}
            InputProps={{
              style: { height: "100%" },
            }}
          />
          <Button
            variant="contained"
            onClick={handleCreatePost}
            style={{
              marginTop: "19px",
              backgroundColor: "white",
              color: "#0071BA",
              height: "1.5vw",
            }}
          >
            Post
          </Button>
          <Divider
            style={{
              backgroundColor: "rgba(199, 199, 199, 0.30)",
              marginTop: "2vw",
            }}
          />
        </>
      )}

      <div>
        {posts.map((post) => (
          <Paper
            key={post.id}
            style={{marginTop: "2.1vw", marginBottom: "10px", wordWrap: "break-word" }}
          >
            {editingPostId === post.id ? (
              <div
                style={{
                  width: "100%",
                  background: "#DCF1FF",
                  borderRadius: "4px",
                  padding: "10px",
                  wordWrap: "break-word",
                  
                }}
              >
                <TextField
                  fullWidth
                  label="Edit Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  variant="outlined"
                  style={{ marginBottom: "10px"}}
                  InputProps={{
                    backgroundColor:'red',
                  }}
                />
                <TextField
                  fullWidth
                  label="Edit Description"
                  multiline
                  rows={Math.max(4, editedText.split("\n").length)}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  variant="outlined"
                  style={{
                    marginBottom: "10px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  InputProps={{
                    style: { height: "100%" },
                  }}
                />
                <Button onClick={() => handleSavePost(post.id)}>Save</Button>
              </div>
            ) : (
              <div
                style={{
                  borderRadius: "4px",
                  background: "#DCF1FF",
                  marginBottom: "0.4vw",
                  padding: "8px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >

                <Typography
                  variant="body2"
                  style={{
                    fontSize: "0.8vw",
                    color: "black",
                    marginLeft: "auto",
                    fontStyle: "italic",
                    marginBottom: "5px",
                  }}
                >
                  {post.date}
                </Typography>

                <div
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Post Title */}
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "1.2vw",
                      fontWeight: "bold",
                      marginRight: "auto",
                      color: "black",
                    }}
                  >
                    {post.title}
                  </Typography>

                  {/* 3-dot menu for Edit and Delete options */}
                  <IconButton
                    aria-controls={`menu-${post.id}`}
                    aria-haspopup="true"
                    onClick={(e) => setAnchorElMap({ ...anchorElMap, [post.id]: e.currentTarget })}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>

                {/* 3-dot menu options */}
                <Menu
                  id={`menu-${post.id}`}
                  anchorEl={anchorElMap[post.id]}
                  keepMounted
                  open={Boolean(anchorElMap[post.id])}
                  onClose={() => setAnchorElMap((prevAnchorElMap) => ({ ...prevAnchorElMap, [post.id]: null }))}
                  
                >
                  {/* Edit option */}
                  <MenuItem
                    onClick={() =>
                      handleEditPost(post.id, post.title, post.description)
                    }
                  >
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

                {/* Description with collapse/expand feature */}
                <Collapse
                  in={expandedPostId === post.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <div style={{ padding: "0.5vw" }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "0.9vw",
                        color: "black",
                      }}
                    >
                      {post.description}
                    </Typography>
                  </div>
                </Collapse>

                {/* Show More/Show Less Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0071BA",
                  }}
                  onClick={() => handleExpand(post.id)}
                >
                  <Typography variant="body2">
                    {expandedPostId === post.id ? "Show Less" : "Show More"}
                  </Typography>
                  <ExpandMoreIcon />
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

