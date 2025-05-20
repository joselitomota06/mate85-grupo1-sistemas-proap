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
  Paper,
  Typography,
  Divider,
  alpha,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import {
  StyledTextField,
  StyledFormLabel,
  StyledIconButton,
} from '../SolicitationFormContainer.style';
import {
  Info,
  Event,
  Public,
  FlightTakeoff,
  Language,
  LocationOn,
  Star,
  CalendarMonth,
  AssignmentInd,
  Help,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSysConfig } from '../../../hooks/admin/useSysConfig';
import TextPreviewAlert from '../../../components/FormFields/TextPreviewAlert';

export default function EventDetailFormContainer() {
  const { config } = useSysConfig();
  const { values, errors, touched, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [outroQualis, setOutroQualis] = useState('');

  useEffect(() => {
    if (!/^(A|B)[1-4]$/.test(values.qualis)) {
      setFieldValue('qualis', outroQualis);
    }
  }, [outroQualis]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mt: 2,
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        background: alpha(theme.palette.background.paper, 0.8),
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        fontWeight="medium"
        gutterBottom
        sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
      >
        <Event sx={{ mr: 1 }} /> Detalhes do Evento
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Field name="nomeEvento">
          {({ field }: any) => (
            <StyledTextField
              {...field}
              label="Nome do Evento (ou Solicitação)"
              error={Boolean(touched.nomeEvento && errors.nomeEvento)}
              helperText={touched.nomeEvento && errors.nomeEvento}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Event color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ background: 'white' }}
            />
          )}
        </Field>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <FormControl
            error={Boolean(
              touched.eventoInternacional && errors.eventoInternacional,
            )}
            fullWidth
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Public color="action" fontSize="small" sx={{ mr: 1 }} />
              <StyledFormLabel
                required
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 'medium',
                  color: 'text.primary',
                  m: 0,
                }}
              >
                Natureza da Solicitação
              </StyledFormLabel>
            </Box>

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
                    control={<Radio color="primary" />}
                    label={<Typography variant="body1">Nacional</Typography>}
                    sx={{ mr: 4 }}
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio color="primary" />}
                    label={
                      <Typography variant="body1">Internacional</Typography>
                    }
                  />
                </RadioGroup>
              )}
            </Field>
            {touched.eventoInternacional && errors.eventoInternacional && (
              <FormHelperText>{errors.eventoInternacional}</FormHelperText>
            )}
          </FormControl>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field name="dataInicio">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Data de início"
                  error={Boolean(touched.dataInicio && errors.dataInicio)}
                  helperText={touched.dataInicio && errors.dataInicio}
                  type="date"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ background: 'white' }}
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ position: 'relative', display: 'flex' }}>
              <Field name="dataFim">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    label="Data de término"
                    error={Boolean(touched.dataFim && errors.dataFim)}
                    helperText={touched.dataFim && errors.dataFim}
                    type="date"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ background: 'white', maxWidth: 'auto' }}
                  />
                )}
              </Field>
              <Tooltip title="Se o evento for de um único dia, preencha a mesma data nos dois campos">
                <IconButton size="small" sx={{ ml: 1, mt: 1 }} color="primary">
                  <Info fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <FlightTakeoff color="action" fontSize="small" sx={{ mr: 1 }} />
            <StyledFormLabel
              required
              sx={{
                fontSize: '0.95rem',
                fontWeight: 'medium',
                color: 'text.primary',
                m: 0,
              }}
            >
              Será necessário afastamento para participação do Evento?
            </StyledFormLabel>
            <Tooltip title="Indique se precisará de afastamento oficial para participar do evento">
              <IconButton size="small" sx={{ ml: 1 }}>
                <Help fontSize="small" color="action" />
              </IconButton>
            </Tooltip>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: { xs: 'start', sm: 'center' },
              justifyContent: 'space-between',
              width: '100%',
            }}
            spacing={2}
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
                      control={<Radio color="primary" />}
                      label={<Typography variant="body1">Sim</Typography>}
                      sx={{ mr: 3 }}
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio color="primary" />}
                      label={<Typography variant="body1">Não</Typography>}
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
                  gap: 2,
                  bgcolor: alpha(theme.palette.info.light, 0.1),
                  p: 1.5,
                  borderRadius: 1,
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <StyledFormLabel
                  required
                  htmlFor="text-field"
                  sx={{ m: 0, minWidth: 'max-content' }}
                >
                  Quantos dias de afastamento?
                </StyledFormLabel>
                <Field name="diasAfastamento">
                  {({ field }: any) => (
                    <StyledTextField
                      {...field}
                      id="text-field"
                      sx={{ maxWidth: '180px', m: 0 }}
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, step: 1 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonth color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      error={
                        touched.diasAfastamento && !!errors.diasAfastamento
                      }
                      helperText={
                        touched.diasAfastamento && errors.diasAfastamento
                      }
                      size="small"
                      placeholder="Nº de dias"
                    />
                  )}
                </Field>
              </Box>
            )}
          </Stack>
        </Paper>

        <Field name="linkHomePageEvento">
          {({ field }: any) => (
            <StyledTextField
              {...field}
              label="Homepage do Evento (ou Solicitação)"
              error={Boolean(
                touched.linkHomePageEvento && errors.linkHomePageEvento,
              )}
              helperText={
                touched.linkHomePageEvento && errors.linkHomePageEvento
              }
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ background: 'white' }}
              placeholder="https://exemplo.com.br"
            />
          )}
        </Field>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOn color="action" fontSize="small" sx={{ mr: 1 }} />
            <StyledFormLabel
              required
              sx={{
                fontSize: '0.95rem',
                fontWeight: 'medium',
                color: 'text.primary',
                m: 0,
              }}
            >
              Local do Evento (ou Solicitação)
            </StyledFormLabel>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field name="cidade">
                {({ field }: any) => (
                  <StyledTextField
                    {...field}
                    label="Cidade (em Português)"
                    error={Boolean(touched.cidade && errors.cidade)}
                    helperText={touched.cidade && errors.cidade}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ background: 'white' }}
                  />
                )}
              </Field>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field name="pais">
                {({ field }: any) => (
                  <StyledTextField
                    {...field}
                    label="País (em Português)"
                    error={Boolean(touched.pais && errors.pais)}
                    helperText={touched.pais && errors.pais}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Public color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ background: 'white' }}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <FormControl
            error={Boolean(
              touched.modalidadeParticipacao && errors.modalidadeParticipacao,
            )}
            fullWidth
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <AssignmentInd color="action" fontSize="small" sx={{ mr: 1 }} />
              <StyledFormLabel
                required
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 'medium',
                  color: 'text.primary',
                  m: 0,
                }}
              >
                Modalidade de participação
              </StyledFormLabel>
            </Box>

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
                  sx={{
                    flexWrap: 'wrap',
                    gap: 1,
                    '& .MuiFormControlLabel-root': {
                      minWidth: { xs: '100%', sm: '45%', md: 'auto' },
                      mr: { xs: 0, md: 4 },
                      mb: { xs: 1, md: 0 },
                    },
                  }}
                >
                  <FormControlLabel
                    value="presencial"
                    control={<Radio color="primary" />}
                    label={<Typography variant="body1">Presencial</Typography>}
                  />
                  <FormControlLabel
                    value="virtual"
                    control={<Radio color="primary" />}
                    label={<Typography variant="body1">Virtual</Typography>}
                  />
                  <FormControlLabel
                    value="naoSeAplica"
                    control={<Radio color="primary" />}
                    label={
                      <Typography variant="body1">Não se aplica</Typography>
                    }
                  />
                </RadioGroup>
              )}
            </Field>
            {touched.modalidadeParticipacao &&
              errors.modalidadeParticipacao && (
                <FormHelperText>{errors.modalidadeParticipacao}</FormHelperText>
              )}
          </FormControl>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.grey[300], 0.8)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Star color="action" fontSize="small" sx={{ mr: 1 }} />
            <StyledFormLabel
              required
              sx={{
                fontSize: '0.95rem',
                fontWeight: 'medium',
                color: 'text.primary',
                m: 0,
              }}
            >
              Informe o Qualis do seu evento
            </StyledFormLabel>
            <Tooltip title="Classificação Qualis do evento academico">
              <IconButton size="small" sx={{ ml: 1 }}>
                <Help fontSize="small" color="action" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Field
              name="qualis"
              as={Select}
              displayEmpty
              sx={{ maxWidth: 200, bgcolor: 'white' }}
              error={touched.qualis && !!errors.qualis}
            >
              {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
              <MenuItem value="Outro">Outro</MenuItem>
            </Field>
            {touched.qualis && errors.qualis && (
              <FormHelperText error>{errors.qualis}</FormHelperText>
            )}

            {values.qualis === 'Outro' && (
              <TextField
                label="Especifique o Qualis"
                value={outroQualis}
                onChange={(e) => setOutroQualis(e.target.value)}
                sx={{ maxWidth: 300, bgcolor: 'white' }}
                placeholder="Informe o Qualis"
                size="small"
              />
            )}

            <TextPreviewAlert
              value={config.textoInformacaoCalcularQualis}
              links={config.resourceLinks?.filter(
                (link) => link.fieldName == 'textoInformacaoCalcularQualis',
              )}
              alertSeverity="info"
            />
            <TextPreviewAlert
              value={config.textoAvisoQualis}
              links={config.resourceLinks?.filter(
                (link) => link.fieldName == 'textoAvisoQualis',
              )}
              alertSeverity="warning"
            />
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
}
