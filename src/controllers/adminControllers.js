const passport = require("passport");
const Admin = require("../models/User");

const renderRegister = (req, res) => {
  res.render("admin/register");
};

const registerAdmin = async (req, res, next) => {
  try {
    const newUser = await Admin.register(
      new Admin({
        email: req.body.email,
        username: req.body.name,
        role: req.body.role,
      }),
      req.body.password
    );
    console.log(newUser)
    req.login(newUser, (err) => {
      if (err) return next(err);
      // req.flash('success', 'Welcome to the panel!');
      res.redirect("/admin");
    });
  } catch (e) {
    // req.flash('error', e.message);
    console.log(e);
    res.redirect("/admin/register");
  }
};

const renderLogin = (req, res) => {
  res.render("admin/login");
};

const loginAdmin = (req, res) => {
  req.flash('success', 'welcome back!');
  const redirectUrl = req.session.returnTo || '/admin';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

const logoutAdmin = (req, res) => {
  req.logout((err) => {
      if (err) return next(err);
      // req.flash('success', 'Goodbye!');
      res.redirect('/admin/login');
      console.log('logged out')
  });
}

module.exports = {
  login: loginAdmin,
  renderLogin,
  logout: logoutAdmin,
  register: registerAdmin,
  renderRegister
};
