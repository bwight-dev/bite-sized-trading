import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        await authService.logout(req.user);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};