const express = require('express');
const app = express();

// Load data from file
let users = require('./MOCK_DATA.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// EJS setup
app.set('view engine', 'ejs');

// Dashboard Route
app.get('/', (req, res) => {
  res.render('dashboard', { users });
});

/* ---------------- API ROUTES (YOUR BACKEND) ---------------- */

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  res.json(user || 'User not found');
});

// Create user
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  Object.assign(user, req.body);
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send('User deleted');
});

/* ---------------- FRONTEND ROUTES ---------------- */

// Home page
app.get('/', (req, res) => {
  res.render('index', { users });
});

// Add page
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle add
app.post('/add', (req, res) => {
  users.push({ id: users.length + 1, ...req.body });
  res.redirect('/');
});

// Edit page
app.get('/edit/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.render('edit', { user });
});

// Handle update
app.post('/update/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  Object.assign(user, req.body);
  res.redirect('/');
});

// Handle delete
app.post('/delete/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.redirect('/');
});

// Start server
app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});