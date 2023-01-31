const express = require("express");
const router = express.Router();
const UserService = require("../../Services/User/user.service");
const userValidator = require("../../Controller/User/user.validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/user");
  },
  filename: function (req, file, cb) {
    cb(null, "user-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("userImg");

router.post("/register", uploadImg, userValidator.register, async (req, res) => {
  try {
    let { success, message, data } = await UserService.create(
      req.file,
      req.body
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.Exists({
      _id: req.params.id,
    });
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.update(
      req.params.id,
      req.body
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.patch("/:id", uploadImg, async (req, res) => {
  let payload = JSON.parse(JSON.stringify(req.body));
  if (req.file) {
    payload = { ...payload, userImg: req.file.path };
  }
  try {
    let { success, message, data } = await UserService.update(
      req.params.id,
      payload
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.softDelete(
      req.params.id
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/list", async (req, res) => {
  try {
    let { success, message, data } = await UserService.list(
      req.body.where,
      req.body.pagination
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

