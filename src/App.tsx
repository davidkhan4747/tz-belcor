import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import Layout from './components/Layout';
import LoginForm from './features/auth/LoginForm';
import ManipulatorGrid from './features/manipulator/ManipulatorGrid';
import CommandForm from './features/manipulator/CommandForm';
import CommandHistory from './features/history/CommandHistory';
import { Box, Stack, Typography } from '@mui/material';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// AppContent component that depends on authentication state
const AppContent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user.isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Стол с образцами
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ManipulatorGrid />
        </Box>
        <CommandForm />
      </Box>
      <Box sx={{ flex: 1 }}>
        <CommandHistory />
      </Box>
    </Stack>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <AppContent />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
