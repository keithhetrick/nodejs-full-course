const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This is a promise-based version of the fs module - to be replaced with Mongoose
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for user in the db
  const candidate = usersDB.users.find(
    (candidate) => candidate.username === user
  );
  if (!candidate) return res.sendStatus(401); //Unauthorized

  // evaluate the password
  const match = await bcrypt.compare(pwd, candidate.password);
  if (match) {
    const roles = Object.values(candidate.roles);
    // create JWT's payload
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: candidate.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: candidate.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save the refreshToken with the current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== candidate.username
    );
    const currentUser = { ...candidate, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    // write the updated db to the file
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // equals 1 day
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401).json({ message: "Invalid password." });
  }
};

module.exports = { handleLogin };
