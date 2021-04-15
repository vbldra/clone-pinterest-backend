var express = require('express');
var router = express.Router();

// import lowdb
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./data/db.json')
const db = lowdb(adapter)

db.defaults({ users: {name: "ilona", email: "email@mail.com"} })
  .write()

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json(db.get('users').value())
});

module.exports = router;
