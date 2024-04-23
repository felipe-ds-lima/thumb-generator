import { useState } from 'react'

import { CaretDown, CaretUp } from '@phosphor-icons/react'

import { Container, Content } from './styles'

interface IExpandContainerProps {
  children: React.ReactNode
}

export const ExpandContainer: React.FC<IExpandContainerProps> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <Container>
      <Content $isActive={isActive}>{children}</Content>
      <button
        className="expand-button"
        type="button"
        onClick={() => {
          setIsActive(!isActive)
        }}
      >
        <span className="line"></span>
        {!isActive && <CaretDown size={32} />}
        {isActive && <CaretUp size={32} />}
        <span className="line"></span>
      </button>
    </Container>
  )
}
