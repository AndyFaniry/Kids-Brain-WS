import { Router } from "express";
import * as passport from "passport";
import { videoController } from "./video.controller";

class VideoRouter {
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
        videoController.getAll.bind(videoController),
      );
    this.router
      .route("/:VideoId")
      .get(
        passport.authenticate("jwt", { session: false }),
        videoController.getById.bind(videoController),
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        videoController.update.bind(videoController),
      )
      .delete(
        passport.authenticate("jwt", { session: false }),
        videoController.delete.bind(videoController),
      );
  }
}

const videoRouter = new VideoRouter();

export const VideoRoutes = videoRouter.router;
