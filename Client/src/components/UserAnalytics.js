import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import Box from '@mui/material/Box';
import api from '../api';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function UserAnalytics() {
    const [selectedFilter, setSelectedFilter] = useState('monthly');
    const [selectedDate, setSelectedDate] = useState('2023-12-31');
    // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [chartData, setChartData] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const chartRef = useRef(null);

    const calculateDateRange = () => {
        // const currentDate = new Date();
        const currentDate = selectedDate ? new Date(selectedDate) : new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedFilter === 'monthly') {
            const startDate = new Date(currentDate);
            startDate.setMonth(currentDate.getMonth() - 1);
            return { startDate: startDate, endDate: currentDate };
        } else if (selectedFilter === 'weekly') {
            const startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - 7);
            return { startDate: startDate, endDate: currentDate };
        } else if (selectedFilter === 'quarterly') {
            const startDate = new Date(currentDate);
            startDate.setMonth(currentDate.getMonth() - 3);
            return { startDate: startDate, endDate: currentDate };
        } else if (selectedFilter === 'yearly') {
            const startDate = new Date(currentDate);
            startDate.setFullYear(currentDate.getFullYear() - 1);
            return { startDate: startDate, endDate: currentDate };
        } else {
            return { startDate: currentDate, endDate: currentDate };
        }
    };

    const fetchData = async () => {
        let response;
        try {
            response = await api.post('/user/getcountofallbookings', {
                isDeskRequired: true,
                isCabRequired: true,
                isFoodRequired: true,
                startDate: calculateDateRange().startDate,
                endDate: calculateDateRange().endDate,
            });
            // console.log(response.data);
            setBookingData(response.data);
            // console.log(bookingData);
            // bookingData = JSON.parse(bookingData);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("No data found!");
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        const { startDate, endDate } = calculateDateRange();

        fetchData();

        const chartLabels = ['Desk', 'Cab', 'Food'];
        // console.log(bookingData);
        let chartData = [0, 0, 0];
        if (bookingData) {
            chartData = [bookingData.deskBookingsCount, bookingData.cabBookingsCount, bookingData.foodBookingsCount];
        }
        setChartData({
            labels: chartLabels,
            datasets: [
                {
                    label: 'Bookings',
                    data: chartData,
                    backgroundColor: [
                        '#0066b2',
                        '#00b359',
                        '#ff4d4d',
                    ],
                    borderColor: [
                        '#0066b2',
                        '#00b359',
                        '#ff4d4d',
                    ],
                    borderWidth: 1,
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
            <div style={{ paddingLeft: '30px' }}>
                <h3 style={{ fontSize: '25px', paddingLeft: '560px' }}>
                    Booking <span style={{ color: '#0066b2' }}>Insights</span>
                </h3>
                <div style={{
                    border: '3px solid #004B81',
                    borderRadius: '10px',
                    marginLeft: '165px',
                    padding: '6px',
                    width: '98%'
                }}>
                    <div style={{ padding: '20px 45px' }}>
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
                                <option value="quarterly">Quarterly</option>
                                <option value="yearly">Yearly</option>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: '100px', height: '320px' }}>
                        {chartData && (
                            <Bar ref={chartRef} data={chartData} options={options} />
                        )}
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default UserAnalytics;

