import { Dialog, DialogContent } from '@mui/material';
import SolicitationViewContainer from '../../solicitation/view/SolicitationViewContainer';
import { SolicitationFormValues } from '../../solicitation/SolicitationFormSchema';

interface SolicitationViewDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function SolicitationViewDialog(
  props: SolicitationViewDialogProps,
) {
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <SolicitationViewContainer id={props.id} />
      </DialogContent>
    </Dialog>
  );
}
