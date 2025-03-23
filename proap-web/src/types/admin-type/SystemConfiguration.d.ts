export interface UrlMapper {
  id?: string;
  url: string;
  fieldName: string;
  urlTitle: string;
}

export interface SystemConfiguration {
  id: string;
  qualis: string[];
  sitePgcompURL: string | null;
  resolucaoProapURL: string | null;
  numMaxDiarias: number;
  valorDiariaBRL: number;
  textoAvisoQualis: string;
  textoAvisoValorInscricao: string;
  textoInformacaoQtdDiarias: string;
  textoAvisoEnvioArquivoCarta: string;
  textoInformacaoCalcularQualis: string;
  textoInformacaoValorDiaria: string;
  textoInformacaoValorPassagem: string;
  resourceLinks?: UrlMapper[];
}
