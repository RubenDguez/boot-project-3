import { Schema, type Document } from "mongoose";

export interface HelpBoardDocoument extends Document {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "open" | "completed";
  createdBy: string;
  completedBy?: string;
  type: string;
}

const helpBoardSchema = new Schema<HelpBoardDocoument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String, required: true },
  completedBy: { type: String },
  type: { type: String, required: true },
});

export default helpBoardSchema;
