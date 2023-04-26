
// set up to use ENV file
require("dotenv").config();
const path = require("path");
const express = require("express");
const expresshndlebrs = require("express-handlebars");


const session = require("express-session");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 3600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

const hndlebrs = expresshndlebrs.create({});

app.engine("handlebars", hndlebrs.engine);
app.set("view engine", "handlebars");

const handlebars = require("handlebars");

handlebars.registerHelper("config_date", function (date) {
  return `${
    new Date(date).getMonth() + 1
  }/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/homeRoutes"));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
     `\nThe server is now operational on port ${PORT}. To create an account, please go to http://localhost:${PORT}`
    )
  );
});