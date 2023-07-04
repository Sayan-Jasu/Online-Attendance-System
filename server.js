const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'online_attendance';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(function(err) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB successfully');

        // Start your server or perform other operations
        // within this callback function
    }
});


// Define a route to handle attendance recording
app.post('/api/attendance', (req, res) => {
    // Extract attendance data from the request
    const { studentName, studentID } = req.body;

    // Save the attendance data to the database
    // Replace this with your actual database integration code

    // Return a response indicating successful attendance recording
    res.status(200).json({ message: 'Attendance recorded successfully.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Assuming you have an '/attendance' endpoint for handling attendance data
app.post('/attendance', function(req, res) {
    // Get the attendance data from the request body
    const { studentName, studentID } = req.body;

    // Get the MongoDB database reference from the client
    const db = client.db(dbName);

    // Get the collection (e.g., 'attendance')
    const collection = db.collection('attendance');

    // Create the attendance record object
    const attendanceRecord = {
        studentName,
        studentID,
        timestamp: new Date()
    };

    // Insert the attendance record into the collection
    collection.insertOne(attendanceRecord, function(err, result) {
        if (err) {
            console.error('Error inserting attendance record:', err);
            res.status(500).send('Error inserting attendance record');
        } else {
            console.log('Attendance record inserted successfully');
            res.status(200).send('Attendance recorded successfully');
        }
    });
});