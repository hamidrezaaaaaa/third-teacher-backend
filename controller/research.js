const Validator = require("fastest-validator");
const models = require("../models");
const uniqId = require("uniqid");

function save(req, res) {
  const research = {
    title: req.body.title,
    image: req.files.image[0].filename,
    summary: req.body.summary,
    researchId:uniqId(),
    writer:req.body.writer,
    publicationYear:req.body.publicationYear,
    pdf:req.files.pdf ? req.files.pdf[0].filename:null,
  };

  const schema = {
    image:{type: "string", optional:false},
    title: { type: "string", optional: false },
    writer: { type: "string", optional: false },
    summary: { type: "string", optional: false},
    publicationYear: { type: "string", optional: false},
    pdf: { type: "string", optional: true},
  };

  const v = new Validator();
  const validationResponse = v.validate(research, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Researchs
      .create(research)
      .then((result) => {
        res.status(201).json({
          message: "Research created successfully",
          research: result,
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

  models.Researchs
    .findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Research not found",
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
  models.Researchs
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

  const updatedResearch = {
    title: req.body.title,
    image: req.files.image[0].filename,
    summary: req.body.summary,
    writer:req.body.writer,
    publication:req.body.publication,
    publicationYear:req.body.publicationYear,
    pdf:req.files.pdf[0].filename,
  };

  models.Researchs
    .update(updatedBook, { where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Book updated.",
        research: updatedResearch,
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

  models.Researchs
    .destroy({ where: { id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Research deleted.",
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
