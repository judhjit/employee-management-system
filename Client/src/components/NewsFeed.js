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
