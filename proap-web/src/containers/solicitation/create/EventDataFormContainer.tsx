import React from "react";

import { SolicitationFormValues } from "../SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import {
  Grid,
  TextField,
  FormLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Tooltip,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorIcon from "@mui/icons-material/Error";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StyledTextField } from "../SolicitationFormContainer.style";

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>();

  return (
    <Grid container paddingTop={2} paddingBottom={2}>
      <Grid container item md={6} xs={12}>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Field
              as={TextField}
              label="Data de início"
              name="dataInicio"
              error={Boolean(touched.dataInicio && errors.dataInicio)}
              helperText={touched.dataInicio && errors.dataInicio}
              type="date"
              required
            />
          </Grid>
          <Grid item>
            <Field
              as={TextField}
              label="Data de termino"
              name="dataFim"
              error={Boolean(touched.dataFim && errors.dataFim)}
              helperText={touched.dataFim && errors.dataFim}
              type="date"
              required
            />
          </Grid>
        </Grid>

        <Grid container item direction="column">
          <Field
            as={StyledTextField}
            label="Link de incrição do evento"
            name="linkHomepage"
            error={Boolean(touched.linkHomepage && errors.linkHomepage)}
            helperText={touched.linkHomepage && errors.linkHomepage}
            required
            multiline
          />

          <Field
            as={StyledTextField}
            label="Cidade"
            name="cidade"
            error={Boolean(touched.cidade && errors.cidade)}
            helperText={touched.cidade && errors.cidade}
            required
          />
          <Field
            as={StyledTextField}
            label="País"
            name="pais"
            error={Boolean(touched.pais && errors.pais)}
            helperText={touched.pais && errors.pais}
            required
          />
          <Grid>
            <Field
              as={StyledTextField}
              label="Valor da inscrição/publicação  "
              name="valorInscricao"
              type="number"
              error={Boolean(touched.valorInscricao && errors.valorInscricao)}
              helperText={touched.valorInscricao && errors.valorInscricao}
            />

            <Tooltip title="Valor apenas de inscrição, não inclui possíveis afiliações">
              <ErrorIcon
                fontSize="small"
                style={{ marginTop: "0.3rem", color: "#184a7f" }}
              />
            </Tooltip>
          </Grid>

          <Field
            as={StyledTextField}
            label="Carta de aceite"
            name="cartaAceite"
            error={Boolean(touched.cartaAceite && errors.cartaAceite)}
            helperText={touched.cartaAceite && errors.cartaAceite}
            required
          />
        </Grid>
        <FormControl error={Boolean(touched.qualis && errors.qualis)}>
          <FormLabel style={{ fontSize: ".8rem" }} required>
            Informe o Qualis do seu evento
          </FormLabel>
          <Field
            as={Select}
            sx={{ maxWidth: 80 }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            name="qualis"
            defaultValue=""
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="A1">A1</MenuItem>
            <MenuItem value="A2">A2</MenuItem>
            <MenuItem value="A3">A3</MenuItem>
            <MenuItem value="A4">A4</MenuItem>
            <MenuItem value="B1">B1</MenuItem>
            <MenuItem value="B2">B2</MenuItem>
            <MenuItem value="B3">B3</MenuItem>
            <MenuItem value="B4">B4</MenuItem>
            <MenuItem value="outro">Outro</MenuItem>
          </Field>
          {touched.qualis && errors.qualis && (
            <FormHelperText>{errors.qualis}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
