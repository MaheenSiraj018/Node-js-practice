const { response } = require('express');

const express= require('express')
const database= require('./database.json');

const server=express();

server.use(express.json());

const obj={
    name: 'john',
    age:'30',
};

const database1 = ['Avengers','superman','batman'];

server.get('/',(req,res) => {
    res.header('Content-type','text/html');
    res.status(200);
    res.send('<h1>HOME ROUTE😉😉</h1>');
});
server.get('/data',(req,res) => {
    res.header('Content-type','applications/json');
    res.status(200);
    res.send({message:"Here is the available data",data:database});
});

server.get('/about',(req,res) => {
    res.send({message:"Here is the available data",data:database});
});

server.post('/about',(req,res) => {
    console.log(req.body);
    database.push(req.body);
    res.send("We have new data ");
});
server.delete('/about',(req,res) => {
    const id=req.query.id;
    console.log(id);
    const dataindex =  database.findIndex((dataindex) => dataindex.id === parseInt(id));
    console.log(dataindex);
    console.log(req.query);
    res.send('data deleted');
});

server.get('/movies',(req,res) => {
    res.send(database1);
});

server.get('*',(req,res) => {
    res.send("ERROR 404");
});

server.listen(3500, ()=>{
    console.log("Server is running on the port 3500")
});
