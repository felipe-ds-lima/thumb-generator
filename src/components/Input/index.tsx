import { Container } from './styles'

interface IInputProps {
  label: string
  name: string
  type?: 'text' | 'number'
  placeholder?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<IInputProps> = ({
  label,
  name,
  placeholder,
  value,
  setValue,
  type = 'text',
}) => {
  return (
    <Container>
      <p>
        <strong>{label}</strong>
      </p>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </Container>
  )
}
