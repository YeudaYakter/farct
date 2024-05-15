const express = require('express');
const mysql = require('mysql2');
const app = express();
const conenection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mego_users',
});
conenection.connect((err) => {
    if (err) {
        console.error(err);

    }
    else console.log("connected to mysql");
});
app.use(express.json());

app.get('/users/:id', (req,res)=>{
    let id = req.params.id;
    conenection.query(`SELECT * FROM usurs WHERE id = ${id} `,(err,results)=>{
      if (err){
        console.error(err);
        res.status(500).send("Error" );
      }else {
        console.log(results);
        res.status(200).send(results);
      }

    });
});

app.post("/s", (req, res) => {
    const { username, email, password } = req.body;
    conenection.query("INSERT INTO usurs (username, email, password) VALUES(?,?,?)", [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error");
        } else {
            res
                .status(200)
                .send({ "id": result.insertId, username, email, password });
        }
    }
    );
});

// app.get("/users",(req, res) => {
//     res.send("return users name")
// })
// app.get("/users/:id",(req, res) => {
//     let id = req.params.id;

//     res.send(`return user id ${id} details`);
// });
app.put("/users/:id", (req, res) => {
    let id = req.params.id;
    const update = req.body ;
    conenection.query("UPDATE usurs SET ? WHERE id = ?", [update, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error");
        } else {
            console.log(update);
            res.status(200).send({ "id": id });
        }
    });

    
});
// app.delete("/users:id", (req, res) => {
//     let id = req.params.id;
//     res.send(`return user id ${id} details`);
// });



app.listen(3000, () => { console.log('listening on'); });
