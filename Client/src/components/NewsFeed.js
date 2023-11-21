import React, { useState, useEffect } from "react";
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
import api from "../api";

const NewsFeed = ({ isNewsadmin, isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [showInputArea, setShowInputArea] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await api.get('/user/news');
        console.log(response.data);
        setPosts([...response.data]);
      } catch (error) {
        if (error.response.status === 404) {
          console.log("No posts found!");
          setPosts([...posts]);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []);

  // Function to handle creating a new post
  const handleCreatePost = async (newPostTitle, newPostDescription) => {

    if ((newPostTitle.trim() === "") || (newPostDescription.trim() === "")) {
      alert("Title and Body are required!");
      return;
    }

    let response;
    try {
      response = await api.post('/newsadmin/news', {
        title: newPostTitle,
        body: newPostDescription,
      });
      // setPosts([...posts.filter((request) => request.newsId !== newsId)]);
    } catch (error) {
      console.error('Error posting data:', error);
    }

    // const newPostObj = {
    //   id: Date.now(),
    //   title: newPostTitle,
    //   description: newPostDescription,
    //   date: new Date().toLocaleDateString(),
    // };

    // setPosts([...posts, newPostObj]);
    setNewPostTitle("");
    setNewPostDescription("");
  };


  const handleDeletePost = async (newsId) => {
    let response;
    try {
      response = await api.post('/newsadmin/deletenews', {
        newsId: newsId,
      });
      // setPosts([...posts.filter((post) => post.newsId !== newsId)]);
    } catch (error) {
      console.error('Error deleting data:', error);
    }

    // const newPostObj = {
    //   id: Date.now(),
    //   title: newPostTitle,
    //   description: newPostDescription,
    //   date: new Date().toLocaleDateString(),
    // };

    // setPosts([...posts, newPostObj]);
    // setNewPostTitle("");
    // setNewPostDescription("");
    // setAnchorEl(null);
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [newsId]: null,
    }));
  };

  // handle deleting a post
  // const handleDeletePost = (postId) => {
  //   setPosts(posts.filter((post) => post.id !== postId));
  //   setAnchorEl(null);
  // };

  // handle editing a post
  const handleEditButton = (postId, title, text) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedText(text);
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [postId]: true,
    }));
    // setAnchorEl(null);
  };

  // handle editing a post
  const handleEditPost = async (newsId, title, text) => {
    if ((title.trim() === "") || (text.trim() === "")) {
      alert("Title and Body are required!");
      return;
    }
    let response;
    try {
      response = await api.patch('/newsadmin/news', {
        newsId: newsId,
        title: title,
        body: text,
      });
      // setPosts([...posts.filter((post) => post.newsId !== newsId)]);
    } catch (error) {
      console.error('Error editing data:', error);
    }

    // const newPostObj = {
    //   id: Date.now(),
    //   title: newPostTitle,
    //   description: newPostDescription,
    //   date: new Date().toLocaleDateString(),
    // };

    // setPosts([...posts, newPostObj]);
    // setNewPostTitle("");
    // setNewPostDescription("");
    setEditingPostId(null);
    setEditedTitle("");
    setEditedText("");
    // setAnchorEl(null);
    setAnchorElMap((prevAnchorElMap) => ({
      ...prevAnchorElMap,
      [newsId]: null,
    }));
  };

  //save changes after editing a post
  // const handleSavePost = (postId) => {
  //   setPosts(
  //     posts.map((post) =>
  //       post.id === postId
  //         ? { ...post, title: editedTitle, description: editedText }
  //         : post
  //     )
  //   );
  //   setEditingPostId(null);
  //   setEditedTitle("");
  //   setEditedText("");
  // };

  const toggleInputArea = () => {
    setShowInputArea(!showInputArea);
  };

  // handling expanding/collapsing individual posts
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
        {/* Button to toggle new post input area */}
        {(isNewsadmin || isAdmin) && (<Fab
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
        </Fab>)}
      </div>

      {/* New Post Input Area */}
      {(isNewsadmin || isAdmin) && showInputArea && (
        <>
          {/* Title input */}
          <TextField
            label="Title"
            placeholder="Enter title here..."
            name="title"
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
          {/* Description input */}
          <TextField
            label="Description"
            name="description"
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
          {/* Button to create a new post */}
          <Button
            variant="contained"
            onClick={() => handleCreatePost(newPostTitle, newPostDescription)}
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

      {/* Existing Posts */}
      <div>
        {posts.map((post) => (
          <Paper
            key={post.newsId}
            style={{ marginBottom: "10px", wordWrap: "break-word" }}
          >
            {/* Editing Mode */}
            {editingPostId === post.newsId ? (
              <div
                style={{
                  width: "100%",
                  background: "#DCF1FF",
                  borderRadius: "4px",
                  padding: "10px",
                  wordWrap: "break-word",
                }}
              >
                {/* Title and Description input for editing */}
                <TextField
                  fullWidth
                  label="Edit Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  variant="outlined"
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    backgroundColor: 'red',
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
                {/* Save Button */}
                <Button onClick={() => handleEditPost(post.newsId, editedTitle, editedText)}>Save</Button>
              </div>
            ) : (
              /* Non-Editing Mode */
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
                {/* Display Title, Date, and Menu */}
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "1.2vw",
                      // paddingLeft: "1vw",
                      // paddingTop: "0.6vw",
                      fontWeight: "bold",
                      marginRight: "auto",
                      color: "black",
                    }}
                  >
                    {post.title}
                  </Typography>
                  {/* <div>
                    <p
                      style={{
                        fontSize: "0.8vw",
                        paddingLeft: "1vw",
                        color: "black",
                      }}
                    >
                      Date Posted: {new Date(post.dateOfPosting).toLocaleDateString('en-GB').slice(0, 10).split("/").reverse().join("-")}
                    </p>
                  </div> */}
                  {/* 3-dot menu for Edit and Delete options */}
                  {(isNewsadmin || isAdmin) && (
                    <div div style={{ marginLeft: "auto" }}>
                      <IconButton
                        aria-controls={`menu-${post.newsId}`}
                        aria-haspopup="true"
                        onClick={(e) => setAnchorElMap({ ...anchorElMap, [post.newsId]: e.currentTarget })}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`menu-${post.newsId}`}
                        anchorEl={anchorElMap[post.newsId]}
                        keepMounted
                        open={Boolean(anchorElMap[post.newsId])}
                        onClose={() => setAnchorElMap((prevAnchorElMap) => ({ ...prevAnchorElMap, [post.newsId]: null }))}
                      >
                        {/* Edit option */}
                        <MenuItem
                          onClick={() =>
                            // handleEditPost(post.newsId, post.title, post.body)
                            handleEditButton(post.newsId, post.title, post.body)
                            // console.log("Edit")
                          }
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Edit" />
                        </MenuItem>
                        {/* Delete option */}
                        <MenuItem
                          onClick={() =>
                            handleDeletePost(post.newsId)
                            // console.log("Delete")
                          }>
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Delete" />
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </div>
                {/* Description with collapse/expand feature */}
                <Collapse
                  in={expandedPostId === post.newsId}
                  timeout="auto"
                  unmountOnExit
                >
                  <div style={{ padding: "0.5vw" }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "1vw",
                        paddingLeft: "0.2vw",
                        color: "black",
                        marginRight: "auto",
                      }}
                    >
                      {post.body}
                    </Typography>
                  </div>
                  <div style={{ textAlign: "right", paddingRight: "1vw" }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "0.9vw",
                        // paddingLeft: "1vw",
                        color: "grey",
                      }}
                    >
                      Posted by {post.userId}
                    </Typography>
                  </div>
                  <div style={{ textAlign: "right", paddingRight: "1vw" }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "0.9vw",
                        // paddingLeft: "1vw",
                        color: "grey",
                      }}
                    >
                      Posted on {new Date(post.dateOfPosting).toLocaleDateString('en-GB').slice(0, 10).split("/").reverse().join("-")}
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
                  onClick={() => handleExpand(post.newsId)}
                >
                  <Typography variant="body2">
                    {expandedPostId === post.newsId ? "Show Less" : "Show More"}
                  </Typography>
                  {expandedPostId !== post.newsId ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandMoreIcon style={{ transform: "rotate(180deg)" }} />
                  )}
                </div>
              </div>
            )}
          </Paper>
        ))}
      </div>
    </Container >
  );
};

export default NewsFeed;