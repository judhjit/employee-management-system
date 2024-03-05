// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   IconButton,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Select,
// //   MenuItem,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// // } from "@mui/material";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import EditIcon from "@mui/icons-material/Edit";
// // import "./CurrentBookings.css";

// // import api from "../api";

// // const CurrentBookings = () => {
// //   const initialData = [];
// //   let dates = [];

// //   const [data, setData] = useState(initialData);
// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

// //   const fetchData = async () => {
// //     let response;
// //     try {
// //       response = await api.post("/user/getbookings", {
// //         isFoodRequired: true,
// //       });
// //       console.log("current-booking:", response.data);
// //       setData([...response.data]);
// //     } catch (error) {
// //       if (error.response.status === 404) {
// //         console.log("No data found!");
// //         setData([]);
// //       } else {
// //         console.error("Error fetching data:", error);
// //       }
// //     }

// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // const editCab = async (dates, newValue) => {
// //   //   if (!Array.isArray(dates)) {
// //   //     dates = [dates];
// //   //   }
// //   //   let response;
// //   //   try {
// //   //     response = await api.patch("/user/bookings", {
// //   //       dates: dates,
// //   //       modifyCab: true,
// //   //       modifyFood: false,
// //   //       workSlot: newValue,
// //   //     });
// //   //     fetchData();
// //   //   } catch (error) {
// //   //     console.error(error);
// //   //   }
// //   // };

