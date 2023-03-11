const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const post = {
    category: req.body.name,
    imageurl: req.file.filename,
    description: req.body.description,
  };

  const schema = {
    imageurl:{type: "string", optional:false},
    category: { type: "string", optional: false },
    description: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(post, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Education
      .create(post)
      .then((result) => {
        res.status(201).json({
          message: "Post created successfully",
          post: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  }
}


function show(req, res) {
  const id = req.params.id;

  models.Education
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function index(req, res) {
  models.Education
    .findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function update(req, res) {
  const id = req.params.id;

  const updatedPost = {
    category: req.body.name,
    imageurl: req.file.filename,
    description: req.body.description,
  };

  models.Education
    .update(updatedPost, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Post updated.",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function destroy(req, res) {
  const id = req.params.id;

  models.Education
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}



module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
