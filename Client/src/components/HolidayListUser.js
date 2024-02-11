import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../api';

const HolidayListUser = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        api.get('/user/getholidaysofthisandupcomingyears')
            .then(response => {
                setHolidays(response.data.holidays);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div
            style={{
                backgroundColor: "white",
                height: "664px",
                width: "75vw",
                textAlign: "center",
                margin: "0 auto",
            }}
        >
            <h1>Holidays</h1>
            <TableContainer component={Paper}
                style={{
                    width: "70vw",
                    marginTop: "0.2vw",
                    marginLeft: "2vw",
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {holidays.sort((a, b) => a.holiday_date.localeCompare(b.holiday_date)).map(holiday => {
                            return (
                                <TableRow key={holiday.holiday_date}>
                                    <TableCell>{holiday.holiday_name}</TableCell>
                                    <TableCell>{holiday.holiday_date}</TableCell>
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

export default HolidayListUser;