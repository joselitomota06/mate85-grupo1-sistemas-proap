import { Field, useFormikContext } from 'formik';
import { SolicitationFormValues } from '../SolicitationFormSchema';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { StyledTextField } from '../SolicitationFormContainer.style';
import useHasPermission from '../../../hooks/auth/useHasPermission';
import { useEffect } from 'react';
import useCurrentUser from '../../../hooks/auth/useCurrentUser';

export default function SolicitantDetailFormContainer() {
  const { errors, touched, values, setFieldValue } =
    useFormikContext<SolicitationFormValues>();

  const { name } = useCurrentUser();
  const userIsDocente = useHasPermission('DOCENTE_ROLE');
  const userIsAdmin = useHasPermission('ADMIN_ROLE');

  useEffect(() => {
    if (!userIsAdmin) {
      setFieldValue('solicitanteDocente', userIsDocente);
    }
  }, []);

  useEffect(() => {
    if (!userIsAdmin) {
      setFieldValue(
        values.solicitanteDocente ? 'nomeDocente' : 'nomeDiscente',
        name,
      );
      setFieldValue(
        !values.solicitanteDocente ? 'nomeDocente' : 'nomeDiscente',
        '',
      );
    }
  }, [values.solicitanteDocente]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
      }}
    >
      <FormControl
        error={Boolean(touched.solicitanteDocente && errors.solicitanteDocente)}
      >
        <FormLabel required>Solicitação em nome do:</FormLabel>
        <Field name="solicitanteDocente">
          {({ field }: { field: any }) => (
            <RadioGroup
              {...field}
              row
              onChange={(event) => {
                setFieldValue(field.name, event.target.value === 'true');
              }}
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel
                disabled={!userIsAdmin}
                value={true}
                control={<Radio />}
                label="Docente"
              />
              <FormControlLabel
                disabled={!userIsAdmin}
                value={false}
                control={<Radio />}
                label="Discente"
              />
            </RadioGroup>
          )}
        </Field>
        {touched.solicitanteDocente && errors.solicitanteDocente && (
          <FormHelperText>{errors.solicitanteDocente}</FormHelperText>
        )}
      </FormControl>
      <Field
        as={StyledTextField}
        name="nomeDiscente"
        label="Nome do Discente PGCOMP"
        // value={name}
        disabled={!userIsAdmin && !values.solicitanteDocente}
        error={touched.nomeDiscente && !!errors.nomeDiscente}
        helperText={touched.nomeDiscente && !!errors.nomeDiscente}
      />
      <Field
        as={StyledTextField}
        name="nomeDocente"
        label="Nome do Docente"
        required
        disabled={!userIsAdmin && values.solicitanteDocente}
        error={touched.nomeDocente && !!errors.nomeDocente}
        helperText={touched.nomeDocente && errors.nomeDocente}
      />
    </Box>
  );
}
