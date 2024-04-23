import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  min-height: 56px;
  height: 56px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  margin-top: 16px;
  background-color: #555;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`
