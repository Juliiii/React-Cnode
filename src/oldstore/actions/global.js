export const SETTAB = 'SETTAB';
export const SETROUTERCHANGE = 'SETROUTERCHANGE';

export const setTab = (tab) => ({
  type: SETTAB,
  tab
});

export const setRouterChange = (change) => ({
  type: SETROUTERCHANGE,
  change
});
