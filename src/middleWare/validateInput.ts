import { RequestHandler } from "express";

export const validateInput: RequestHandler = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if all required fields are present
  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ message: "All fields are required" }); // Early return, no need for next() here
  }

  // Validate email format using a basic regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
     res.status(400).json({ message: "Invalid email format" }); // Early return, no need for next() here
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters long" }); // Early return, no need for next() here
  }

  // If all validations pass, proceed to the next middleware
  next(); // Only call next if no response was sent
};
