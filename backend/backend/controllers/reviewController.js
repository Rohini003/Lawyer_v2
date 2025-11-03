import Review from "../models/ReviewSchema.js";
import Lawyer from "../models/LawyerSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ success: true, message: "Successful", data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createReview = async (req, res) => {
  let lawyerId = req.params.lawyerId;
  let userId = req.userId;

  // If lawyer or user not provided in the request body, set them from the request
  if (!req.body.lawyer) req.body.lawyer = lawyerId;
  if (!req.body.user) req.body.user = userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    // Update Lawyer model with the new review ID
    await Lawyer.findByIdAndUpdate(lawyerId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};
