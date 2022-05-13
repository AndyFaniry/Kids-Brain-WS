import * as mongoose from "mongoose";
import { config } from "./app.config";
class Database {
  async connect(cb: () => void) {
    const connexionString = config.mongodb.dbURI;
    console.log("Trying to connect to database..");
    mongoose
      .connect(connexionString)
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });

    // mongoose.connection.on("connected", () => {
    //   console.log(`connected to database: ${connexionString}`);
    // });

    mongoose.connection.once("open", () => {
      cb();
      console.log(`Database opened: ${connexionString}`);
    });

    mongoose.connection.on("error", () => {
      throw new Error(
        `unable to connect to database: ${connexionString}`,
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log(`Disconnected to database: ${connexionString}`);
    });
  }
}

export const database = new Database();
