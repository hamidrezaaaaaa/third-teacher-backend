const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const philosophe = {
    name: req.body.name,
    imageUrl: req.file.filename,
    description: req.body.description,
    summary: req.body.summary,
  };

  const schema = {
    imageUrl:{type: "string", optional:false},
    name: { type: "string", optional: false },
    description: { type: "string", optional: false },
    summary: { type: "string", optional: false},
  };

  const v = new Validator();
  const validationResponse = v.validate(philosophe, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.philosophes
      .create(philosophe)
      .then((result) => {
        res.status(201).json({
          message: "Philosophe created successfully",
          philosophe: result,
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

  models.philosophes
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Philosophe not found",
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
  models.philosophes
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

  const updatedPhilosophe = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    summary: req.body.summary,
  };

  models.philosophes
    .update(updatedPhilosophe, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Philosophe updated.",
        philosophe: updatedPhilosophe,
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

  models.philosophes
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Philosophe deleted.",
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
