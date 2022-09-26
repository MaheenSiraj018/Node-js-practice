const express= require('express')
const mongoose= require('mongoose')


const app =express();
app.use(express.json());
mongoose.connect('mongodb+srv://maheen:12345@cluster0.dhik2re.mongodb.net/?retryWrites=true&w=majority',{Usenewurlparser:true});


//This function will get executed when connection is made and is used to check the connection
mongoose.connection.on('connected', () =>{
    console.log('connected to MongoDB');
});

//creating collection of database
const moviesSchema= new mongoose.Schema({
    name: String,
    year: Number,
    rating:  Number
});
const movieModel= mongoose.model('movies',moviesSchema);


const userSchema= new mongoose.Schema({
    email:String,
    name:String,
    Password:Number
});
const userModel= mongoose.model('users',userSchema);

app.post('/users',(req,res)=>{
    const body=req.body;
    userModel.create(body);
    res.status(201);
    res.send('User created');
});


app.post('/movies',(req,res)=>{
    const body=req.body;
    movieModel.create(body);
    res.status(201);
    res.send({
        message:'Movie Created'+ body.name,
    });
});
//here await is used because the above function can take infinite time to load the data so the following function will wait for it
app.get('/movies',async (req,res)=>{
    const body=req.body;

    const movies =await movieModel.find(body);

    res.status(200);
    res.send({
        message:'Data fetched',
        data:movies});
});

app.delete('/movies',async(req,res)=>{
    const body=req.body;
    await movieModel.findByIdAndDelete(body.id);
    res.status(200);
    res.send('Movie deleted');
});

//patch function is used for updation
app.patch('/movies',async(req,res)=>{
    const body=req.body;
    const id=body.id;
    await movieModel.findByIdAndUpdate(id,body);
    res.status(200);
    res.send({
        Message:'Movie Updated'
    });
});

app.listen(2700, ()=>{
    console.log("Server is running on the port 2700")
});