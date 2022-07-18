import mongoose from "mongoose";
import { Event, EventType } from "./model/event";
import { randomBytes } from "crypto";

const main = async () => {
  console.log("Running Server");

  if (!process.env.MONGO_URI) {
    throw Error("Mongo URI Needed!");
  }

  //Interval Setup
  const howLongRunServer = 2 * 60 * 1000;
  const whatIntervals = 8 * 1000;

  // Event Counter
  let eventCount = 1;

  // Set Up MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("Mongo Connection Error");
  }

  // Running Operation
  const myInterval = setInterval(async () => {
    console.log(`Creating Event No.${eventCount}`);

    const randomId = randomBytes(4).toString("hex");
    // Code Here
    const newEvent = Event.build({
      eventType: EventType.UserCreated,
      email: `email${randomId}@gmail.com`,
      userId: `User${randomId}`,
      count: eventCount,
    });

    await newEvent.save();

    eventCount += 1;
  }, whatIntervals);

  // Kill Operation
  setTimeout(() => {
    console.log(`Closing Sever!!`);
    clearInterval(myInterval);
  }, howLongRunServer);
};

//Start Everything
main();
