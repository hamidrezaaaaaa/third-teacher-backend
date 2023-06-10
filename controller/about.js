const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const about = {
    description: req.body.description,
    active: req.body.active,
  };

  const schema = {
    description:{type: "string", optional:false},
    active: "boolean" ,
  };

  const v = new Validator();
  const validationResponse = v.validate(about, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.About
      .create(about)
      .then((result) => {
        res.status(201).json({
          message: "About created successfully",
          about: result,
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

  models.About
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "About not found",
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
  models.About
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

  const updatedAbout = {
    description: req.body.description,
    active: req.body.active,
  };

  models.About
    .update(updatedAbout, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "About updated.",
        about: result,
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

  models.About
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "About deleted.",
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
