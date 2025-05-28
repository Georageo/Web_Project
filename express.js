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

        const query1 = `SELECT * FROM User WHERE username = ?`;
        const query2 = `SELECT *
                                    FROM contract
                                    WHERE contract_id IN (
                                        SELECT contract_id
                                        FROM makes
                                        WHERE user_id = ?
                                    );
                                    `;
        const query3 = `SELECT *
        FROM car
        WHERE car_id IN (
            SELECT car_id
            FROM makes
            WHERE user_id = ?
        )
    `;                          
        DB.get(query1, [usernamesn], async function (err, row1) {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Failed to sign in.' });
            }

            if (!row1) {
                console.log("User not found");
                return res.status(401).json({ error: 'User not found.' });
            }

            
            const isMatch = await bcrypt.compare(passwordsn, row1.password);

            if (isMatch) {
                console.log("successful login")
                const user_iid = row1.id_user;

                DB.get(query2, [user_iid], async function (err, row2) {
                    console.log("q2");
                    console.log(row1.first_name);
                    console.log(row1.class);

                    DB.get(query3, [user_iid], async function (err, row3) {
                        console.log("q3");
                        console.log(row3.model_name);
                    res.status(200).json({ message: 'Login successful!',user_id:row1.id_user,first_name: row1.first_name,last_name:row1.last_name,username:row1.username,email:row1.email,workplace:row1.workplace, years:row1.years,class_user:row1.class, start_date:row2.start_date,end_date:row2.end_date,pick_up:row2.pick_up,drop_off:row2.drop_off,car_cc:row3.cc,car_type:row3.type,car_model_name:row3.model_name,car_color:row3.color,car_class:row3.class,car_avg_c:row3.average_consumpt});   })})
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

const DB = new sql3.Database('C:/web_project/Database/database', sqlite3.OPEN_READWRITE, connected);

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
app.post('/car_details', (req, res) => {
    const { log_out, startdate, enddate, pickup_loc, dropoff_loc, user_id, car_id } = req.body;

    
    if (log_out === 1) {
        return res.status(200).json({ message: 'Logout successful!' });
    }

    
    if (!startdate || !enddate || !pickup_loc || !dropoff_loc) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    
    const query1 = `
        INSERT INTO contract (start_date, end_date, pick_up, drop_off)
        VALUES (?, ?, ?, ?)
    `;
    const query2 = `
        INSERT INTO makes (user_id, car_id, contract_id)
        VALUES (?, ?, ?)
    `;
    
    DB.run(query1, [startdate.toString(), enddate.toString(), pickup_loc, dropoff_loc], function (err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Failed to create contract.' });
        }
        const contract_id = this.lastID;
        DB.run(query2, [user_id,car_id,contract_id], function (err) {
        console.log("Contract created successfully");
        res.status(200).json({ message: 'Contract created successfully!' });})
    });
});

