import * as Yup from 'yup';

export const systemConfigSchema = Yup.object().shape({
  id: Yup.string().required('ID é obrigatório'),
  qualis: Yup.array().of(Yup.string().required()),
  sitePgcompURL: Yup.string().url('Insira uma URL válida').nullable(),
  resolucaoProapURL: Yup.string().url('Insira uma URL válida').nullable(),
  numMaxDiarias: Yup.number()
    .required('Número máximo de diárias é obrigatório')
    .min(0, 'Número máximo de diárias deve ser pelo menos 0')
    .integer('Número máximo de diárias deve ser um número inteiro'),
  valorDiariaBRL: Yup.number()
    .required('Valor da diária é obrigatório')
    .min(0, 'Valor da diária deve ser maior que 0'),
  textoAvisoQualis: Yup.string().required(
    'Texto de aviso Qualis é obrigatório',
  ),
  textoAvisoValorInscricao: Yup.string().required(
    'Texto de aviso sobre valor de inscrição é obrigatório',
  ),
  textoInformacaoQtdDiarias: Yup.string().required(
    'Texto com informações sobre quantidade de diárias é obrigatório',
  ),
  textoAvisoEnvioArquivoCarta: Yup.string().required(
    'Texto de aviso sobre envio de arquivo de carta é obrigatório',
  ),
  textoInformacaoCalcularQualis: Yup.string().required(
    'Texto com informações sobre como calcular Qualis é obrigatório',
  ),
  textoInformacaoValorDiaria: Yup.string().required(
    'Texto com informações sobre valor da diária é obrigatório',
  ),
  textoInformacaoValorPassagem: Yup.string().required(
    'Texto com informações sobre valor da passagem é obrigatório',
  ),
  resourceLinks: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().url('URL inválida').required('URL é obrigatória'),
      urlTitle: Yup.string().required('Título do link é obrigatório'),
      fieldName: Yup.string().required('Nome do campo é obrigatório'),
    }),
  ),
});
