import { Field, useFormikContext } from 'formik';
import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import {
  StyledFormLabel,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import useHasPermission from '../../../hooks/auth/useHasPermission';
import { useEffect } from 'react';
import useCurrentUser from '../../../hooks/auth/useCurrentUser';

export default function SolicitantDetailFormContainer() {
  const { errors, touched, values, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();

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
        gap: 2,
      }}
    >
      <FormControl
        error={Boolean(touched.solicitanteDocente && errors.solicitanteDocente)}
      >
        <StyledFormLabel required>Solicitação em nome do:</StyledFormLabel>
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
        required={!values.solicitanteDocente}
        label={
          values.solicitanteDocente
            ? 'Nome do Discente PGCOMP (se houver)'
            : 'Nome do Discente PGCOMP'
        }
        disabled={!userIsAdmin && !values.solicitanteDocente}
        error={touched.nomeDiscente && !!errors.nomeDiscente}
        helperText={touched.nomeDiscente && errors.nomeDiscente}
      />
      <Field
        as={StyledTextField}
        name="nomeDocente"
        label="Nome do Docente PGCOMP"
        required
        disabled={!userIsAdmin && values.solicitanteDocente}
        error={touched.nomeDocente && !!errors.nomeDocente}
        helperText={touched.nomeDocente && errors.nomeDocente}
      />

      {!values.solicitanteDocente && (
        <Box>
          <FormControl
            error={Boolean(
              touched.discenteNoPrazoDoCurso && errors.discenteNoPrazoDoCurso,
            )}
          >
            <StyledFormLabel required>
              Está no prazo regular para finalização do seu curso (mestrado ou
              doutorado)?
            </StyledFormLabel>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                alignItems: { xs: 'start', sm: 'center' },
                justifyContent: 'space-between',
                maxWidth: '800px',
              }}
            >
              <Stack>
                <Field name="discenteNoPrazoDoCurso">
                  {({ field }: { field: any }) => (
                    <RadioGroup
                      {...field}
                      row
                      value={String(field.value)}
                      onChange={(event) => {
                        setFieldValue(
                          field.name,
                          event.target.value === 'true',
                        );
                        setFieldValue('mesesAtrasoCurso', undefined);
                      }}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Sim"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Não"
                      />
                    </RadioGroup>
                  )}
                </Field>
                {touched.discenteNoPrazoDoCurso &&
                  errors.discenteNoPrazoDoCurso && (
                    <FormHelperText>
                      {errors.discenteNoPrazoDoCurso}
                    </FormHelperText>
                  )}
              </Stack>
              {!values.discenteNoPrazoDoCurso && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    gap: { xs: 0, sm: 2 },
                  }}
                >
                  <StyledFormLabel required htmlFor="text-field">
                    Quantos meses já se passaram do prazo regular?
                  </StyledFormLabel>
                  <Field
                    as={StyledTextField}
                    id="text-field"
                    sx={{ maxWidth: '250px !important', margin: 0 }}
                    name="mesesAtrasoCurso"
                    type="number"
                    InputProps={{ inputProps: { min: 1, step: 1 } }}
                    error={
                      touched.mesesAtrasoCurso && !!errors.mesesAtrasoCurso
                    }
                    helperText={
                      touched.mesesAtrasoCurso && errors.mesesAtrasoCurso
                    }
                  />
                </Box>
              )}
            </Stack>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}
