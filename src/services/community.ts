import { atom } from 'recoil'

export const communityState = atom({
  key: 'communityState',
  default: {
    name: null,
    hostname: null,
  },
})
