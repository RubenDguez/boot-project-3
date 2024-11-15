import { Schema,type  Document } from "mongoose";

export interface IEvent extends Document {
    id: string;
    eventName: string;
    eventImage: string;
    eventDate: Date;
    eventLocation: string;
}

const EventSchema = new Schema<IEvent>({
    eventName: {
        type: String,
        required: true,
    },
    eventImage: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
    },
});

export  default EventSchema;
