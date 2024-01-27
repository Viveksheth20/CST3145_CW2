const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dbpass = "Computer-4";
const uri = `mongodb+srv://studymodule:${dbpass}@cluster0.brnmkmi.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "Study_Modules";

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const client = new MongoClient(uri,{serverApi:ServerApiVersion.v1});
let db = client.db(dbName);
const prd_collection = db.collection("lessons");
const ord_collection = db.collection("orders");

app.get('/', function (req, res, next) {
  res.send('select a collection, e.g., /collection/products')
});

app.get('/lessons', async (req, res, next)=> {
  await client.connect();
  const connect = await prd_collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});
app.get('/orders', async (req, res, next)=> {
  await client.connect();
  const connect = await ord_collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});
app.get('/orders', async (req, res, next)=> {
  await client.connect();
  const OrdersToInsert = req.body;
  const connect = await ord_collection.insertOne(OrdersToInsert,function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
  res.json(connect);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on "+ port);
});