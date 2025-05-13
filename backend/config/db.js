const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(
        `Mongo URI string is missing. Please include it in your .env file`
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error(`Error connecting to database`, error);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
