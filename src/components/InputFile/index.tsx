import { useRef } from 'react'

import { Image } from '@phosphor-icons/react'

import { Container } from './styles'

interface IInputFileProps {
  label: string
  name: string
  type?: 'text' | 'number'
  placeholder?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const InputFile: React.FC<IInputFileProps> = ({
  label,
  name,
  placeholder,
  value,
  setValue,
  type = 'text',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileUpload() {
    if (!fileInputRef.current) return
    if (!fileInputRef.current.files?.length) return
    const file = fileInputRef.current.files[0]
    if (file) {
      setValue(URL.createObjectURL(file))
    }
  }

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
        <input
          ref={fileInputRef}
          type="file"
          name={`${name}_file`}
          onChange={handleFileUpload}
        />

        <button
          className="upload-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={24} />
        </button>
      </div>
    </Container>
  )
}
