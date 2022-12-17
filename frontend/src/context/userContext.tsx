import { createContext } from 'react'
import type { IUserDetails } from '../App.d.js'

const UserContext = createContext<IUserDetails | undefined>(undefined)

//const UserContext2 = createContext<string | null>(null)

export const UserProvider = UserContext.Provider
export default UserContext
