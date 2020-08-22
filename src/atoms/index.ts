import { atom } from 'recoil';

import { ThemeTypes } from '../types/Theme';

export const themeState = atom<ThemeTypes>({
  key: 'themeState',
  default: ThemeTypes.LIGHT,
});