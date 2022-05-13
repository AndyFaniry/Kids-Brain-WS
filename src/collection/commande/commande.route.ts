import { Router } from "express";
import * as passport from "passport";
import { commandeController } from "./commande.controller";

class CommandeRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router
      .route("/")
      .get(
        // passport.authenticate("jwt", { session: false }),
        commandeController.getAll.bind(commandeController)
      )
      .post(commandeController.create.bind(commandeController))
      .put(commandeController.update.bind(commandeController))
      .delete(
        // passport.authenticate("jwt", { session: false }),
        commandeController.delete.bind(commandeController)
      );
    this.router
      .route("/:commandeId")
      .get(
        // passport.authenticate("jwt", { session: false }),
        commandeController.getById.bind(commandeController)
      )
      .put(commandeController.update.bind(commandeController))
      .delete(
        // passport.authenticate("jwt", { session: false }),
        commandeController.delete.bind(commandeController)
      );
    this.router.route("/client/:clientId").get(
      // passport.authenticate("jwt", { session: false }),
      commandeController.getByClient.bind(commandeController)
    );
    this.router
      .route("/resto/:restoId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getByResto.bind(commandeController)
      );
    this.router
      .route("/delivery/:deliveryId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getByDeliveryMan.bind(commandeController)
      );
    this.router
      .route("/not_delivered/:deliveryManId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getOrderNotDelivered.bind(commandeController)
      );
    this.router
      .route("/deliver")
      .put(
        passport.authenticate("jwt", { session: false }),
        commandeController.deliver.bind(commandeController)
      );
    this.router
      .route("/order-dish")
      .post(commandeController.orderADish.bind(commandeController));
    this.router
      .route("/order/list/:restauAddress")
      .get(commandeController.findRestauPendingOrders.bind(commandeController));
    this.router
      .route("/benefit/day")
      .get(commandeController.getEkalyDailyBenefit.bind(commandeController));
    this.router
      .route("/benefit/restaurant")
      .get(commandeController.getBenefitsByRestaurant.bind(commandeController));
  }
}
const commandeRoute = new CommandeRoute();

export const commandeRoutes = commandeRoute.router;
