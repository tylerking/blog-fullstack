import { useContext, useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import apiService from '../utils/apiService'
import TokenContext from '../context/tokenContext'

const AddArticle = () => {
  const token = useContext(TokenContext)
  const [error, setError] = useState('')
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  
  useEffect(() => {
    if (!token) {
      window.location.replace('/login')
    }
  }, [token])

  const addArticle = () => {
    if(!title || !desc) {
      setError('Please add a title & description')
      return
    }

    apiService.CreateArticle({ title, desc }, token)
      .then(data => {
        console.log(data)
        window.location.replace('/dashboard')
      })
  }

  return (
    <>
      <h1>Add Article</h1>
      {error ? 
        <Alert severity="error">{error}</Alert>
        : null
      }
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          label="Title"
          value = {title}
          variant="outlined"
          onChange = {e => setTitle(e.target.value)}
        />
        <br/>
        <TextField 
          label="Description"
          multiline
          rows={4}
          value = {desc}
          variant="outlined"
          onChange = {e => setDesc(e.target.value)}
        />
        <br/>
        <Button onClick ={addArticle} variant="contained">Add Article</Button>
      </Box>
    </>
  )
}

export default AddArticle
