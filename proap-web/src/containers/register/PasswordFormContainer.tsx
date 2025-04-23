import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import {
  TextField,
  Box,
  InputAdornment,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Lock,
  Visibility,
  VisibilityOff,
  LockOutlined,
} from '@mui/icons-material';
import { RegisterFormValues } from './RegisterFormSchema';

export default function PasswordFormContainer() {
  const { errors, touched } = useFormikContext<RegisterFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Defina uma senha segura para sua conta
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field name="password">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                variant="outlined"
                required
                error={Boolean(touched.password && errors.password)}
                helperText={
                  (touched.password && errors.password) ||
                  'A senha deve ter pelo menos 8 caracteres'
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Field name="confirmPassword">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="Confirmar Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                variant="outlined"
                required
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword,
                )}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </Box>
  );
}
