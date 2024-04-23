import { validColor } from '../../services/utils/validColor'
import { Container } from './styles'

interface IInputColorProps {
  label: string
  name: string
  type?: 'text' | 'number'
  placeholder?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const InputColor: React.FC<IInputColorProps> = ({
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
      <div className="line">
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
        <div
          className="demo"
          style={{ backgroundColor: validColor(value) }}
        ></div>
      </div>
    </Container>
  )
}
