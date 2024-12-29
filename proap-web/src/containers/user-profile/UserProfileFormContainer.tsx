import { Field, Form, Formik } from 'formik';
import { User } from '../../types';
import { userProfileSchema } from './UserProfileSchema';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

interface UserProfileFormProps {
  initialValues: User;
  onSubmit: (values: User) => void;
}

export default function UserProfileFormContainer(props: UserProfileFormProps) {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={userProfileSchema}
      onSubmit={props.onSubmit}
    >
      {({ errors, touched }) => (
        <Box component={Form} sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <Typography variant="h4" gutterBottom>
              Informações do Usuário
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Nome"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                disabled
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Field
                as={TextField}
                fullWidth
                name="cpf"
                label="CPF"
                error={touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                disabled
              />
              <Field
                as={TextField}
                fullWidth
                name="phone"
                label="Telefone"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Field
                as={TextField}
                fullWidth
                name="alternativePhone"
                label="Telefone Alternativo"
                error={touched.alternativePhone && !!errors.alternativePhone}
                helperText={touched.alternativePhone && errors.alternativePhone}
              />
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
              />
            </Stack>
            <Field
              as={TextField}
              fullWidth
              name="profileName"
              label="Papel do Usuário"
              error={touched.profileName && !!errors.profileName}
              helperText={touched.profileName && errors.profileName}
            />
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Salvar Alterações
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}
