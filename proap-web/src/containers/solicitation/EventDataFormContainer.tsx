import React from "react";

import { EventDataFormSchema } from "./SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Link,
  Select,
} from "@mui/material";
import {
  StyledTextField,
  StyledDataInput,
} from "./SolicitationFormContainer.style";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LaunchIcon from "@mui/icons-material/Launch";

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<EventDataFormSchema>();

  return (
    <Grid container paddingTop={2} paddingBottom={2}>
      {/* Primeira Coluna */}
      <Grid container item md={6} xs={12}>
        {/* Datas */}
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Field
              as={TextField}
              label="Data de início"
              name="initialdate"
              required
            />
          </Grid>
          <Grid item>
            <Field
              as={TextField}
              label="Data de termino"
              name="finishingdate"
              required
            />
          </Grid>
        </Grid>

        {/* Coluna de Inputs - Link, País, Cidade, Valor */}
        <Grid container item direction="column">
          <Field
            as={StyledTextField}
            label="Link homepage"
            name="homepagelink"
            required
          />

          <Field as={StyledTextField} label="País" name="country" required />

          <Field as={StyledTextField} label="Cidade" name="city" required />

          <Field
            as={StyledTextField}
            label="Valor da inscrição/publicação"
            name="subscriptionvalue"
            required
          />

          <InputLabel style={{ marginTop: "1rem" }} required>
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
      </Grid>

      {/* Segunda Coluna - Informe o Qualis */}
      <Grid container item md={6} xs={12}>
        <FormControl>
          <FormLabel required>Informe o Qualis do seu evento</FormLabel>
          <RadioGroup row>
            <FormControlLabel value="A1" control={<Radio />} label="A1" />
            <FormControlLabel value="A2" control={<Radio />} label="A2" />
            <FormControlLabel value="A3" control={<Radio />} label="A3" />
            <FormControlLabel value="A4" control={<Radio />} label="A4" />
          </RadioGroup>
          <RadioGroup row>
            <FormControlLabel value="B1" control={<Radio />} label="B1" />
            <FormControlLabel value="B2" control={<Radio />} label="B2" />
            <FormControlLabel value="B3" control={<Radio />} label="B3" />
            <FormControlLabel value="B4" control={<Radio />} label="B4" />
            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
          </RadioGroup>
          <Link style={{ color: "royalblue" }} href="#" underline="none">
            {`Visualiza Qualis atualizado`}
          </Link>
        </FormControl>
      </Grid>
    </Grid>
  );
}
