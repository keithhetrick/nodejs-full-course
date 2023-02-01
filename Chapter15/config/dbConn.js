const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // auth: {
      //   username: "nodejs-course",
      //   password: "testing123",
      // },
    });

    console.log(`\nMongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("\nERROR:", error.message, "\n");
    console.error(error.stack);
    console.error("\nExiting process...\n");
    process.exit(1);
  }
};

module.exports = connectDB;
