const mongoose = require("mongoose");
require('dotenv').config();


const databaseUrl = process.env.DATABASE_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect to Database");
  }
  const data = await mongoose.connection.db.collection("food_items");
  const data2= await mongoose.connection.db.collection('category');

  const cursor = data.find();
  const cursor2= data2.find();

  const allValues = await cursor.toArray();
  const category = await cursor2.toArray();

  global.food_items=allValues;
  global.category=category;
  
};

module.exports = connectToDB;
