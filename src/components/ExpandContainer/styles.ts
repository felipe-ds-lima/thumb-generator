import styled from 'styled-components'

interface IContent {
  $isActive: boolean
}

export const Container = styled.section`
  width: 100%;
  padding: 4px 16px;
  background-color: #222;
  margin-top: 16px;
  border-radius: 8px;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;

    .line {
      flex: 1;
      margin: 0 8px;
      display: block;
      height: 1px;
      background: #fff;
    }
  }
`

export const Content = styled.section<IContent>`
  padding-bottom: ${(props) => (props.$isActive ? '8px' : 0)};
  height: ${(props) => (props.$isActive ? 'unset' : 0)};
  overflow: ${(props) => (props.$isActive ? 'unset' : 'hidden')};
`
