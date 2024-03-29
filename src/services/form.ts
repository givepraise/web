import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const formDataState = atom({
  key: 'formDataState',
  default: {
    name: '',
    email: '',
    owners: '',
    guild: '',
  },
  effects_UNSTABLE: [persistAtom],
})

export const guildOptionsState = atom({
  key: 'guildOptions',
  default: [],
  effects_UNSTABLE: [persistAtom],
})
