import { useContext, useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import apiService from '../utils/apiService'
import TokenContext from '../context/tokenContext'
import type { ILoginErrors } from '../App.d.js'

const Login = () => {
  const token = useContext(TokenContext)
  const USERNAME : string = (process.env.REACT_APP_USERNAME as string)
  const PASSWORD : string = (process.env.REACT_APP_PASSWORD as string)

  const [password, setPassword] = useState(PASSWORD)
  const [username, setUsername] = useState(USERNAME)
  const [error, setError] = useState<boolean>(false)
  const [errorData, setErrorData] = useState<ILoginErrors>({
    non_field_errors: '',
  })

  useEffect(() => {
    if (token) {
      window.location.replace('/dashboard')
    }
  }, [token])

  const login = () => {
    apiService.LoginUser(username, password)
      .then(data => {
        if(data.key) {
          localStorage.clear()
          localStorage.setItem('token', data.key)
          window.location.replace('/dashboard')
        } else {
          localStorage.clear()
          setUsername('')
          setPassword('')
          setError(true)
          setErrorData(data)
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>Login</h1>
      {error &&
        <Stack sx={{ width: '50%' }} spacing={1}>
          {errorData && <Alert severity="error">{errorData.non_field_errors}</Alert>}
        </Stack>
      }
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField 
          id='outlined-basic' 
          label='Username' 
          value= {username}
          variant='outlined'
          onChange={e => setUsername(e.target.value)}
        />
        <br/>
        <TextField 
          id='outlined-basic' 
          label='Password' 
          value= {password}
          variant='outlined'
          onChange={e => setPassword(e.target.value)}
        />
        <br/>
        <Button 
          onClick={login}
          variant='contained'
        >
          Login
        </Button>
      </Box>
    </>
  )
}

export default Login