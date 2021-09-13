    import * as policies from "../controllers/zscaler.controller.policy";
    import express from 'express';
    const routerPolicy = express.Router();
   
    // Create a new policy
    routerPolicy.post("/", policies.create);
  
    // Retrieve all policys
    routerPolicy.get("/", policies.findAll);
  
    // Retrieve a single policy with id
    routerPolicy.get("/:id", policies.findOne);
  
    // Update a policy with id
    routerPolicy.put("/:id", policies.update);
  
    // Delete a policy with id
    routerPolicy.delete("/:id", policies.deleteP);
  
    // delete a new policy
    routerPolicy.delete("/", policies.deleteAll);
  
export default routerPolicy;
  