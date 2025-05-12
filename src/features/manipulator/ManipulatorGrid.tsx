import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ManipulatorGrid: React.FC = () => {
  const theme = useTheme();
  const { manipulatorPosition, samples, isHoldingSample, gridSize } = useSelector(
    (state: RootState) => state.manipulator
  );

  const cellSize = 50; // size of each grid cell in pixels

  // Create a grid of cells
  const renderGrid = () => {
    const grid = [];

    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        const isManipulator = manipulatorPosition.x === x && manipulatorPosition.y === y;
        const samplesAtPosition = samples.filter(
          (sample) => sample.position.x === x && sample.position.y === y && !sample.isPickedUp
        );
        
        // Determine cell content and style
        let backgroundColor = theme.palette.background.paper;
        let content = null;

        if (isManipulator) {
          backgroundColor = theme.palette.primary.main;
          content = (
            <Typography color="white" variant="subtitle2" align="center">
              {isHoldingSample ? 'М+О' : 'М'}
            </Typography>
          );
        } else if (samplesAtPosition.length > 0) {
          backgroundColor = theme.palette.secondary.main;
          content = (
            <Typography color="white" variant="subtitle2" align="center">
              О
            </Typography>
          );
        }

        grid.push(
          <Box
            key={`${x}-${y}`}
            sx={{
              width: cellSize,
              height: cellSize,
              backgroundColor,
              border: '1px solid',
              borderColor: theme.palette.divider,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: x * cellSize,
              top: y * cellSize,
              transition: 'all 0.3s ease',
            }}
          >
            {content}
          </Box>
        );
      }
    }

    return grid;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mt: 2, 
        position: 'relative', 
        height: cellSize * gridSize.height + 2, 
        width: cellSize * gridSize.width + 2,
        overflow: 'hidden' 
      }}
    >
      <Box position="relative">
        {renderGrid()}
      </Box>
    </Paper>
  );
};

export default ManipulatorGrid;
