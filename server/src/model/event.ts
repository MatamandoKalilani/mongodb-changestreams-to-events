import mongoose from "mongoose";

enum EventType {
  UserCreated = "user:created",
}

interface EventAttrs {
  eventType: EventType;
  userId: string;
  email: string;
  count: number;
}

interface EventDoc extends mongoose.Document {
  eventType: EventType;
  userId: string;
  email: string;
  count: number;
  sent: boolean;
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

const eventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: Object.values(EventType),
  },
  email: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  count: {
    type: Number,
    required: true,
  },
  sent: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Build function used to create an Order (Allows for type checking when creating an order).
eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>("Event", eventSchema);

export { Event, EventType };
