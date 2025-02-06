import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

export interface SolicitationDetailsDialogProps {
  nomeSolicitante: string;
  solicitanteDocente: boolean;
  valorTotal: number;
  variacaoCambial: number;
  valorDiarias: number;
  nomeEvento: string;
  tituloPublicacao: string;
  isDolar: boolean;
  qualisEvento: string;
  cidade: string;
  pais: string;
  dataInicio: string;
  dataFim: string;
  situacao: number;
  observacoes: string;
}

export default function SolicitationDetailsDialog({
  open,
  onClose,
  solicitationData,
}: {
  open: boolean;
  onClose: () => void;
  solicitationData: SolicitationDetailsDialogProps;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Texto de resumo da Solicitação</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          O {solicitationData.solicitanteDocente ? 'docente' : 'discente'}{' '}
          <b>{solicitationData.nomeSolicitante}</b> solicita apoio no valor
          total de <b>R${solicitationData.valorTotal}</b> e diárias de{' '}
          <b>
            {solicitationData.isDolar
              ? '$' + solicitationData.valorDiarias
              : 'R$' + solicitationData.valorDiarias}
          </b>{' '}
          {solicitationData.isDolar && (
            <>
              com variação cambial atual informada de{' '}
              <b>R${solicitationData.variacaoCambial}</b>{' '}
            </>
          )}{' '}
          para apresentação do trabalho{' '}
          <b>{solicitationData.tituloPublicacao}</b> no evento{' '}
          <b>{solicitationData.nomeEvento}</b>, Qualis{' '}
          <b>{solicitationData.qualisEvento}</b>, a ser realizado em{' '}
          <b>{solicitationData.cidade}</b>-<b>{solicitationData.pais}</b>, no
          período de <b>{solicitationData.dataInicio}</b> a{' '}
          <b>{solicitationData.dataFim}</b>.
          <br />
          <br />
          <b>Avaliação</b>
          <br />
          {solicitationData.situacao !== 0 ? (
            <>
              Após verificação da documentação enviada, a comissão PROAP entende
              que a solicitação {solicitationData.situacao !== 1 && 'não'} está
              de acordo com a resolução vigente e recomenda sua{' '}
              {solicitationData.situacao === 1 ? 'aprovação' : 'reprovação'}.
            </>
          ) : (
            <>A solicitação ainda não foi avaliada.</>
          )}
          {solicitationData.observacoes?.length > 0 && (
            <>
              {' '}
              <br /> <br />
              <b>Observações do Avaliador</b>
              <br />
              {solicitationData.observacoes}
            </>
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
