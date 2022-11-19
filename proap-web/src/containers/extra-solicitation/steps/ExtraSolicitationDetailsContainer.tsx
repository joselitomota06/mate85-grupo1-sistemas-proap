import { useFormikContext } from "formik";
import React from "react";
import ExtraSolicitationDetailsContainer from "../ExtraSolicitationDetailsContainer";
import { ExtraSolicitation } from "../schema";

export default function ExtraSolicitationDetailsFormContainer() {
  const { values } = useFormikContext<ExtraSolicitation>();
  console.log(values);
  
  return <ExtraSolicitationDetailsContainer solicitation={values} />;
}
