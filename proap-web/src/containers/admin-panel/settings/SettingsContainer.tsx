import { AttachMoney, Computer, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

import { BudgetFormValues } from '../BudgetFormSchema';
import { useSysConfig } from '../../../hooks/admin/useSysConfig';
import { SystemConfiguration } from '../../../types';
import SystemConfigFormContainer from './SystemConfigFormContainer';
import BudgetSettingsContainer from './BudgetSettingsContainer';
import SectionHeader from '../../../components/custom/SectionHeader';

interface SettingContainerProps {
  handleBudgetSubmit: (values: BudgetFormValues) => Promise<void>;
  loading: boolean;
}

export default function SettingContainer({
  handleBudgetSubmit,
  loading,
}: SettingContainerProps) {
  const { config, isLoading, error, saveConfig } = useSysConfig();

  const handleSystemConfigSubmit = async (values: SystemConfiguration) => {
    await saveConfig(values);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SectionHeader
            icon={<AttachMoney color="primary" />}
            title="Definir Orçamento Anual"
          />
        </AccordionSummary>
        <AccordionDetails>
          <BudgetSettingsContainer
            handleBudgetSubmit={handleBudgetSubmit}
            loading={loading}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SectionHeader
            icon={<Computer color="primary" />}
            title="Configurações do Sistema"
          />
        </AccordionSummary>
        <AccordionDetails>
          {error && <Typography color="error">{error}</Typography>}
          {isLoading && !error ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <Typography variant="h4" fontWeight="bold">
                Carregando...
              </Typography>
            </Box>
          ) : (
            <SystemConfigFormContainer
              initialValues={config}
              onSubmit={handleSystemConfigSubmit}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
