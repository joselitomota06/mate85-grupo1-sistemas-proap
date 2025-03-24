import { Field, FieldArray, Form, Formik } from 'formik';
import { SystemConfiguration, UrlMapper } from '../../types';
import { systemConfigSchema } from './SystemConfigSchema';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TextFieldWithPreview from '../../components/FormFields/TextFieldWithPreview';
import CountryGroupField from '../../components/FormFields/CountryGroupField';

interface SystemConfigFormProps {
  initialValues: SystemConfiguration;
  onSubmit: (values: SystemConfiguration) => void;
}

export default function SystemConfigFormContainer(
  props: SystemConfigFormProps,
) {
  const [newCategory, setNewCategory] = useState<string>('');

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={systemConfigSchema}
      onSubmit={props.onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, values, setFieldValue }) => {
        const handleAddResourceLink = (resourceLink: UrlMapper) => {
          const currentLinks = values.resourceLinks || [];
          setFieldValue('resourceLinks', [...currentLinks, resourceLink]);
        };

        const handleRemoveResourceLink = (index: number) => {
          const currentLinks = values.resourceLinks || [];
          setFieldValue(
            'resourceLinks',
            currentLinks.filter((_, i) => i !== index),
          );
        };

        return (
          <Box component={Form} sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Categorias Qualis
              </Typography>
              <Box>
                <FieldArray
                  name="qualis"
                  render={(arrayHelpers) => (
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {values.qualis.map((category, index) => (
                          <Chip
                            key={index}
                            label={category}
                            onDelete={() => arrayHelpers.remove(index)}
                            color="primary"
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          fullWidth
                          label="Nova categoria"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          error={touched.qualis && !!errors.qualis}
                          helperText={
                            touched.qualis && (errors.qualis as string)
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() => {
                                    if (newCategory.trim()) {
                                      arrayHelpers.push(newCategory.trim());
                                      setNewCategory('');
                                    }
                                  }}
                                >
                                  <AddIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                />
              </Box>

              <Divider />

              <Typography variant="h6" fontWeight="bold" color="primary">
                URLs de Documentação
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="sitePgcompURL"
                label="URL do Site do PGCOMP"
                error={touched.sitePgcompURL && !!errors.sitePgcompURL}
                helperText={touched.sitePgcompURL && errors.sitePgcompURL}
              />
              <Field
                as={TextField}
                fullWidth
                name="resolucaoProapURL"
                label="URL da Resolução PROAP"
                error={touched.resolucaoProapURL && !!errors.resolucaoProapURL}
                helperText={
                  touched.resolucaoProapURL && errors.resolucaoProapURL
                }
              />

              <Divider />

              <Typography variant="h6" fontWeight="bold" color="primary">
                Limites e Valores
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Field
                  as={TextField}
                  fullWidth
                  name="numMaxDiarias"
                  label="Número Máximo de Diárias"
                  type="number"
                  inputProps={{ min: 1 }}
                  error={touched.numMaxDiarias && !!errors.numMaxDiarias}
                  helperText={touched.numMaxDiarias && errors.numMaxDiarias}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="valorDiariaBRL"
                  label="Valor da Diária (R$)"
                  type="number"
                  inputProps={{ step: '0.01', min: 1 }}
                  error={touched.valorDiariaBRL && !!errors.valorDiariaBRL}
                  helperText={touched.valorDiariaBRL && errors.valorDiariaBRL}
                />
              </Stack>

              <Divider />

              <Typography variant="h6" fontWeight="bold" color="primary">
                Textos Informativos
              </Typography>

              <TextFieldWithPreview
                name="textoAvisoQualis"
                label="Texto de Aviso Qualis"
                touched={touched}
                errors={errors}
                value={values.textoAvisoQualis}
                alertSeverity="warning"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoAvisoValorInscricao"
                label="Texto de Aviso sobre Valor de Inscrição"
                touched={touched}
                errors={errors}
                value={values.textoAvisoValorInscricao}
                alertSeverity="warning"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoInformacaoQtdDiarias"
                label="Texto com Informações sobre Quantidade de Diárias"
                touched={touched}
                errors={errors}
                value={values.textoInformacaoQtdDiarias}
                alertSeverity="info"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoAvisoEnvioArquivoCarta"
                label="Texto de Aviso sobre Envio de Arquivo de Carta"
                touched={touched}
                errors={errors}
                value={values.textoAvisoEnvioArquivoCarta}
                alertSeverity="warning"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoInformacaoCalcularQualis"
                label="Texto com Informações sobre Como Calcular Qualis"
                touched={touched}
                errors={errors}
                value={values.textoInformacaoCalcularQualis}
                alertSeverity="info"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoInformacaoValorDiaria"
                label="Texto com Informações sobre Valor da Diária"
                touched={touched}
                errors={errors}
                value={values.textoInformacaoValorDiaria}
                alertSeverity="info"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />

              <TextFieldWithPreview
                name="textoInformacaoValorPassagem"
                label="Texto com Informações sobre Valor da Passagem"
                touched={touched}
                errors={errors}
                value={values.textoInformacaoValorPassagem}
                alertSeverity="info"
                resourceLinks={values.resourceLinks}
                onAddResourceLink={handleAddResourceLink}
                onRemoveResourceLink={handleRemoveResourceLink}
              />
              <Divider sx={{ my: 3 }} />

              <CountryGroupField
                groups={values.countryGroups || []}
                onChange={(groups) => setFieldValue('countryGroups', groups)}
              />

              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
}
