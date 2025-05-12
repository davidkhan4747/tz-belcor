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
  IconButton,
  Chip,
  Box
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CommandHistory: React.FC = () => {
  const { commands } = useSelector((state: RootState) => state.history);

  const formatDate = (dateString: string) => format(new Date(dateString), 'dd.MM.yyyy HH:mm:ss', { locale: ru });

  const formatSamplesPositions = (samples: any[]) => samples.map(sample => `${sample.isPickedUp ? 'Поднят' : `(${sample.position.x},${sample.position.y})`}`).join(', ');

  // Отладочная информация для проверки данных
  console.log("История команд:", commands);

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        История выполненных команд
      </Typography>
      
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Исходная команда</TableCell>
              <TableCell width="30%">Оптимизированная версия</TableCell>
              <TableCell width="20%">Дата и время</TableCell>
              <TableCell width="20%">Образцы до/после</TableCell>
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
                  <TableCell>{cmd.originalCommand || 'Не указана'}</TableCell>
                  <TableCell>
                    {cmd.optimizedCommand ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={cmd.optimizedCommand} 
                          color="secondary" 
                          variant="outlined"
                          size="small"
                          sx={{ 
                            fontWeight: 'bold', 
                            borderWidth: '2px', 
                            '& .MuiChip-label': { px: 1 } 
                          }}
                        />
                      </Box>
                    ) : (
                      <Chip 
                        label="Нет" 
                        color="default" 
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>{formatDate(cmd.date)}</TableCell>
                  <TableCell>
                    <Tooltip 
                      title={
                        <React.Fragment>
                          <Typography variant="body2">До: {formatSamplesPositions(cmd.samplesBeforeState)}</Typography>
                          <Typography variant="body2">После: {formatSamplesPositions(cmd.samplesAfterState)}</Typography>
                        </React.Fragment>
                      }
                    >
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
