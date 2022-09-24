import React from 'react'
import styled from '@emotion/styled'

import {
  Grid,
  Typography,
  FormLabel,
  Radio,
  FormControlLabel,
} from '@mui/material'
import { useFormikContext } from 'formik'

import { SolicitationFormValues } from './SolicitationFormSchema'

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>()

  const StyledData = styled.div`
    padding: 0.2rem;
  `

  return (
    <Grid
      container
      direction='row'
      paddingTop={2}
      paddingBottom={2}
      justifyContent='space-between'
    >
      {/* Primeira Coluna - Email ... */}
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>Email</Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            contato@ufba.br
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Nome do solicitante<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Lorem
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Título completo da publicação a ser apoiada
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Título
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>DOI (se disponível)</Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Lorem Ipson
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Lista completa de co-autor(es) da publicação a ser apoiada
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Lorem Ipson
          </Typography>
        </StyledData>
      </Grid>
      {/* Segunda Coluna - Solicitou ... */}
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>
            Solicitou apoia para esse artigo em outro programa de pós-graduação
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Não
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Solicitou auxilio para esse artigo de outras fontes de
            financiamento?<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Não
          </Typography>
        </StyledData>
      </Grid>
      {/* Terceira Coluna Datas ... */}
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>
            Data de início<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            08/09/22
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Data de término<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            12/12/22
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Link homepage<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Link
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            País<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Brasil
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Cidade<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            Salvador
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Valor da inscrição + publicação
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            R$200,00
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Informe o Qualis do seu evento
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant='subtitle2'>
            A1
          </Typography>
        </StyledData>
      </Grid>
      {/* Footer com termo De acordo */}
      <Grid item md={12} xs={12}>
        <FormLabel>
          {' '}
          <Typography variant='subtitle1' style={{ color: 'gray' }}>
            Confirmo que a solicitação é para um artigo aceito (artigos em
            revisão não serão analisados) e que as informações enviadas serão
            analisadas pelo colegiado do PGCOMP com base nas regras de
            financiamento definidas por esse colegiado e na disponiblidade de
            recursos financeiros
          </Typography>
        </FormLabel>
        <FormControlLabel control={<Radio />} label='De acordo' />
      </Grid>
    </Grid>
  )
}
