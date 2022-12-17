import { useContext, useEffect } from 'react'
import apiService from '../utils/apiService'
import TokenContext from '../context/tokenContext'

const Logout = () => {
  const token = useContext(TokenContext)

  useEffect(() => {
    if (!token) {
      window.location.replace('/login')
    }
  }, [token])

  const handleLogout = () => {
    apiService.LogoutUser(token)
      .then(data => {
        console.log(data)
        localStorage.clear()
        window.location.replace('/login')
      })
  }

  return (
    <>
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <input type='button' value='Logout' onClick={handleLogout} />
    </>
  )
}

export default Logout