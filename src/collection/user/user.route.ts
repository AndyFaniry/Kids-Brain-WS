import { Router } from "express";
import * as passport from "passport";
import { userController } from "./user.controller";

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router
      .route("/signup")
      .post(userController.signUp.bind(userController));

    this.router
      .route("/login")
      .post(
        passport.authenticate("local", { session: false }),
        userController.login.bind(userController),
      );
    this.router
      .route("/update")
      .put(
        passport.authenticate("jwt", { session: false }),
        userController.updateByLogin.bind(userController),
      );
    this.router
      .route("/:userId")
      .get(
        passport.authenticate("jwt", { session: false }),
        userController.getByLogin.bind(userController),
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        userController.update.bind(userController),
      )
      .delete(
        passport.authenticate("jwt", { session: false }),
        userController.delete.bind(userController),
      );
  }
}

const userRouter = new UserRouter();

export const userRoutes = userRouter.router;
