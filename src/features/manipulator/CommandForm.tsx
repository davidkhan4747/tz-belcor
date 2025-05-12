import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Paper, 
  Slider, 
  FormControl, 
  Snackbar,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  moveLeft, 
  moveRight, 
  moveUp, 
  moveDown, 
  pickupSample, 
  dropSample, 
  setAnimationSpeed,
  resetManipulator
} from '../../store/manipulatorSlice';
import { addCommand } from '../../store/historySlice';
import { optimizeCommands, expandOptimizedCommand, parseCommands } from '../../utils/commandOptimizer';
import { Command } from '../../types';

interface CommandFormInputs {
  commandString: string;
}

const CommandForm: React.FC = () => {
  const dispatch = useDispatch();
  const [optimizedCommand, setOptimizedCommand] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  
  const { animationSpeed, samples } = useSelector((state: RootState) => state.manipulator);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommandFormInputs>();

  const executeCommands = async (commands: Command[]) => {
    setIsExecuting(true);
    const samplesBeforeState = [...samples];
    
    // Execute each command with delay for animation
    for (const command of commands) {
      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      
      switch (command) {
        case 'Л':
          dispatch(moveLeft());
          break;
        case 'П':
          dispatch(moveRight());
          break;
        case 'В':
          dispatch(moveUp());
          break;
        case 'Н':
          dispatch(moveDown());
          break;
        case 'О':
          dispatch(pickupSample());
          break;
        case 'Б':
          dispatch(dropSample());
          break;
      }
    }
    
    // Get the final state after all commands
    setTimeout(() => {
      const samplesAfterState = samples;
      
      // Add command to history
      dispatch(addCommand({
        originalCommand: commands.join(''),
        optimizedCommand,
        samplesBeforeState,
        samplesAfterState,
      }));
      
      setIsExecuting(false);
      setShowSnackbar(true);
    }, animationSpeed);
  };

  const onSubmit = (data: CommandFormInputs) => {
    const { commandString } = data;
    
    // Optimize the command
    const optimized = optimizeCommands(commandString);
    setOptimizedCommand(optimized);
    
    // Expand and execute
    const expanded = expandOptimizedCommand(optimized);
    const commands = parseCommands(expanded);
    
    // Execute the commands
    executeCommands(commands);
    
    // Reset form
    reset();
  };

  const handleSpeedChange = (_event: Event, newValue: number | number[]) => {
    dispatch(setAnimationSpeed(newValue as number));
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleReset = () => {
    dispatch(resetManipulator());
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Управление манипулятором
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Последовательность команд"
            placeholder="Например: ЛЛЛВПОННБ"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            {...register('commandString', { 
              required: 'Введите команды', 
              pattern: {
                value: /^[ЛПВНОБ]+$/,
                message: 'Допустимые команды: Л, П, В, Н, О, Б'
              }
            })}
            error={!!errors.commandString}
            helperText={errors.commandString?.message}
            disabled={isExecuting}
          />
        </FormControl>
        
        <Typography id="speed-slider" gutterBottom>
          Скорость анимации: {animationSpeed} мс
        </Typography>
        <Slider
          aria-labelledby="speed-slider"
          value={animationSpeed}
          onChange={handleSpeedChange}
          min={100}
          max={1000}
          step={100}
          marks
          valueLabelDisplay="auto"
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isExecuting}
            fullWidth
          >
            {isExecuting ? 'Выполняется...' : 'Отправить команды'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handleReset}
            disabled={isExecuting}
          >
            Сбросить
          </Button>
        </Box>
        
        {optimizedCommand && (
          <Typography sx={{ mt: 2 }}>
            Оптимизированная команда: <strong>{optimizedCommand}</strong>
          </Typography>
        )}
      </Box>
      
      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Команды успешно выполнены!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CommandForm;
