import { Commande, DetailType } from "../commande/commande.interface";
import { CommandeModel } from "../commande/commande.schema";
import { commandeService } from "../commande/commande.service";
import { DishType } from "../dish/dish.interface";
import { Resto } from "./resto.interface";
import { RestoModel } from "./resto.schema";

class RestoService {
  async getAll(): Promise<Resto[] | null> {
    return RestoModel.find().exec();
  }
  async create(item: Resto): Promise<Resto> {
    return RestoModel.create(item);
  }
  async getById(id: string): Promise<Resto | null> {
    return RestoModel.findById(id).exec();
  }
  async delete(id: string): Promise<boolean> {
    return RestoModel.deleteOne({ _id: id }).then(() => true);
  }
  async update(item: Resto): Promise<Resto | null> {
    return RestoModel.findByIdAndUpdate(item._id, item, { new: true }).exec();
  }
  async getBenefits(restauAddress: String): Promise<Number | null> {
    var orderList: Commande[] = await CommandeModel.find({
      "detail.dish.resto.address": restauAddress,
    })
      .where("etat")
      .equals(true)
      .exec();
    var restaurant: Resto = (
      await RestoModel.find({ address: restauAddress }).exec()
    )[0];
    return new Promise((resolve, reject) => {
      try {
        var benefit: number = 0;
        for (var iOrder = 0; iOrder < orderList.length; iOrder++) {
          var orderBeneficial: number = 0;
          var dishes: DetailType[] = orderList[iOrder].detail;
          for (var iDish = 0; iDish < dishes.length; iDish++) {
            orderBeneficial += this.getDishBeneficial(
              dishes[iDish].dish,
              dishes[iDish].qty
            ).valueOf();
          }
          benefit += (orderBeneficial * restaurant.pourcentage) / 100;
        }
        resolve(new Number(benefit));
      } catch (ex) {
        reject(ex);
      }
    });
  }

  getDishBeneficial(item: DishType, qty: Number): Number {
    return (item.pV.valueOf() - item.pR.valueOf()) * qty.valueOf();
  }
}

export const restoService = new RestoService();