// //   const editFood = async (dates, newValue) => {
// //     if (!Array.isArray(dates)) {
// //       dates = [dates];
// //     }
// //     let response;
// //     try {
// //       response = await api.patch("/user/bookings", {
// //         dates: dates,
// //         // modifyCab: false,
// //         modifyFood: true,
// //         preference: newValue,
// //       });
// //       fetchData();
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const handleCancel = async (dates, type) => {
// //     let response;
// //     if (!Array.isArray(dates)) {
// //       dates = [dates];
// //     }
// //     if (type === "Food") {
// //       try {
// //         response = await api.post("/user/deletebookings", {
// //           dates: dates,
// //           // cancelDesk: false,
// //           // cancelCab: false,
// //           cancelFood: true,
// //         });
// //         fetchData();
// //         // setData([...data.filter((booking) => booking.dateBooked !== dates[0])]);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     }
// //   };

// //   // const handleEdit = (rowIndex) => {
// //   //   setEditIndex(rowIndex);
// //   //   setEditedCab(data[rowIndex].cab);
// //   //   setEditedMeal(data[rowIndex].meal);
// //   // };

// //   const handleDeleteClick = (booking) => {
// //     setSelectedBooking(booking);
// //     setDeleteDialogOpen(true);
// //   };

// //   const handleDeleteDialogClose = () => {
// //     setDeleteDialogOpen(false);
// //     setSelectedBooking(null);
// //   };

// //   const handleConfirmDelete = async () => {
// //     if (selectedBooking) {
// //       await handleCancel(selectedBooking.dateBooked, selectedBooking.type);
// //       handleDeleteDialogClose();
// //     }
// //   };

// //   return (
// //     <div className="table-container">
// //       {/* <h2 className='booking'>Current Bookings</h2> */}
// //       <div
// //         style={{
// //           fontSize: "29px",
// //           fontFamily: "poppins",
// //           fontWeight: 600,
// //           marginLeft: "90px",
// //           paddingTop: "20px",
// //           color: "#0071BA",
// //         }}
// //       >
// //         <span>Current </span>
// //         <span>Bookings:</span>
// //       </div>
// //       <TableContainer
// //         style={{
// //           width: "97vw",
// //           padding: "0 10px",
// //           height: "190px",
// //           marginTop: "3vh",
// //         }}
// //       >
// //         <Table stickyHeader>
// //           <TableHead>
// //             <TableRow
// //             // style={{
// //             //   backgroundColor: "#0071BA",
// //             // }}
// //             >
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   backgroundColor: "#0071BA",
// //                   fontFamily: "poppins",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Sl No.
// //               </TableCell>
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   backgroundColor: "#0071BA",
// //                   fontFamily: "poppins",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Date
// //               </TableCell>
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   fontFamily: "poppins",
// //                   backgroundColor: "#0071BA",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Type
// //               </TableCell>
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   fontFamily: "poppins",
// //                   backgroundColor: "#0071BA",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Preference
// //               </TableCell>
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   backgroundColor: "#0071BA",
// //                   fontFamily: "poppins",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Delete
// //               </TableCell>
// //               <TableCell
// //                 style={{
// //                   padding: 5,
// //                   color: "white",
// //                   backgroundColor: "#0071BA",
// //                   fontFamily: "poppins",
// //                   fontSize: "20px",
// //                 }}
// //               >
// //                 Modify
// //               </TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {data.map((booking, index) => (
// //               <TableRow style={{ padding: 5 }} key={index}>
// //                 <TableCell style={{ padding: 5 }}>{index + 1}</TableCell>
// //                 <TableCell style={{ padding: 5 }}>
// //                   {booking.dateBooked}
// //                 </TableCell>
// //                 <TableCell style={{ padding: 5 }}>{booking.type}</TableCell>
// //                 <TableCell style={{ padding: 5 }}>{booking.selected}</TableCell>
// //                 <TableCell style={{ padding: 5 }}>
// //                   <IconButton
// //                     color="secondary"
// //                     onClick={() => handleDeleteClick(booking)}
// //                   >
// //                     <DeleteIcon />
// //                   </IconButton>
// //                 </TableCell>
// //                 <TableCell style={{ padding: 5 }}>
// //                   {booking.type === "Food" && (
// //                     <Select
// //                       style={{ width: "200px" }}
// //                       name="preference"
// //                       // defaultValue={booking.selected}
// //                       value={booking.selected}
// //                       onChange={(e) =>
// //                         editFood(booking.dateBooked, e.target.value)
// //                       }
// //                     >
// //                       {/* <option value="Veg">Veg</option>
// //                       <option value="Non-Veg">Non-Veg</option> */}
// //                       <MenuItem value="Veg">Veg</MenuItem>
// //                       <MenuItem value="Non-Veg">Non-Veg</MenuItem>
// //                     </Select>
// //                   )}
// //                 </TableCell>
// //                 {/* <TableCell style={{ padding: 2 }}>
// //                   {booking[index].type === "Cab" && (<Button
// //                     variant="contained"
// //                     color="primary"
// //                     onClick={() => editCab()}
// //                   >
// //                     Save
// //                   </Button>)
// //                   }
// //                   {booking[index].type === "Food" && (<Button
// //                     variant="contained"
// //                     color="primary"
// //                     onClick={() => editFood()}
// //                   >
// //                     Save
// //                   </Button>)
// //                   }
// //                 </TableCell> */}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <Dialog
// //         open={isDeleteDialogOpen}
// //         onClose={handleDeleteDialogClose}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>Confirm Deletion</DialogTitle>
// //         <DialogContent>
// //           <p>Are you sure you want to delete this booking?</p>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button
// //             onClick={handleConfirmDelete}
// //             className="deleteButton"
// //             style={{
// //               backgroundColor: "blue",
// //               color: "white",
// //               transition: "background-color 0.3s ease",
// //             }}
// //             onMouseOver={(e) => (e.target.style.backgroundColor = "#3457D5")}
// //             onMouseOut={(e) => (e.target.style.backgroundColor = "#0039a6")}
// //           >
// //             Delete
// //           </Button>
// //           <Button
// //             onClick={handleDeleteDialogClose}
// //             className="cancelButton"
// //             style={{
// //               backgroundColor: "red",
// //               color: "white",
// //               transition: "background-color 0.3s ease",
// //             }}
// //             onMouseOver={(e) => (e.target.style.backgroundColor = "#E32636")}
// //             onMouseOut={(e) => (e.target.style.backgroundColor = "#BA0021")}
// //           >
// //             Cancel
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default CurrentBookings;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   Paper,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Menu,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from '@mui/icons-material/Edit';
// import "./CurrentBookings.css";

// import api from "../api";

// const CurrentBookings = () => {
//   const initialData = [];
//   let dates = [];

//   const [data, setData] = useState(initialData);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);

//   const handleOpenMenu = (event) => {
//     setProfileAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setProfileAnchorEl(null);
//   };

//   const fetchData = async () => {
//     let response;
//     try {
//       response = await api.post("/user/getbookings", {
//         isFoodRequired: true,
//       });
//       console.log("current-booking:", response.data);
//       setData([...response.data]);
//     } catch (error) {
//       if (error.response.status === 404) {
//         console.log("No data found!");
//         setData([]);
//       } else {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const editFood = async (dates, newValue) => {

//       if (!Array.isArray(dates)) {
//         dates = [dates];
//       }
//       let response;
//       try {
//         response = await api.patch("/user/bookings", {
//           dates: dates,
//           modifyFood: true,
//           preference: newValue,
//         });
//         fetchData();
//       } catch (error) {
//         console.error(error);
//       }

//   };

//   const handleCancel = async (dates, type) => {
//     let response;
//     if (!Array.isArray(dates)) {
//       dates = [dates];
//     }
//     if (type === "Food") {
//       try {
//         response = await api.post("/user/deletebookings", {
//           dates: dates,
//           cancelFood: true,
//         });
//         fetchData();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleDeleteClick = (booking) => {
//     if (!isEditable(booking.dateBooked)) {
//       alert("Editing is not allowed after 10 am or on the given date");
//     } else {
//       setSelectedBooking(booking);
//       setDeleteDialogOpen(true);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedBooking && isEditable(selectedBooking.dateBooked)) {
//       await handleCancel(selectedBooking.dateBooked, selectedBooking.type);
//       handleDeleteDialogClose();
//     } else {
//       alert("Editing is not allowed after 10 am or on the given date");
//     }
//   };

//   const handleDeleteDialogClose = () => {
//     setDeleteDialogOpen(false);
//     setSelectedBooking(null);
//   };

//   const isEditable = (bookingDate) => {
//     const currentDate = new Date();
//     const particularDate= new Date(bookingDate);
//     const dayBeforeParticularDate=new Date(bookingDate);
//     dayBeforeParticularDate.setDate(particularDate.getDate()-1);

//     if(currentDate.getDate()===particularDate.getDate()){
//       return false;
//     }

//     if(dayBeforeParticularDate.getDate()===currentDate.getDate()  )  {
//       const currentHour = currentDate.getHours();

//     if (currentHour >= 10) {
//       return false;
//     }
//     else{
//       return true
//     }
//     }

//     if (dayBeforeParticularDate.getDate()>currentDate.getDate()){
//       return true;
//     }

//     // const bookingDateTime = new Date(bookingDate);
//     // const previousDate = new Date(currentDate);
//     // previousDate.setDate(currentDate.getDate() - 1);

//     // return bookingDateTime > previousDate;
//   };

//   return (
//     <div className="table-container">
//       <div
//         style={{
//           fontSize: "29px",
//           width:'100vw',
//           fontFamily: "poppins",
//           fontWeight: 600,
//           marginLeft: "246px",
//           paddingTop: "20px",
//           color: "#0071BA",
//         }}
//       >
//         <span>Current </span>
//         <span>Bookings:</span>
//       </div>
//       <TableContainer
//         component={Paper}
//         style={{
//           width: "45vw",
//           marginTop: "0.2vw",
//           marginLeft: "2vw",
//           maxHeight: 400,
//           justifyContent: "center",
//           border: "1px solid #E9E9E9",
//           borderRadius: "10px",
//         }}
//       >
//         <Table sx={{ minWidth: 250 }} stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell
//                 style={{
//                   backgroundColor: "#004B81",
//                   color: "white",
//                   fontSize: "14px",
//                 }}
//               >
//                 Sl No.
//               </TableCell>
//               <TableCell
//                 style={{
//                   padding: 5,
//                   color: "white",
//                   backgroundColor: "#0071BA",
//                   fontFamily: "poppins",
//                   fontSize: "20px",
//                 }}
//               >
//                 Date
//               </TableCell>
//               {/* <TableCell
//                 style={{
//                   padding: 5,
//                   color: "white",
//                   fontFamily: "poppins",
//                   backgroundColor: "#0071BA",
//                   fontSize: "20px",
//                 }}
//               >
//                 Type
//               </TableCell> */}
//               <TableCell
//                 style={{
//                   padding: 5,
//                   color: "white",
//                   fontFamily: "poppins",
//                   backgroundColor: "#0071BA",
//                   fontSize: "20px",
//                 }}
//               >
//                 Preference
//               </TableCell>
//               {/* <TableCell
//                 style={{
//                   padding: 5,
//                   color: "white",
//                   backgroundColor: "#0071BA",
//                   fontFamily: "poppins",
//                   fontSize: "20px",
//                 }}
//               >
//                 Edit
//               </TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((booking, index) => (
//               <TableRow style={{ padding: 5 }} key={index}>
//                 <TableCell style={{ padding: 5 }}>{index + 1}</TableCell>
//                 <TableCell style={{ padding: 5 }}>
//                   {booking.dateBooked}
//                 </TableCell>
//                 {/* <TableCell style={{ padding: 5 }}>{booking.type}</TableCell> */}
//                 <TableCell style={{ padding: 5 }}>{booking.selected}</TableCell>
//                 <TableCell style={{ padding: 5 }}>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleDeleteClick(booking)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>

//                 <TableCell >
//                 <Menu
//             anchorEl={profileAnchorEl}
//             open={Boolean(profileAnchorEl)}
//             onClose={handleCloseMenu}
//           >
//             <MenuItem >
//               <EditIcon

//                 style={{ marginRight: "8px" }}
//               />
//               Profile
//             </MenuItem>

//           </Menu>
//           </TableCell>
//                 {/* <TableCell style={{ padding: 5 }}>
//                   {booking.type === "Food" && (
//                     <Select
//                       style={{ width: "200px" }}
//                       name="preference"
//                       value={booking.selected}
//                       onChange={(e) =>{
//                         if (isEditable(booking.dateBooked)){
//                           editFood(booking.dateBooked, e.target.value)
//                         }
//                         else{
//                           alert("Editing is not allowed after 10 am or on the given date");
//                         }
//                         }
//                       }
//                     >
//                       <MenuItem value="Veg">Veg</MenuItem>
//                       <MenuItem value="Non-Veg">Non-Veg</MenuItem>
//                     </Select>
//                   )}
//                 </TableCell> */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog
//         open={isDeleteDialogOpen}
//         onClose={handleDeleteDialogClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to delete this booking?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleConfirmDelete}
//             className="deleteButton"
//             style={{
//               backgroundColor: "blue",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Delete
//           </Button>
//           <Button
//             onClick={handleDeleteDialogClose}
//             className="cancelButton"
//             style={{
//               backgroundColor: "red",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CurrentBookings;



// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Menu,
//   MenuItem,
//   Typography
// } from "@mui/material";

// import "./CurrentBookings.css";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import api from "../api";
// import Meal from '../assets/meal.png';

// const CurrentBookings = () => {
//   const initialData = [];
//   let dates = [];

//   const [data, setData] = useState(initialData);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [isEditDialogOpen, setEditDialogOpen] = useState(false);
//   const [editPreference, setEditPreference] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [isEditSuccessModalOpen, setEditSuccessModalOpen] = useState(false);
//   const [isDeleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);

//   const fetchData = async () => {
//     let response;
//     try {
//       response = await api.post("/user/getbookings", {
//         isFoodRequired: true,
//       });
//       console.log("current-booking:", response.data);
//       setData([...response.data]);
//     } catch (error) {
//       if (error.response.status === 404) {
//         console.log("No data found!");
//         setData([]);
//       } else {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const editFood = async (dates, newValue) => {
//     if (!Array.isArray(dates)) {
//       dates = [dates];
//     }
//     let response;
//     try {
//       response = await api.patch("/user/bookings", {
//         dates: dates,
//         modifyFood: true,
//         preference: newValue,
//       });
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCancel = async (dates, type) => {
//     let response;
//     if (!Array.isArray(dates)) {
//       dates = [dates];
//     }
//     if (type === "Food") {
//       try {
//         response = await api.post("/user/deletebookings", {
//           dates: dates,
//           cancelFood: true,
//         });
//         fetchData();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
//   const handleDeleteClick = (booking) => {
//     setSelectedBooking(booking);
//     setDeleteDialogOpen(true);
//   };

//   const handleEditClick = (booking) => {
//     setSelectedBooking(booking);
//     setEditDialogOpen(true);
//     setEditPreference(booking.selected);
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedBooking) {
//       await handleCancel(selectedBooking.dateBooked, selectedBooking.type);
//       handleDeleteDialogClose();
//       setDeleteSuccessModalOpen(true);
//     }
//   };

//   const handleConfirmEdit = async () => {
//     if (selectedBooking) {
//       await editFood(selectedBooking.dateBooked, editPreference);
//       handleEditDialogClose();
//       setEditSuccessModalOpen(true);
//     }
//   };
//   const handleMoreOptionsClick = (event, booking) => {
//     setAnchorEl(event.currentTarget);
//     setMenuOpen(true);
//     setSelectedBooking(booking);
//   };

//   const handleMoreOptionsClose = () => {
//     setMenuOpen(false);
//     setSelectedBooking(null);
//   };
//   const handleCloseEditSuccessModal = () => {
//     setEditSuccessModalOpen(false);
//   };

//   const handleCloseDeleteSuccessModal = () => {
//     setDeleteSuccessModalOpen(false);
//   };

//   const SuccessModal = ({ open, onClose, title, message }) => (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         <IconButton>
//           <CheckCircleOutlineIcon style={{ color: "green" }} fontSize="large" />
//         </IconButton>
//         {title}
//       </DialogTitle>
//       <DialogContent>
//         <Typography>{message}</Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           OK
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

  

  

//   const handleDeleteDialogClose = () => {
//     setDeleteDialogOpen(false);
//     setSelectedBooking(null);
//   };

//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false);
//     setSelectedBooking(null);
//   };

//   // const isEditable = (bookingDate) => {
//   //   const currentDate = new Date();
//   //   const particularDate = new Date(bookingDate);
//   //   const dayBeforeParticularDate = new Date(bookingDate);
//   //   dayBeforeParticularDate.setDate(particularDate.getDate() - 1);

//   //   if (currentDate.getDate() === particularDate.getDate()) {
//   //     return false;
//   //   }

//   //   if (dayBeforeParticularDate.getDate() === currentDate.getDate()) {
//   //     const currentHour = currentDate.getHours();

//   //     if (currentHour >= 10) {
//   //       return false;
//   //     } else {
//   //       return true;
//   //     }
//   //   }

//   //   if (dayBeforeParticularDate.getDate() > currentDate.getDate()) {
//   //     return true;
//   //   }
//   // };

//   return (
//     <div className="table-container">
      
//       <TableContainer
//         component={Paper}
//         style={{
//           width: "32vw",
//           marginTop: "0.2vw",
//           marginLeft: "0.10000000000000009vw;",
//           maxHeight: 450,
//           justifyContent: "center",
//           // border: "1px solid #E9E9E9",
//           // borderRadius: "10px",
//         }}
//       >
//         <Table sx={{ minWidth: 250 }} stickyHeader>
//           {/* <TableHead>
//             <TableRow>
//               <TableCell
//                 style={{
//                   backgroundColor: "#004B81",
//                   color: "white",
//                   fontSize: "15px",
//                 }}
//               >
//                 Sl No.
//               </TableCell>
//               <TableCell
//                 style={{
                  
//                   color: "white",
//                   backgroundColor: "#0071BA",
//                   fontFamily: "poppins",
//                   fontSize: "15px",
//                 }}
//               >
//                 Date
//               </TableCell>
//               <TableCell
//                 style={{
                  
//                   color: "white",
//                   fontFamily: "poppins",
//                   backgroundColor: "#0071BA",
//                   fontSize: "15px",
//                 }}
//               >
//                 Preference
//               </TableCell>
//               <TableCell
//                 style={{
                  
//                   color: "white",
//                   backgroundColor: "#0071BA",
//                   fontFamily: "poppins",
//                   fontSize: "15px",
//                 }}
//               >
//                 Delete
//               </TableCell>
//               {/* <TableCell
//                 style={{
//                   padding: 5,
//                   color: "white",
//                   backgroundColor: "#0071BA",
//                   fontFamily: "poppins",
//                   fontSize: "20px",
//                 }}
//               >
//                 Edit
//               </TableCell> */}
//             {/* </TableRow>
//           </TableHead> */} 
//           <TableBody>
//             {data.map((booking, index) => (
//               <TableRow style={{ padding: 5 }} key={index}>

//                 {/* <TableCell style={{ padding: 5 , fontSize:"13px",fontFamily: "poppins"}}>{index + 1}</TableCell> */}
//                 <TableCell style={{ paddingLeft:'10px' , fontSize:"12px" ,fontFamily: "poppins",borderBottom:'0'}}>
//                  <img src={Meal}/>
//                 </TableCell>
//                 <TableCell style={{ padding: 5 , fontSize:"12px" ,fontFamily: "poppins",borderBottom:'0'}}>
//                   {booking.dateBooked}
//                 </TableCell>
//                 <TableCell style={{paddingRight: 5 , fontSize:"13px" ,fontFamily: "poppins" , paddingBottom:'15px' , paddingLeft:'192px',borderBottom:'0'}}>{booking.selected}</TableCell>
//                 <TableCell style={{ borderBottom: '0', paddingLeft: '45px' }}>
//               <IconButton
//                 onClick={(event) => handleMoreOptionsClick(event, booking)}
//               >
//                 <MoreVertIcon />
//               </IconButton>
//               <Menu
//                 anchorEl={anchorEl}
//                 open={isMenuOpen}
//                 onClose={handleMoreOptionsClose}
//               >
//                 <MenuItem onClick={() => handleEditClick(selectedBooking)}>
//                   Edit
//                 </MenuItem>
//                 <MenuItem onClick={() => handleDeleteClick(selectedBooking)}>
//                   Delete
//                 </MenuItem>
//               </Menu>
//             </TableCell>
                
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog
//         open={isDeleteDialogOpen}
//         onClose={handleDeleteDialogClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to delete this booking?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleConfirmDelete}
//             className="deleteButton"
//             style={{
//               backgroundColor: "blue",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Delete
//           </Button>
//           <Button
//             onClick={handleDeleteDialogClose}
//             className="cancelButton"
//             style={{
//               backgroundColor: "red",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={handleEditDialogClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Edit Preference</DialogTitle>
//         <DialogContent>
//           <Select
//             style={{ width: "200px" }}
//             name="preference"
//             value={editPreference}
//             onChange={(e) => setEditPreference(e.target.value)}
//           >
//             <MenuItem value="Veg">Veg</MenuItem>
//             <MenuItem value="Non-Veg">Non-Veg</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleConfirmEdit}
//             className="editButton"
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Save
//           </Button>
//           <Button
//             onClick={handleEditDialogClose}
//             className="cancelButton"
//             style={{
//               backgroundColor: "red",
//               color: "white",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <SuccessModal
//         open={isEditSuccessModalOpen}
//         onClose={handleCloseEditSuccessModal}
//         title="Edit Successful"
//         message="The booking has been edited successfully!"
//       />

//       <SuccessModal
//         open={isDeleteSuccessModalOpen}
//         onClose={handleCloseDeleteSuccessModal}
//         title="Delete Successful"
//         message="The booking has been deleted successfully!"
//       />
//     </div>
//   );
// };

// export default CurrentBookings;


import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import Swal from 'sweetalert2';

import "./CurrentBookings.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from "../api";
import Meal from '../assets/meal.png';

const CurrentBookings = () => {
  const initialData = [];
  let dates = [];

  const [data, setData] = useState(initialData);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editPreference, setEditPreference] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEditSuccessModalOpen, setEditSuccessModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false);

  const fetchData = async () => {
    let response;
    try {
      response = await api.post("/user/getbookings", {
        isFoodRequired: true,
      });
      console.log("current-booking:", response.data);
      setData([...response.data]);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("No data found!");
        setData([]);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editFood = async (dates, newValue) => {
    if (!Array.isArray(dates)) {
      dates = [dates];
    }
    let response;
    try {
      response = await api.patch("/user/bookings", {
        dates: dates,
        modifyFood: true,
        preference: newValue,
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (dates, type) => {
    let response;
    if (!Array.isArray(dates)) {
      dates = [dates];
    }
    if (type === "Food") {
      try {
        response = await api.post("/user/deletebookings", {
          dates: dates,
          cancelFood: true,
        });
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setMenuOpen(false);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
    setMenuOpen(false);
    setEditPreference(booking.selected);
  };

  const handleConfirmDelete = async () => {
    if (selectedBooking) {
      await handleCancel(selectedBooking.dateBooked, selectedBooking.type);
      handleDeleteDialogClose();
      Swal.fire('Deleted!', 'Your booking has been deleted successfully!\nA confirmation mail has been sent to your email. \n Thank You!', 'success');

    }
  };

  const handleConfirmEdit = async () => {
    if (selectedBooking) {
      await editFood(selectedBooking.dateBooked, editPreference);
      handleEditDialogClose();
      Swal.fire('Edited!', 'Your booking has been edited successfully!\n A confirmation mail has been sent to your email. \n Thank You!', 'success');
    }
  };
  const handleMoreOptionsClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
    setSelectedBooking(booking);
  };

  const handleMoreOptionsClose = () => {
    setMenuOpen(false);
    setSelectedBooking(null);
  };
  const handleCloseEditSuccessModal = () => {
    setEditSuccessModalOpen(false);
    Swal.close();
  };

  const handleCloseDeleteSuccessModal = () => {
    setDeleteSuccessModalOpen(false);
    Swal.close();
  };

  const SuccessModal = ({ open, onClose, title, message }) => (
    <Dialog open={open} onClose={() => { onClose(); handleMoreOptionsClose(); }}>
      setMenuOpen(false);
      <DialogTitle>
        <IconButton>
          <CheckCircleOutlineIcon style={{ color: "green" }} fontSize="large" />
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            handleMoreOptionsClose();
            Swal.close();
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );

  

  

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedBooking(null);
  };

  // const isEditable = (bookingDate) => {
  //   const currentDate = new Date();
  //   const particularDate = new Date(bookingDate);
  //   const dayBeforeParticularDate = new Date(bookingDate);
  //   dayBeforeParticularDate.setDate(particularDate.getDate() - 1);

  //   if (currentDate.getDate() === particularDate.getDate()) {
  //     return false;
  //   }

  //   if (dayBeforeParticularDate.getDate() === currentDate.getDate()) {
  //     const currentHour = currentDate.getHours();

  //     if (currentHour >= 10) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }

  //   if (dayBeforeParticularDate.getDate() > currentDate.getDate()) {
  //     return true;
  //   }
  // };

  return (
    <div className="table-container">
      
      <TableContainer
        component={Paper}
        style={{
          width: "32vw",
          marginTop: "0.2vw",
          marginLeft: "0.10000000000000009vw;",
          maxHeight: 450,
          justifyContent: "center",
          // border: "1px solid #E9E9E9",
          // borderRadius: "10px",
        }}
      >
        <Table sx={{ minWidth: 250 }} stickyHeader>
          {/* <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#004B81",
                  color: "white",
                  fontSize: "15px",
                }}
              >
                Sl No.
              </TableCell>
              <TableCell
                style={{
                  
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "15px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  
                  color: "white",
                  fontFamily: "poppins",
                  backgroundColor: "#0071BA",
                  fontSize: "15px",
                }}
              >
                Preference
              </TableCell>
              <TableCell
                style={{
                  
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "15px",
                }}
              >
                Delete
              </TableCell>
              {/* <TableCell
                style={{
                  padding: 5,
                  color: "white",
                  backgroundColor: "#0071BA",
                  fontFamily: "poppins",
                  fontSize: "20px",
                }}
              >
                Edit
              </TableCell> */}
            {/* </TableRow>
          </TableHead> */} 
          <TableBody>
            {data.map((booking, index) => (
              <TableRow style={{ padding: 5 }} key={index}>

                {/* <TableCell style={{ padding: 5 , fontSize:"13px",fontFamily: "poppins"}}>{index + 1}</TableCell> */}
                <TableCell style={{ fontSize:"12px" ,fontFamily: "poppins",borderBottom:'0', paddingLeft:'50px'}}>
                 <img src={Meal}/>
                </TableCell>
                <TableCell style={{ padding: 5 , fontSize:"12px" ,fontFamily: "poppins",borderBottom:'0', width:'117px'}}>
                  {booking.dateBooked}
                </TableCell>
                <TableCell style={{paddingRight: 2 , fontSize:"13px" ,fontFamily: "poppins" , paddingBottom:'15px' , paddingLeft:'170px',borderBottom:'0', width:'85px'}}>{booking.selected}</TableCell>
                <TableCell style={{ borderBottom: '0', marginLeft: '65px' }}>
              <IconButton
                onClick={(event) => handleMoreOptionsClick(event, booking)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMoreOptionsClose}
              >
                <MenuItem onClick={() => handleEditClick(selectedBooking)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeleteClick(selectedBooking)}>
                  Delete
                </MenuItem>
              </Menu>
            </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this booking?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDelete}
            className="deleteButton"
            style={{
              backgroundColor: "blue",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleDeleteDialogClose}
            className="cancelButton"
            style={{
              backgroundColor: "red",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Preference</DialogTitle>
        <DialogContent>
          <Select
            style={{ width: "200px" }}
            name="preference"
            value={editPreference}
            onChange={(e) => setEditPreference(e.target.value)}
          >
            <MenuItem value="Veg">Veg</MenuItem>
            <MenuItem value="Non-Veg">Non-Veg</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmEdit}
            className="editButton"
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleEditDialogClose}
            className="cancelButton"
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessModal
        open={isEditSuccessModalOpen}
        onClose={handleCloseEditSuccessModal}
        title="Edit Successful"
        message="The booking has been edited successfully!"
      />

      <SuccessModal
        open={isDeleteSuccessModalOpen}
        onClose={handleCloseDeleteSuccessModal}
        title="Delete Successful"
        message="The booking has been deleted successfully!"
      />
    </div>
  );
};

export default CurrentBookings;
