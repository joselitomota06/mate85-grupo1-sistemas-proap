import { Field, useFormikContext } from 'formik';
import {
  InitialSolicitationFormValues,
  SolicitationFormValues,
} from '../SolicitationFormSchema';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import {
  StyledFormLabel,
  StyledIconButton,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { CloudUpload } from '@mui/icons-material';
import { useState } from 'react';

export default function AcceptanceDataFormContainer() {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();

  const [fileName, setFileName] = useState<string | null>(null);

  console.log('Values', values);
  console.log('Errors', errors);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFieldValue('file', event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        gap: 2,
      }}
    >
      <FormControl error={Boolean(touched.file && errors.file)}>
        <Stack>
          <StyledFormLabel>Envio de carta de aceite do artigo</StyledFormLabel>
          <Button
            component="label"
            role="button"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{
              maxWidth: '200px',
              padding: '0.5rem 1rem',
            }}
          >
            <Typography
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontWeight="bold"
              fontSize="0.875rem"
            >
              {fileName ?? 'Escolher arquivo'}
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              hidden
              accept=".pdf"
            />
          </Button>

          {touched.file && errors.file && (
            <FormHelperText>{errors.file}</FormHelperText>
          )}
        </Stack>
      </FormControl>
    </Box>
  );
}
