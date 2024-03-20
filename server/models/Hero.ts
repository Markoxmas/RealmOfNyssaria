import mongoose, { Schema, Document } from "mongoose";

// Define the interface for your Hero document
export interface IHero extends Document {
  name: string;
  stars: number;
  level: number;
  cp: number;
  image: string;
  in_battle: boolean;
}

// Define the schema for the Hero model
const HeroSchema: Schema = new Schema({
  name: { type: String, required: true },
  stars: { type: Number, required: true },
  level: { type: Number, required: true },
  cp: { type: Number, required: true },
  image: { type: String, required: true },
  in_battle: { type: Boolean, required: true },
});

// Define and export the Hero model
const Hero = mongoose.model<IHero>("Hero", HeroSchema);
export default Hero;
