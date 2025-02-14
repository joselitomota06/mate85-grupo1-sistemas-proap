import {
  Typography,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Checkbox,
  Box,
  Link,
} from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { InitialSolicitationFormValues } from '../SolicitationFormSchema';

export default function AcceptanceFormContainer() {
  const { errors, touched } = useFormikContext<InitialSolicitationFormValues>();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        paddingBottom: 2,
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
          Confirmo que li e estou ciente dos termos da Resolução PROAP mais
          atual disponível no{' '}
          <Link
            href="https://pgcomp.ufba.br/normas"
            target="_blank"
            rel="noopener"
            sx={{
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            site da PGCOMP
          </Link>
          .
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <FormControl
            error={Boolean(touched.aceiteFinal && errors.aceiteFinal)}
            sx={{ display: 'flex', alignItems: 'start' }}
          >
            <Field
              as={FormControlLabel}
              control={<Checkbox />}
              label="Estou de acordo"
              name="aceiteFinal"
            />
            {touched.aceiteFinal && errors.aceiteFinal && (
              <FormHelperText>{errors.aceiteFinal}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
