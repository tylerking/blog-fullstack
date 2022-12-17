import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
// Assets
import './assets/styles/App.css'
// Components
import NavBar from './components/NavBar'
// Views
import Account from './views/Account'
import AddArticle from './views/AddArticle'
import Article from './views/Article'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'

import apiService from './utils/apiService'
import { TokenProvider } from './context/tokenContext'
import { UserProvider } from './context/userContext'

import type { IUserDetails } from './App.d.js'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#008080',
    },
    secondary: {
      main: '#76C0C0',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#EBFFFF',
    },
  },
})

const App = () => {
  const getToken = localStorage.getItem('token')
  const [user, setUser] = useState<IUserDetails>({
    pk: 0,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  })
  
  useEffect(() => {
    apiService.GetUser(getToken)
      .then(data => {
        console.log(data)
        setUser(data)
      })
      .catch(error => console.log(error))
  }, [getToken])

  /*const clickMe = () => {
    alert('Hello World')
  }*/

  return (
    <TokenProvider value={getToken}>
      <UserProvider value={user}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar/>
          <Container maxWidth='md'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/article/:slug' element={<Article />} />
              <Route path='/add-article' element={<AddArticle />} />
              <Route path='/account' element={<Account />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
            </Routes>
          </Container>
        </ThemeProvider>
      </UserProvider>
    </TokenProvider>
  )
}

export default App
