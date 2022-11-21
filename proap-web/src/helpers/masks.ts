export const maskCpf = (cpf: string) =>
  cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const maskPhone = (phone: string) => {
  if(phone.length == 10)
    return phone.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  return phone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
