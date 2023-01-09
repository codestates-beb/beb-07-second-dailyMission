import { atom } from 'recoil';

export const status = atom({
  key: 'signStatus',
  default: {
    userId: 'unknown',
    isSigned: false,
  },
});
