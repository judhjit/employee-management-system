import React, { useState, useEffect } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../../api';
import './Holiday.css';

const Holiday = () => {
    const [holidayName, setHolidayName] = useState('');
    const [holidayDate, setHolidayDate] = useState('');
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        api.get('/admin/getholidaysofthisandupcomingyears')
            .then(response => {
                setHolidays(response.data.holidays);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const createHoliday = (event) => {
        event.preventDefault();
        api.post('/admin/createholiday', { holidayName, holidayDate })
            .then(response => {
                setHolidays([...holidays, { holiday_name: holidayName, holiday_date: holidayDate }]);
                setHolidayName('');
                setHolidayDate('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteHoliday = (holiday) => {
        api.post('/admin/deleteholiday', { holidayName: holiday.holiday_name, holidayDate: holiday.holiday_date })
            .then(response => {
                setHolidays(holidays.filter(h => h.holiday_date !== holiday.holiday_date));
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div
            style={{
                backgroundColor: "white",
                height: "60vh",
                width: "50vw",
                textAlign: "center",
                margin: "0 auto",
            }}
        >
            <h1>Edit Holidays</h1>
            <form onSubmit={createHoliday}>
                <TextField
                    label="Holiday Name"
                    type="text"
                    value={holidayName}
                    onChange={(event) => setHolidayName(event.target.value)}
                    required
                />
                <TextField
                    label="Holiday Date"
                    type="date"
                    value={holidayDate}
                    onChange={(event) => setHolidayDate(event.target.value)}
                    required
                />
                <Button variant="contained" type="submit">
                    Add Holiday
                </Button>
            </form>
            <TableContainer component={Paper}
                style={{
                    width: "54vw",
                    marginTop: "2vw",
                    marginLeft: "12vw",
                    maxHeight: 400,
                    justifyContent: "center",
                    border: "1px solid #E9E9E9",
                    borderRadius: "10px",
                }}
            // className="table1"
            >
                <Table sx={{ minWidth: 500 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                style={{
                                    backgroundColor: "#004B81",
                                    color: "white",
                                    fontSize: "14px",
                                }}
                            >Holiday Name</TableCell>
                            <TableCell
                                style={{
                                    backgroundColor: "#004B81",
                                    color: "white",
                                    fontSize: "14px",
                                }}
                            >Holiday Date</TableCell>
                            <TableCell
                                style={{
                                    backgroundColor: "#004B81",
                                    color: "white",
                                    fontSize: "14px",
                                }}
                            >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {holidays.sort((a, b) => a.holiday_date.localeCompare(b.holiday_date)).map(holiday => {
                            return (
                                <TableRow key={holiday.holiday_date}>
                                    <TableCell>{holiday.holiday_name}</TableCell>
                                    <TableCell>{holiday.holiday_date}</TableCell>
                                    <TableCell><Button variant="contained" onClick={() => deleteHoliday(holiday)}>Delete</Button></TableCell>
                                </TableRow>
                            );
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

export default Holiday;