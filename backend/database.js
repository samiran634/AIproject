import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri =" mongodb+srv://samiranchakraborty2006:GnYBFBerV2yW6Sln@collegedata.fxp9j.mongodb.net/"; 
console.log(uri);
const client = new MongoClient(uri, { connectTimeoutMS: 30000, serverSelectionTimeoutMS: 30000 });

let usersCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db("rootdata");
    usersCollection = database.collection("collegedata");

 
    await database.command({
      collMod: "collegedata",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["college name", "college address", "available branche","college phone number","branch cutoff","image"], // Example fields
          properties: {
            "college name": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "college address": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "available branches": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "college phone number": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "branch cutoff": {
              bsonType: "string",
              description: "must be a string and is required"
            },
            "image": {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        }
      },
      validationLevel: "moderate"
    });

    console.log("Connected to database and schema set up successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
}
async function* streamAllData() {
  try {
    // Get cursor for all documents
    const cursor = usersCollection.find({}).stream();
    
    // Yield each document as it streams
    for await (const doc of cursor) {
      yield doc;
    }

  } catch (error) {
    console.error("Error streaming data:", error);
    throw error;
  }
}

// Add to exports
module.exports.streamAllData = streamAllData;


// Close connection on app termination
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = {
  connectToDatabase,
  getCollection: () => collegedata,
  closeConnection: () => client.close()
};