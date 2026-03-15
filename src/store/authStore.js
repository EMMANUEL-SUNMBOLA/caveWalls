import { create } from 'zustand'

export const useAuthStore = create((set, get)=>({
  yourState : 'VALUE',
  yourAction : (val) => set( (state) => ({ yourState : state.yourState }) )
}))
