import { useFormikContext } from 'formik';
import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import { Box } from '@mui/material';
import SolicitationDetailsContainer from './SolicitationDetailsContainer';
import AcceptanceFormContainer from './AcceptanceFormContainer';

export default function ConfirmationFormContainer() {
  const { values } = useFormikContext<InitialSolicitationFormValues>();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        gap: 2,
      }}
    >
      <SolicitationDetailsContainer solicitation={values} />
      <AcceptanceFormContainer />
    </Box>
  );
}
