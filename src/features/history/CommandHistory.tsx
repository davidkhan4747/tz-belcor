import React from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CommandHistory: React.FC = () => {
  const { commands } = useSelector((state: RootState) => state.history);

  // Format the date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yyyy HH:mm:ss', { locale: ru });
  };

  // Create sample position description
  const formatSamplesPositions = (samples: any[]) => {
    return samples.map(sample => 
      `${sample.isPickedUp ? 'Поднят' : `(${sample.position.x},${sample.position.y})`}`
    ).join(', ');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        История выполненных команд
      </Typography>
      
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Исходная команда</TableCell>
              <TableCell>Оптимизированная версия</TableCell>
              <TableCell>Дата и время</TableCell>
              <TableCell>Образцы до/после</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  История команд пуста
                </TableCell>
              </TableRow>
            ) : (
              commands.map((cmd) => (
                <TableRow key={cmd.id}>
                  <TableCell>{cmd.originalCommand}</TableCell>
                  <TableCell>{cmd.optimizedCommand}</TableCell>
                  <TableCell>{formatDate(cmd.date)}</TableCell>
                  <TableCell>
                    <Tooltip title={`До: ${formatSamplesPositions(cmd.samplesBeforeState)}\nПосле: ${formatSamplesPositions(cmd.samplesAfterState)}`}>
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CommandHistory;
