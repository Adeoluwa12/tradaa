import mongoose, { type Document, Schema } from "mongoose"

export interface IAlertData {
  symbol: string
  change: number
  date: Date
  latestPrice?: number
  previousPrice?: number
  fallback?: boolean
}

export interface IAlert extends Document, IAlertData {}

const AlertSchema = new Schema<IAlert>({
  symbol: { type: String, required: true },
  change: { type: Number, required: true },
  date: { type: Date, required: true },
  latestPrice: { type: Number },
  previousPrice: { type: Number },
  fallback: { type: Boolean, default: false },
})

export const Alert = mongoose.model<IAlert>("Alert", AlertSchema)

