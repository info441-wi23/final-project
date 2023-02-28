import mongoose from "mongoose";

// connect to websharer mongodb database 
await mongoose.connect("mongodb+srv://tdao09:info441@cluster0.4pqdilx.mongodb.net/?retryWrites=true&w=majority");
console.log("successfully connected to final project");

let models = {};

const studySpotSchema = new mongoose.Schema({ 
    name: String, 
    address: String, 
    authorReview: String, 
    initialRating: Number, 
    ratingList: Array, // we might not need this because reviewSchema references studySpotSchema and also has an attribute for rating
    avgRating: Number, 
    author: String, 
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
    studyspot: {type: mongoose.Schema.Types.ObjectId, ref: "StudySpot"}, 
    reviewText: String, 
    rating: Number, 
    dateCreated: Date
})
models.review = mongoose.model("Review", reviewSchema);

export default models;