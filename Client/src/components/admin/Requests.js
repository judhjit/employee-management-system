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
    const [filterEmpID, setFilterEmpID] = useState('');

    useEffect(() => {

        filterData(filterRange, filterService,filterEmpID);
        if(filterEmpID!='')
            empFilter(filterEmpID)
    }, [filterRange, filterService,filterEmpID]);

    const handleFilterChange = (event) => {
        setFilterRange(event.target.value);
    };

    const handleServiceFilterChange = (event) => {
        setFilterService(event.target.value);
        console.log(filterService);
    };
    const handleEmpIDFilterChange = (event) => {
        console.log(filterEmpID)
        setFilterEmpID(event.target.value);
    };

    const empFilter = (empIDCondition) => {
        if (empIDCondition == '') {
            setFilteredData(filteredData);
        }
        else {
            const filtered = filteredData.filter(data => data.EmpID.includes(filterEmpID));
            setFilteredData(filtered);
        }
    }

    const filterData = (dateCondition, serviceCondition, empIDCondition) => {
        if (dateCondition === 'all') {
            setFilteredData(initialData);
        } else {
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
            return;
        }
        if (serviceCondition === 'all') {
            setFilteredData(initialData);
        }
        else {
            const filtered = initialData.filter(data => data.Service.includes(filterService));
            setFilteredData(filtered);
        }

        // if (empIDCondition == '') {
        //     setFilteredData(filteredData);
        // }
        // else {
        //     const filtered = initialData.filter(data => data.EmpID.includes(filterEmpID));
        //     setFilteredData(filtered);

        // }
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
            <label >
                    Filter by Employee ID:
                    <input
                        type="text"
                        value={filterEmpID}
                        onChange={handleEmpIDFilterChange}
                    />
                </label>
                
                <label style={{ marginLeft: '110px' }}>
                    Filter by Service:
                    <select value={filterService} onChange={handleServiceFilterChange}>
                        <option value="all">All</option>
                        <option value="Cab">Cab</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Desk">Desk</option>
                    </select>
                </label>
                <label style={{ marginLeft: '250px' }}>
                    Filter by Date:
                    <select value={filterRange} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="1w">1 week</option>
                        <option value="1m">1 month</option>
                        <option value="6m">6 months</option>
                    </select>
                </label>
                
                <div style={{ paddingLeft: '10px' }}>
                    <Button variant="contained" onClick={exportToExcel} style={{ marginLeft: '250px', height: '2vw', width: '7vw', backgroundColor: '#FFDB58' }}>
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
// import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import * as XLSX from 'xlsx';

// const Requests = () => {
//   const initialData = [
//     { EmpID: '1234', Service: 'Cab', date: '01/02/2023' },
//     { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
//     { EmpID: '1235', Service: 'Cab', date: '15/03/2023' },
//     { EmpID: '1235', Service: 'Cab', date: '15/03/2023' },
//     { EmpID: '1235', Service: 'Desk', date: '15/03/2023' },
//     { EmpID: '1324', Service: 'Lunch', date: '20/04/2023' },
//     { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
//     { EmpID: '1325', Service: 'Lunch', date: '20/12/2023' },
//     { EmpID: '1325', Service: 'Lunch', date: '20/12/2023' },
//     { EmpID: '1325', Service: 'Desk', date: '20/12/2023' },
//     { EmpID: '1329', Service: 'Lunch', date: '20/11/2023' },
//     { EmpID: '1330', Service: 'Cab', date: '05/11/2023' },
//     { EmpID: '1332', Service: 'Desk', date: '06/11/2023' },
//     { EmpID: '1326', Service: 'Lunch', date: '07/01/2024' },
//     { EmpID: '1272', Service: 'Cab', date: '01/02/2023' },
//     { EmpID: '1271', Service: 'Desk', date: '15/03/2023' },
//     { EmpID: '1348', Service: 'Lunch', date: '20/04/2023' },
//     { EmpID: '1370', Service: 'Desk', date: '20/12/2023' },
//     { EmpID: '1341', Service: 'Lunch', date: '20/11/2023' },
    
//   ];

//   const [data, setData] = useState(initialData);
//   const [filterRange, setFilterRange] = useState('all');
//   const [filterService, setFilterService] = useState('all');
//   const [filterEmpID, setFilterEmpID] = useState('');
//   const [filteredData, setFilteredData] = useState(initialData);

//   useEffect(() => {
//     filterData(filterRange, filterService, filterEmpID);
//   }, [filterRange, filterService, filterEmpID]);

//   const handleFilterChange = (event) => {
//     setFilterRange(event.target.value);
//   };

//   const handleServiceFilterChange = (event) => {
//     setFilterService(event.target.value);
//   };

//   const handleEmpIDFilterChange = (event) => {
//     setFilterEmpID(event.target.value);
//   };

//   const filterData = (dateCondition, serviceCondition, empIDCondition) => {
//     if (dateCondition === 'all' && serviceCondition === 'all' && empIDCondition === '') {
//       setFilteredData(initialData);
//     } else {
//       const filteredData = initialData.filter((item) => {
//         const itemDate = parseDate(item.date);
//         return (
//           (dateCondition === 'all' || dateMatches(itemDate, dateCondition)) &&
//           (serviceCondition === 'all' || item.Service === serviceCondition) &&
//           (empIDCondition === '' || item.EmpID.toLowerCase() === empIDCondition.toLowerCase())
//         );
//       });

//       setFilteredData(filteredData);
//     }
//   };

//   const dateMatches = (itemDate, condition) => {
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0);
//     if (condition === '1w') {
//       const oneWeekAgo = new Date(currentDate);
//       oneWeekAgo.setDate(currentDate.getDate() - 7);
//       return itemDate >= oneWeekAgo && itemDate <= currentDate;
//     } else if (condition === '1m') {
//       const oneMonthAgo = new Date(currentDate);
//       oneMonthAgo.setMonth(currentDate.getMonth() - 1);
//       return itemDate >= oneMonthAgo && itemDate <= currentDate;
//     } else if (condition === '6m') {
//       const sixMonthsAgo = new Date(currentDate);
//       sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
//       return itemDate >= sixMonthsAgo && itemDate <= currentDate;
//     }
//   };

