import React, { useEffect } from 'react';

import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  Grid,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Alert,
  Link,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import Select from '@mui/material/Select';
import {
  StyledFormLabel,
  StyledIconButton,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { CurrencyCustomFormikField } from '../../currency-input/CurrencyInputContainer';
import { Info } from '@mui/icons-material';
import useCalculeTotal from '../../../hooks/solicitation/useCalculeTotal';

export default function financialDetailFormContainer() {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<InitialSolicitationFormValues>();

  useCalculeTotal();

  useEffect(() => {
    if (!values.isDolar) {
      setFieldValue('valorDiaria', 320);
    } else {
      setFieldValue('valorDiaria', '');
    }

    if (values.quantidadeDiariasSolicitadas === 0) {
      setFieldValue('valorDiaria', 0);
    }
  }, [values.isDolar, values.quantidadeDiariasSolicitadas]);

  console.log('Values', values);
  console.log('Errors', errors);

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
      <Alert severity="warning" sx={{ maxWidth: '800px' }}>
        {`O PROAP não reembolsa taxa de filiação, a não ser que 
        seja uma opção obrigatória associada à taxa de inscrição.`}
      </Alert>
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
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              {!values.solicitanteDocente && <MenuItem value={5}>5</MenuItem>}
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
      <Alert severity="info" sx={{ maxWidth: '800px' }}>
        Conforme a resolução do PROAP, a quantidade de diárias é limitada ao
        número de dias do evento, e a última diária é de 50% do valor. Leia a{' '}
        <Link
          href="https://pgcomp.ufba.br/sites/pgcomp.ufba.br/files/2024_resolucao_01_-_pgcomp_-_proap.pdf"
          target="_blank"
          rel="noopener"
          style={{ color: 'inherit', fontWeight: 'bold' }}
        >
          Resolução 01/2024
        </Link>{' '}
        antes de inserir esta informação.
      </Alert>
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
                disabled={!values.isDolar}
                type="number"
                InputProps={{
                  inputProps: { min: 0, step: 0.01 },
                }}
                error={Boolean(touched.valorDiaria && errors.valorDiaria)}
                required
              />
              <Tooltip
                sx={{ position: 'relative' }}
                title="Informe o valor referente a uma diária"
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
          <Alert severity="info" sx={{ maxWidth: '800px' }}>
            O valor atual da diária no Brasil é R$320. No exterior, indique o
            valor em USD, conforme a tabela de auxílio diário no exterior mais
            recente, disponível na{' '}
            <Link
              href="https://acrobat.adobe.com/id/urn:aaid:sc:US:2f1cb5ef-adf6-4c35-8258-63444225af4e"
              target="_blank"
              rel="noopener"
              style={{ color: 'inherit', fontWeight: 'bold' }}
            >
              neste link
            </Link>{' '}
            .
          </Alert>
        </Stack>
      )}
      {values.isDolar && (
        <Stack direction={'row'}>
          <Field
            as={StyledTextField}
            label="Informe o valor da cotação do dólar americano (USD)"
            sx={{ width: '200px' }}
            name="cotacaoMoeda"
            type="number"
            InputProps={{
              inputProps: { min: 0, step: 0.01 },
            }}
            error={Boolean(touched.cotacaoMoeda && errors.cotacaoMoeda)}
            helperText={touched.cotacaoMoeda && errors.cotacaoMoeda}
            required
          />
          <Tooltip
            sx={{ position: 'relative', top: '10px' }}
            title="A cotação deve ser do dia desta solicitação"
          >
            <StyledIconButton>
              <Info />
            </StyledIconButton>
          </Tooltip>
        </Stack>
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
          <Alert severity="info" sx={{ maxWidth: '800px' }}>
            As passagens serão adquiridas pelo SCDP.
          </Alert>
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
    </Box>
  );
}
