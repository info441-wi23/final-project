import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://tdao09:info441@cluster0.4pqdilx.mongodb.net/?retryWrites=true&w=majority");
console.log("successfully connected to final project");

let models = {};

const studySpotSchema = new mongoose.Schema({
    name: String,
    address: String,
    reviewText: String,
    rating: Number,
    dateCreated: Date
});
models.StudySpot = mongoose.model("StudySpot", studySpotSchema);

const userSchema = new mongoose.Schema({
    username: String,
    bookmarks: Array
})
models.User = mongoose.model("User", userSchema);

const reviewSchema = new mongoose.Schema({
    name: String,
    author: String,
    studyspot: { type: mongoose.Schema.Types.ObjectId, ref: "StudySpot" },
    reviewText: String,
    rating: Number,
    dateCreated: Date
})
models.Review = mongoose.model("Review", reviewSchema);

export default models;