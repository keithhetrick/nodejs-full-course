const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Logging middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for JSON data
app.use(express.json());

// built-in middleware for static files
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ error: "404 Not found" });
  } else {
    return res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`\nServer running on port ${PORT}`));
