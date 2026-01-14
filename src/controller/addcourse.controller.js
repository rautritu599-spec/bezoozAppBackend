import addcourseSchemaModel from "../models/addcourse.model.js";

// ADD course
export const addCourse = async (req, res) => {
  try {
    const { course, subject, grade } = req.body;

    if (!course || !subject || !grade) {
      return res.status(400).json({
        status: false,
        message: "course, subject and grade required"
      });
    }

    const data = await addcourseSchemaModel.create({
      course,
      subject,
      grade
    });

    res.status(201).json({
      status: true,
      data
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
};

// FETCH all (Admin / Teacher / Student)
export const getCourses = async (req, res) => {
  try {
    const list = await addcourseSchemaModel.find();   // <-- FIX
    res.status(200).json({
      status: true,
      data: list
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message
    });
  }
};

// UPDATE
export const updateCourse = async (req, res) => {
  try {
    const updated = await addcourseSchemaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ status: true, data: updated });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

// DELETE
export const deleteCourse = async (req, res) => {
  try {
    await addcourseSchemaModel.findByIdAndDelete(req.params.id);
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};
