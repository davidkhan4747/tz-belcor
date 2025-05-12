import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommandHistory, Sample } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface HistoryState {
  commands: CommandHistory[];
}

const initialState: HistoryState = {
  commands: [],
};

interface AddCommandPayload {
  originalCommand: string;
  optimizedCommand: string;
  samplesBeforeState: Sample[];
  samplesAfterState: Sample[];
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCommand: (state, action: PayloadAction<AddCommandPayload>) => {
      const { originalCommand, optimizedCommand, samplesBeforeState, samplesAfterState } = action.payload;
      
      state.commands.push({
        id: uuidv4(),
        originalCommand,
        optimizedCommand,
        date: new Date().toISOString(),
        samplesBeforeState,
        samplesAfterState,
      });
    },
    clearHistory: (state) => {
      state.commands = [];
    },
  },
});

export const { addCommand, clearHistory } = historySlice.actions;
export default historySlice.reducer;
