import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import { Resto } from "./resto.interface";
import { restoService } from "./resto.service";

class RestoController implements ControllerRead, ControllerWrite {
  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Resto[] | null>(restoService.getAll(), res, next);
  }
  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Resto | null>(
      restoService.getById(req.params.restoId),
      res,
      next
    );
  }
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Resto>(restoService.create(req.body), res, next);
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      restoService.delete(req.params.restoId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Resto | null>(
      restoService.update(req.body),
      res,
      next
    );
  }

  getBenefits(req: Request, resp: Response, next: NextFunction): void {
    wrapToSendBackResponse<Number | null>(
      restoService.getBenefits(req.params.restauAddress),
      resp,
      next
    );
  }
}

export const restoController = new RestoController();
