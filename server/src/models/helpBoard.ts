import { Schema, model, type Document } from "mongoose";

export interface IhelBoard extends Document {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "open" | "completed";
  createdBy: string;
  completedBy?: string;
}

const HelpBoardSchema = new Schema<IhelBoard>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  completedBy: {
    type: String,
  },
});

export default model<IhelBoard>("HelpBoard", HelpBoardSchema);
