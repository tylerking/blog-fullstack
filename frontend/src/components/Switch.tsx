import Button from '@mui/material/Button'

interface FirstProps {
  clickedSwitch: React.MouseEventHandler<HTMLButtonElement>
}

const Switch = ({clickedSwitch}: FirstProps) => {
  return (
    <>
      <Button variant='contained' onClick = {clickedSwitch}>Click Me</Button>
    </>
  )
}

export default Switch