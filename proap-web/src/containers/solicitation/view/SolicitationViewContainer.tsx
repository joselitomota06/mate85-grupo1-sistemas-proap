import type React from 'react';
import {
  Box,
  Paper,
  Typography,
  Link,
  LinearProgress,
  Container,
  Fade,
  Stack,
} from '@mui/material';
import { BASE_PDF_URL } from '../../../helpers/api';
import useSolicitation from '../../../hooks/solicitation/useSolicitation';
import { booleanToYesOrNo, dateToLocalDate } from '../../../helpers/conversion';

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1">{value || '-'}</Typography>
  </Box>
);

const SectionPaper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <Typography
      variant="h6"
      sx={{
        mb: 3,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

export default function SolicitationViewContainer({ id }: { id: string }) {
  const { solicitation, isLoading, hasError } = useSolicitation(id);

  if (isLoading) return <LinearProgress />;
  if (hasError) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        paddingTop={4}
        marginBottom={4}
      >
        Consulta da Solicitação
      </Typography>

      <Fade in timeout={900}>
        <Box sx={{ mb: 3 }}>
          {' '}
          {/* Added margin top */}
          <SectionPaper title="Status da Avaliação">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <InfoItem
                  label="Situação"
                  value={
                    solicitation.situacao === 1
                      ? 'Aprovado'
                      : solicitation.situacao === 2
                        ? 'Reprovado'
                        : 'Pendente'
                  }
                />
                {solicitation.situacao === 1 && (
                  <>
                    <InfoItem
                      label="Data de Aprovação"
                      value={dateToLocalDate(solicitation.dataAprovacao)}
                    />
                    <InfoItem
                      label="Valor Total Aprovado"
                      value={`R$${solicitation.valorAprovado}`}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                {solicitation.situacao === 1 && (
                  <>
                    <InfoItem
                      label="Número da ATA"
                      value={solicitation.numeroAta}
                    />
                    <InfoItem
                      label="Diárias Aprovadas"
                      value={solicitation.numeroDiariasAprovadas}
                    />
                  </>
                )}
                {solicitation.observacao && (
                  <InfoItem
                    label="Observação"
                    value={solicitation.observacao}
                  />
                )}
              </Box>
            </Stack>
          </SectionPaper>
        </Box>
      </Fade>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <Fade in timeout={500}>
          <Box sx={{ width: { xs: '100%', lg: '25%' } }}>
            <SectionPaper title="Detalhes do Solicitante">
              <InfoItem
                label="Quem abriu a solicitação"
                value={solicitation.user.name}
              />
              <InfoItem
                label="Email do Solicitante"
                value={solicitation.user.email}
              />
              <InfoItem
                label="Telefone de Contato"
                value={solicitation.user.phone}
              />
              <InfoItem
                label="Solicitação em nome do"
                value={solicitation.solicitanteDocente ? 'Docente' : 'Discente'}
              />
              <InfoItem
                label="Nome do Discente PGCOMP"
                value={solicitation.nomeDiscente}
              />
              <InfoItem
                label="Nome do Docente PGCOMP"
                value={solicitation.nomeDocente}
              />
              {!solicitation.solicitanteDocente && (
                <InfoItem
                  label="Está no prazo regular do curso?"
                  value={booleanToYesOrNo(solicitation.discenteNoPrazoDoCurso!)}
                />
              )}
              {!solicitation.solicitanteDocente &&
                !solicitation.discenteNoPrazoDoCurso && (
                  <InfoItem
                    label="Quantidade de meses de atraso do curso"
                    value={solicitation.mesesAtrasoCurso}
                  />
                )}
            </SectionPaper>
          </Box>
        </Fade>

        <Fade in timeout={600}>
          <Box sx={{ width: { xs: '100%', lg: '25%' } }}>
            <SectionPaper title="Dados da Solicitação">
              <InfoItem
                label="Título da Publicação"
                value={solicitation.tituloPublicacao}
              />
              <InfoItem
                label="Coautores"
                value={
                  solicitation.coautores.length > 0
                    ? solicitation.coautores.join(', ')
                    : 'Nenhum coautor informado'
                }
              />
              <InfoItem
                label="Há coautores PGCOMP?"
                value={booleanToYesOrNo(
                  solicitation.algumCoautorPGCOMP ?? false,
                )}
              />
              <InfoItem
                label="Arquivo da Carta de Aceite"
                value={
                  solicitation.cartaAceite ? (
                    <Link
                      href={`${BASE_PDF_URL}${solicitation.cartaAceite}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Visualizar
                    </Link>
                  ) : (
                    'Nenhum arquivo enviado'
                  )
                }
              />
            </SectionPaper>
          </Box>
        </Fade>

        <Fade in timeout={700}>
          <Box sx={{ width: { xs: '100%', lg: '25%' } }}>
            <SectionPaper title="Detalhamento do Evento">
              <InfoItem
                label="Nome do Evento"
                value={solicitation.nomeEvento}
              />
              <InfoItem
                label="Natureza"
                value={
                  solicitation.eventoInternacional
                    ? 'Internacional'
                    : 'Nacional'
                }
              />
              <InfoItem
                label="Data de Início"
                value={dateToLocalDate(solicitation.dataInicio)}
              />
              <InfoItem
                label="Data de Término"
                value={dateToLocalDate(solicitation.dataFim)}
              />
              <InfoItem
                label="Modalidade de Participação"
                value={solicitation.modalidadeParticipacao}
              />
              <InfoItem
                label="Afastamento para participação no evento"
                value={booleanToYesOrNo(
                  solicitation.afastamentoParaParticipacao!,
                )}
              />
              {solicitation.afastamentoParaParticipacao && (
                <InfoItem
                  label="Dias de afastamento"
                  value={solicitation.diasAfastamento}
                />
              )}
              <InfoItem
                label="Link da Homepage do Evento"
                value={solicitation.linkHomePageEvento}
              />
              <InfoItem label="País" value={solicitation.pais} />
              <InfoItem label="Cidade" value={solicitation.cidade} />
              <InfoItem label="Qualis" value={solicitation.qualis} />
            </SectionPaper>
          </Box>
        </Fade>

        <Fade in timeout={800}>
          <Box sx={{ width: { xs: '100%', lg: '25%' } }}>
            <SectionPaper title="Detalhamento Financeiro">
              <InfoItem
                label="Valor da Inscrição"
                value={`R$${solicitation.valorInscricao}`}
              />
              <InfoItem
                label="Link da Página de Inscrição"
                value={solicitation.linkPaginaInscricao}
              />
              {solicitation.quantidadeDiariasSolicitadas > 0 && (
                <InfoItem
                  label="Número de Diárias"
                  value={solicitation.quantidadeDiariasSolicitadas}
                />
              )}
              {solicitation.quantidadeDiariasSolicitadas > 0 && (
                <InfoItem
                  label="Valor da Diária"
                  value={`${solicitation.isDolar ? '$' : 'R$'}${solicitation.valorDiaria}`}
                />
              )}
              {solicitation.quantidadeDiariasSolicitadas > 0 &&
                solicitation.isDolar && (
                  <InfoItem
                    label="Cotação do Dólar"
                    value={`$${solicitation.cotacaoMoeda}`}
                  />
                )}

              {solicitation.solicitanteDocente && (
                <InfoItem
                  label="Valor da Passagem Aérea"
                  value={`R$${solicitation.valorPassagem}`}
                />
              )}
              <InfoItem
                label="Valor Total"
                value={`R$${solicitation.valorTotal}`}
              />
              {/* TODO: Adding remaining fields */}
            </SectionPaper>
          </Box>
        </Fade>
      </Stack>
    </Container>
  );
}
