import React from "react";

import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

import { Solicitation } from "./SolicitationFormSchema";
import { booleanToYesOrNo } from "../../helpers/conversion";

interface SolicitationDetailsContainerProps {
  solicitation: Solicitation;
}

const StyledData = styled.div`
  padding: 0.2rem;
`;

export default function SolicitationDetailsContainer({
  solicitation,
}: SolicitationDetailsContainerProps) {
  return (
    <>
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>Email</Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.email}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Nome do solicitante<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.nomeCompleto}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Título completo da publicação a ser apoiada
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.titulo}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>DOI (se disponível)</Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.doi ? solicitation.doi : "Não disponível"}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Lista completa de co-autor(es) da publicação a ser apoiada
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.autores}
          </Typography>
        </StyledData>
      </Grid>
      {/* Segunda Coluna - Solicitou ... */}
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>
            Solicitou apoia para esse artigo em outro programa de pós-graduação
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {booleanToYesOrNo(Boolean(solicitation.solicitacaoApoio))}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Solicitou auxilio para esse artigo de outras fontes de
            financiamento?<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {booleanToYesOrNo(
              Boolean(solicitation.solicitacaoAuxilioOutrasFontes)
            )}
          </Typography>
        </StyledData>
      </Grid>
      {/* Terceira Coluna Datas ... */}
      <Grid item md={3} xs={12}>
        <StyledData>
          <Typography>
            Data de início<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.dataInicio}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Data de término<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.dataFim}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Link homepage<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.linkHomepage}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            País<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.pais}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Cidade<span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.cidade}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Valor da inscrição + publicação
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            $ {solicitation.valorInscricao}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>
            Informe o Qualis do seu evento
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography style={{ color: "gray" }} variant="subtitle2">
            {solicitation.qualis}
          </Typography>
        </StyledData>
      </Grid>
    </>
  );
}
