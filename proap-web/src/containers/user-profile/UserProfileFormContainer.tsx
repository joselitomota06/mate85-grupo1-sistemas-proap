import { Field, Form, Formik } from 'formik';
import { User } from '../../types';
import { userProfileSchema } from './UserProfileSchema';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
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
      {({ errors, touched, setFieldValue }) => (
        <Box component={Form} sx={{ width: '100%' }}>
          <Stack spacing={2}>
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
                name="profileName"
                label="Papel do Usuário"
                error={touched.profileName && !!errors.profileName}
                helperText={touched.profileName && errors.profileName}
                disabled
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
              name="name"
              label="Nome"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Field name="phone">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone"
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    onChange={(e) => {
                      const formattedPhone = maskPhone(e.target.value);
                      setFieldValue('phone', formattedPhone);
                    }}
                  />
                )}
              </Field>
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
                      touched.alternativePhone && errors.alternativePhone
                    }
                    onChange={(e) => {
                      const formattedPhone = maskPhone(e.target.value);
                      setFieldValue('alternativePhone', formattedPhone);
                    }}
                  />
                )}
              </Field>
            </Stack>

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
