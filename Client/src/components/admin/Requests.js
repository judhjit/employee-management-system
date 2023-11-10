



import React, { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, TextField } from '@mui/material';
import * as XLSX from 'xlsx';

const Requests = () => {
    const initialData = [
        { EmpID: '1234', Service: 'Desk', date: '01/02/2023' },
        { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
        { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
        { EmpID: '1234', Service: 'Lunch', date: '01/02/2023' },
        { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
        { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
        { EmpID: '1234', Service: 'Cab', date: '02/02/2023' },
        { EmpID: '1330', Service: 'Cab', date: '05/11/2023' },
        { EmpID: '1332', Service: 'Desk', date: '06/11/2023' },
        { EmpID: '1326', Service: 'Lunch', date: '07/01/2024' },
        { EmpID: '1272', Service: 'Cab', date: '01/02/2023' },
        { EmpID: '1271', Service: 'Desk', date: '15/03/2023' },
        { EmpID: '1348', Service: 'Lunch', date: '20/04/2023' },
        { EmpID: '1370', Service: 'Desk', date: '20/12/2023' },
        { EmpID: '1341', Service: 'Lunch', date: '20/11/2023' },
    ];

    const [data, setData] = useState(initialData);
    const [filterRange, setFilterRange] = useState('all');
    const [filterService, setFilterService] = useState('all');
    const [filteredData, setFilteredData] = useState(initialData);
    const [filterEmpID, setFilterEmpID] = useState('');

    useEffect(() => {
        filterData(filterRange, filterService, filterEmpID);
    }, [filterRange, filterService, filterEmpID]);

    const handleFilterChange = (event) => {
        setFilterRange(event.target.value);
    };

    const handleServiceFilterChange = (event) => {
        setFilterService(event.target.value);
    };

    const handleEmpIDFilterChange = (event) => {
        setFilterEmpID(event.target.value);
    };

    const filterData = (dateCondition, serviceCondition, empIDCondition) => {
        let filtered = initialData;

        if (dateCondition !== 'all') {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            let futureDate = new Date(currentDate);

            if (dateCondition === '1w') {
                futureDate.setDate(currentDate.getDate() + 7);
            } else if (dateCondition === '1m') {
                futureDate.setMonth(currentDate.getMonth() + 1);
            } else if (dateCondition === '6m') {
                futureDate.setMonth(currentDate.getMonth() + 6);
            }

            filtered = filtered.filter((item) => {
                const itemDate = parseDate(item.date);
                return (
                    itemDate >= currentDate &&
                    itemDate <= futureDate &&
                    (serviceCondition === 'all' || item.Service === serviceCondition)
                );
            });
        }

        if (empIDCondition !== '') {
            filtered = filtered.filter((item) => item.EmpID.includes(empIDCondition));
        }

        setFilteredData(groupData(filtered));
    };

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    const groupData = (data) => {
        const groupedData = [];

        data.forEach((item) => {
            const existingGroup = groupedData.find((group) => group.EmpID === item.EmpID && group.date === item.date);

            if (existingGroup) {
                existingGroup.Service = `${existingGroup.Service}, ${item.Service}`;
            } else {
                groupedData.push({ EmpID: item.EmpID, date: item.date, Service: item.Service });
            }
        });

        return groupedData;
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
        XLSX.writeFile(wb, 'aditi.xlsx');
    };

    return (
      <div>
      <div style={{ paddingTop: '3vw', display: 'flex', paddingRight: '10vw' ,marginLeft:'9vw'}}>
          <TextField
              label="Filter by Employee ID"
              value={filterEmpID}
              onChange={handleEmpIDFilterChange}
          />
          <Select
              label="Filter by Service"
              value={filterService}
              onChange={handleServiceFilterChange}
          >
              <option value="all">All</option>
              <option value="Cab">Cab</option>
              <option value="Lunch">Lunch</option>
              <option value="Desk">Desk</option>
          </Select>
          <Select
              label="Filter by Date"
              value={filterRange}
              onChange={handleFilterChange}
          >
              <option value="all">All</option>
              <option value="1w">1 week</option>
              <option value="1m">1 month</option>
              <option value="6m">6 months</option>
          </Select>
          <div style={{ paddingLeft: '5vw' }}>
              <Button
                  variant="contained"
                  onClick={exportToExcel}
                  style={{
                      marginLeft: '39vw',
                      height: '2vw',
                      width: '12vw',
                      backgroundColor: '#FFDB58',
                  }}
              >
                  Export To Excel
              </Button>
          </div>
      </div>
      <div style={{ width: '80vw' }}>
          <Paper>
              <TableContainer style={{ maxHeight: 440 ,marginLeft:'9vw'}}>
                  <Table stickyHeader>
                      <TableHead>
                          <TableRow>
                              <TableCell style={{ background: 'lightgrey' }}>Employee ID</TableCell>
                              <TableCell style={{ background: 'lightgrey' }}>Date</TableCell>
                              <TableCell style={{ background: 'lightgrey' }}>Services</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {filteredData.map((item, index) => (
                              <TableRow key={index}>
                                  <TableCell>{item.EmpID}</TableCell>
                                  <TableCell>{item.date}</TableCell>
                                  <TableCell>{item.Service}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </Paper>
      </div>
  </div>
    );
};

export default Requests;







