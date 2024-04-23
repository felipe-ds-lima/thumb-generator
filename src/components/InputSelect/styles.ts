import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    width: 100%;
    padding: 1.2rem 1.6rem;
    border-radius: 0.8rem;
    border: 1px solid #ccc;
    margin-top: 8px;
  }
`

export const OptionList = styled.ul`
  list-style: none;
  z-index: 2;
  position: absolute;
  top: calc(100% + 8px);
  background-color: #555;
  width: 100%;
  height: fit-content;
  max-height: 30rem;
  border-radius: 8px;
  overflow: auto;
`

export const OptionItem = styled.li`
  display: flex;
  width: 100%;

  button {
    width: 100%;
    flex: 1;
    border: none;
    background: none;
    text-align: left;
    padding: 16px;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`
