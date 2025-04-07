import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
});

export const Report = mongoose.model("Report", reportSchema);