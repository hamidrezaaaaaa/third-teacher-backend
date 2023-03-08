const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const school = {
    name: req.body.name,
    imageurl: req.file.filename,
    description: req.body.description,
    summary: req.body.summary,
  };

  const schema = {
    imageurl:{type: "string", optional:false},
    name: { type: "string", optional: false },
    description: { type: "string", optional: false },
    summary: { type: "string", optional: false},
  };

  const v = new Validator();
  const validationResponse = v.validate(school, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Schools
      .create(school)
      .then((result) => {
        res.status(201).json({
          message: "School created successfully",
          school: result,
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

  models.Schools
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "school not found",
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
  models.Schools
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

  const updatedSchool = {
    name: req.body.name,
    imageurl: req.file.filename,
    description: req.body.description,
    summary: req.body.summary,
  };

  models.Schools
    .update(updatedSchool, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "School updated.",
        school: result,
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

  models.Schools
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "School deleted.",
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
