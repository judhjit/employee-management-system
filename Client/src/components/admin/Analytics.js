import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import Box from '@mui/material/Box';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState('2023-01-01');
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  const calculateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedFilter === 'monthly') {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
      return { startDate, endDate: currentDate };
    } else if (selectedFilter === 'weekly') {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 7);
      return { startDate, endDate: currentDate };
    } else if (selectedDate) {
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      return { startDate: selected, endDate: selected };
    } else {
      return { startDate: currentDate, endDate: currentDate };
    }
  };

  const dummyData = [
    { category: 'desk', booked: 20 },
    { category: 'cab', booked: 45 },
    { category: 'meal', booked: 25 },
  ];

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange();

    const chartLabels = dummyData.map((data) => data.category);
    const chartData = dummyData.map((data) => data.booked);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Bookings',
          data: chartData,
          backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'], 
          borderColor: ['#2980b9', '#c0392b', '#27ae60'],
          borderWidth: 5,
          hoverBackgroundColor: ['#2980b9', '#c0392b', '#27ae60'],
        },
      ],
    });
  }, [selectedFilter, selectedDate]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.update();
    }
  }, [chartData]);

  const options = {
    animation: {
      duration: 1000, 
      easing: 'easeInOutQuart', 
    },
    scales: {
      x: {
        type: 'category', 
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box>
      <div style={{ paddingLeft: '30px'}}>
        <h3 style={{ fontSize: '25px', paddingLeft: '560px' }}>
          Booking <span style={{ color: '#0066b2' }}>Insights</span>
        </h3>
        <div style={{border: '3px solid #004B81', 
                    borderRadius: '10px',
                     marginLeft:'165px',
                     padding: '6px',
                     width: '98%'}}>
          <div style={{  padding: '20px 45px' }}>
            <label>
              <span style={{ fontSize: '18px' }}>Filter by:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                style={{
                  padding: '6px',
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  width: '150px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  marginLeft: '8px',
                }}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
            <label style={{ marginLeft: '50px' }}>
              <span style={{ fontSize: '18px' }}>Select Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: '6px',
                  fontSize: '10px',
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  width: '150px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  marginLeft: '8px',
                }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: '100px',height:'320px' }}>
            {chartData && (
              <Bar ref={chartRef} data={chartData} options={options} />
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Analytics;

