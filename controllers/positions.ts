import { Request, Response } from 'express';
import Position from 'models/Position';

// @desc    Get all positions
// @route   GET /api/v1/positions
// @access  Public
export const getPositions = async (_: Request, res: Response): Promise<any> => {
  try {
    const positions = await Position.find();

    return res.status(200).json({
      success: true,
      count: positions.length,
      data: positions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add new position
// @route   POST /api/v1/positions
// @access  Public
export const addPosition = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const position = await Position.create(req.body);

    return res.status(201).json({
      success: true,
      data: position,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(
        ({ message }: any): string => message
      );

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};