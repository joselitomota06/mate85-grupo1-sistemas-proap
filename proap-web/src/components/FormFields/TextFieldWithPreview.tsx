import {
  AlertColor,
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Field, FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { useState, useEffect } from 'react';
import { StyledFormLabel } from '../../containers/solicitation/SolicitationFormContainer.style';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { UrlMapper } from '../../types/admin-type/SystemConfiguration';
import TextPreviewAlert from './TextPreviewAlert';
import * as Yup from 'yup';
import { systemConfigSchema } from '../../containers/admin-panel/SystemConfigSchema';

// Criar um schema separado para validação do link, seguindo as mesmas regras
const urlMapperValidationSchema = Yup.object().shape({
  url: Yup.string().url('URL inválida').required('URL é obrigatória'),
  urlTitle: Yup.string().required('Título do link é obrigatório'),
  fieldName: Yup.string().required('Nome do campo é obrigatório'),
});

interface TextFieldWithPreviewProps {
  name: string;
  label: string;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  value: string;
  rows?: number;
  alertSeverity?: AlertColor;
  resourceLinks?: UrlMapper[];
  onAddResourceLink?: (resourceLink: UrlMapper) => void;
  onRemoveResourceLink?: (index: number) => void;
}

export default function TextFieldWithPreview({
  name,
  label,
  touched,
  errors,
  value,
  rows = 3,
  alertSeverity = 'warning',
  resourceLinks = [],
  onAddResourceLink,
  onRemoveResourceLink,
}: TextFieldWithPreviewProps) {
  const [newUrl, setNewUrl] = useState('');
  const [newUrlTitle, setNewUrlTitle] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);

  // Resetar erros quando os campos mudam
  useEffect(() => {
    setUrlError(null);
  }, [newUrl]);

  useEffect(() => {
    setTitleError(null);
  }, [newUrlTitle]);

  const handleAddUrl = async () => {
    try {
      // Criar objeto de link
      const link = {
        url: newUrl.trim(),
        urlTitle: newUrlTitle.trim(),
        fieldName: name,
      };

      // Validar usando o schema
      await urlMapperValidationSchema.validate(link, { abortEarly: false });

      if (onAddResourceLink) {
        onAddResourceLink(link);
        setNewUrl('');
        setNewUrlTitle('');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Processar erros do Yup
        err.inner.forEach((error) => {
          if (error.path === 'url') {
            setUrlError(error.message);
          } else if (error.path === 'urlTitle') {
            setTitleError(error.message);
          }
        });
      }
    }
  };

  const links = resourceLinks.filter((link) => link.fieldName === name);

  return (
    <Stack direction="column" spacing={1}>
      <FormControl error={Boolean(touched[name] && errors[name])}>
        <StyledFormLabel required>{label}</StyledFormLabel>

        <TextPreviewAlert
          value={value}
          alertSeverity={alertSeverity}
          links={links}
        />

        <Field
          as={TextField}
          fullWidth
          name={name}
          multiline
          rows={rows}
          error={touched[name] && !!errors[name]}
          helperText={touched[name] && errors[name]}
          sx={{
            '& .css-xmlnll-MuiInputBase-root-MuiOutlinedInput-root': {
              padding: 0,
            },
          }}
        />

        {onAddResourceLink && (
          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <Typography variant="subtitle2">
              Adicionar link relacionado:
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                label="URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                fullWidth
                size="small"
                error={!!urlError}
                helperText={urlError}
                placeholder="https://exemplo.com"
              />
              <TextField
                label="Título do link"
                value={newUrlTitle}
                onChange={(e) => setNewUrlTitle(e.target.value)}
                fullWidth
                size="small"
                error={!!titleError}
                helperText={titleError}
                placeholder="Nome do link"
              />
              <IconButton
                color="primary"
                disabled={!newUrl || !newUrlTitle}
                onClick={handleAddUrl}
                sx={{ mt: { xs: 1, sm: 0 } }}
              >
                <AddIcon />
              </IconButton>
            </Stack>

            {links.length > 0 && (
              <Stack spacing={1} sx={{ mt: 1 }}>
                <Typography variant="subtitle2">Links adicionados:</Typography>
                {links.map((link, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {link.urlTitle} -{' '}
                      <Typography component="span" color="text.secondary">
                        {link.url}
                      </Typography>
                    </Typography>
                    {onRemoveResourceLink && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          onRemoveResourceLink(resourceLinks.indexOf(link))
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </FormControl>
    </Stack>
  );
}
