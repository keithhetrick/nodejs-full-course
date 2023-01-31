const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

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
    // create JWT's
    res.status(200).json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401).json({ message: "Invalid password." });
  }
  // try {
  //   //compare the password
  //   const match = await bcrypt.compare(pwd, candidate.password);
  //   if (match) {
  //     res.status(200).json({ success: `Welcome ${user}!` });
  //   } else {
  //     res.sendStatus(401); //Unauthorized
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
};

module.exports = { handleLogin };
