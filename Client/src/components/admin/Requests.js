




import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const Requests = () => {
  const initialData = [
    { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
    { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
    { EmpID: '1324', Service: 'Lunch', date: '20/04/2023' },
    { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
    { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
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

  useEffect(() => {
    filterData(filterRange, filterService);
  }, [filterRange, filterService]);

  const handleFilterChange = (event) => {
    setFilterRange(event.target.value);
  };

  const handleServiceFilterChange = (event) => {
    setFilterService(event.target.value);
    console.log(filterService);
  };

  const filterData = (dateCondition, serviceCondition) => {
    if  (dateCondition === 'all' && serviceCondition === 'all') {
            setFilteredData(initialData);
          }  else {
            
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


    console.log(futureDate);
    const filteredData = initialData.filter((item) => {
      const itemDate = parseDate(item.date);
      return (
        itemDate >= currentDate &&
        itemDate <= futureDate &&
        (serviceCondition === 'all' || item.Service === serviceCondition)
      );
    });

    setFilteredData(filteredData);
  }
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
    XLSX.writeFile(wb, 'aditi.xlsx');
  };

  return (
    <div>
      <div style={{ paddingTop: '20px', display: 'flex', paddingRight: '20px' }}>
        <label>
          Filter by Date:
          <select value={filterRange} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="1w">1 week</option>
            <option value="1m">1 month</option>
            <option value="6m">6 months</option>
          </select>
        </label>
        <label>
          Filter by Service:
          <select value={filterService} onChange={handleServiceFilterChange}>
            <option value="all">All</option>
            <option value="Cab">Cab</option>
            <option value="Lunch">Lunch</option>
            <option value="Desk">Desk</option>
          </select>
        </label>
        <div style={{ paddingLeft: '10px' }}>
          <Button variant="contained" onClick={exportToExcel}>
            Download
          </Button>
        </div>
      </div>
      <div style={{ width: '1500px' }}>
        <table style={{ width: '1500px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.EmpID}</td>
                <td>{item.Service}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
