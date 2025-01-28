import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { Field, FieldArray, useFormikContext } from 'formik';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Box,
  IconButton,
  Button,
  Stack,
  Typography,
  Tooltip,
  Alert,
  Link,
} from '@mui/material';
import {
  StyledFormLabel,
  StyledIconButton,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { Add, CloudUpload, Info, Remove } from '@mui/icons-material';
import { BASE_PDF_URL } from '../../../helpers/api';

export default function SolicitationDataFormContainer() {
  const { errors, touched, values, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFieldValue('file', event.target.files[0]);
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
      <Field
        as={StyledTextField}
        label="Título completo da publicação (solicitação) a ser apoiada"
        name="tituloPublicacao"
        error={Boolean(touched.tituloPublicacao && errors.tituloPublicacao)}
        helperText={touched.tituloPublicacao && errors.tituloPublicacao}
        required
        multiline
      />
      <Box>
        <StyledFormLabel>
          Lista completa de coautor(es) da publicação ou solicitação a ser
          apoiada (Nome e sobrenome)
        </StyledFormLabel>
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

      {values.coautores.some((coautor) => coautor !== '') && (
        <FormControl
          error={Boolean(
            touched.algumCoautorPGCOMP && errors.algumCoautorPGCOMP,
          )}
        >
          <StyledFormLabel required>
            Há alunos ativos do PGCOMP coautores/coparticipantes direto na
            solicitação?
          </StyledFormLabel>
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
          {touched.algumCoautorPGCOMP && errors.algumCoautorPGCOMP && (
            <FormHelperText>{errors.algumCoautorPGCOMP}</FormHelperText>
          )}
        </FormControl>
      )}
      <FormControl error={Boolean(touched.file && errors.file)}>
        <Stack>
          <StyledFormLabel>Envio de carta de aceite do artigo</StyledFormLabel>
          <Stack direction="row">
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
                {values.cartaAceite
                  ? (values.file?.name ?? 'Alterar arquivo')
                  : (values.file?.name ?? 'Escolher arquivo')}
              </Typography>
              <input
                type="file"
                onChange={handleFileChange}
                hidden
                accept=".pdf"
              />
            </Button>
            <Tooltip
              sx={{ position: 'relative' }}
              title="Formato PDF. Tamanho máximo 10MB"
            >
              <StyledIconButton>
                <Info />
              </StyledIconButton>
            </Tooltip>
            {values.cartaAceite && (
              <Link
                href={BASE_PDF_URL + values.cartaAceite}
                target="_blank"
                rel="noopener"
                sx={{ alignSelf: 'center' }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  Visualizar Arquivo
                </Typography>
              </Link>
            )}
          </Stack>
          {touched.file && errors.file && (
            <FormHelperText>{errors.file}</FormHelperText>
          )}
        </Stack>
      </FormControl>
      <Alert severity="warning" sx={{ maxWidth: '800px' }}>
        É obrigatória a carta de aceite para apoio a publicação científica.
      </Alert>
    </Box>
  );
}
