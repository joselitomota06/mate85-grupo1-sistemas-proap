import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  Box,
  Stack,
  Tooltip,
  MenuItem,
  Select,
  Alert,
  Link,
} from '@mui/material';
import {
  StyledTextField,
  StyledFormLabel,
  StyledIconButton,
} from '../SolicitationFormContainer.style';
import { Info } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function eventDetailFormContainer() {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();

  const [outroQualis, setOutroQualis] = useState('');

  useEffect(() => {
    if (!/^(A|B)[1-4]$/.test(values.qualis)) {
      setFieldValue('qualis', outroQualis);
    }
  }, [outroQualis]);

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
        label="Nome do Evento (ou Solicitação)"
        name="nomeEvento"
        error={Boolean(touched.nomeEvento && errors.nomeEvento)}
        helperText={touched.nomeEvento && errors.nomeEvento}
        required
      />
      <FormControl
        error={Boolean(
          touched.eventoInternacional && errors.eventoInternacional,
        )}
      >
        <StyledFormLabel required>Natureza da Solicitação</StyledFormLabel>
        <Field name="eventoInternacional">
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
                value={false}
                control={<Radio />}
                label="Nacional"
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Internacional"
              />
            </RadioGroup>
          )}
        </Field>
        {touched.eventoInternacional && errors.eventoInternacional && (
          <FormHelperText>{errors.eventoInternacional}</FormHelperText>
        )}
      </FormControl>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
        <Field
          sx={{ width: 200 }}
          as={TextField}
          label="Data de início"
          name="dataInicio"
          error={Boolean(touched.dataInicio && errors.dataInicio)}
          helperText={touched.dataInicio && errors.dataInicio}
          type="date"
          required
        />
        <Stack sx={{ flexDirection: 'row' }}>
          <Field
            sx={{ margin: 0, width: 200 }}
            as={TextField}
            label="Data de término"
            name="dataFim"
            error={Boolean(touched.dataFim && errors.dataFim)}
            helperText={touched.dataFim && errors.dataFim}
            type="date"
            required
          />
          <Tooltip
            sx={{ position: 'relative', top: 10 }}
            title="Se o evento for de um único dia, preencha a mesma data nos dois campos"
          >
            <StyledIconButton>
              <Info />
            </StyledIconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box>
        <StyledFormLabel required>
          Será necessário afastamento para participação do Evento?
        </StyledFormLabel>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'start', sm: 'center' },
            justifyContent: 'space-between',
            maxWidth: '800px',
          }}
        >
          <FormControl
            error={Boolean(
              touched.afastamentoParaParticipacao &&
                errors.afastamentoParaParticipacao,
            )}
          >
            <Field name="afastamentoParaParticipacao">
              {({ field }: { field: any }) => (
                <RadioGroup
                  {...field}
                  row
                  value={String(field.value)}
                  onChange={(event) => {
                    setFieldValue(field.name, event.target.value === 'true');
                    setFieldValue('diasAfastamento', undefined);
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
            {touched.afastamentoParaParticipacao &&
              errors.afastamentoParaParticipacao && (
                <FormHelperText>
                  {errors.afastamentoParaParticipacao}
                </FormHelperText>
              )}
          </FormControl>
          {values.afastamentoParaParticipacao && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                gap: { xs: 0, sm: 2 },
              }}
            >
              <StyledFormLabel required htmlFor="text-field">
                Quantos dias de afastamento?
              </StyledFormLabel>
              <Field
                as={StyledTextField}
                id="text-field"
                sx={{ maxWidth: '250px !important', margin: 0 }}
                name="diasAfastamento"
                type="number"
                InputProps={{ inputProps: { min: 1, step: 1 } }}
                error={touched.diasAfastamento && !!errors.diasAfastamento}
                helperText={touched.diasAfastamento && errors.diasAfastamento}
              />
            </Box>
          )}
        </Stack>
      </Box>
      <Field
        as={StyledTextField}
        label="Homepage do Evento (ou Solicitação)"
        name="linkHomePageEvento"
        error={Boolean(touched.linkHomePageEvento && errors.linkHomePageEvento)}
        helperText={touched.linkHomePageEvento && errors.linkHomePageEvento}
      />
      <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledFormLabel required>
          Local do Evento (ou Solicitação)
        </StyledFormLabel>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ maxWidth: '800px' }}
          spacing={4}
        >
          <Field
            sx={{ width: '100%' }}
            as={StyledTextField}
            label="Cidade (em Português)"
            name="cidade"
            error={Boolean(touched.cidade && errors.cidade)}
            helperText={touched.cidade && errors.cidade}
          />
          <Field
            as={StyledTextField}
            sx={{ width: '100%' }}
            label="País (em Português)"
            name="pais"
            error={Boolean(touched.pais && errors.pais)}
            helperText={touched.pais && errors.pais}
          />
        </Stack>
      </Stack>
      <FormControl
        error={Boolean(
          touched.modalidadeParticipacao && errors.modalidadeParticipacao,
        )}
      >
        <StyledFormLabel required>Modalidade de participação</StyledFormLabel>
        <Field name="modalidadeParticipacao">
          {({ field }: { field: any }) => (
            <RadioGroup
              {...field}
              row
              value={field.value}
              onChange={(event) => {
                setFieldValue(field.name, event.target.value);
              }}
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel
                value={'presencial'}
                control={<Radio />}
                label="Presencial"
              />
              <FormControlLabel
                value={'virtual'}
                control={<Radio />}
                label="Virtual"
              />
              <FormControlLabel
                value={'naoSeAplica'}
                control={<Radio />}
                label="Não se aplica"
              />
            </RadioGroup>
          )}
        </Field>
        {touched.modalidadeParticipacao && errors.modalidadeParticipacao && (
          <FormHelperText>{errors.modalidadeParticipacao}</FormHelperText>
        )}
      </FormControl>
      <FormControl error={Boolean(touched.qualis && errors.qualis)}>
        <StyledFormLabel required>
          Informe o Qualis do seu evento
        </StyledFormLabel>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'start', sm: 'center' },
            maxWidth: '800px',
            gap: { xs: 2, sm: 4 },
          }}
        >
          <Stack direction="row">
            <Stack>
              <Field
                as={Select}
                sx={{ maxWidth: 100 }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                name="qualis"
                defaultValue=""
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="A2">A2</MenuItem>
                <MenuItem value="A3">A3</MenuItem>
                <MenuItem value="A4">A4</MenuItem>
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="B3">B3</MenuItem>
                <MenuItem value="B4">B4</MenuItem>
                <MenuItem value={outroQualis}>Outro</MenuItem>
              </Field>
              {touched.qualis && errors.qualis && (
                <FormHelperText>{errors.qualis}</FormHelperText>
              )}
            </Stack>
            <Tooltip
              sx={{ position: 'relative' }}
              title="Workshops associados a eventos não possuem a mesma avaliação da trilha principal"
            >
              <StyledIconButton>
                <Info />
              </StyledIconButton>
            </Tooltip>
          </Stack>
          {!/^(A|B)[1-4]$/.test(values.qualis) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                gap: { xs: 0, sm: 2 },
              }}
            >
              <StyledFormLabel required htmlFor="text-field-qualis">
                Especifique
              </StyledFormLabel>
              <Field
                as={StyledTextField}
                id="text-field-qualis"
                sx={{ maxWidth: '250px !important', margin: 0 }}
                name="outroQualis"
                onChange={(event: any) => {
                  setOutroQualis(event.target.value);
                }}
                error={touched.qualis && !!errors.qualis}
                helperText={touched.qualis && errors.qualis}
              />
            </Box>
          )}
        </Stack>
      </FormControl>
      <Alert severity="info" sx={{ maxWidth: '800px' }}>
        Para calcular o Qualis do seu evento, siga as instruções disponíveis no{' '}
        <Link
          href="https://pgcomp.ufba.br/qual-o-qualis-de-uma-conferencia-ou-um-periodico"
          target="_blank"
          rel="noopener"
          style={{ color: 'inherit', fontWeight: 'bold' }}
        >
          site da PGCOMP
        </Link>
        .
      </Alert>
      <Alert severity="warning" sx={{ maxWidth: '800px' }}>
        {`Nos casos de artigos aceitos em conferências, 
              o Qualis deve ser atribubído quando o artigo é aceito no evento principal, 
              e não em eventos satélites como workshops, minicursos ou CTDs.`}
      </Alert>
    </Box>
  );
}
