const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// Logging middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

// =================================================== \\
// ============ CUSTOM MIDDLEWARE LOGGER ============= ||
// =================================================== //
app.use(logger);

// =================================================== \\
// ================== CORS MIDDLEWARE ================ ||
// =================================================== //
const whitelist = ["http://127.0.0.1:5500", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// =================================================== \\
// =================== MIDDLEWARE ==================== ||
// =================================================== //

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for JSON data
app.use(express.json());

// built-in middleware for static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// =================================================== \\
// ====================== ROUTES ===================== ||
// =================================================== //

// Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
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
