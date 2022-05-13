import { User } from "../user/user.interface";
import { dishService } from "../dish/dish.service";
import { Commande, DELIVERY_PRICE, DetailType } from "./commande.interface";
import { CommandeModel } from "./commande.schema";
import {
  DailyBenefit,
  DetailRequest,
  RestauBenefit,
} from "../../models/command.model";
import { userService } from "../user/user.service";
import { restoService } from "../resto/resto.service";
import { Resto } from "../resto/resto.interface";

class CommandeService {
  async getAll(): Promise<Commande[] | null> {
    return CommandeModel.find().exec();
  }
  async create(item: Commande): Promise<Commande> {
    return CommandeModel.create(item);
  }
  async getById(id: string): Promise<Commande | null> {
        return CommandeModel.findById(id).exec();
  }
  async delete(id: string): Promise<boolean> {
      return CommandeModel.deleteOne({ _id: id }).then(() => true);
  }
  async update(item: Commande): Promise<Commande | null> {
      return CommandeModel
        .findByIdAndUpdate(item._id, item, { new: true })
        .exec();
  }
  async getByClient(id: string): Promise<Commande[] | null> {
      return CommandeModel.find({"client._id":id}).exec();
  }
  async getByResto(id: string): Promise<Commande[] | null> {
      return CommandeModel.find({"detail.dish.user._id":id}).exec();
  }
  async getByDeliveryMan(id: string): Promise<Commande[] | null> {
      return CommandeModel.find({"delivery_man._id":id}).exec();
  }
  async getOrderNotDelivered(id: string): Promise<Commande[] | null> {
      return CommandeModel.find({"delivery_man._id":id, "etat": false}).exec();
  }
  async deliver(item: Commande): Promise<Commande | null> {
      return CommandeModel
        .findByIdAndUpdate(item._id, {"etat": true}, { new: true })
        .exec();

  async findRestauOrderList(restauAddress: string): Promise<Commande[] | null> {
    return CommandeModel.find({
      "detail.dish.resto.address": restauAddress,
    })
      .where("etat")
      .equals(false)
      .exec();
  }

  async orderDish(
    clientId: string,
    details: DetailRequest[],
    deliveryPlace: string
  ): Promise<Commande> {
    const order: Commande = await this.convertRequestToModel(
      clientId,
      details,
      deliveryPlace
    );
    return await this.create(order);
  }

  async convertRequestToModel(
    clientId: string,
    details: DetailRequest[],
    deliveryPlace: string
  ): Promise<Commande> {
    var orderDetails: Array<DetailType> = [];
    for (var iDetail = 0; iDetail < details.length; iDetail++) {
      var dish = await dishService.getById(
        details[iDetail].dishTypeId.toString()
      );
      orderDetails.push({
        dish: dish,
        qty: details[iDetail].qty,
      });
    }
   }
    var client: User = await userService.getById(clientId);
    const order: Commande = {
      date: new Date(),
      etat: false,
      detail: orderDetails,
      client: client,
      delivery_man: null,
      delivery_price: DELIVERY_PRICE,
      delivery_place: deliveryPlace,
    };
    return order;
  }

  getOrderTotalPrice(orderDetails: DetailType[]): Number {
    var totalPrice = 0;
    orderDetails.forEach((item) => {
      totalPrice += item.dish.pV.valueOf() * item.qty.valueOf();
    });
    return totalPrice;
  }

  async getEkalyDailyBenefit(): Promise<DailyBenefit[] | null> {
    var beneficialList: DailyBenefit[] = [];
    var orderList: Commande[] = await CommandeModel.find()
      .where("etat")
      .equals(true)
      .exec();
    return new Promise((resolve, reject) => {
      try {
        var prevDate: string = "";
        var benefit: number = 0;
        for (var iOrder = 0; iOrder < orderList.length; iOrder++) {
          if (
            prevDate !== "" &&
            prevDate !== orderList[iOrder].date.toDateString()
          ) {
            beneficialList.push({ date: prevDate, benefit: benefit });
            benefit = 0;
          }
          var dishes: DetailType[] = orderList[iOrder].detail;
          for (var iDish = 0; iDish < dishes.length; iDish++) {
            benefit += restoService
              .getDishBeneficial(dishes[iDish].dish, dishes[iDish].qty)
              .valueOf();
          }
          prevDate = orderList[iOrder].date.toDateString();
        }
        beneficialList.push({ date: prevDate, benefit: benefit });
        resolve(beneficialList);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async getRestaurantBenefits(): Promise<RestauBenefit[] | null> {
    var restauBenefitList: RestauBenefit[] = [];
    var restauList: Resto[] = await restoService.getAll();
    var orderList: Commande[] = await CommandeModel.find()
      .where("etat")
      .equals(true)
      .exec();
    return new Promise(async (resolve, reject) => {
      try {
        for (var iResto = 0; iResto < restauList.length; iResto++) {
          var restauBenefit: number = (
            await restoService.getBenefits(restauList[iResto].address)
          ).valueOf();
          restauBenefitList.push({
            resto: restauList[iResto],
            benefit: restauBenefit,
          });
        }
        // var benefit: number = 0;
        // var dishBenefit: number = 0;
        // for (var iOrder = 0; iOrder < orderList.length; iOrder++) {
        //   var dishes: DetailType[] = orderList[iOrder].detail;
        //   for (var iDish = 0; iDish < dishes.length; iDish++) {
        //     dishBenefit = restoService
        //       .getDishBeneficial(dishes[iDish].dish, dishes[iDish].qty)
        //       .valueOf();
        //     var iResto = restauBenefitList.findIndex(
        //       (index) =>
        //         index.resto.address === dishes[iDish].dish.resto.address
        //     );
        //     if (iResto != undefined) {
        //       restauBenefitList[iResto].benefit =
        //         restauBenefitList[iResto].benefit.valueOf() +
        //         (dishBenefit * restauBenefitList[iResto].resto.pourcentage) /
        //           100;
        //     } else {
        //       restauBenefitList.push({
        //         resto: dishes[iDish].dish.resto,
        //         benefit: dishBenefit,
        //       });
        //     }
        //   }
        // var restauaddress: string = ordersList[iOrder].detail
        // if (restauBenefitList.find(index => index.resto.address === )) {

        // }
        // }
        resolve(restauBenefitList);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

export const commandeService = new CommandeService();
