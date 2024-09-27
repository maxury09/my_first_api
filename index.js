//code for db
const users = require('./db')
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//3.เรียกใช้งาน body-parser
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello! Node.js Welcome to my MBS<3");
});

//1. API สำหรับขอข้อมูล users ทั้งหมด GET /api/users
app.get('/users', (req, res) => {
    res.json(users)
  })

//2. API สำหรับขอข้อมูลเฉพาะ user id ที่ส่งเข้ามา GET /api/users/:id
app.get('/users/:id', (req, res) => {
  res.json(users.find(user => user.id === Number(req.params.id)))
})

//3.API สำหรับเพิ่ม user POST /api/users
app.post('/users', (req, res) => {
    users.push(req.body)
    let json = req.body
    res.send(`Add new user '${json.username}' completed.`)
})

//4. API สำหรับแก้ไขข้อมูลเฉพาะ user id ที่ส่งเข้ามา PUT /api/users/:id 
app.put('/users/:id', (req, res) => {
    const updateIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Update user id: '${users[updateIndex].id}' completed.`)
  })

//5. API สำหรับลบข้อมูลเฉพาะ user id ที่ส่งเข้ามา DELETE /api/users/:id
app.delete('/users/:id', (req, res) => {
    const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
    res.send(`Delete user '${users[deletedIndex].username}' completed.`)
  })



app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});

