const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No Content
  const refreshToken = cookies.jwt;

  // Is refreshToken in the db?
  const candidate = usersDB.users.find(
    (candidate) => candidate.refreshToken === refreshToken
  );
  if (!candidate) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // No Content
  }

  // Delete refreshToken from the db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== candidate.refreshToken
  );
  const currentUser = { ...candidate, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204); // No Content
};

module.exports = { handleLogout };
