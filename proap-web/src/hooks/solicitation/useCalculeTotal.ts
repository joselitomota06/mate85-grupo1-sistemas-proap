import { useFormikContext } from 'formik';
import { SolicitationFormValues } from '../../containers/solicitation/SolicitationFormSchema';
import { useEffect } from 'react';

const useCalculeTotal = () => {
  const { values, setFieldValue } = useFormikContext<SolicitationFormValues>();

  useEffect(() => {
    let fatorQuantidadeDiarias = values.quantidadeDiariasSolicitadas;
    if (values.quantidadeDiariasSolicitadas > 1) {
      fatorQuantidadeDiarias -= 0.5;
    }
    // if (values.quantidadeDiariasSolicitadas >= 4) {
    //   fatorQuantidadeDiarias -= 0.5;
    //   if (
    //     !values.solicitanteDocente &&
    //     values.quantidadeDiariasSolicitadas === 4
    //   ) {
    //     fatorQuantidadeDiarias = values.quantidadeDiariasSolicitadas;
    //   }
    // }

    const valorTotal = values.isDolar
      ? values.valorInscricao +
        values.valorDiaria * values.cotacaoMoeda * fatorQuantidadeDiarias +
        values.valorPassagem
      : values.valorInscricao +
        values.valorDiaria * fatorQuantidadeDiarias +
        values.valorPassagem;
    setFieldValue('valorTotal', Number(valorTotal));
  }, [
    values.valorInscricao,
    values.valorDiaria,
    values.valorPassagem,
    values.isDolar,
    values.cotacaoMoeda,
    values.quantidadeDiariasSolicitadas,
  ]);
};
export default useCalculeTotal;
