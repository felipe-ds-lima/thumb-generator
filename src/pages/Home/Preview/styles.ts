import styled from 'styled-components'

export const Container = styled.section`
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 32px;

  .button-holder {
    position: absolute;
    padding: 32px;
    top: 0;
    right: 0;
    height: 120px;
    width: 200px;

    button {
      margin: 0;
    }
  }

  h2 {
    padding: 32px;
    position: absolute;
    top: 0;
    height: 120px;
    line-height: 56px;
  }

  .preview-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 56px;

    canvas {
      width: 100%;
      background-color: #000;
    }

    canvas#small-canvas {
      width: 250px;
      margin-top: 16px;
    }
  }
`
