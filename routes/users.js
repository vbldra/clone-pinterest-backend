var express = require('express');
var router = express.Router();

// import lowdb
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');

// import controllers
const { login, users, register, addFav } = require('../controllers/users')

const adapter = new FileSync('./data/db.json')
const db = lowdb(adapter)

// Log in
router.post("/login", login)

// List all users
router.get('/', users)

router.post('/register', register)

// Add favorite
router.post("/add-fav", addFav)


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json(db.get('users').value())
});

module.exports = router;