const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  console.log("\nCookies:", cookies.jwt);

  const refreshToken = cookies.jwt;

  // check for user in the db
  const candidate = usersDB.users.find(
    (candidate) => candidate.refreshToken === refreshToken
  );
  if (!candidate) return res.sendStatus(403); // Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || candidate.username !== decoded.username)
      return res.sendStatus(403); // Forbidden

    const roles = Object.values(candidate.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
