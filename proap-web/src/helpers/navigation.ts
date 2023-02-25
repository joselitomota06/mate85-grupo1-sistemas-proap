export const getInitialsOfUser = (name: string) => {
  const firstLetter = name.at(0) || '';
  const nameTokens = name.split(' ');
  if (nameTokens.length == 1) return firstLetter.toUpperCase();

  const secondLetter = nameTokens[1].at(0);
  return `${firstLetter}${secondLetter}`.toUpperCase();
};
