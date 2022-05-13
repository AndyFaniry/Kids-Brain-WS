import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { DailyBenefit, RestauBenefit } from "../../models/command.model";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import { Commande } from "./commande.interface";
import { commandeService } from "./commande.service";

class CommandeController implements ControllerRead, ControllerWrite {
  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getAll(),
      res,
      next
    );
  }
  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.getById(req.params.restoId),
      res,
      next
    );
  }
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande>(
      commandeService.create(req.body),
      res,
      next
    );
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      commandeService.delete(req.params.commandeId),
      res,
      next
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.update(req.body),
      res,
      next
    );
  }

  getByClient(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByClient(req.params.clientId),
      res,
      next
    );
  }
  getByResto(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByResto(req.params.restoId),
      res,
      next
    );
  }
  getByDeliveryMan(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByResto(req.params.deliveryId),
      res,
      next
    );
  }
  getOrderNotDelivered(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getOrderNotDelivered(req.params.deliveryManId),
      res,
      next
    );
  }
  deliver(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.deliver(req.body),
      res,
      next
    );
  }
  orderADish(req: Request, resp: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.orderDish(
        req.body.clientId,
        req.body.details,
        req.body.deliveryPlace
      ),
      resp,
      next
    );
  }
  findRestauPendingOrders(
    req: Request,
    resp: Response,
    next: NextFunction
  ): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.findRestauOrderList(req.params.restauAddress),
      resp,
      next
    );
  }
  getEkalyDailyBenefit(req: Request, resp: Response, next: NextFunction): void {
    wrapToSendBackResponse<DailyBenefit[] | null>(
      commandeService.getEkalyDailyBenefit(),
      resp,
      next
    );
  }
  getBenefitsByRestaurant(
    req: Request,
    resp: Response,
    next: NextFunction
  ): void {
    wrapToSendBackResponse<RestauBenefit[] | null>(
      commandeService.getRestaurantBenefits(),
      resp,
      next
    );
  }
}

export const commandeController = new CommandeController();
