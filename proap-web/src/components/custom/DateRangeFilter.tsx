import React from 'react';
import { TextField, Button, Stack, Box } from '@mui/material';
import { format, parse } from 'date-fns';
import { CalendarToday } from '@mui/icons-material';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
  labels?: {
    startDate?: string;
    endDate?: string;
    filter?: string;
  };
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
  labels = {
    startDate: 'Data inicial',
    endDate: 'Data final',
    filter: 'Filtrar',
  },
}) => {
  // Convert date string to HTML date input format (yyyy-MM-dd)
  const formatToHtmlDate = (dateStr: string): string => {
    if (!dateStr) return '';

    try {
      // If already in the HTML format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
      }

      // If in dd/MM/yyyy format, convert to yyyy-MM-dd
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const date = parse(dateStr, 'dd/MM/yyyy', new Date());
        return format(date, 'yyyy-MM-dd');
      }

      // For any other format, try to create a date and format it
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return format(date, 'yyyy-MM-dd');
      }
    } catch (e) {
      console.error('Error formatting date for HTML input:', e);
    }

    return '';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <TextField
          type="date"
          label={labels.startDate}
          value={formatToHtmlDate(startDate)}
          onChange={(e) => onStartDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label={labels.endDate}
          value={formatToHtmlDate(endDate)}
          onChange={(e) => onEndDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onFilter}
          startIcon={<CalendarToday />}
        >
          {labels.filter}
        </Button>
      </Stack>
    </Box>
  );
};

export default DateRangeFilter;
