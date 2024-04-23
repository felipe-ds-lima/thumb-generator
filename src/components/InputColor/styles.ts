import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;

  .line {
    width: 100%;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    input {
      flex: 1;
      padding: 1.2rem 1.6rem;
      border-radius: 0.8rem;
      border: 1px solid #ccc;
    }
    .demo {
      position: absolute;
      top: 50%;
      right: 8px;
      width: 32px;
      height: 32px;
      transform: translateY(-50%);
      border-radius: 8px;
      border: 1px solid #ccc;
      background-color: #000;
    }
  }
`
