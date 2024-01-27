const express = require("express");
const app = express();
const { MongoClient} = require("mongodb");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dbpass = "Viveksheth@007";
const prefex ="mongodb+srv://";
const username = "Viveksheth4u";
const dburl = "@cluster.msljc14.mongodb.net/";
const sufix = "?retryWrites=true&w=majority";
const uri = prefex+username+":"+dbpass+dburl+sufix;
const dbName = "Study_Modules";
const client = new MongoClient(uri);

async function connectToMongoDB() {
  
    try {
      await client.connect();
      console.log("Connected to the database");
  
      return client.db(dbName);
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }
  
  // Use async function to connect to MongoDB before starting the server
  async function startServer() {
    try {
      const db = await connectToMongoDB();
  
      app.param('collectionName', function (req, res, next, collectionName) {
        req.collection = db.collection(collectionName);
        return next();
      });
  
      app.get('/collections/:collectionName', function (req, res, next) {
        req.collection.find({}).toArray(function (err, results) {
          if (err) {
            return next(err);
          }
          res.send(results);
        });
      });
  
      app.listen(3000, () => {
        console.log("Server is listening on http://localhost:3000/collections/collectionName");
      });
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  }
  
  // Start the server
  startServer();

// app.listen(3000,()=>{
//     console.log("server is listening on 3000 and wed http://localhost:3000/collections/collectionName");
// });