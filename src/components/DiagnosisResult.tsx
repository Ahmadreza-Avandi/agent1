import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Button,
  Box
} from '@mui/material';
import { Printer, RotateCcw } from 'lucide-react';
import { DiagnosisResponse } from '../types';

interface Props {
  diagnosis: DiagnosisResponse;
  onReset: () => void;
  mode: 'light' | 'dark';
}

export const DiagnosisResult = ({ diagnosis, onReset, mode }: Props) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const text = diagnosis.result;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [diagnosis.result]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Paper 
      className={`p-8 transition-all duration-300 hover:shadow-xl backdrop-blur-lg ${
        mode === 'light' 
          ? 'bg-white/80 hover:bg-white/90' 
          : 'bg-slate-800/80 hover:bg-slate-800/90'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <Typography 
          variant="h5" 
          component="h2" 
          className={`font-bold ${
            mode === 'light' ? 'text-emerald-800' : 'text-emerald-400'
          }`}
        >
          نتیجه تشخیص و نسخه پزشکی
        </Typography>
        <div className="space-x-2 space-x-reverse">
          <Button
            variant="outlined"
            startIcon={<Printer className="ml-2" />}
            onClick={handlePrint}
            disabled={isTyping}
            className={mode === 'light' ? 'text-emerald-600 border-emerald-600' : 'text-emerald-400 border-emerald-400'}
          >
            چاپ نسخه
          </Button>
          <Button
            variant="outlined"
            startIcon={<RotateCcw className="ml-2" />}
            onClick={onReset}
            className={mode === 'light' ? 'text-emerald-600 border-emerald-600' : 'text-emerald-400 border-emerald-400'}
          >
            تشخیص جدید
          </Button>
        </div>
      </div>

      <Box className={`prose max-w-none mt-6 ${mode === 'light' ? 'prose-emerald' : 'prose-invert'}`}>
        <div className="whitespace-pre-wrap font-vazirmatn leading-relaxed">
          {displayText}
          {isTyping && (
            <span className="animate-pulse">|</span>
          )}
        </div>
      </Box>
    </Paper>
  );
};