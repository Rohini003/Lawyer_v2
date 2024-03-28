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
  if (!req.body.lawyer) req.body.lawyer = req.params.lawyerId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    // Update Lawyer model with the new review ID
    await Lawyer.findByIdAndUpdate(req.body.lawyer, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ success: true, message: "Review Submitted", data: savedReview });
  } catch (err) {
    // Handle any errors that occur during review creation or lawyer update
    console.error("Error creating review:", err);
    res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};
