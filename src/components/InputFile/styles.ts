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
      width: 100%;
      padding: 1.2rem 1.6rem;
      border-radius: 0.8rem;
      border: 1px solid #ccc;
      margin-top: 8px;

      &[type='file'] {
        display: none;
      }
    }

    .upload-button {
      position: absolute;
      bottom: 4px;
      right: 4px;
      height: 38px;
      width: 38px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: none;
      border-radius: 8px;
    }
  }
`
