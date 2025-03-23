import React from 'react';

import { Grid, Link, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import {
  InitialSolicitationFormValues,
  SolicitationFormValues,
} from '../SolicitationFormSchema';
import { booleanToYesOrNo, dateToLocalDate } from '../../../helpers/conversion';
import { useAuth } from '../../../hooks';
import { BASE_PDF_URL } from '../../../helpers/api';
import { useFormikContext } from 'formik';
import { columnStyle, StyledData } from '../SolicitationFormContainer.style';

export default function SolicitationReviewContainer() {
  const { values } = useFormikContext<SolicitationFormValues>();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
        Resumo da solicitação
      </Typography>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2}>
        <Stack sx={columnStyle}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            Detalhes do Solicitante
          </Typography>
          <StyledData>
            <Typography>Quem abriu a solicitação</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.user.name}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Email do Solicitante</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.user.email}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Telefone de Contato</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.user.phone}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Solicitação em nome do</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.solicitanteDocente ? 'Docente' : 'Discente'}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Nome do Discente PGCOMP</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.nomeDiscente}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Nome do Docente PGCOMP</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.nomeDocente}
            </Typography>
          </StyledData>

          {!values.solicitanteDocente && (
            <StyledData>
              <Typography>
                Está no prazo regular para finalização do seu curso (mestrado ou
                doutorado)?
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {booleanToYesOrNo(values.discenteNoPrazoDoCurso!)}
              </Typography>
            </StyledData>
          )}

          {!values.solicitanteDocente && !values.discenteNoPrazoDoCurso && (
            <StyledData>
              <Typography>
                Quantos meses já se passaram do prazo regular?{' '}
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {values.mesesAtrasoCurso} meses
              </Typography>
            </StyledData>
          )}
        </Stack>
        {/* Segunda Coluna - Detalhes do Solicitante ... */}
        <Stack sx={columnStyle}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            Dados da Solicitação
          </Typography>

          <StyledData>
            <Typography>Título completo da publicação a ser apoiada</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.tituloPublicacao}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              Lista completa de co-autor(es) da publicação a ser apoiada
            </Typography>
            {values.coautores.length > 0 ? (
              values.coautores.map((coautor) => {
                return (
                  <Typography
                    key={coautor}
                    style={{ color: 'gray' }}
                    variant="subtitle2"
                  >
                    {coautor}
                  </Typography>
                );
              })
            ) : (
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                Nenhum co-autor informado
              </Typography>
            )}
            <Typography
              style={{ color: 'gray' }}
              variant="subtitle2"
            ></Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Há alunos ativos do PGCOMP coautores/coparticipantes direto na
              solicitação?
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {booleanToYesOrNo(values.algumCoautorPGCOMP ?? false)}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Arquivo da carta de aceite do artigo</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.cartaAceite ? (
                <Link
                  href={BASE_PDF_URL + values.cartaAceite}
                  target="_blank"
                  rel="noopener"
                  sx={{ alignSelf: 'center' }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Visualizar
                  </Typography>
                </Link>
              ) : (
                'Nenhum arquivo enviado'
              )}
            </Typography>
          </StyledData>
        </Stack>

        {/* Terceira Coluna Detalhamento do Evento ... */}
        <Stack sx={columnStyle}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            Detalhamento do Evento
          </Typography>
          <StyledData>
            <Typography>Nome do Evento (ou Solicitação)</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.nomeEvento}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Natureza da Solicitação</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.eventoInternacional ? 'Internacional' : 'Nacional'}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Data de início</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {dateToLocalDate(values.dataInicio)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Data de término</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {dateToLocalDate(values.dataFim)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Será necessário afastamento para participação do Evento?{' '}
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {booleanToYesOrNo(values.afastamentoParaParticipacao!)}
            </Typography>
          </StyledData>

          {values.afastamentoParaParticipacao && (
            <StyledData>
              <Typography>Quantos dias de afastamento?</Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {values.diasAfastamento} dias
              </Typography>
            </StyledData>
          )}

          <StyledData>
            <Typography>Homepage do Evento (ou Solicitação)</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.linkHomePageEvento}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>País</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.pais}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Cidade</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.cidade}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Modalidade de participação </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.modalidadeParticipacao.substring(0, 1).toUpperCase() +
                values.modalidadeParticipacao.substring(1)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Informe o Qualis do seu evento</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.qualis}
            </Typography>
          </StyledData>
        </Stack>
        {/* Quarta Coluna Detalhamento Financeiro ... */}
        <Stack sx={columnStyle}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
          >
            Detalhamento Financeiro
          </Typography>
          <StyledData>
            <Typography>Valor da inscrição/solicitação (R$)</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              R${values.valorInscricao}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Link da página da inscrição do evento (ou solicitação)
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.linkPaginaInscricao}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>Quantas diárias deseja solicitar?</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {values.quantidadeDiariasSolicitadas} diária
              {values.quantidadeDiariasSolicitadas > 1 && 's'}
            </Typography>
          </StyledData>
          {values.quantidadeDiariasSolicitadas > 0 && (
            <>
              <StyledData>
                <Typography>Informe o valor da sua diária</Typography>
                <Typography style={{ color: 'gray' }} variant="subtitle2">
                  {values.isDolar ? '$' : 'R$'}
                  {values.valorDiaria}
                </Typography>
              </StyledData>
              {values.isDolar && (
                <StyledData>
                  <Typography>
                    Informe o valor da cotação do dólar americano (USD)
                  </Typography>
                  <Typography style={{ color: 'gray' }} variant="subtitle2">
                    ${values.cotacaoMoeda}
                  </Typography>
                </StyledData>
              )}
              {values.quantidadeDiariasSolicitadas > 1 && (
                <StyledData>
                  <Typography>Última diária no valor integral?</Typography>
                  <Typography style={{ color: 'gray' }} variant="subtitle2">
                    {booleanToYesOrNo(values.ultimaDiariaIntegral ?? false)}
                  </Typography>
                </StyledData>
              )}
            </>
          )}
          {values.solicitanteDocente && (
            <StyledData>
              <Typography>
                Informe o valor aproximado da passagem aérea
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                R${values.valorPassagem}
              </Typography>
            </StyledData>
          )}
          <StyledData>
            <Typography>Valor total da solicitação (R$) </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              R${values.valorTotal}
            </Typography>
          </StyledData>
        </Stack>
      </Stack>
    </>
  );
}
