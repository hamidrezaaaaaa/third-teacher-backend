const Validator = require("fastest-validator");
const models = require("../models");



function save(req, res) {
  const order = {
    productId: req.body.productId,
    userId: req.body.userId,
    orderDate: req.body.orderDate,
    productName: req.body.productName,
    tag:req.body.tag
  };

  const schema = {
    productId: { type: "string", optional: false },
    userId: { type: "string", optional: false },
    orderDate: { type: "string", optional: false },
    productName: { type: "string", optional: false },
    tag: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(order, schema);

  if (validationResponse !== true) {
    res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    models.Orders.create(order)
      .then((result) => {
        res.status(201).json({
          message: "Order created successfully",
          order: result,
      
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

  models.Orders.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Order not found",
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
  models.Orders.findAll()
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

function userOrder(req, res) {
  const id = req.params.id
  models.Orders.findAll({where:{userId:id}})
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

// function update(req, res) {
//   const id = req.params.id;

//   const updatedPhilosophe = {
//     personal: req.body.personal,
//     imageurl: req.file.filename,
//     description: req.body.description,
//     summary: req.body.summary,
//   };

//   models.Philosophes
//     .update(updatedPhilosophe, { where: { id: id } })
//     .then((result) => {
//       res.status(200).json({
//         message: "Philosophe updated.",
//         philosophe: updatedPhilosophe,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Something went wrong",
//         error: err,
//       });
//     });
// }

// function destroy(req, res) {
//   const id = req.params.id;

//   models.Philosophes
//     .destroy({ where: { id: id } })
//     .then((result) => {
//       res.status(200).json({
//         message: "Philosophe deleted.",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Something went wrong",
//         error: err,
//       });
//     });
// }

module.exports = {
  save: save,
  show: show,
  index: index,
  userOrder:userOrder
  //   update: update,
  // destroy: destroy,
};
