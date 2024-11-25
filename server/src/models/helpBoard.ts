import { Schema, type Document } from "mongoose";

export interface HelpBoardDocoument extends Document {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "open" | "completed";
  createdBy: string;
  completedBy?: string;
}

const helpBoardSchema = new Schema<HelpBoardDocoument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String, required: true },
  completedBy: { type: String },
});

export default helpBoardSchema;
