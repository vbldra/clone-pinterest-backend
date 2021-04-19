// login controller
exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // get user from database
    const foundUser = db.get('users').find({email: email}).value()
    if(!foundUser){
        res.json({error: "User not found"})
    } else {
        // check password
        if(password === foundUser.password){
            const loggedInUser = foundUser
            delete loggedInUser.password
            res.json({status: "logged in", user: loggedInUser})
        } else {
            res.json({error: "Wrong password"})
        }
    }
}

exports.users = (req, res) => {
    res.json(db.get('users').value())
}

exports.register = (req, res) => {
    db.get('users').push(req.body).write()
    res.json(db.get('users').value())
}

exports.addFav = (req, res) => {
    const title = req.body.title
    const userEmail = req.body.auth
    db
        // get users collection
        .get('users')
        // get specific user
        .find({email: userEmail})
        // modify user data
        .assign({favorites: [title]})
        // write to DB
        .write()

    res.json(db.get('users').find({email: userEmail}).value())
}