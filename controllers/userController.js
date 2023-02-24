
exports.showSignIn = ( req, res) => {
    res.render('login')
    console.log("login Page rendered")
}

exports.showSignUp = ( req, res) => {
    res.render('register')
    console.log("Registeration Page rendered")
}

exports.verifyPresentAtd = ( req, res) => {
    console.log('You are present')
}