//   const parseDate = (dateString) => {
//     const [day, month, year] = dateString.split('/');
//     return new Date(year, month - 1, day);
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Filtered Data');
//     XLSX.writeFile(wb, 'aditi.xlsx');
//   };

//   const resetFilters = () => {
//     setFilterRange('all');
//     setFilterService('all');
//     setFilterEmpID('');
//   };

//   return (
//     <div>
//       <div style={{ paddingTop: '20px', display: 'flex', paddingRight: '20px' }}>
//         <label style={{ marginRight: '10px' }}>
//           Filter by Date:
//           <select value={filterRange} onChange={handleFilterChange}>
//             <option value="all">All</option>
//             <option value="1w">1 week</option>
//             <option value="1m">1 month</option>
//             <option value="6m">6 months</option>
//           </select>
//         </label>
//         <label style={{ marginRight: '10px' }}>
//           Filter by Service:
//           <select value={filterService} onChange={handleServiceFilterChange}>
//             <option value="all">All</option>
//             <option value="Cab">Cab</option>
//             <option value="Lunch">Lunch</option>
//             <option value="Desk">Desk</option>
//           </select>
//         </label>
//         <label>
//           Filter by Employee ID:
//           <input
//             type="text"
//             value={filterEmpID}
//             onChange={handleEmpIDFilterChange}
//           />
//         </label>
//         <div style={{ paddingLeft: '10px' }}>
//           <Button variant="contained" onClick={exportToExcel}>
//             Download
//           </Button>
//           <Button variant="contained" style={{ marginLeft: '10px'}} onClick={resetFilters}>
//             Reset
//           </Button>
//         </div>
//       </div>
//       <div style={{ width: '1500px' }}>
//         <table style={{ width: '1500px' }}>
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>Service</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.EmpID}</td>
//                 <td>{item.Service}</td>
//                 <td>{item.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Requests;