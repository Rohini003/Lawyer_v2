import Lawyer from "../models/LawyerSchema.js";

export const updateLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    const updateLawyer = await Lawyer.findByIdAndUpdate( 
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateLawyer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    await Lawyer.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    const Lawyers = await Lawyer.findById(id);
    res.status(200).json({
      success: true,
      message: "lawyer found",
      data: Lawyers,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "no user found" });
  }
};

export const getAllLawyer = async (req, res) => {
  try {
    const { query } = req.query;
    let lawyers;

    if (query) {
      lawyers = await Lawyer.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
       lawyers = await Lawyer.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "lawyers found",
      data: lawyers,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};