import {BoardModel } from '../../database/kanban.model';
import { connectToDatabase } from '../mongoose';

// Function to retrieve boards from MongoDB
export async function getBoardsFromDatabase(params:any) {
  try {
    connectToDatabase();
    const boards = await BoardModel.find().populate('cards');
    return boards;
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

// Function to add a new board to MongoDB
export async function addBoardToDatabase(title: string) {
  try {
    connectToDatabase();
    const newBoard = await BoardModel.create({ title, cards: [] });
    return newBoard;
  } catch (error) {
    console.error('Error adding board:', error);
    throw error;
  }
};


// export async function removeBoard (id: string) => {
//     try{
//     connectToDatabase();
//     const index = boards.findIndex((item) => item.id === id);
//     if (index < 0) return;

//     const tempBoards = [...boards];
//     tempBoards.splice(index, 1);
//     setBoards(tempBoards);
//   }catch (error) {
//     console.error('Error adding board:', error);
//     throw error;
//   }
// };

// // Similarly, implement functions for updating, deleting boards, adding, updating, deleting cards, etc.
