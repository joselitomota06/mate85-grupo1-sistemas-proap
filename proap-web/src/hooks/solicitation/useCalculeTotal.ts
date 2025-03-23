import { useFormikContext } from 'formik';
import { SolicitationFormValues } from '../../containers/solicitation/SolicitationFormSchema';
import { useEffect } from 'react';

const useCalculeTotal = () => {
  const { values, setFieldValue } = useFormikContext<SolicitationFormValues>();

  useEffect(() => {
    let fatorQuantidadeDiarias = values.quantidadeDiariasSolicitadas;
    if (
      values.quantidadeDiariasSolicitadas > 1 &&
      !values.ultimaDiariaIntegral
    ) {
      fatorQuantidadeDiarias -= 0.5;
    }
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
    values.ultimaDiariaIntegral,
  ]);
};
export default useCalculeTotal;
