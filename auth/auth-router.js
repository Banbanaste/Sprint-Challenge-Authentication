const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  const token = generateToken(user);
  add(user)
    .then(saved => {
      res
        .status(201)
        .json({ message: "user created succesfully", user: saved, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;
  findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.json({ message: "user logged in succesfully", user, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

module.exports = router;
