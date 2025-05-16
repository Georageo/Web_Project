import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url'; 
import bcrypt from 'bcrypt';
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port=3000;
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'firstpage.html'));
});




app.post('/', async (req, res) => {
    const { register, log_in } = req.body;

    
    if (register === 1) {
        const { username, password, email, firstName, lastName, workplace } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = `
                INSERT INTO User (username, password, email, first_name, last_name, workplace)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            DB.run(query, [username, hashedPassword, email, firstName, lastName, workplace], function (err) {
                if (err) {
                    console.error('Database error:', err.message);
                    return res.status(500).json({ error: 'Failed to register user.' });
                }

                res.status(200).json({ message: `User ${username} registered successfully!`});
            });

        } catch (err) {
            console.error('Hashing error:', err.message);
            res.status(500).json({ error: 'Error hashing password.' });
        }
    }

    
    else if (log_in === 1) {
        const { usernamesn, passwordsn } = req.body;

        const query = `SELECT * FROM User WHERE username = ?`;
        DB.get(query, [usernamesn], async function (err, row) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Failed to sign in.' });
            }

            if (!row) {
                console.log("User not found");
                return res.status(401).json({ error: 'User not found.' });
            }

            
            const isMatch = await bcrypt.compare(passwordsn, row.password);

            if (isMatch) {
                console.log("successful login")
                res.status(200).json({ message: 'Login successful!',first_name: row.first_name,last_name:row.last_name,username:row.username,email:row.email,workplace:row.workplace });
            } else {
                console.log("password not found");
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

app.post('/profile', (req, res) =>{ 
    const {log_out} = req.body;
    if (log_out===1){
        res.status(200).json({ message: 'Logout successful!'});

    }
   

});


