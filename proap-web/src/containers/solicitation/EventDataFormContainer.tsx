import React from 'react'

import { SolicitationFormValues } from './SolicitationFormSchema'
import { Field, useFormikContext } from 'formik'
import {
  Grid,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Link,
  Radio,
} from '@mui/material'
import { StyledTextField } from './SolicitationFormContainer.style'

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>()

  return (
    <Grid container paddingTop={2} paddingBottom={2}>
      <Grid container item md={6} xs={12}>
        <Grid container direction='row' spacing={2}>
          <Grid item>
            <Field
              as={TextField}
              label='Data de início'
              name='dataInicio'
              error={Boolean(touched.dataInicio && errors.dataInicio)}
              helperText={touched.dataInicio && errors.dataInicio}
              type='date'
              required
            />
          </Grid>
          <Grid item>
            <Field
              as={TextField}
              label='Data de termino'
              name='dataFim'
              error={Boolean(touched.dataFim && errors.dataFim)}
              helperText={touched.dataFim && errors.dataFim}
              type='date'
              required
            />
          </Grid>
        </Grid>

        <Grid container item direction='column'>
          <Field
            as={StyledTextField}
            label='Link homepage'
            name='linkHomepage'
            error={Boolean(touched.linkHomepage && errors.linkHomepage)}
            helperText={touched.linkHomepage && errors.linkHomepage}
            required
          />

          <Field
            as={StyledTextField}
            label='País'
            name='pais'
            error={Boolean(touched.pais && errors.pais)}
            helperText={touched.pais && errors.pais}
            required
          />

          <Field
            as={StyledTextField}
            label='Cidade'
            name='cidade'
            error={Boolean(touched.cidade && errors.cidade)}
            helperText={touched.cidade && errors.cidade}
            required
          />

          <Field
            as={StyledTextField}
            label='Valor da inscrição/publicação'
            name='valorInscricao'
            type='number'
            error={Boolean(touched.valorInscricao && errors.valorInscricao)}
            helperText={touched.valorInscricao && errors.valorInscricao}
            required
          />

          <Field
            as={StyledTextField}
            label='Carta de aceite'
            name='cartaAceite'
            error={Boolean(touched.cartaAceite && errors.cartaAceite)}
            helperText={touched.cartaAceite && errors.cartaAceite}
            required
          />
        </Grid>
      </Grid>

      <Grid container item md={6} xs={12}>
        <FormControl>
          <FormLabel required>Informe o Qualis do seu evento</FormLabel>
          <RadioGroup>
            <Grid container>
              <Grid item container direction='row'>
                <FormControlLabel value='A1' control={<Radio />} label='A1' />
                <FormControlLabel value='A2' control={<Radio />} label='A2' />
                <FormControlLabel value='A3' control={<Radio />} label='A3' />
                <FormControlLabel value='A4' control={<Radio />} label='A4' />
              </Grid>
              <Grid item container direction='row'>
                <FormControlLabel value='B1' control={<Radio />} label='B1' />
                <FormControlLabel value='B2' control={<Radio />} label='B2' />
                <FormControlLabel value='B3' control={<Radio />} label='B3' />
                <FormControlLabel value='B4' control={<Radio />} label='B4' />
                <FormControlLabel
                  value='outro'
                  control={<Radio />}
                  label='Outro'
                />
              </Grid>
            </Grid>
          </RadioGroup>
          <Link style={{ color: 'royalblue' }} href='#' underline='none'>
            {`Visualiza Qualis atualizado`}
          </Link>
        </FormControl>
      </Grid>
    </Grid>
  )
}
