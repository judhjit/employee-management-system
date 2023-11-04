import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Navbar from '../../../Navbar';
import CurrentBookings from '../../../Bookings/CurrentBookings';

ChartJS.register(ArcElement, Tooltip, Legend);

function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState('monthly');
//   const [selectedDate, setSelectedDate] = useState('2023-01-01'); // FOR DATE

  const data = {
    monthly: {
      desk: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [45, 55], 
            backgroundColor: ['LightBlue','Teal' ],
          },
        ],
      },
      cab: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [60, 40], 
            backgroundColor: ['pink', 'Maroon'],
          },
        ],
      },
      meal: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [25, 75], 
            backgroundColor: ['LightGreen', 'green'],
          },
        ],
      },
    },
    weekly: {
      desk: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [30, 70], 
            backgroundColor: ['LightBlue','Teal' ],
          },
        ],
      },
      cab: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [55, 45], 
            backgroundColor: ['pink', 'Maroon'],
          },
        ],
      },
      meal: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [20, 80], 
            backgroundColor: ['LightGreen', 'green'],
          },
        ],
      },
    },
    daily: {
      desk: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [15, 85], 
            backgroundColor: ['LightBlue','Teal' ],
          },
        ],
      },
      cab: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [40, 60], 
            backgroundColor: ['pink', 'Maroon'],
          },
        ],
      },
      meal: {
        labels: ['Booked', 'Available'],
        datasets: [
          {
            data: [10, 90], 
            backgroundColor: ['LightGreen', 'green'],
          },
        ],
      },
    },
  };

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

  const selectedData = data[selectedFilter];

  return (
    <div style={{ backgroundColor: '#eeecf3' }}>
      <Navbar />
      <h3 style={{ fontSize: '40px' }}>
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
              <option value="daily">Daily</option>
            </select>
          </label>
          {/* DATE FILTER */}
          {/* <label style={{ marginLeft: '20px' }}>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '6px',
                fontSize: '13px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginLeft: '8px',
              }}
            />
          </label> */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <div>
            <Doughnut
              key={`desk-${selectedFilter}`}
              data={selectedData.desk}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Desk Bookings</h4>
          </div>
          <div>
            <Doughnut
              key={`cab-${selectedFilter}`}
              data={selectedData.cab}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Cab Bookings</h4>
          </div>
          <div>
            <Doughnut
              key={`meal-${selectedFilter}`}
              data={selectedData.meal}
              options={options}
              plugins={[doughnutLabel]}
            />
            <h4 style={{ color: 'black' }}>Meal Bookings</h4>
          </div>
        </div>
      </div>
      <section id='bookings'>
      <CurrentBookings />
      </section>
      
    </div>
  );
}

export default Analytics;
