const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const candidate = await User.findOne({ username: user }).exec();
  if (!candidate) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, candidate.password);
  if (match) {
    const roles = Object.values(candidate.roles).filter(Boolean);

    // create JWTs
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

    // Saving refreshToken with current user
    candidate.refreshToken = refreshToken;
    const result = await candidate.save();
    console.log("\nRESULT:", result);
    console.log("\nROLES:", roles);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true, // disable for local testing
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
