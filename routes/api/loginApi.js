const { response } = require("express");
const express = require("express");

const router = express.Router();
const LoginTable = require("../../models/login");
router.post("/add", (req, res) => {
  const { id, name, password, role } = req.body;
  add = new LoginTable({
    id,
    name,
    password,
    role,
  });
  add.save().then((data) => res.send(data));
});

router.get("/all", (req, res) => {
  LoginTable.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.get("/:loginId", async (req, res) => {
  try {
    const item = await LoginTable.find({ id: req.params.loginId });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.send(400).send("Server Error");
  }
});

router.delete("/:loginId", async (req, res) => {
  try {
    await LoginTable.findOneAndDelete({ id: req.params.userId });
    res.json(`User ${req.params.userId} deleted`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
