import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel";

export class AuthService {
    static async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        return user;
    }

    static async login(email: string, password: string) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        return token;
    }
}