import { Router } from "express";
import { userRoutes } from "../collection/user/user.route";
import { VideoRoutes } from "../collection/video/video.route";
class AppRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/api-status", (req, res) =>
      res.json({ status: "API is OK" }),
    );

    this.router.use("/user", userRoutes);
    this.router.use("/video", VideoRoutes);
  }
}

const appRouter = new AppRouter();
export const appRoutes = appRouter.router;
