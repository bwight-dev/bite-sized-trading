import { Request, Response } from 'express';
import { TradeService } from '../../services/tradingService';

const tradeService = new TradeService();

export const createTrade = async (req: Request, res: Response) => {
    try {
        const tradeData = req.body;
        const newTrade = await tradeService.createTrade(tradeData);
        res.status(201).json(newTrade);
    } catch (error) {
        res.status(500).json({ message: 'Error creating trade', error });
    }
};

export const getTrades = async (req: Request, res: Response) => {
    try {
        const trades = await tradeService.getTrades();
        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trades', error });
    }
};

export const getTradeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const trade = await tradeService.getTradeById(id);
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json(trade);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trade', error });
    }
};

export const updateTrade = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tradeData = req.body;
        const updatedTrade = await tradeService.updateTrade(id, tradeData);
        if (!updatedTrade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json(updatedTrade);
    } catch (error) {
        res.status(500).json({ message: 'Error updating trade', error });
    }
};

export const deleteTrade = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTrade = await tradeService.deleteTrade(id);
        if (!deletedTrade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trade', error });
    }
};