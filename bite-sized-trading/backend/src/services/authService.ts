import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const registerUser = async (userData: { username: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = new User({
        username: userData.username,
        password: hashedPassword,
    });
    return newUser.save();
};

export const loginUser = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    return { token, user };
};

export const getUserById = async (id: string) => {
    return User.findById(id);
};