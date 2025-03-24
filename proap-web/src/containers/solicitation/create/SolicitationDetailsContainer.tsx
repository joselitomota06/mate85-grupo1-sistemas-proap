import React from 'react';

import { Grid, Link, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { booleanToYesOrNo, dateToLocalDate } from '../../../helpers/conversion';
import { useAuth } from '../../../hooks';
import { BASE_PDF_URL } from '../../../helpers/api';
import { columnStyle, StyledData } from '../SolicitationFormContainer.style';

export default function SolicitationDetailsContainer({
  solicitation,
}: {
  solicitation: InitialSolicitationFormValues;
}) {
  const currentUser = useAuth();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
        Resumo da solicitação{' '}
      </Typography>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2}>
        <Stack sx={columnStyle}>
          <StyledData>
            <Typography>Nome do Solicitante</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {currentUser.name}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Email do Solicitante</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {currentUser.email}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              Solicitação em nome do
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.solicitanteDocente ? 'Docente' : 'Discente'}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              Nome do Discente PGCOMP <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.nomeDiscente}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Nome do Docente PGCOMP <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.nomeDocente}
            </Typography>
          </StyledData>

          {!solicitation.solicitanteDocente && (
            <StyledData>
              <Typography>
                Está no prazo regular para finalização do seu curso (mestrado ou
                doutorado)? <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {booleanToYesOrNo(solicitation.discenteNoPrazoDoCurso!)}
              </Typography>
            </StyledData>
          )}

          {!solicitation.solicitanteDocente &&
            !solicitation.discenteNoPrazoDoCurso && (
              <StyledData>
                <Typography>
                  Quantos meses já se passaram do prazo regular?{' '}
                  <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Typography style={{ color: 'gray' }} variant="subtitle2">
                  {solicitation.mesesAtrasoCurso} meses
                </Typography>
              </StyledData>
            )}
        </Stack>
        {/* Segunda Coluna - Detalhes do Solicitante ... */}
        <Stack sx={columnStyle}>
          <StyledData>
            <Typography>
              Título completo da publicação a ser apoiada
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.tituloPublicacao}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              Lista completa de co-autor(es) da publicação a ser apoiada
            </Typography>
            {solicitation.coautores.length > 0 ? (
              solicitation.coautores.map((coautor) => {
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
              {booleanToYesOrNo(solicitation.algumCoautorPGCOMP ?? false)}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>Arquivo da carta de aceite do artigo</Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.cartaAceite
                ? (solicitation.file?.name ?? (
                    <Link
                      href={BASE_PDF_URL + solicitation.cartaAceite}
                      target="_blank"
                      rel="noopener"
                      sx={{ alignSelf: 'center' }}
                    >
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Visualizar
                      </Typography>
                    </Link>
                  ))
                : (solicitation.file?.name ?? 'Nenhum arquivo enviado')}
            </Typography>
          </StyledData>
        </Stack>

        {/* Terceira Coluna Detalhamento do Evento ... */}
        <Stack sx={columnStyle}>
          <StyledData>
            <Typography>
              Nome do Evento (ou Solicitação)
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.nomeEvento}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Natureza da Solicitação
              <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.eventoInternacional ? 'Internacional' : 'Nacional'}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Data de início<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {dateToLocalDate(solicitation.dataInicio)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Data de término<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {dateToLocalDate(solicitation.dataFim)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Será necessário afastamento para participação do Evento?{' '}
              <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {booleanToYesOrNo(solicitation.afastamentoParaParticipacao!)}
            </Typography>
          </StyledData>

          {solicitation.afastamentoParaParticipacao && (
            <StyledData>
              <Typography>
                Quantos dias de afastamento?
                <span style={{ color: 'red' }}> *</span>
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {solicitation.diasAfastamento} dias
              </Typography>
            </StyledData>
          )}

          <StyledData>
            <Typography>
              Homepage do Evento (ou Solicitação)
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.linkHomePageEvento}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              País<span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.pais}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Cidade<span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.cidade}
            </Typography>
          </StyledData>

          <StyledData>
            <Typography>
              Modalidade de participação{' '}
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.modalidadeParticipacao
                .substring(0, 1)
                .toUpperCase() +
                solicitation.modalidadeParticipacao.substring(1)}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Informe o Qualis do seu evento
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.qualis}
            </Typography>
          </StyledData>
        </Stack>
        {/* Quarta Coluna Detalhamento Financeiro ... */}
        <Stack sx={columnStyle}>
          <StyledData>
            <Typography>
              Valor da inscrição/solicitação (R$)
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              R${solicitation.valorInscricao}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Link da página da inscrição do evento (ou solicitação)
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.linkPaginaInscricao}
            </Typography>
          </StyledData>
          <StyledData>
            <Typography>
              Quantas diárias deseja solicitar?
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              {solicitation.quantidadeDiariasSolicitadas} diária
              {solicitation.quantidadeDiariasSolicitadas > 1 && 's'}
            </Typography>
          </StyledData>
          {solicitation.quantidadeDiariasSolicitadas > 0 && (
            <>
              <StyledData>
                <Typography>Informe o valor da sua diária</Typography>
                <Typography style={{ color: 'gray' }} variant="subtitle2">
                  {solicitation.isDolar ? '$' : 'R$'}
                  {solicitation.valorDiaria}
                </Typography>
              </StyledData>
              {solicitation.isDolar && (
                <StyledData>
                  <Typography>
                    Informe o valor da cotação do dólar americano (USD)
                  </Typography>
                  <Typography style={{ color: 'gray' }} variant="subtitle2">
                    ${solicitation.cotacaoMoeda}
                  </Typography>
                </StyledData>
              )}
            </>
          )}
          {solicitation.quantidadeDiariasSolicitadas > 1 && (
            <StyledData>
              <Typography>
                Deseja que a última diária seja no valor integral?
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                {booleanToYesOrNo(solicitation.ultimaDiariaIntegral ?? false)}
              </Typography>
            </StyledData>
          )}
          {solicitation.solicitanteDocente && (
            <StyledData>
              <Typography>
                Informe o valor aproximado da passagem aérea
              </Typography>
              <Typography style={{ color: 'gray' }} variant="subtitle2">
                R${solicitation.valorPassagem}
              </Typography>
            </StyledData>
          )}
          <StyledData>
            <Typography>Valor total da solicitação (R$) </Typography>
            <Typography style={{ color: 'gray' }} variant="subtitle2">
              R${solicitation.valorTotal}
            </Typography>
          </StyledData>
        </Stack>
      </Stack>
    </>
  );
}
