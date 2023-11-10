import { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './LunchAndCabbook.css';
import cabMap from '../assets/cabbook.png';
import { Button } from '@mui/material';

const LunchAndCabForm = ({ selectedDates }) => {
    const [selectedSlot, setSelectedSlot] = useState('Morning');
    const [selectedLunch, setSelectedLunch] = useState('Veg');
    const [active, setActive] = useState([]);
    const [selectAllDates, setSelectAllDates] = useState(false);

    const handleSlotChange = (event) => {
        setSelectedSlot(event.target.value);
    };

    const handleLunchChange = (event) => {
        setSelectedLunch(event.target.value);
    };

    const handleBooking = (index) => {
        const updatedActive = [...active];
        if (updatedActive.includes(index)) {
            updatedActive.splice(updatedActive.indexOf(index), 1);
        } else {
            updatedActive.push(index);
        }
        setActive(updatedActive);
    };

    const handleSelectAllDates = () => {
        setSelectAllDates(!selectAllDates);
        if (!selectAllDates) {
            const allIndices = selectedDates.map((_, index) => index);
            setActive(allIndices);
        } else {
            setActive([]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="lunch-booking" style={{ paddingLeft: '10px' }}>
                    <Typography variant="h5" style={{ textAlign: 'left', paddingTop: '20px', fontSize: '30px' }}>
                        <span style={{ color: '#0071BA' }}>Book </span>
                        <span>Your Lunch!</span>
                    </Typography>
                    <div>
                        <h4 style={{ textAlign: 'left', paddingTop: '20px', fontSize: '20px' }}>Preference:</h4>
                    </div>
                    <div style={{ paddingLeft: '100px' }}>
                        <RadioGroup
                            aria-label="lunch-type"
                            name="lunch-type"
                            value={selectedLunch}
                            onChange={handleLunchChange}
                            row
                        >
                            <FormControlLabel
                                value="Veg"
                                control={<Radio />}
                                label="Veg"
                            />
                            <FormControlLabel
                                value="NonVeg"
                                control={<Radio />}
                                label="Non-Veg"
                            />
                            <FormControlLabel
                                value=""
                                control={<Radio />}
                                label="none"
                            />
                        </RadioGroup>
                    </div>
                </div>
                <div className="cab-booking">
                    <Typography variant="h5" style={{ textAlign: 'left', paddingTop: '20px', fontSize: '30px' }}>
                        <span >Book Your</span>
                        <span style={{ color: '#0071BA' }}> Cab!</span>
                    </Typography>
                    <div>
                        <h4 style={{ textAlign: 'left', paddingTop: '20px', fontSize: '20px' }}>Book Your Slot:</h4>
                    </div>
                    <FormControl style={{ paddingLeft: '25px', paddingTop: '15px' }}>
                        <Select
                            value={selectedSlot}
                            onChange={handleSlotChange}
                            displayEmpty
                            className="select"
                            style={{ width: '12vw' }}
                        >
                            <MenuItem value="9:00am-5:00pm" >9:00am-5:00pm</MenuItem>
                            <MenuItem value="5:00am-2:00pm">5:00am-2:00pm</MenuItem>
                            <MenuItem value="6:00am-3:00pm">6:00am-3:00pm</MenuItem>
                            <MenuItem value="">none</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div>
                <Button variant='contained' style={{ top: '15px', width: '10vw' ,marginLeft:'60vw'}}>Submit</Button>
            </div>
        </div>
    );
};

export default LunchAndCabForm;