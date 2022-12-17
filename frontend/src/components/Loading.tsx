import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

const Loading = () => {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  )
}

export default Loading