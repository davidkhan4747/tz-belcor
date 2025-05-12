import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position, Sample } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ManipulatorState {
  manipulatorPosition: Position;
  samples: Sample[];
  isHoldingSample: boolean;
  currentSampleId: string | null;
  animationSpeed: number; // in milliseconds
  gridSize: { width: number; height: number };
}

const initialState: ManipulatorState = {
  manipulatorPosition: { x: 0, y: 0 }, // top-left corner
  samples: Array.from({ length: 5 }, () => ({
    id: uuidv4(),
    position: {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    },
    isPickedUp: false,
  })),
  isHoldingSample: false,
  currentSampleId: null,
  animationSpeed: 500, // default animation speed (ms)
  gridSize: { width: 10, height: 10 },
};

const manipulatorSlice = createSlice({
  name: 'manipulator',
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.manipulatorPosition.x > 0) {
        state.manipulatorPosition.x -= 1;
      }
    },
    moveRight: (state) => {
      if (state.manipulatorPosition.x < state.gridSize.width - 1) {
        state.manipulatorPosition.x += 1;
      }
    },
    moveUp: (state) => {
      if (state.manipulatorPosition.y > 0) {
        state.manipulatorPosition.y -= 1;
      }
    },
    moveDown: (state) => {
      if (state.manipulatorPosition.y < state.gridSize.height - 1) {
        state.manipulatorPosition.y += 1;
      }
    },
    pickupSample: (state) => {
      if (!state.isHoldingSample) {
        const sampleAtPosition = state.samples.find(
          (sample) =>
            sample.position.x === state.manipulatorPosition.x &&
            sample.position.y === state.manipulatorPosition.y &&
            !sample.isPickedUp
        );

        if (sampleAtPosition) {
          sampleAtPosition.isPickedUp = true;
          state.isHoldingSample = true;
          state.currentSampleId = sampleAtPosition.id;
        }
      }
    },
    dropSample: (state) => {
      if (state.isHoldingSample && state.currentSampleId) {
        const sample = state.samples.find((s) => s.id === state.currentSampleId);
        if (sample) {
          sample.position = { ...state.manipulatorPosition };
          state.isHoldingSample = false;
          state.currentSampleId = null;
        }
      }
    },
    setAnimationSpeed: (state, action: PayloadAction<number>) => {
      state.animationSpeed = action.payload;
    },
    resetManipulator: (state) => {
      state.manipulatorPosition = { x: 0, y: 0 };
      state.isHoldingSample = false;
      state.currentSampleId = null;
    },
    shuffleSamples: (state) => {
      state.samples = Array.from({ length: 5 }, () => ({
        id: uuidv4(),
        position: {
          x: Math.floor(Math.random() * state.gridSize.width),
          y: Math.floor(Math.random() * state.gridSize.height),
        },
        isPickedUp: false,
      }));
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  pickupSample,
  dropSample,
  setAnimationSpeed,
  resetManipulator,
  shuffleSamples,
} = manipulatorSlice.actions;

export default manipulatorSlice.reducer;
