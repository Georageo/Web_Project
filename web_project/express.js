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
app.get('/car_details', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'car_details_form.html'));
});

app.get('/rent_car', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'rent_your_car.html'));
});





app.post('/', async (req, res) => {
    const { register, log_in } = req.body;
    
    
    if (register === 1) {
        const { username, password, email, firstName, lastName, workplace, years } = req.body;
        let class_;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            if(years>7){
                class_  = 2;
            }
            else{
                class_ = 1;
            }
            const query = `
                INSERT INTO User (username, password, email, first_name, last_name, workplace, years,class)
                VALUES (?, ?, ?, ?, ?, ?,?,?)
            `;

            DB.run(query, [username, hashedPassword, email, firstName, lastName, workplace, years, class_], function (err) {
                if (err) {
                    console.error('Database error:', err.message);
                    return res.status(500).json({ error: 'Failed to register user.' });
                }

                res.status(200).json({ message: `User ${username} registered successfully!`, class_:class_});
            });

        } catch (err) {
            console.error(err.message);
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
                res.status(200).json({ message: 'Login successful!',first_name: row.first_name,last_name:row.last_name,username:row.username,email:row.email,workplace:row.workplace, years:row.years,class_:row.class});
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

const DB = new sql3.Database('C:/Users/panos/Desktop/Web_Project-main/Database/database', sqlite3.OPEN_READWRITE, connected);

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


app.post('/rent_car', (req, res) =>{ 

    const { id_ } = req.body;
    const query = `SELECT * FROM car WHERE car_id = ?`;

    DB.get(query, [id_], async function (err, row) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database could not be loaded' });
            }

            if (!row) {
                console.log("Car not found");
                return res.status(401).json({ error: 'Car not found.' });
            }

            console.log("Car found");
            res.status(200).json({ message: 'Car found successfully!', cc:row.cc , type:row.type, color:row.color, model_name:row.model_name, average_consumpt:row.average_consumpt, class_:row.class });
            const {log_out} = req.body;
            if (log_out===1){
                res.status(200).json({ message: 'Logout successful!'});

            }
        
        })
    const {log_out} = req.body;
    if (log_out===1){
        res.status(200).json({ message: 'Logout successful!'});

    }
   

});
app.post('/car_details',(req,res) =>{

    const {log_out} = req.body;
    if (log_out===1){
        res.status(200).json({ message: 'Logout successful!'});

    }

    const { startdate, enddate, pickup_loc, dropoff_loc } = req.body;
    try {
        const query = `
                INSERT INTO contract (start_date, end_date, pick_up, drop_off)
                VALUES (?, ?, ?, ?)
            `;

        DB.run(query, [startdate, enddate, pickup_loc, dropoff_loc], function (err) {
            if (err) {
                    console.error('Database error:', err.message);
                    return res.status(500).json({ error: 'Failed to create contract.' });
                }
                console.log("Contract created successfully");
                res.status(200).json({ message: `Contract created successfully!` });
            });

    } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Contract Error.' });
        }
    }

)

