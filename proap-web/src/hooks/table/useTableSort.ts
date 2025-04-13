import { useState } from 'react';
import { AssistanceRequestPropToSort } from '../../services/assistanceRequestService';

/**
 * Custom hook for handling table sorting
 * @param defaultSortBy The default property to sort by
 * @param defaultAscending Whether the default sort is ascending
 * @returns Object containing sort state and functions
 */
export const useTableSort = (
  defaultSortBy: AssistanceRequestPropToSort,
  defaultAscending: boolean,
) => {
  const [selectedPropToSortTable, setSelectedPropToSortTable] = useState<{
    [Property in AssistanceRequestPropToSort]?: boolean;
  }>({
    [defaultSortBy]: defaultAscending,
  });

  const getSelectedProp = (): AssistanceRequestPropToSort => {
    return Object.keys(
      selectedPropToSortTable,
    )[0] as AssistanceRequestPropToSort;
  };

  const handleClickSortTable = (sortBy: AssistanceRequestPropToSort) => {
    if (selectedPropToSortTable[sortBy]) {
      setSelectedPropToSortTable({
        [sortBy]: false,
      });
    } else {
      setSelectedPropToSortTable({
        [sortBy]: true,
      });
    }
  };

  return {
    selectedPropToSortTable,
    getSelectedProp,
    handleClickSortTable,
  };
};

export default useTableSort;
