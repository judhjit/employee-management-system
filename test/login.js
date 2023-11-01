// server.js
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const pgp = require('pg-promise')();
const db = pgp('postgres://username:password@localhost:5432/news_db');
const UserRoles = require('./models/userRoles');
const News = require('./models/news');
const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Implement user authentication using PostgreSQL here
    db.oneOrNone('SELECT * FROM users WHERE username = $1', username)
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(error => done(error));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
  // Implement user deserialization using PostgreSQL here
  db.oneOrNone('SELECT * FROM users WHERE user_id = $1', user_id)
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      return done(null, user);
    })
    .catch(error => done(error));
});

// Define routes for user authentication (login, logout)
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

// Define custom middleware for role-based authorization
function authorize(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role_name === role) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
}

// Define routes and functionality based on user roles (employee, admin, superadmin)
app.get('/news', authorize('employee'), (req, res) => {
  // Get news for employees
  News.find({}, (err, news) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(news);
    }
  });
});

app.post('/news', authorize('admin'), (req, res) => {
  // Create news for admins
  const news = new News(req.body);
  news.save(err => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json({ message: 'News created successfully' });
    }
  });
});

app.post('/assignRole', authorize('superadmin'), (req, res) => {
  // Assign roles for superadmins
  const { username, role } = req.body;
  UserRoles.findOne({ role_name: role }, (err, userRole) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else if (!userRole) {
      res.status(404).json({ message: 'Role not found' });
    } else {
      User.findOneAndUpdate({ username }, { role_id: userRole._id }, (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.json({ message: `Assigned role '${role}' to '${username}'` });
        }
      });
    }
  });
});

// Define route to start your Express app
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

