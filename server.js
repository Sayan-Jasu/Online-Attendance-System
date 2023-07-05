const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const dbName = 'online_attendance';
const password = 'Sayanjasu@2002';
const url = `mongodb+srv://jasu:${password}@cluster0.ajogjph.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB successfully');
    }
});

app.post('/api/attendance', (req, res) => {
    const { studentName, studentID } = req.body;
    res.status(200).json({ message: 'Attendance recorded successfully.' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post('/attendance', function(req, res) {
    const { studentName, studentID } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('attendance');
    const attendanceRecord = {
        studentName,
        studentID,
        timestamp: new Date()
    };
    collection.insertOne(attendanceRecord)
        .then(result => {
            console.log('Attendance record inserted successfully');
            res.status(200).json({ message: 'Attendance recorded successfully.' });
        })
        .catch(error => {
            console.error('Error inserting attendance record:', error);
            res.status(500).json({ error: 'Error inserting attendance record' });
        });
});
