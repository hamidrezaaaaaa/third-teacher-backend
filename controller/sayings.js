const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const saying = {
    speech: req.body.speech,
    announcer: req.body.announcer,
    position: req.body.position,
  };

  const schema = {
    speech:{type: "string", optional:false},
    announcer: { type: "string", optional: false },
    position: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(saying, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Sayings
      .create(saying)
      .then((result) => {
        res.status(201).json({
          message: "Saying created successfully",
          saying: result,
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

  models.Sayings
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Saying not found",
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
  models.Sayings
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

  const updatedSaying = {
    speech: req.body.speech,
    announcer: req.body.announcer,
    position: req.body.position,
  };

  models.Sayings
    .update(updatedSaying, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Saying updated.",
        saying: result,
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

  models.Sayings
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Saying deleted.",
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
