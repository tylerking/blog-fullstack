import { useContext, useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import apiService from '../utils/apiService'
import TokenContext from '../context/tokenContext'

import type { IRegisterErrors } from '../App.d.js'

const Register = () => {
  const token = useContext(TokenContext)
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password1, setPassword1] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorData, setErrorData] = useState<IRegisterErrors>({
    email: '',
    username: '',
    password1: '',
    password2: ''
  })

  useEffect(() => {
    if (token) {
      window.location.replace('/dashboard')
    }
  }, [token])
  
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    apiService.RegisterUser({ username, email, password1, password2 })
      .then(data => {
        if (data.key) {
          localStorage.clear()
          localStorage.setItem('token', data.key)
          window.location.replace('/login')
        } else {
          localStorage.clear()
          setError(true)
          setErrorData(data)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>Register</h1>
      {error &&
        <Stack sx={{ width: '50%' }} spacing={1}>
          {errorData.email && <Alert severity="error">{errorData.email}</Alert>}
          {errorData.username && <Alert severity="error">{errorData.username}</Alert>}
        </Stack>
      }
      <form onSubmit={onSubmit}>
        <label htmlFor='username'>Email</label> <br />
        <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='username'>Username</label> <br />
        <input
          name='username'
          type='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password1'>Password:</label> <br />
        <input
          name='password1'
          type='password'
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password2'>Confirm password:</label> <br />
        <input
          name='password2'
          type='password'
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />{' '}
        <br />
        <input type='submit' value='Register' />
      </form>
    </>
  )
}

export default Register
