//  If the loggedIn property is falsy (the user is not signed in), the function redirects the user to the login page by calling res.redirect("/login")
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login")
  } else {
    next();
  }
};

module.exports = withAuth;
