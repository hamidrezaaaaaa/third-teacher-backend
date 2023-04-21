const Validator = require("fastest-validator");
const models = require("../models");
const uniqId = require("uniqid");

function save(req, res) {
  const competition = {
    title: req.body.title,
    image: req.files.image[0].filename,
    expand: req.body.expand,
    competitionId:uniqId(),
    status:req.body.status,
    submitingDeadline:req.body.submitingDeadline,
    resultDeadline:req.body.resultDeadline,
    signupLink:req.body.signupLink,
    awards:req.body.awards,
    referee:req.body.referee,
    organizers:req.body.organizers
  };

  const schema = {
    image:{type: "string", optional:false},
    title: { type: "string", optional: false },
    expand: { type: "string", optional: false },
    status: { type: "string", optional: false},
    submitingDeadline: { type: "string", optional: false},
    resultDeadline: { type: "string", optional: false},
    signupLink: { type: "string", optional: false},
    awards: { type: "string", optional: false},
    referee: { type: "string", optional: false},
    organizers: { type: "string", optional: false},
  };

  const v = new Validator();
  const validationResponse = v.validate(competition, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Competitions
      .create(competition)
      .then((result) => {
        res.status(201).json({
          message: "Competition created successfully",
          competition: result,
        });
      })
      .catch((err) => {
        // console.log(err),
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  }
}

function show(req, res) {
  const id = req.params.id;

  models.Competitions
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Competition not found",
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
  models.Competitions
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

  const updatedCompetition = {
    title: req.body.title,
    image: req.files.image[0].filename,
    expand: req.body.expand,
    status:req.body.status,
    submitingDeadline:req.body.submitingDeadline,
    resultDeadline:req.body.resultDeadline,
    signupLink:req.body.signupLink,
    awards:req.body.awards,
    referee:req.body.referee,
    organizers:req.body.organizers
  };

  models.Competitions
    .update(updatedCompetition, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Book updated.",
        competition: updatedCompetition,
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

  models.Competitions
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Competition deleted.",
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
