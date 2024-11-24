import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log("Server is running on port:", config.port);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

main();
