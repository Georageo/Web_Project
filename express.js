import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; 

import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port=3000;
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.post('/', (req, res) => {
    const {register, log_in } = req.body;

    
    if (register === 1) {
        const { username, password, email, firstName, lastName, workplace} = req.body;
        const query = `INSERT INTO User (username, password, email, first_name, last_name, workplace) 
                       VALUES (?, ?, ?, ?, ?, ?)`;

        DB.run(query, [username, password, email, firstName, lastName, workplace], function(err) {
            if (err) {
                console.error('Database error:', err.message); 
                return res.status(500).json({ error: 'Failed to register user.' });
            }

            res.status(200).json({ message: `User ${username} registered successfully!` });
        });
    }

    
    else if (log_in === 1) {
        const { usernamesn, passwordsn, log_in } = req.body;
        const query = `SELECT * FROM User WHERE username = ? AND password = ?`;

        DB.get(query, [usernamesn, passwordsn], function(err, row) {
            if (err) {
                console.error('Database error:', err.message); 
                return res.status(500).json({ error: 'Failed to sign in.' });
            }

            if (row) {
                res.status(200).json({ message: `User ${usernamesn} logged in successfully!` });
            } else {
                res.status(401).json({ error: 'Invalid username or password.' });
                
            }
        });
    } 
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const sql3 = sqlite3.verbose();

const DB = new sql3.Database('C:/DogOnALease/Database/database', sqlite3.OPEN_READWRITE, connected);

function connected(error){
    if(error){
        console.log("Cannot connect to database");
    }else{
        console.log("Connected to database");
    }
}




