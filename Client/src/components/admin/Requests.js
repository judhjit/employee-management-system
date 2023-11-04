import React, { useState } from 'react';
import  XLSX from 'sheetjs-style';
import * as Filesaver from 'file-saver';
const Requests = () => {
    const [data, setData] = useState([
        // Sample data with dates in the format dd/mm/yyyy
        { name: 'John', date: '01/02/2023' },
        { name: 'Alice', date: '15/03/2023' },
        { name: 'Bob', date: '20/04/2023' },
        // Add more data as needed
      ]);
    
      const [filterRange, setFilterRange] = useState('1w'); // Default filter range is 1 week
    
      const handleFilterChange = (event) => {
        setFilterRange(event.target.value);
      };
    
      const calculateDateRange = () => {
        const today = new Date();
        const startDate = new Date(today);
    
        if (filterRange === '1w') {
          startDate.setDate(today.getDate() - 7); // 1 week
        } else if (filterRange === '1m') {
          startDate.setMonth(today.getMonth() - 1); // 1 month
        } else if (filterRange === '6m') {
          startDate.setMonth(today.getMonth() - 6); // 6 months
          
        }
    
        return { startDate, endDate: today };
      };
    
      const isWithinDateRange = (date, startDate, endDate) => {
        return date >= startDate && date <= endDate;
      };
      const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension='.xlsx';


        const exportToExcel=async()=>{
            const ws=XLSX.utils.json_to_sheet(data);
            const wb={Sheets:{'data1':ws},SheetNames:['data1']};
            const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
            const data2=new Blob([excelBuffer],{type:fileType});
            Filesaver.saveAs(data2,"aditi"+fileExtension);
        }
    
      const handleExportExcel = () => {
        const { startDate, endDate } = calculateDateRange();
    
        // Filter data based on the calculated date range
        const filteredData = data.filter((item) => {
          const dateParts = item.date.split('/');
          const itemDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          return isWithinDateRange(itemDate, startDate, endDate);
        });

        console.log(filteredData);
    
        // Sort the filtered data by date
        const sortedData = filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });

        
    
        // // Create a new Excel workbook
        // const workbook = XLSX.utils.book_new();
        // const worksheet = XLSX.utils.json_to_sheet(sortedData);
    
        // // Add the worksheet to the workbook
        // XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
    
        // // Create a Blob object from the workbook
        // const blob = XLSX.write(workbook, {
        //   bookType: 'xlsx',
        //   type: 'blob',
        // });
    
        // // Create a download link and trigger the download
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'filtered_data.xlsx';
        // a.click();
        // URL.revokeObjectURL(url);
      
      };
  return (
    <div>
    <div>
      <label>
        Filter by:
        <select value={filterRange} onChange={handleFilterChange}>
          <option value="1w">1 week</option>
          <option value="1m">1 month</option>
          <option value="6m">6 months</option>
        </select>
      </label>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={exportToExcel}>Export Excel</button>
  </div>
  )
}

export default Requests