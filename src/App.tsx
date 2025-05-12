import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Container, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import LoginForm from './features/auth/LoginForm';
import Layout from './components/Layout';
import ManipulatorGrid from './features/manipulator/ManipulatorGrid';
import CommandForm from './features/manipulator/CommandForm';
import CommandHistory from './features/history/CommandHistory';
import { RootState } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

const App: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user.isAuthenticated ? (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom>
              Система управления манипулятором
            </Typography>
            <LoginForm />
          </Box>
        </Container>
      ) : (
        <Layout>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
              {isMobile ? (
                <Stack spacing={2}>
                  <ManipulatorGrid />
                  <CommandForm />
                  <CommandHistory />
                </Stack>
              ) : (
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ width: '50%' }}>
                    <Stack spacing={2}>
                      <ManipulatorGrid />
                      <CommandForm />
                    </Stack>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <CommandHistory />
                  </Box>
                </Stack>
              )}
            </Box>
          </Container>
        </Layout>
      )}
    </ThemeProvider>
  );
};

export default App;
