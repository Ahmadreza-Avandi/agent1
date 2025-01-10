import React, { useState } from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Button,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import { submitTestAnalysis } from '../api';
import { PatientData, DiagnosisResponse } from '../types';

interface Props {
  setLoading: (loading: boolean) => void;
  setDiagnosisResult: (result: DiagnosisResponse | null) => void;
  mode: 'light' | 'dark';
}

export const DiagnosisForm = ({ setLoading, setDiagnosisResult, mode }: Props) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 0,
    ageUnit: 'year',
    gender: 'male',
    weight: 0,
    weightUnit: 'kilogram',
    symptoms: '',
    medicalHistory: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await submitTestAnalysis(formData);
      setDiagnosisResult(result);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      className={`p-8 transition-all duration-300 hover:shadow-xl backdrop-blur-lg ${
        mode === 'light' 
          ? 'bg-white/80 hover:bg-white/90' 
          : 'bg-slate-800/80 hover:bg-slate-800/90'
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Grid container spacing={3}>
          {/* سن */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="سن"
                name="age"
                type="number"
                value={formData.age || ''}
                onChange={handleChange}
                fullWidth
                required
              />
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>واحد سن</InputLabel>
                <Select
                  name="ageUnit"
                  value={formData.ageUnit}
                  onChange={handleChange}
                  label="واحد سن"
                >
                  <MenuItem value="year">سال</MenuItem>
                  <MenuItem value="month">ماه</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* جنسیت */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>جنسیت</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="جنسیت"
              >
                <MenuItem value="male">مرد</MenuItem>
                <MenuItem value="female">زن</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* وزن */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="وزن"
                name="weight"
                type="number"
                value={formData.weight || ''}
                onChange={handleChange}
                fullWidth
                required
              />
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>واحد وزن</InputLabel>
                <Select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleChange}
                  label="واحد وزن"
                >
                  <MenuItem value="kilogram">کیلوگرم</MenuItem>
                  <MenuItem value="gram">گرم</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* علائم بیماری */}
        <TextField
          label="علائم بیماری"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          placeholder="لطفاً علائم بیماری را با جزئیات شرح دهید..."
        />

        {/* سابقه پزشکی */}
        <TextField
          label="سابقه پزشکی"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          placeholder="سابقه بیماری‌ها، حساسیت‌ها و داروهای مصرفی..."
        />

        {/* دکمه ارسال */}
        <Button 
          type="submit"
          variant="contained" 
          size="large"
          fullWidth
          className={`transition-all duration-300 ${
            mode === 'light'
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          دریافت تشخیص و نسخه پزشکی
        </Button>
      </form>
    </Paper>
  );
};