import * as zus from 'zustand'
import { ApplicationSession, ExperimentSession, RelaySlot, Result } from '../../shared/types'
import { createSessionTimeout } from '../../shared/utils'

interface IExperimentSession {
  session      : ApplicationSession
  Store        : Map<RelaySlot, ExperimentSession>
  setSession: (session: ExperimentSession) => Result<null, "invalidOperation">
  deleteSession: (slot: RelaySlot) => void
}

export const useExperimentStore = zus.create<IExperimentSession>((set, get) => ({
  session: {
    currentuser: 'system',
    role       : 'system',
    isactive   : true
  },

  Store: new Map(),

  setSession: (session) => {
    if (get().Store.has(session.slot)) {
      return { Error: 'invalidOperation' }
    }
    set(state => {
      return {
        Store: state.Store.set(session.slot, {
          ...session,
          timeout: createSessionTimeout(
            session.duration,
            session.delay,
            session.cycles,
            () => state.deleteSession(session.slot)
          )
        })
      }
    })

    return { Ok: null }
  },

  deleteSession: (slot) => {
    let newMap = get().Store
    newMap.delete(slot)
    set({ Store: newMap })
  }

}))
