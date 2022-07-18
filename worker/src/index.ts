import mongoose from "mongoose";
import { Event } from "./model/event";

const main = async () => {
  console.log("Running Worker");

  if (!process.env.MONGO_URI) {
    throw Error("Mongo URI Needed!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("Mongo Connection Error");
  }

  //Always Listening
  // const changeStream = Event.watch().on("change", (data) => {
  //   console.log("Change Event Received");
  //   console.log(data);
  // });

  // Has next
  const changeStream = Event.watch();

  while (await changeStream.hasNext()) {
    const data = await changeStream.next();
    console.log("Change Event Received");
    console.log(data);
  }

  const close = async () => {
    console.log("Closing Prep");
    await changeStream.close();
    console.log("Closing done");
    process.exit();
  };

  process.on("SIGINT", close);
  process.on("SIGTERM", close);
};

// Start Everything
main();
