import { useState } from 'react'

import { Container, OptionItem, OptionList } from './styles'

interface IOption {
  value: string
  label: string
}

interface IInputProps {
  label: string
  name: string
  placeholder?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  options?: IOption[]
}

export const InputSelect: React.FC<IInputProps> = ({
  label,
  name,
  placeholder,
  value,
  setValue,
  options = [],
}) => {
  const [isFocused, setIsFocused] = useState(false)

  function handleBlur() {
    setTimeout(() => {
      setIsFocused(false)
    }, 50)
  }

  return (
    <Container>
      <p>
        <strong>{label}</strong>
      </p>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={handleBlur}
      />
      {isFocused && (
        <OptionList>
          {options.map((option) => (
            <OptionItem key={option.value}>
              <button
                type="button"
                onMouseDown={() => {
                  setValue(option.value)
                }}
              >
                {option.label}
              </button>
            </OptionItem>
          ))}
        </OptionList>
      )}
    </Container>
  )
}
