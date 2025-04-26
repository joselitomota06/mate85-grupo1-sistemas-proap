import { Field, Form, Formik } from 'formik';
import { User } from '../../types';
import { userProfileSchema } from './UserProfileSchema';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
  Divider,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  Badge,
  DriveFileRenameOutline,
  Save,
  Info,
} from '@mui/icons-material';
import { maskCpf, maskPhone } from '../../helpers/masks';

interface UserProfileFormProps {
  initialValues: User;
  onSubmit: (values: User) => void;
}

export default function UserProfileFormContainer(props: UserProfileFormProps) {
  const formatInitialValues = (user: User): User => ({
    ...user,
    phone: maskPhone(user.phone),
    alternativePhone: maskPhone(user.alternativePhone ?? ''),
    cpf: maskCpf(user.cpf),
  });

  return (
    <Formik
      initialValues={formatInitialValues(props.initialValues)}
      validationSchema={userProfileSchema}
      onSubmit={props.onSubmit}
    >
      {({ errors, touched, setFieldValue, isSubmitting, dirty }) => (
        <Box component={Form} sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ mb: 1 }}
              >
                Informações da Conta
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="cpf"
                    label="CPF"
                    error={touched.cpf && !!errors.cpf}
                    helperText={touched.cpf && errors.cpf}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge color="disabled" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="O CPF não pode ser alterado">
                            <Info fontSize="small" color="disabled" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="disabled" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="O email não pode ser alterado">
                            <Info fontSize="small" color="disabled" />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ mb: 1 }}
              >
                Informações Pessoais
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Nome Completo"
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="profileName"
                    label="Papel do Usuário"
                    error={touched.profileName && !!errors.profileName}
                    helperText={touched.profileName && errors.profileName}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge color="disabled" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="registrationNumber"
                    label="Número de Matrícula"
                    error={
                      touched.registrationNumber && !!errors.registrationNumber
                    }
                    helperText={
                      touched.registrationNumber && errors.registrationNumber
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ mb: 1 }}
              >
                Informações de Contato
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field name="phone">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Telefone Principal"
                        error={touched.phone && !!errors.phone}
                        helperText={
                          (touched.phone && errors.phone) ||
                          'Ex: (71) 99999-9999'
                        }
                        onChange={(e) => {
                          const formattedPhone = maskPhone(e.target.value);
                          setFieldValue('phone', formattedPhone);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="alternativePhone">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Telefone Alternativo"
                        error={
                          touched.alternativePhone && !!errors.alternativePhone
                        }
                        helperText={
                          (touched.alternativePhone &&
                            errors.alternativePhone) ||
                          'Opcional - Ex: (71) 99999-9999'
                        }
                        onChange={(e) => {
                          const formattedPhone = maskPhone(e.target.value);
                          setFieldValue('alternativePhone', formattedPhone);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty}
                  startIcon={<Save />}
                  size="large"
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
}
