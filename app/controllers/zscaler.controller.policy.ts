import db from "../models"
const Policy = db.policy;
const Op = db.Sequelize.Op;

function erratic_api() {
    if (Math.random() < 0.3) {
        throw new Error('Internal Error Server *')
    }
}

erratic_api();

// Create and Save a new Computer entry
export const create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Computer entry
  const policy = {
    id: req.body.id,
    computer_name: req.body.computer_name,
    allowed_ip: req.body.allowed_ip,
    type: req.body.type
  };

  // Save Computer entry in the database
  Policy.create(policy)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the policy."
      });
    });
};

// Retrieve all policy from the database.
export const findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Policy.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving policy."
      });
    });
};

// Find a single policy with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Policy.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving policy with id=" + id
      });
    });
};

// Update a policy by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Policy.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "policy was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update policy with id=${id}. Maybe policy was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating policy with id=" + id
      });
    });
};

// Delete a policy with the specified id in the request
export const deleteP = (req, res) => {
  const id = req.params.id;

  Policy.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "policy was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete policy with id=${id}. Maybe policy was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete policy with id=" + id
      });
    });
};

// Delete all policy from the database.
export const deleteAll = (req, res) => {
    Policy.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} policy were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all policy."
      });
    });
};
