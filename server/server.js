const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let users = [];
let contacts = [];
let currentUser = null;
app.post("/register", (req, res) => {
  const data = req.body;
  if (users.find((u) => u.email === data.email)) {
    return res.json({ success: false, message: "Email вже існує" });
  }
  const user = { id: Date.now(), ...data };
  users.push(user);
  res.json({ success: true, message: "OK" });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.json({
      success: false,
      message: "Невірний email або пароль",
    });
  }
  currentUser = user;
  res.json({
    success: true,
    message: "Вхід успішний",
    user,
  });
});
app.post("/logout", (req, res) => {
  currentUser = null;
  res.json({ success: true });
});
app.get("/current-user", (req, res) => {
  res.json(currentUser);
});

app.put("/current-user", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ message: "Користувач не авторизований" });
  }

  currentUser = { ...currentUser, ...req.body };

  users = users.map((u) => (u.email === currentUser.email ? currentUser : u));

  res.json(currentUser);
});

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const contact = {
    id: Date.now(),
    ...req.body,
  };

  contacts.push(contact);
  res.json(contact);
});

app.put("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  contacts = contacts.map((c) => (c.id === id ? { ...c, ...req.body } : c));

  res.json({ success: true });
});

app.delete("/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  contacts = contacts.filter((c) => c.id !== id);

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
