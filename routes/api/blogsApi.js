const { response } = require("express");
const express = require("express");

const router = express.Router();
const BlogsTable = require("../../models/blogs");

router.post("/blog/add/:userId", (req, res) => {
  const { id, title, content } = req.body;
  add = new BlogsTable({
    id,
    title,
    content,
  });
  add.save().then((data) => res.send(data));
});
// routes @GET api/user/test
// desc Tests the user routes
// @access Public
router.get("blog/all", (req, res) => {
  BlogsTable.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/:blogId", async (req, res) => {
  try {
    const item = await BlogsTable.find({ id: req.params.blogId });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.send(400).send("Server Error");
  }
});

router.put("blog/update/:blogId", async (req, res) => {
  try {
    const item = await BlogsTable.find({ id: req.params.blogId });
    const { title = item[0].title, content = item[0].content } = req.body;
    let BlogDetails = await BlogsTable.findByIdAndUpdate(
      { _id: item[0]._id },
      {
        title,
        content,
      },
      { new: true }
    );
    res.json(BlogDetails);
  } catch (err) {
    console.log(err);
    res.send(400).send("Server Error");
  }
});

router.delete("blog/delete/:blogId", async (req, res) => {
  try {
    await BlogsTable.findOneAndDelete({ id: req.params.blogId });
    res.json(`Blog ${req.params.blogId} deleted`);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
