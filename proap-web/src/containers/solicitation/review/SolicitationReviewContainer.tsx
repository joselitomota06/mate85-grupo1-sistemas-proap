import React from 'react';
import { Box, Link, Stack, Typography, Divider, Chip } from '@mui/material';
import { useFormikContext } from 'formik';
import { SolicitationFormValues } from '../SolicitationFormSchema';
import { booleanToYesOrNo, dateToLocalDate } from '../../../helpers/conversion';
import { BASE_PDF_URL } from '../../../helpers/api';
import { StyledData } from '../SolicitationFormContainer.style';
import { Person, Event, AttachMoney, School } from '@mui/icons-material';

export default function SolicitationReviewContainer() {
  const { values } = useFormikContext<SolicitationFormValues>();

  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Box
      sx={{
        flex: 1,
        minWidth: 300,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: 'fit-content',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Resumo da solicitação
        </Typography>
        <Chip
          label={values.eventoInternacional ? 'Internacional' : 'Nacional'}
          color={values.eventoInternacional ? 'primary' : 'default'}
          size="small"
          sx={{ ml: 2 }}
        />
      </Box>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Detalhes do Solicitante */}
          <Section
            title="Detalhes do Solicitante"
            icon={<Person color="primary" />}
          >
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Solicitante
              </Typography>
              <Typography>{values.user.name}</Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{values.user.email}</Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Telefone
              </Typography>
              <Typography>{values.user.phone}</Typography>
            </StyledData>

            <Divider sx={{ my: 1 }} />

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Tipo de Solicitante
              </Typography>
              <Typography>
                {values.solicitanteDocente ? 'Docente' : 'Discente'}
              </Typography>
            </StyledData>

            {values.nomeDiscente && (
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Nome do Discente PGCOMP
                </Typography>
                <Typography>{values.nomeDiscente}</Typography>
              </StyledData>
            )}

            {values.nomeDocente && (
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Nome do Docente PGCOMP
                </Typography>
                <Typography>{values.nomeDocente}</Typography>
              </StyledData>
            )}

            {!values.solicitanteDocente && (
              <>
                <StyledData>
                  <Typography variant="subtitle2" color="text.secondary">
                    No prazo regular do curso?
                  </Typography>
                  <Typography>
                    {booleanToYesOrNo(values.discenteNoPrazoDoCurso!)}
                  </Typography>
                </StyledData>

                {!values.discenteNoPrazoDoCurso && (
                  <StyledData>
                    <Typography variant="subtitle2" color="text.secondary">
                      Meses de atraso
                    </Typography>
                    <Typography>{values.mesesAtrasoCurso} meses</Typography>
                  </StyledData>
                )}
              </>
            )}
          </Section>

          {/* Dados da Solicitação */}
          <Section
            title="Dados da Solicitação"
            icon={<School color="primary" />}
          >
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Título da publicação
              </Typography>
              <Typography>{values.tituloPublicacao}</Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Co-autores
              </Typography>
              {values.coautores.length > 0 ? (
                <Stack spacing={0.5}>
                  {values.coautores.map((coautor, index) => (
                    <Typography key={index}>{coautor}</Typography>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  Nenhum co-autor informado
                </Typography>
              )}
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Coautores PGCOMP?
              </Typography>
              <Typography>
                {booleanToYesOrNo(values.algumCoautorPGCOMP ?? false)}
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Carta de aceite
              </Typography>
              {values.cartaAceite ? (
                <Typography variant="body1">
                  <Link
                    href={BASE_PDF_URL + values.cartaAceite}
                    target="_blank"
                    rel="noopener"
                  >
                    Visualizar
                  </Link>
                </Typography>
              ) : (
                <Typography color="text.secondary">
                  Nenhum arquivo enviado
                </Typography>
              )}
            </StyledData>
          </Section>
          {/* Detalhamento Financeiro */}
          <Section
            title="Detalhamento Financeiro"
            icon={<AttachMoney color="primary" />}
          >
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Valor da inscrição
              </Typography>
              <Typography>R$ {values.valorInscricao}</Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Link da inscrição
              </Typography>
              <Typography variant="body1">
                <Link
                  href={values.linkPaginaInscricao}
                  target="_blank"
                  rel="noopener"
                >
                  {values.linkPaginaInscricao}
                </Link>
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Diárias solicitadas
              </Typography>
              <Typography>
                {values.quantidadeDiariasSolicitadas} diária
                {values.quantidadeDiariasSolicitadas !== 1 && 's'}
              </Typography>
            </StyledData>

            {values.quantidadeDiariasSolicitadas > 0 && (
              <>
                <StyledData>
                  <Typography variant="subtitle2" color="text.secondary">
                    Valor da diária
                  </Typography>
                  <Typography>
                    {values.isDolar ? '$' : 'R$'} {values.valorDiaria}
                  </Typography>
                </StyledData>

                {values.isDolar && (
                  <StyledData>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cotação do dólar (USD)
                    </Typography>
                    <Typography>R$ {values.cotacaoMoeda}</Typography>
                  </StyledData>
                )}

                {values.quantidadeDiariasSolicitadas > 1 && (
                  <StyledData>
                    <Typography variant="subtitle2" color="text.secondary">
                      Última diária integral?
                    </Typography>
                    <Typography>
                      {booleanToYesOrNo(values.ultimaDiariaIntegral ?? false)}
                    </Typography>
                  </StyledData>
                )}
              </>
            )}

            {values.solicitanteDocente && (
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Valor da passagem aérea
                </Typography>
                <Typography>R$ {values.valorPassagem}</Typography>
              </StyledData>
            )}

            <Divider sx={{ my: 1 }} />

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Valor total da solicitação
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                R$ {values.valorTotal}
              </Typography>
            </StyledData>
          </Section>

          {/* Detalhamento do Evento */}
          <Section
            title="Detalhamento do Evento"
            icon={<Event color="primary" />}
          >
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Nome do Evento
              </Typography>
              <Typography>{values.nomeEvento}</Typography>
            </StyledData>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Data de início
                </Typography>
                <Typography>{dateToLocalDate(values.dataInicio)}</Typography>
              </StyledData>

              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Data de término
                </Typography>
                <Typography>{dateToLocalDate(values.dataFim)}</Typography>
              </StyledData>
            </Box>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Necessário afastamento?
              </Typography>
              <Typography>
                {booleanToYesOrNo(values.afastamentoParaParticipacao!)}
              </Typography>
            </StyledData>

            {values.afastamentoParaParticipacao && (
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Dias de afastamento
                </Typography>
                <Typography>{values.diasAfastamento} dias</Typography>
              </StyledData>
            )}

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Homepage do Evento
              </Typography>
              <Typography variant="body1">
                <Link
                  href={values.linkHomePageEvento}
                  target="_blank"
                  rel="noopener"
                >
                  {values.linkHomePageEvento}
                </Link>
              </Typography>
            </StyledData>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  País
                </Typography>
                <Typography>{values.pais}</Typography>
              </StyledData>

              <StyledData>
                <Typography variant="subtitle2" color="text.secondary">
                  Cidade
                </Typography>
                <Typography>{values.cidade}</Typography>
              </StyledData>
            </Box>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Modalidade
              </Typography>
              <Typography>
                {values.modalidadeParticipacao.charAt(0).toUpperCase() +
                  values.modalidadeParticipacao.slice(1)}
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Qualis
              </Typography>
              <Typography>{values.qualis}</Typography>
            </StyledData>
          </Section>
        </Box>
      </Stack>
    </Box>
  );
}
