import { useContext, useEffect } from 'react'
import TokenContext from '../context/tokenContext'

const Account = () => {
  const token = useContext(TokenContext)

  useEffect(() => {
    if (!token) {
      window.location.replace('/login')
    }
  }, [token])

  return (
    <>
      <h1>Account</h1>
    </>
  )
}

export default Account
