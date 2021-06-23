const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const port = process.env.PORT || 5055

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cc38m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collectionproduct = client.db("car").collection("repair");
  
 app.post("/addproduct",(req,res) =>{
   const Newproduct=(req.body);
   collectionproduct.insertOne(Newproduct)
   .then(result => {
     console.log(result);
   })

 })
 app.get("/product",(req, res) =>{
   collectionproduct.find()
   .toArray((err,products) =>{
     res.send(products)
   })
 })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})