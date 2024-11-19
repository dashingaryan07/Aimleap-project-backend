import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock Database (replace with actual DB in production)
const users: { email: string; password: string; name: string }[] = [];

// Register User
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (mock DB push, replace with actual DB call)
    const newUser = { email, password: hashedPassword, name: `${firstName} ${lastName}` };
    users.push(newUser);

    // Generate JWT Token
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // Send response with token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    // Call the error handler middleware (optional, but good practice)
    next(error); // This sends the error to the Express error handling middleware
  }
};
