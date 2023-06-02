const dotenv = require('dotenv');
const flights = require('../models/FLIGHT');
const createConnection = require('../config/database');
dotenv.config({path:'backend/config/config.env'});

const data = 
    [
        {
          airline: "Airline 1",
          flightNumber: "FL001",
          departureCity: "City 1",
          destinationCity: "City 2",
          departureDate: new Date("2023-06-01"),
          departureTime: "10:00 AM",
          arrivalDate: new Date("2023-06-01"),
          arrivalTime: "12:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 2",
          flightNumber: "FL002",
          departureCity: "City 2",
          destinationCity: "City 3",
          departureDate: new Date("2023-06-02"),
          departureTime: "02:00 PM",
          arrivalDate: new Date("2023-06-02"),
          arrivalTime: "04:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 3",
          flightNumber: "FL003",
          departureCity: "City 3",
          destinationCity: "City 4",
          departureDate: new Date("2023-06-03"),
          departureTime: "08:00 AM",
          arrivalDate: new Date("2023-06-03"),
          arrivalTime: "10:00 AM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 4",
          flightNumber: "FL004",
          departureCity: "City 4",
          destinationCity: "City 5",
          departureDate: new Date("2023-06-04"),
          departureTime: "01:00 PM",
          arrivalDate: new Date("2023-06-04"),
          arrivalTime: "03:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 5",
          flightNumber: "FL005",
          departureCity: "City 5",
          destinationCity: "City 6",
          departureDate: new Date("2023-06-05"),
          departureTime: "09:00 AM",
          arrivalDate: new Date("2023-06-05"),
          arrivalTime: "11:00 AM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 6",
          flightNumber: "FL006",
          departureCity: "City 6",
          destinationCity: "City 7",
          departureDate: new Date("2023-06-06"),
          departureTime: "03:00 PM",
          arrivalDate: new Date("2023-06-06"),
          arrivalTime: "05:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 7",
          flightNumber: "FL007",
          departureCity: "City 7",
          destinationCity: "City 8",
          departureDate: new Date("2023-06-07"),
          departureTime: "11:00 AM",
          arrivalDate: new Date("2023-06-07"),
          arrivalTime: "01:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        },
        {
          airline: "Airline 8",
          flightNumber: "FL008",
          departureCity: "City 8",
          destinationCity: "City 9",
          departureDate: new Date("2023-06-08"),
          departureTime: "04:00 PM",
          arrivalDate: new Date("2023-06-08"),
          arrivalTime: "06:00 PM",
          availableSeats: 60,
          seats: [], // Add seat data here
          createdByUser: "6478c3b00b0b9faaffcf2777", // Replace with the actual user ID
        }
    ]

createConnection();

const seedProducts=async()=>{
    try {
        await flights.deleteMany();
        console.log("flights deleteed ");
        await flights.insertMany(data);
        console.log("flights inserted");
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedProducts();
