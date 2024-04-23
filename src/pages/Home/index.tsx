import { useState } from 'react'

import { type IThumbOptions } from '../../types/IThumbOptions'
import { Options } from './Options'
import { Preview } from './Preview'
import { Container } from './styles'

const defaultOptions: IThumbOptions = {
  title: {
    text: '',
    fontColor: '#ffff00',
    fontBorderColor: '#000000',
    fontFamily: 'edo',
    fontSize: '150',
  },
  episode: {
    text: '00',
    fontColor: '#ffff00',
    fontBorderColor: '#000000',
    fontFamily: 'impact',
    fontSize: '150',
  },
  frame: { frameType: 'frame', color: '#ff0000' },
  background: { url: '/assets/images/defaults/factorio.jpg' },
  backgroundShadow: {
    type: 'solid',
    color: 'rgba(0,0,0,0.5)',
    color1: 'rgba(0,0,0,0.5)',
    color2: 'rgba(0,0,0,0.5)',
  },
  smallText: {
    text: '',
    positionX: '100',
    positionY: '120',
    fontBorderColor: '#000000',
    fontColor: '#ffffff',
    fontFamily: 'impact',
    fontSize: '50',
  },
  bigText: {
    text: '',
    positionX: '100',
    positionY: '210',
    fontBorderColor: '#000000',
    fontColor: '#ffffff',
    fontFamily: 'impact',
    fontSize: '100',
  },
}

export const Home: React.FC = () => {
  const [thumbOptions, setThumbOptions] =
    useState<IThumbOptions>(defaultOptions)

  return (
    <Container>
      <Preview options={thumbOptions} />
      <Options onChange={setThumbOptions} />
    </Container>
  )
}
