import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import { Video } from "./video.interface";
import { videoService } from "./video.service";

class VideoController implements ControllerRead, ControllerWrite {
  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Video[] | null>(videoService.getAll(), res, next);
  }

  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Video | null>(
      videoService.getById(req.params.VideoId),
      res,
      next
    );
  }

  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Video>(videoService.create(req.body), res, next);
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      videoService.delete(req.params.VideoId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Video | null>(
      videoService.update(req.body),
      res,
      next
    );
  }
}

export const videoController = new VideoController();
