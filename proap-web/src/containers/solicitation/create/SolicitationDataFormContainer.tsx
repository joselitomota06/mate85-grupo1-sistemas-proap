import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, FieldArray, Form, useFormikContext } from 'formik';
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { StyledTextField } from '../SolicitationFormContainer.style';
import { useAuth } from '../../../hooks';
import { Add, Remove } from '@mui/icons-material';

export default function SolicitationDataFormContainer() {
  const { errors, touched, values, setFieldValue } =
    useFormikContext<SolicitationFormValues>();

  const { name, email } = useAuth();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
      }}
    >
      <StyledTextField
        label="Solicitante"
        value={values.user.name != '' ? values.user.name : name}
        disabled
      />
      <StyledTextField
        label="E-mail"
        value={values.user.email != '' ? values.user.email : email}
        disabled
      />
      <Field
        as={StyledTextField}
        label="Título completo da publicação a ser apoiada"
        name="tituloPublicacao"
        error={Boolean(touched.tituloPublicacao && errors.tituloPublicacao)}
        helperText={touched.tituloPublicacao && errors.tituloPublicacao}
        required
        multiline
      />
      <Box>
        <FormLabel>
          Lista completa de co-autor(es) da publicação a ser apoiada (Nome e
          sobrenome)
        </FormLabel>
        <FieldArray name="coautores">
          {({ push, remove }) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {values.coautores.map((_, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                  }}
                >
                  <Field
                    as={StyledTextField}
                    name={`coautores[${index}]`}
                    label={`Coautor ${index + 1}`}
                    fullWidth
                    error={
                      touched.coautores &&
                      !!values.coautores[index] &&
                      errors.coautores &&
                      errors.coautores[index]
                    }
                    helperText={
                      touched.coautores &&
                      !!values.coautores[index] &&
                      errors.coautores &&
                      errors.coautores[index]
                    }
                  />
                  <IconButton
                    sx={{ alignSelf: 'center', position: 'relative', top: 10 }}
                    onClick={() => remove(index)}
                  >
                    <Remove />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="button"
                variant="outlined"
                onClick={() => push('')}
                startIcon={<Add />}
                sx={{ width: 'fit-content', marginTop: 1, marginBottom: 1 }}
              >
                Adicionar Coautor
              </Button>
            </Box>
          )}
        </FieldArray>
      </Box>

      <FormControl
        error={Boolean(touched.algumCoautorPGCOMP && errors.algumCoautorPGCOMP)}
      >
        <FormLabel required>
          Existe aluno PGCOMP como co-autor na publicação
        </FormLabel>
        <Field name="algumCoautorPGCOMP">
          {({ field }: { field: any }) => (
            <RadioGroup
              {...field}
              row
              value={field.value}
              onChange={(event) => {
                setFieldValue(field.name, event.target.value === 'true');
              }}
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel value={true} control={<Radio />} label="Sim" />
              <FormControlLabel value={false} control={<Radio />} label="Não" />
            </RadioGroup>
          )}
        </Field>
        {touched.algumCoautorPGCOMP && errors.algumCoautorPGCOMP && (
          <FormHelperText>{errors.algumCoautorPGCOMP}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
