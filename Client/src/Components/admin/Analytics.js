import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';

ChartJS.register(ArcElement, Tooltip, Legend);

function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState('2023-01-01');
  const [chartData, setChartData] = useState(null);

  const calculateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    //if monthly is choosen as filter
    if (selectedFilter === 'monthly') {
      const startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
      return { startDate, endDate: currentDate };
    } else if (selectedFilter === 'weekly') {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 7);
      return { startDate, endDate: currentDate };
    } else if (selectedDate) {
      // If a specific date is chosen from the calendar
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      return { startDate: selected, endDate: selected };
    } else {
      // If no filter or specific date is chosen, default to showing all future bookings
      return { startDate: currentDate, endDate: currentDate };
    }
  };

  //took some dummy data as backend integration is not done
  const dummyData = [
    { deskBooked: 30, deskAvailable: 70 },
    { cabBooked: 45, cabAvailable: 55 },
    { mealBooked: 25, mealAvailable: 75 },
  ];

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange();

    // Used dummy data array
    const selectedChartData = dummyData.map((data) => ({
      desk: [data.deskBooked, data.deskAvailable],
      cab: [data.cabBooked, data.cabAvailable],
      meal: [data.mealBooked, data.mealAvailable],
    }));

    setChartData(selectedChartData);
  }, [selectedFilter, selectedDate]);

  //for giving animations to chart
  const options = {
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic',
    },
  };


  const doughnutLabel = {
    id: 'doughnutLabel',
    afterDatasetDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;
      ctx.save();
      ctx.font = '30px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';
      ctx.fillText(`${data.datasets[0].data[0]}%`, centerX, centerY);
    },
  };

  return (
    <Box>
    <div>
      <h3 style={{ fontSize: '40px', paddingLeft: '70px' }}>
        Booking <span style={{ color: '#0066b2' }}>Insights</span>
      </h3>
      <div>
        <div style={{ margin: '4px', padding: '20px 65px' }}>
          <label>
            Filter by:
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              style={{
                padding: '6px',
                fontSize: '13px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginLeft: '8px',
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
             
            </select>
          </label>
          <label style={{ marginLeft: '20px' }}>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '6px',
                fontSize: '13px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginLeft: '8px',
              }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: '190px' }}>
          <div style={{ textAlign: 'center' }}>
            <Doughnut
              key={`desk-${selectedFilter}`}
              data={{
                labels: ['Booked', 'Available'],
                datasets: [
                  {
                    data: chartData ? chartData[0].desk : [0, 0],
                    backgroundColor: ['lightblue', 'teal'],
                  },
                ],
              }}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Desk Bookings</h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Doughnut
              key={`cab-${selectedFilter}`}
              data={{
                labels: ['Booked', 'Available'],
                datasets: [
                  {
                    data: chartData ? chartData[1].cab : [0, 0],
                    backgroundColor: ['pink', 'Maroon'],
                  },
                ],
              }}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Cab Bookings</h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Doughnut
              key={`meal-${selectedFilter}`}
              data={{
                labels: ['Booked', 'Available'],
                datasets: [
                  {
                    data: chartData ? chartData[2].meal : [0, 0],
                    backgroundColor: ['LightGreen', 'green'],
                  },
                ],
              }}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Meal Bookings</h4>
          </div>
        </div>
      </div>
    </div>
    </Box>
  );
}

export default Analytics;
