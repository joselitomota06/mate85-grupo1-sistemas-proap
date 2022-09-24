import React from "react";

import { FinancingDataFormSchema } from "./SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import {
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Button,
  InputLabel,
} from "@mui/material";
import {
  StyledTextField,
  StyledDataInput,
} from "./SolicitationFormContainer.style";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<FinancingDataFormSchema>();

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      paddingTop={2}
      paddingBottom={2}
    >
      {/* Pergunta Seletor  */}
      <Grid item>
        <FormControl>
          <FormLabel required id="demo-row-radio-buttons-group-label">
            Solicitou apoio para esse artigo em um outro programa <br /> de pos
            graduação?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {/* Vaolor Solicitado */}
      <Grid item>
        <Field
          as={StyledTextField}
          label="Valor solicitado"
          name="valueSolicitantion"
          required
        />
      </Grid>
      {/* Input do arquivo */}
      <Grid item>
        <InputLabel required>
          Envie a carta de aceite do seu artigo (em PDF)
        </InputLabel>
        <StyledDataInput
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Adicionar Arquivo
          <input type="file" hidden />
        </StyledDataInput>
      </Grid>
      {/* Pergunta Seletor 2 + Inputs relacionados  */}
      <Grid item>
        <FormControl>
          <FormLabel required>
            Solicitou apoio para esse artigo de outras formas
            <br /> de financiamento?
          </FormLabel>
          <RadioGroup row>
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
          </RadioGroup>
        </FormControl>

        <Grid item container spacing={2}>
          <Grid item>
            <Field
              as={StyledTextField}
              label="Nome da agência de formento"
              name="valueSolicitantion"
              disabled
              required
            />
          </Grid>
          <Grid item>
            <Field
              as={TextField}
              label="Valor solicitado"
              name="valueSolicitantion"
              disabled
              required
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
