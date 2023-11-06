import { Button, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import offPhoto from '../assets/OfficeLayout.jpeg'
import './DeskBooking.css'
import { green } from '@mui/material/colors';

const DeskBooking = ({ selectedDates }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const [table, bookTable] = useState([{ date: "", id: "", tableno: "" }])

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seat,setSeat] = useState("")

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0071BA',
      },
    },
  });

  const handleDeskView = (index) => {
   
    setActive(index);
    // console.log(index);
    const selectedDate = selectedDates[index].toDateString();

    // Check if the date already exists in the table
    if (!table.some((record) => record.date === selectedDate)) {
      // If it doesn't exist, add it to the table
      bookTable([...table, { date: selectedDate, id: index }]);
    }
  };

  useEffect(() => {
    console.log(table)
  }, [table])

  // const handleTableSelect = (e) => {
  //   console.log(e.target.name)

  // }

  const handleTableSelect = (e) => {
    setSeat(e.target.name)
    e.target.style.backgroundColor='green'
    console.log(seat)
  };

  // const isSeatSelected = (event,name) =>{ 
  //   if(selectedSeats.includes(name)){
  //     event
  //   }
  // }

  return (
    <div style={{display:'flex' , flexDirection:'column'}}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '30vw', padding: '5%' }}>
        {selectedDates.map((d, index) => (
          <div key={index}>
            <Button
              variant="contained"
              onClick={() => {
                handleDeskView(index)
              }}
              color={index === active ? 'success' : 'primary'}
            >
              {d.toDateString()}
            </Button>
            {index === active }
          </div>
        ))}
        <Button variant="outlined" onClick={() => navigate('/cabbooking')}>next</Button>
      </div>
      <div style={{marginLeft:'10%'}}>
        <img src={offPhoto} style={{ height: "500px", width: '900px', display: 'block', position: 'relative' }} />

        <button style={{
          position: 'relative', backgroundColor: 'red', top: '-25rem',
          height: '100px',
          width: '50px',
          left: '4.1rem',
        }}
        name='Table1' onClick={handleTableSelect}>
          Table1
        </button>

        <button style={{ position: 'relative', top: '-30rem', left: '13rem' }} name='U1' onClick={handleTableSelect}>
          U1
        </button>
        <button style={{ position: 'relative', top: '-30rem', left: '22rem' }} name='U2' onClick={handleTableSelect}>
          U2
        </button>
        <button style={{ position: 'relative', top: '-30rem', left: '30rem' }} name='U3' onClick={handleTableSelect}>
          U3
        </button>
        <button style={{ position: 'relative', top: '-30.8rem', left: '34.5rem' }} name='R1' onClick={handleTableSelect}>
          R1
        </button>
        <button style={{ position: 'relative', top: '-30.8rem', left: '38.3rem' }} name='R2' onClick={handleTableSelect}>
          R2
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '7.3rem' }} name='C1' onClick={handleTableSelect}>
          C1
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '11.2rem' }} name='C2' onClick={handleTableSelect}>
          C2
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '16.9rem' }} name='C3' onClick={handleTableSelect}>
          C3
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '20.6rem' }} name='C4' onClick={handleTableSelect}>
          C4
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '25.9rem' }} name='C5' onClick={handleTableSelect}>
          C5
        </button>
        <button style={{ position: 'relative', top: '-20.8rem', left: '29.9rem' }} name='C6' onClick={handleTableSelect}>
          C6
        </button>
        
      </div>
    </div>
  );
};

export default DeskBooking;
{/* <map name="officeMap">
<area shape='rect' coords='381,390,500,479 ' alt='point' href='seat.htm'/>
<area shape='rect' coords='380,317,499,408' alt='point' href='seat.htm'/>
<area shape='rect' coords='526,323,612,376' alt='point' href='seat.htm'/>
<area shape='rect' coords='504,434,602,493' alt='point' href='seat.htm'/>
<area shape='rect' coords='401,197,499,256' alt='point' href='seat.htm'/>
<area shape='rect' coords='621,216,667,244' alt='point' href='seat.htm'/>
<area shape='rect' coords='10,105,116,339' alt='point' href='seat.htm' style={{backgroundColor:'blue'}}/>

</map>  */}

      
  
  

// const DeskBooking = () => {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2 style={{ color: 'green' }}>GeeksforGeeks</h2>
//       <img
//         src={OfficeLayout}
//         alt=""
//         width="800"
//         height='900'
//         className="aligncenter size-medium wp-image-910965"
//         useMap="#shapemap"
//       />

//       <map name="shapemap">
//         <area
//           shape="poly"
//           coords="59, 31, 28, 83, 91, 83"
          
//           alt="Triangle"
//         />
//         <area
//           shape="circle"
//           coords="155, 56, 26"
          
//           alt="Circle"
//         />
//         <area
//           shape="rect"
//           coords="224, 30, 276, 82"
          
//           alt="Square"
//         />
//       </map>
//     </div>
//   );
// };

