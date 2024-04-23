import { Container } from './styles'

interface IOwnProps {
  type?: 'button' | 'submit' | 'reset'
}

type IButtonProps = IOwnProps & React.HTMLProps<HTMLButtonElement>

export const Button: React.FC<IButtonProps> = ({
  children,
  type = 'button',
  ...props
}) => {
  return (
    <Container type={type} {...props}>
      {children}
    </Container>
  )
}
