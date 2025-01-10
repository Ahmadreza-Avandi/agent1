import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Stethoscope, Moon, Sun } from 'lucide-react';
import { DiagnosisForm } from './components/DiagnosisForm';
import { DiagnosisResult } from './components/DiagnosisResult';
import { DiagnosisResponse } from './types';
import { getTheme } from './theme';

function App() {
  const [loading, setLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResponse | null>(null);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = getTheme(mode);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`min-h-screen transition-colors duration-300 ${
        mode === 'light' 
          ? 'bg-gradient-to-br from-green-50 to-emerald-100' 
          : 'bg-gradient-to-br from-slate-900 to-slate-800'
      }`}>
        <AppBar 
          position="static" 
          elevation={0}
          className={mode === 'light' ? 'bg-emerald-600' : 'bg-slate-800'}
          sx={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(16, 185, 129, 0.8)' }}
        >
          <Toolbar>
            <Stethoscope className="ml-2" size={32} />
            <Typography variant="h6" component="div" className="flex-grow">
              سیستم تشخیص هوشمند پزشکی
            </Typography>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              className="transition-transform duration-300 hover:rotate-12"
            >
              {mode === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" className="py-8">
          <Box className="space-y-8">
            {!diagnosisResult && (
              <>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  className={`text-center mb-8 ${
                    mode === 'light' ? 'text-emerald-800' : 'text-emerald-400'
                  }`}
                >
                  لطفاً اطلاعات بیمار را وارد کنید
                </Typography>
                <DiagnosisForm 
                  setLoading={setLoading} 
                  setDiagnosisResult={setDiagnosisResult}
                  mode={mode}
                />
              </>
            )}

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500" />
              </div>
            )}

            {diagnosisResult && !loading && (
              <DiagnosisResult 
                diagnosis={diagnosisResult} 
                onReset={() => setDiagnosisResult(null)}
                mode={mode}
              />
            )}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;