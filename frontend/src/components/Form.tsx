import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const Form = () => {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState<string>('Submit')

  const clearForm = () => {
    setName('')
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Submitting')
    clearForm()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id='name'
          label='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <Button type='submit' variant='contained'>{status}</Button>
      </form>
    </>
  )
}

export default Form


