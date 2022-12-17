import { useContext, useEffect } from 'react'
import Articles from '../components/Articles'
import TokenContext from '../context/tokenContext'

const Dashboard = () => {
  const token = useContext(TokenContext)

  useEffect(() => {
    if (!token) {
      window.location.replace('/login')
    }
  }, [token])

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Your Articles</h2>
      <Articles isUser/>
    </>
  )
}

export default Dashboard
