import React from "react";

import ExtraSolicitationFormContainer from "../../containers/extra-solicitation/ExtraSolicitationFormContainer";
import { EXTRA_SOLICITATION_INITIAL_VALUES } from "../../containers/extra-solicitation/schema";

export default function ExtraSolicitationPage() {
  const handleSubmit = () => {
    console.log("SUBMIT");
  };

  return (
    <ExtraSolicitationFormContainer
      title="Criar solicitação extra"
      onSubmit={handleSubmit}
      initialValues={EXTRA_SOLICITATION_INITIAL_VALUES}
    />
  );
}
