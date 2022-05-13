import { Router } from "express";
import * as passport from "passport";
import { dishController } from "./dish.controller";

class DishRoute {
    router: Router;
  
    constructor() {
      this.router = Router();
      this.init();
    }
  
    private init() {
        
        this.router
        .route("/")
        .get(
            passport.authenticate("jwt", { session: false }),
            dishController.getAll.bind(dishController),
        )
        .post(dishController.create.bind(dishController))
        .put(dishController.update.bind(dishController))
        .delete(
            // passport.authenticate("jwt", { session: false }),
            dishController.delete.bind(dishController),
        );
        this.router
        .route("/:dishId")
        .get(
            passport.authenticate("jwt", { session: false }),
            dishController.getById.bind(dishController),
        )
        .put(dishController.update.bind(dishController))
        .delete(
            // passport.authenticate("jwt", { session: false }),
            dishController.delete.bind(dishController),
        );
        this.router.route("/resto/:restoId").get(
            passport.authenticate("jwt", { session: false }),
            dishController.getByResto.bind(dishController),
        );
    }
}
const dishRoute = new DishRoute();

export const dishRoutes = dishRoute.router;