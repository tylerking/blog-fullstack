import { createContext} from 'react'

const TokenContext = createContext<string | null>(null)

export const TokenProvider = TokenContext.Provider
export default TokenContext