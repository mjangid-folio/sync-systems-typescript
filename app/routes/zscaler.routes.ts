  import * as computers from "../controllers/zscaler.controller";
  import express from 'express';
  const router = express.Router();
  
  // Create a new Computer
  router.post("/", computers.create);

  // Retrieve all Computers
  router.get("/", computers.findAll);

  // Retrieve a single Computer with id
  router.get("/:id", computers.findOne);

  // Update a Computer with id
  router.put("/:id", computers.update);

  // Delete a Computer with id
  router.delete("/:id", computers.deleteIt);

  // delete a new Computer
  router.delete("/", computers.deleteAll);

export = router;
