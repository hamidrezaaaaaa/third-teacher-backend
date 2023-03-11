const Validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const member = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.file.filename,
    education: req.body.education,
    position: req.body.position,
  };

  const schema = {
    image:{type: "string", optional:false},
    firstName: { type: "string", optional: false },
    lastName: { type: "string", optional: false },
    education: { type: "string", optional: false },
    position: { type: "string", optional: false},
  };

  const v = new Validator();
  const validationResponse = v.validate(member, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Members
      .create(member)
      .then((result) => {
        res.status(201).json({
          message: "Memeber created successfully",
          memeber: result,
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

  models.Members
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Memeber not found",
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
  models.Members
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

  const updatedMemeber = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.file.filename,
    education: req.body.education,
    position: req.body.position,
  };

  models.Members
    .update(updatedMemeber, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Memeber updated.",
        member: result,
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

  models.Members
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Memeber deleted.",
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
