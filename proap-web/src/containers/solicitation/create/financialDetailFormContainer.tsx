import { useEffect, useState } from 'react';

import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Alert,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  DialogContent,
  DialogTitle,
  Dialog,
  TableHead,
  TableRow,
  DialogActions,
  InputAdornment,
  CircularProgress,
  IconButton,
} from '@mui/material';
import Select from '@mui/material/Select';
import {
  StyledFormLabel,
  StyledIconButton,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { Info, Refresh } from '@mui/icons-material';
import useCalculeTotal from '../../../hooks/solicitation/useCalculeTotal';
import { useSysConfig } from '../../../hooks/admin/useSysConfig';
import TextPreviewAlert from '../../../components/FormFields/TextPreviewAlert';
import useDollarRate from '../../../hooks/useDollarRate';
import Toast from '../../../helpers/notification';
export default function FinancialDetailFormContainer() {
  const { config } = useSysConfig();
  const { dollarRate, errorDollarRate, loadingDollarRate, reloadDollarRate } =
    useDollarRate();
  const { values, errors, touched, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();
  const [showCountryGroupsDialog, setShowCountryGroupsDialog] = useState(false);

  useCalculeTotal();

  useEffect(() => {
    if (!values.isDolar) {
      setFieldValue('valorDiaria', config.valorDiariaBRL);
    }

    if (values.quantidadeDiariasSolicitadas === 0) {
      setFieldValue('valorDiaria', 0);
    }
  }, [values.isDolar, values.quantidadeDiariasSolicitadas]);

  useEffect(() => {
    if (loadingDollarRate) return;

    if (errorDollarRate) {
      console.error(errorDollarRate);
    }
    if (dollarRate && values.isDolar)
      setFieldValue('cotacaoMoeda', dollarRate.rate);
  }, [loadingDollarRate, dollarRate, errorDollarRate, values.isDolar]);

  const handleReload = async () => {
    const result = await reloadDollarRate();
    if (result.success) {
      Toast.success('Cotação do dólar atualizada com sucesso');
    } else {
      Toast.error('Erro ao obter cotação do dólar');
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
      <Stack direction={'row'}>
        <Field
          as={StyledTextField}
          label="Valor da inscrição/solicitação (R$)"
          sx={{ width: '200px' }}
          name="valorInscricao"
          type="number"
          InputProps={{
            inputProps: { min: 0, step: 0.01 },
          }}
          error={Boolean(touched.valorInscricao && errors.valorInscricao)}
          helperText={touched.valorInscricao && errors.valorInscricao}
          required
        />
        <Tooltip
          sx={{ position: 'relative', top: '10px' }}
          title="Informe o valor conforme seu extrato bancário"
        >
          <StyledIconButton>
            <Info />
          </StyledIconButton>
        </Tooltip>
      </Stack>
      <TextPreviewAlert
        value={config.textoAvisoValorInscricao}
        links={config.resourceLinks?.filter(
          (link) => link.fieldName == 'textoAvisoValorInscricao',
        )}
        alertSeverity="warning"
      />
      <Stack direction={'row'}>
        <Field
          required
          as={StyledTextField}
          sx={{ width: '100%' }}
          label="Link da página da inscrição do evento (ou solicitação)"
          name="linkPaginaInscricao"
          error={Boolean(
            touched.linkPaginaInscricao && errors.linkPaginaInscricao,
          )}
          helperText={touched.linkPaginaInscricao && errors.linkPaginaInscricao}
        />
        <Tooltip
          sx={{ position: 'relative', top: '10px' }}
          title="Deve conter o valor da inscrição solicitado"
        >
          <StyledIconButton>
            <Info />
          </StyledIconButton>
        </Tooltip>
      </Stack>
      <FormControl
        error={Boolean(
          touched.quantidadeDiariasSolicitadas &&
            errors.quantidadeDiariasSolicitadas,
        )}
      >
        <StyledFormLabel required>
          Quantas diárias deseja solicitar?
        </StyledFormLabel>
        <Stack direction="row">
          <Stack>
            <Field
              as={Select}
              sx={{ maxWidth: 100 }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              name="quantidadeDiariasSolicitadas"
              defaultValue={0}
            >
              <MenuItem key={0} value={0}>
                0
              </MenuItem>
              {config.numMaxDiarias &&
                Array.from({ length: config.numMaxDiarias }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
            </Field>
            {touched.quantidadeDiariasSolicitadas &&
              errors.quantidadeDiariasSolicitadas && (
                <FormHelperText>
                  {errors.quantidadeDiariasSolicitadas}
                </FormHelperText>
              )}
          </Stack>
          <Tooltip
            sx={{ position: 'relative' }}
            title="Caso não se aplique, informe 0 (zero)"
          >
            <StyledIconButton>
              <Info />
            </StyledIconButton>
          </Tooltip>
        </Stack>
      </FormControl>
      <TextPreviewAlert
        value={config.textoInformacaoQtdDiarias}
        links={config.resourceLinks?.filter(
          (link) => link.fieldName == 'textoInformacaoQtdDiarias',
        )}
        alertSeverity="info"
      />
      {values.quantidadeDiariasSolicitadas > 0 && (
        <Stack gap={2}>
          <FormControl
            error={Boolean(touched.valorDiaria && errors.valorDiaria)}
          >
            <StyledFormLabel>Informe o valor da sua diária</StyledFormLabel>
            <Stack direction={'row'} gap={1}>
              <Field
                as={Select}
                sx={{ width: '80px' }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                name="isDolar"
                defaultValue={false}
                onChange={(e: any) => {
                  setFieldValue('isDolar', e.target.value === 'true');
                }}
              >
                <MenuItem value={'false'}>BRL</MenuItem>
                <MenuItem value={'true'}>USD</MenuItem>
              </Field>

              <Field
                as={StyledTextField}
                sx={{ margin: 0 }}
                name="valorDiaria"
                disabled
                type="number"
                InputProps={{
                  inputProps: { min: 0, step: 0.01 },
                }}
                error={Boolean(touched.valorDiaria && errors.valorDiaria)}
                required
              />
              <Tooltip
                sx={{ position: 'relative' }}
                title="O valor é referente a uma diária"
              >
                <StyledIconButton sx={{ padding: 0 }}>
                  <Info />
                </StyledIconButton>
              </Tooltip>
            </Stack>
            {touched.valorDiaria && errors.valorDiaria && (
              <FormHelperText sx={{ color: 'red' }}>
                {errors.valorDiaria}
              </FormHelperText>
            )}
            {touched.isDolar && errors.isDolar && (
              <FormHelperText>{errors.isDolar}</FormHelperText>
            )}
          </FormControl>
          <TextPreviewAlert
            value={config.textoInformacaoValorDiaria}
            links={config.resourceLinks?.filter(
              (link) => link.fieldName == 'textoInformacaoValorDiaria',
            )}
            alertSeverity="info"
          />
        </Stack>
      )}

      {values.isDolar && (
        <FormControl
          error={Boolean(touched.countryGroup && errors.countryGroup)}
        >
          <StyledFormLabel>
            Selecione o grupo de país de destino
          </StyledFormLabel>
          <Box sx={{ mb: 2 }}>
            <Alert
              severity={values.countryGroup ? 'success' : 'error'}
              sx={{ maxWidth: '800px', mb: 1 }}
            >
              <Typography variant="body2">
                Consulte a tabela de auxílio diário no exterior para identificar
                o grupo do país de destino
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setShowCountryGroupsDialog(true);
                }}
              >
                Ver tabela de países
              </Button>
            </Alert>
          </Box>
          <Field
            as={Select}
            sx={{ width: 200 }}
            displayEmpty
            name="countryGroup"
            onChange={(e: any) => {
              const selectedGroup = config.countryGroups?.find(
                (group) => group.groupName === e.target.value,
              );
              if (selectedGroup) {
                setFieldValue('valorDiaria', selectedGroup.valueUSD);
              }
              setFieldValue('countryGroup', e.target.value);
            }}
          >
            <MenuItem value="" disabled>
              Selecione o grupo
            </MenuItem>
            {config.countryGroups?.map((group) => (
              <MenuItem key={group.groupName} value={group.groupName}>
                Grupo {group.groupName} - ${group.valueUSD}
              </MenuItem>
            ))}
          </Field>
          {touched.countryGroup && errors.countryGroup && (
            <FormHelperText>{errors.countryGroup}</FormHelperText>
          )}
        </FormControl>
      )}

      {values.isDolar && (
        <Stack direction={'row'}>
          <Box sx={{ position: 'relative' }}>
            <Stack direction={'row'}>
              <Field
                as={StyledTextField}
                label="Valor da cotação do dólar americano (USD)"
                sx={{ width: '200px' }}
                name="cotacaoMoeda"
                disabled
                type="number"
                InputProps={{
                  inputProps: { min: 0, step: 0.01 },
                  endAdornment: loadingDollarRate ? (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ) : null,
                }}
                error={Boolean(touched.cotacaoMoeda && errors.cotacaoMoeda)}
                helperText={
                  touched.cotacaoMoeda && errors.cotacaoMoeda
                    ? errors.cotacaoMoeda
                    : undefined
                }
                required
              />
              <IconButton
                onClick={handleReload}
                size="small"
                sx={{ ml: 1, position: 'relative', top: '10px' }}
                disabled={loadingDollarRate}
              >
                {loadingDollarRate ? (
                  <CircularProgress size={16} />
                ) : (
                  <Refresh fontSize="small" />
                )}
              </IconButton>
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {!loadingDollarRate && dollarRate?.updatedAt
                  ? `Atualizado em ${new Date(parseInt(dollarRate.updatedAt)).toLocaleString()}`
                  : ''}
              </Typography>
            </Box>
          </Box>
        </Stack>
      )}
      {values.quantidadeDiariasSolicitadas > 1 && (
        <FormControl
          error={Boolean(
            touched.ultimaDiariaIntegral && errors.ultimaDiariaIntegral,
          )}
        >
          <StyledFormLabel required>
            Deseja que a última diária seja no valor integral?
          </StyledFormLabel>
          <Field name="ultimaDiariaIntegral">
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
          {touched.ultimaDiariaIntegral && errors.ultimaDiariaIntegral && (
            <FormHelperText>{errors.ultimaDiariaIntegral}</FormHelperText>
          )}
        </FormControl>
      )}
      {values.solicitanteDocente && (
        <Stack>
          <Stack direction={'row'}>
            <Field
              as={StyledTextField}
              label="Informe o valor aproximado da passagem aérea (R$)"
              sx={{ width: '200px' }}
              name="valorPassagem"
              type="number"
              InputProps={{
                inputProps: { min: 0, step: 0.01 },
              }}
              error={Boolean(touched.valorPassagem && errors.valorPassagem)}
              helperText={touched.valorPassagem && errors.valorPassagem}
              required
            />
            <Tooltip
              sx={{ position: 'relative', top: '10px' }}
              title="Informe 0 se não estiver solicitando apoio de passagem aérea."
            >
              <StyledIconButton>
                <Info />
              </StyledIconButton>
            </Tooltip>
          </Stack>
          <TextPreviewAlert
            value={config.textoInformacaoValorPassagem}
            links={config.resourceLinks?.filter(
              (link) => link.fieldName == 'textoInformacaoValorPassagem',
            )}
            alertSeverity="info"
          />
        </Stack>
      )}

      <Field
        as={StyledTextField}
        label="Valor total da solicitação (R$)"
        sx={{ width: '200px' }}
        disabled
        value={values.valorTotal.toFixed(2)}
        type="number"
        InputProps={{
          inputProps: { min: 0, step: 0.01 },
        }}
        required
      />

      <Dialog
        open={showCountryGroupsDialog}
        onClose={() => setShowCountryGroupsDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Tabela de Auxílio Diário no Exterior</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Grupo</TableCell>
                  <TableCell>Países</TableCell>
                  <TableCell sx={{ minWidth: 150, textAlign: 'center' }}>
                    Valor Diário (USD)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {config.countryGroups?.map((group) => (
                  <TableRow key={group.groupName}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {group.groupName}
                    </TableCell>
                    <TableCell>{group.countries.join(', ')}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {group.valueUSD}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCountryGroupsDialog(false)}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
