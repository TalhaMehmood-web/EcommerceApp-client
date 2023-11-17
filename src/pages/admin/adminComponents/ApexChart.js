import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ orders }) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                theme: {
                    mode: 'dark',
                },
                toolbar: {
                    theme: {
                        mode: "dark"
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                    shadow: {
                        width: 30
                    }
                },
                theme: 'dark',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 30,
                colors: ['transparent'],
            },
            xaxis: {
                categories: [], // Will be dynamically generated based on order dates
                labels: {
                    style: {
                        colors: '#ffffff',
                    },
                },
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                    style: {
                        color: 'white',
                    },
                },
                labels: {
                    style: {
                        colors: '#ffffff',
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {

                        return `$ ${val} dollars`;
                    },
                },
                style: {
                    fontSize: '12px',
                    fontFamily: undefined,
                },
                theme: 'dark',
            },
            legend: {
                labels: {
                    colors: '#ffffff',
                },
            },
        },
    });

    useEffect(() => {
        // Extracting unique months from order dates
        const months = Array.from(
            new Set(orders.map((order) => new Date(order.orderDate).toLocaleString('en-US', { month: 'short' })))
        );

        // Generating x-axis categories
        setChartData((prevChartData) => ({
            ...prevChartData,
            options: {
                ...prevChartData.options,
                xaxis: {
                    ...prevChartData.options.xaxis,
                    categories: months,
                },
            },
        }));

        // Generating y-axis series data
        const seriesData = [
            {
                name: 'Sales',
                data: months.map((month) => {
                    const sales = orders
                        .filter(
                            (order) =>
                                new Date(order.orderDate).toLocaleString('en-US', { month: 'short' }) === month
                        )
                        .reduce((sum, order) => sum + order.cartOrders.reduce((cartSum, cart) => cartSum + cart.products.reduce((productSum, product) => productSum + product.product.price, 0), 0), 0);
                    return sales;
                }),
            },
            {
                name: 'Revenue',
                data: months.map((month) => {
                    const revenue = orders
                        .filter(
                            (order) =>
                                new Date(order.orderDate).toLocaleString('en-US', { month: 'short' }) === month
                        )
                        .reduce((sum, order) => sum + order.cartOrders.reduce((cartSum, cart) => cartSum + cart.totalPrice, 0), 0);
                    return revenue;
                }),
            },
            {
                name: 'Expenses',
                data: months.map((month) => {
                    const sales = orders
                        .filter(
                            (order) =>
                                new Date(order.orderDate).toLocaleString('en-US', { month: 'short' }) === month
                        )
                        .reduce((sum, order) => sum + order.cartOrders.reduce((cartSum, cart) => cartSum + cart.products.reduce((productSum, product) => productSum + product.product.price, 0), 0), 0);

                    const revenue = orders
                        .filter(
                            (order) =>
                                new Date(order.orderDate).toLocaleString('en-US', { month: 'short' }) === month
                        )
                        .reduce((sum, order) => sum + order.cartOrders.reduce((cartSum, cart) => cartSum + cart.totalPrice, 0), 0);

                    return revenue - sales;
                }),
            },
        ];

        setChartData((prevChartData) => ({
            ...prevChartData,
            series: seriesData,
        }));
    }, [orders]);

    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

export default ApexChart;
