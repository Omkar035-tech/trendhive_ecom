import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import 'tailwindcss/tailwind.css';
import assets from '../assets/assets'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Home = ({ token }) => {
    const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
    const [revenueChartData, setRevenueChartData] = useState({ labels: [], datasets: [] });
    const [subcategoryPieData, setSubcategoryPieData] = useState({ labels: [], datasets: [] });
    const [paymentMethodPieData, setPaymentMethodPieData] = useState({ labels: [], datasets: [] });
    const [orderData, setOrderData] = useState([])
    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend (top, bottom, left, right)
                labels: {
                    font: {
                        size: 14, // Size of the legend text
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Font style for labels
                    },
                    color: "#333", // Color of the legend text
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw} sales`; // Customize tooltip label
                    }
                }
            },
        },
        animation: {
            animateScale: true, // Animates scaling of the pie chart when loading
            animateRotate: true, // Animates rotation of the pie chart
        },
    };

    const prepareData = (orderData) => {
        const categoryCounts = {};
        const sizeCounts = {};
        const dates = [];

        orderData.forEach(order => {
            const date = new Date(order.date).toLocaleDateString(); // Convert timestamp to date string
            if (!dates.includes(date)) {
                dates.push(date);
            }

            order.items.forEach(item => {
                // Count categories
                if (categoryCounts[item.category]) {
                    categoryCounts[item.category]++;
                } else {
                    categoryCounts[item.category] = 1;
                }

                // Count sizes
                if (sizeCounts[item.sizes]) {
                    sizeCounts[item.sizes]++;
                } else {
                    sizeCounts[item.sizes] = 1;
                }
            });
        });

        return {
            dates,
            categoryCounts,
            sizeCounts,
        };
    };



    // Chart options
    const options = {
        responsive: true,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
            },
            y1: {
                type: 'linear',
                position: 'right',
                grid: {
                    drawOnChartArea: false, // Only want the grid lines for one axis to show up
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw} orders`;
                    },
                },
            },
        },
    };
    const getAllOrder = async () => {
        try {
            if (!token) { return null; }

            const response = await fetch(backendUrl + "/api/orders/allorder", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "POST",
            })
            const data = await response.json();
            if (data.sucess) {
                setOrderData(data.orders);
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllOrder();
    }, [token])



    useEffect(() => {
        // Prepare data for line charts
        const orderCountsByDate = {};
        const revenueByDate = {};
        const subcategoryCounts = {};
        const paymentMethodCounts = {};

        if (orderData && orderData.length > 0) {
            orderData.forEach(order => {
                const orderDate = new Date(order.date).toDateString();

                // For order counts based on category and sizes
                order.items.forEach(item => {
                    if (!orderCountsByDate[orderDate]) {
                        orderCountsByDate[orderDate] = { men: 0, women: 0, kids: 0 };
                    }
                    orderCountsByDate[orderDate][item.category] += 1;
                });

                // For revenue based on dates
                revenueByDate[orderDate] = (revenueByDate[orderDate] || 0) + order.amount;

                // For subcategory sales
                order.items.forEach(item => {
                    subcategoryCounts[item.subCategory] = (subcategoryCounts[item.subCategory] || 0) + 1;
                });

                // For payment method sales
                paymentMethodCounts[order.paymentMethod] = (paymentMethodCounts[order.paymentMethod] || 0) + 1;
            });

            const { dates, categoryCounts, sizeCounts } = prepareData(orderData);

            // Prepare datasets for the line graph
            const orderCountData = {
                labels: dates,
                datasets: [
                    {
                        label: 'Order Counts by Category',
                        data: Object.values(categoryCounts),
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.1,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Order Counts by Sizes',
                        data: Object.values(sizeCounts),
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1,
                        yAxisID: 'y1',
                    }
                ],
            };
            setLineChartData(orderCountData)

            // Line chart for revenue
            setRevenueChartData({
                labels: Object.keys(revenueByDate),
                datasets: [
                    {
                        label: "Revenue",
                        data: Object.values(revenueByDate),
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true,
                        tension: 0.4
                    }
                ],
            });

            // Pie chart for subcategory sales
            setSubcategoryPieData({
                labels: Object.keys(subcategoryCounts),
                datasets: [
                    {
                        label: "Subcategory Sales",
                        data: Object.values(subcategoryCounts),
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    }
                ],
            });

            // Pie chart for payment method
            setPaymentMethodPieData({
                labels: Object.keys(paymentMethodCounts),
                datasets: [
                    {
                        label: "Payment Method",
                        data: Object.values(paymentMethodCounts),
                        backgroundColor: ["#4BC0C0", "#FF6384", "#36A2EB"],
                    }
                ],
            });
        }
    }, [orderData]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-xl font-bold mb-6">Order and Sales Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Line Chart for Order Counts */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Order Counts by Category and Sizes</h3>
                    {lineChartData.labels.length > 0 ? <Line data={lineChartData} options={options} /> : <p>No data available</p>}
                </div>

                {/* Line Chart for Revenue */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Sales Revenue</h3>
                    {revenueChartData.labels.length > 0 ? <Line data={revenueChartData} /> : <p>No data available</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart for Subcategory Sales */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Sales by Subcategory</h3>
                    {subcategoryPieData.labels.length > 0 ? <Doughnut data={subcategoryPieData} options={pieChartOptions} /> : <p>No data available</p>}
                </div>

                {/* Pie Chart for Payment Method */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
                    {paymentMethodPieData.labels.length > 0 ? <Doughnut data={paymentMethodPieData} options={pieChartOptions} /> : <p>No data available</p>}
                </div>
            </div>
        </div>
    );
};

export default Home;

