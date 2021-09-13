import db from "../models/index"

const Computer = db.computers;
const Policy = db.policy
const Op = db.Sequelize.Op;

/**
 * function erratic_api() {
    if (Math.random() < 0.3) {
      throw new Error('Internal Error Server *')
    }
  }
 */

// erratic_api();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * when a row is added in computer table, add the respective mapping row into policy table also.
 * 4. to expose an endpoint to see the sync status - not required anymore as it will always be in sync
 * Create and Save a new computer entry
 */

export const create = (req: any, res: any) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Computer entry
  const computer = {
    id: req.body.id,
    name: req.body.name,
    ip: req.body.ip,
    group_id: req.body.group_id,
  };

  // id: crypto.randomUUID({disableEntropyCache : true}),
  const policyUpdate = {
    id: req.body.id,
    computer_name: req.body.name,
    allowed_ip: req.body.ip,
    type: "computer_policy",
  };

  //create policy
  Policy.create(policyUpdate).then((data) => {
    console.log("create policy - done");
    // res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the computer.",
    });
  });
  // Save computer in the database
  Computer.create(computer)
    .then((data) => {
      console.log("create computer - done");
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the computer.",
      });
    });
};

// Retrieve all computer from the database.
export const findAll = (req: any, res: any) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Computer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving computer."
      });
    });
};

// Find a single computer with an id
export const findOne = (req: any, res: any) => {
  const id = req.params.id;

  Computer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving computer with id=" + id
      });
    });
};

// Update a computer by the id in the request
export const update = (req: any, res: any) => {
  const id = req.params.id;
// update policy
  Computer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "computer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update computer with id=${id}. Maybe computer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating computer with id=" + id
      });
    });
};

// Delete a computer with the specified id in the request
export const deleteIt = (req: any, res: any) => {
// delete policy
  const id = req.params.id;

  Policy.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        // res.send({
          console.log(`message: "Policy was deleted successfully!"`);
        // });
      } else {
        // res.send({
         console.log(`Cannot delete Policy with id=${id}. Maybe Policy was not found!`)
        // });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Policy with id=" + id
      });
    });

  Computer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "computer & policy was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete computer & policy  with id=${id}. Maybe computer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete computer & policy  with id=" + id
      });
    });
};

// Delete all computer from the database.
export const deleteAll = (req: any, res: any) => {
// delete all policy

Policy.destroy({
  where: {},
  truncate: false
})
  .then(nums => {
    console.log({ message: `${nums} policies were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all computer."
    });
  });

  Computer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} computer  & policy were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all computer & policy ."
      });
    });
};
 