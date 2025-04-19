import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SolicitationTableRequests from './SolicitationTableRequests';
import SolicitationTableExtraRequests from './SolicitationTableExtraRequests';
import { useState } from 'react';

export default function SolicitationTable() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
        <Tab label="Apoio a Publicação Científica" />
        <Tab label="Demanda Extra" />
      </Tabs>

      {currentTab == 0 && <SolicitationTableRequests />}
      {currentTab == 1 && <SolicitationTableExtraRequests />}
    </>
  );
}
