export interface IThumbOptions {
  title: {
    text: string
    fontFamily: string
    fontColor: string
    fontBorderColor: string
    fontSize: string
  }
  episode: {
    text: string
    fontFamily: string
    fontColor: string
    fontBorderColor: string
    fontSize: string
  }
  smallText: {
    text: string
    fontFamily: string
    fontColor: string
    fontBorderColor: string
    fontSize: string
    positionX: string
    positionY: string
  }
  bigText: {
    text: string
    fontFamily: string
    fontColor: string
    fontBorderColor: string
    fontSize: string
    positionX: string
    positionY: string
  }
  frame: {
    frameType: 'frame' | 'frame-noep'
    color: string
  }
  background: {
    url: string
  }
  backgroundShadow: {
    type: 'solid' | 'gradient'
    color: string
    color1: string
    color2: string
  }
}
