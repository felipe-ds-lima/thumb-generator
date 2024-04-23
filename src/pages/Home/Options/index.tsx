import { useEffect, useState } from 'react'

import { ExpandContainer } from '../../../components/ExpandContainer'
import { Input } from '../../../components/Input'
import { InputColor } from '../../../components/InputColor'
import { InputFile } from '../../../components/InputFile'
import { InputSelect } from '../../../components/InputSelect'
import { Select } from '../../../components/Select'
import { validColor } from '../../../services/utils/validColor'
import { type IThumbOptions } from '../../../types/IThumbOptions'
import { Container } from './styles'

interface IOptionsProps {
  onChange: React.Dispatch<React.SetStateAction<IThumbOptions>>
}

export const Options: React.FC<IOptionsProps> = ({ onChange }) => {
  const [defaults, setDefaults] = useState<IThumbOptions[]>([])
  // Title
  const [title, setTitle] = useState('')
  const [titleFontFamily, setTitleFontFamily] = useState('edo')
  const [titleColor, setTitleColor] = useState('#ffff00')
  const [titleBorderColor, setTitleBorderColor] = useState('#000000')
  const [titleSize, setTitleSize] = useState('150')
  // Episode
  const [episode, setEpisode] = useState('00')
  const [episodeFontFamily, setEpisodeFontFamily] = useState('impact')
  const [episodeColor, setEpisodeColor] = useState('#ffff00')
  const [episodeBorderColor, setEpisodeBorderColor] = useState('#000000')
  const [episodeSize, setEpisodeSize] = useState('150')
  // Frame
  const [frameType, setFrameType] = useState('frame')
  const [frameColor, setFrameColor] = useState('#ff0000')
  // Background
  const [backgroundUrl, setBackgroundUrl] = useState(
    '/assets/images/defaults/factorio.jpg',
  )
  const [shadowType, setShadowType] = useState('solid')
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.5)')
  const [shadowColor1, setShadowColor1] = useState('rgba(0, 0, 0, 0.5)')
  const [shadowColor2, setShadowColor2] = useState('rgba(0, 0, 0, 0.5)')
  // Small Text
  const [smallText, setSmallText] = useState('')
  const [smallTextFontFamily, setSmallTextFontFamily] = useState('impact')
  const [smallTextColor, setSmallTextColor] = useState('#ffffff')
  const [smallTextBorderColor, setSmallTextBorderColor] = useState('#000000')
  const [smallTextSize, setSmallTextSize] = useState('50')
  const [smallTextPositionX, setSmallTextPositionX] = useState('100')
  const [smallTextPositionY, setSmallTextPositionY] = useState('120')
  // Big Text
  const [bigText, setBigText] = useState('')
  const [bigTextFontFamily, setBigTextFontFamily] = useState('impact')
  const [bigTextColor, setBigTextColor] = useState('#ffffff')
  const [bigTextBorderColor, setBigTextBorderColor] = useState('#000000')
  const [bigTextSize, setBigTextSize] = useState('100')
  const [bigTextPositionX, setBigTextPositionX] = useState('100')
  const [bigTextPositionY, setBigTextPositionY] = useState('210')

  useEffect(() => {
    const options = {
      title: {
        text: title,
        fontColor: validColor(titleColor),
        fontBorderColor: validColor(titleBorderColor),
        fontFamily: titleFontFamily,
        fontSize: titleSize,
      },
      episode: {
        text: episode,
        fontColor: validColor(episodeColor),
        fontBorderColor: validColor(episodeBorderColor),
        fontFamily: episodeFontFamily,
        fontSize: episodeSize,
      },
      frame: {
        frameType: frameType as 'frame' | 'frame-noep',
        color: validColor(frameColor),
      },
      background: {
        url: backgroundUrl,
      },
      backgroundShadow: {
        type: shadowType as 'solid' | 'gradient',
        color: validColor(shadowColor),
        color1: validColor(shadowColor1),
        color2: validColor(shadowColor2),
      },
      smallText: {
        text: smallText,
        fontFamily: smallTextFontFamily,
        fontColor: smallTextColor,
        fontBorderColor: smallTextBorderColor,
        fontSize: smallTextSize,
        positionX: smallTextPositionX,
        positionY: smallTextPositionY,
      },
      bigText: {
        text: bigText,
        fontFamily: bigTextFontFamily,
        fontColor: bigTextColor,
        fontBorderColor: bigTextBorderColor,
        fontSize: bigTextSize,
        positionX: bigTextPositionX,
        positionY: bigTextPositionY,
      },
    }

    onChange(options)
  }, [
    onChange,
    title,
    titleColor,
    titleBorderColor,
    titleFontFamily,
    titleSize,
    episode,
    episodeColor,
    episodeBorderColor,
    episodeFontFamily,
    episodeSize,
    frameType,
    frameColor,
    backgroundUrl,
    shadowType,
    shadowColor,
    shadowColor1,
    shadowColor2,
    smallText,
    smallTextFontFamily,
    smallTextColor,
    smallTextBorderColor,
    smallTextSize,
    smallTextPositionX,
    smallTextPositionY,
    bigText,
    bigTextFontFamily,
    bigTextColor,
    bigTextBorderColor,
    bigTextSize,
    bigTextPositionX,
    bigTextPositionY,
  ])

  useEffect(() => {
    async function getData() {
      const response = await fetch('/assets/data/data.json')
      const data = await response.json()

      setDefaults(data)
    }

    getData().catch(console.error)
  }, [])

  useEffect(() => {
    const defaultItem = defaults.find((item) => item.title.text === title)

    if (defaultItem) {
      // title
      setTitleBorderColor(validColor(defaultItem.title.fontBorderColor))
      setTitleColor(validColor(defaultItem.title.fontColor))
      setTitleFontFamily(defaultItem.title.fontFamily)
      setTitleSize(defaultItem.title.fontSize)
      // episode
      setEpisode(defaultItem.episode.text)
      setEpisodeBorderColor(validColor(defaultItem.episode.fontBorderColor))
      setEpisodeColor(validColor(defaultItem.episode.fontColor))
      setEpisodeFontFamily(defaultItem.episode.fontFamily)
      setEpisodeSize(defaultItem.episode.fontSize)
      // Frame
      setFrameType(defaultItem.frame.frameType)
      setFrameColor(validColor(defaultItem.frame.color))
      // Background
      setBackgroundUrl(defaultItem.background.url)
      // Background Shadow
      setShadowType(defaultItem.backgroundShadow.type)
      setShadowColor(validColor(defaultItem.backgroundShadow.color))
      setShadowColor1(validColor(defaultItem.backgroundShadow.color1))
      setShadowColor2(validColor(defaultItem.backgroundShadow.color2))
      // Small text
      setSmallText(defaultItem.smallText.text)
      setSmallTextBorderColor(validColor(defaultItem.smallText.fontBorderColor))
      setSmallTextColor(validColor(defaultItem.smallText.fontColor))
      setSmallTextFontFamily(defaultItem.smallText.fontFamily)
      setSmallTextSize(defaultItem.smallText.fontSize)
      setSmallTextPositionX(defaultItem.smallText.positionX)
      setSmallTextPositionY(defaultItem.smallText.positionY)
      // Big text
      setBigText(defaultItem.bigText.text)
      setBigTextBorderColor(validColor(defaultItem.bigText.fontBorderColor))
      setBigTextColor(validColor(defaultItem.bigText.fontColor))
      setBigTextFontFamily(defaultItem.bigText.fontFamily)
      setBigTextSize(defaultItem.bigText.fontSize)
      setBigTextPositionX(defaultItem.bigText.positionX)
      setBigTextPositionY(defaultItem.bigText.positionY)
    }
  }, [defaults, title])

  return (
    <Container>
      <h2>Opções</h2>
      {/* TITLE */}
      <InputSelect
        label="Título do jogo"
        name="title"
        placeholder="Digite o título do jogo"
        value={title}
        setValue={setTitle}
        options={defaults.map((item) => ({
          label: item.title.text || '',
          value: item.title.text || '',
        }))}
      />
      <ExpandContainer>
        <InputSelect
          label="Família da Fonte"
          name="titleFontFamily"
          placeholder="Escolha a fonte do título"
          value={titleFontFamily}
          setValue={setTitleFontFamily}
          options={[
            {
              label: 'impact',
              value: 'impact',
            },
            {
              label: 'edo',
              value: 'edo',
            },
          ]}
        />
        <InputColor
          label="Cor"
          name="titleColor"
          placeholder="Escolha a cor do título"
          value={titleColor}
          setValue={setTitleColor}
        />
        <InputColor
          label="Cor da borda"
          name="titleBorderColor"
          placeholder="Escolha a cor da borda do título"
          value={titleBorderColor}
          setValue={setTitleBorderColor}
        />
        <Input
          type="number"
          label="Tamanho"
          name="titleSize"
          placeholder="Escolha o tamanho do título"
          value={titleSize}
          setValue={setTitleSize}
        />
      </ExpandContainer>

      {/* EPISODE */}
      <Input
        type="number"
        label="Nº Episódio"
        name="episode"
        placeholder="Digite o número do episódio"
        value={episode}
        setValue={setEpisode}
      />
      <ExpandContainer>
        <InputSelect
          label="Família da Fonte"
          name="episodeFont"
          placeholder="Escolha a fonte do episódio"
          value={episodeFontFamily}
          setValue={setEpisodeFontFamily}
          options={[
            {
              label: 'impact',
              value: 'impact',
            },
            {
              label: 'edo',
              value: 'edo',
            },
          ]}
        />
        <InputColor
          label="Cor"
          name="episodeColor"
          placeholder="Escolha a cor do episódio"
          value={episodeColor}
          setValue={setEpisodeColor}
        />
        <InputColor
          label="Cor da borda"
          name="episodeBorderColor"
          placeholder="Escolha a cor da borda do episódio"
          value={episodeBorderColor}
          setValue={setEpisodeBorderColor}
        />
        <Input
          type="number"
          label="Tamanho"
          name="episodeSize"
          placeholder="Escolha o tamanho do episódio"
          value={episodeSize}
          setValue={setEpisodeSize}
        />
      </ExpandContainer>

      {/* FRAME */}
      <Select
        label="Frame"
        name="frameType"
        value={frameType}
        setValue={setFrameType}
        options={[
          { label: 'Normal', value: 'frame' },
          { label: 'Sem Episódio', value: 'frame-noep' },
        ]}
      />
      <ExpandContainer>
        <InputColor
          label="Cor"
          name="frameColor"
          placeholder="Escolha a cor do frame"
          value={frameColor}
          setValue={setFrameColor}
        />
      </ExpandContainer>

      {/* BACKGROUND */}
      <InputFile
        label="URL da Imagem de fundo"
        name="backgroundUrl"
        placeholder="Escolha a cor da sombra"
        value={backgroundUrl}
        setValue={setBackgroundUrl}
      />
      <ExpandContainer>
        <Select
          label="Tipo da sombra do fundo"
          name="shadowType"
          value={shadowType}
          setValue={setShadowType}
          options={[
            { label: 'Cor sólida', value: 'solid' },
            { label: 'Gradiente', value: 'gradient' },
          ]}
        />
        {shadowType === 'solid' && (
          <InputColor
            label="Cor da sombra"
            name="shadowColor"
            placeholder="Escolha a cor da sombra"
            value={shadowColor}
            setValue={setShadowColor}
          />
        )}
        {shadowType !== 'solid' && (
          <>
            <InputColor
              label="Cor 1"
              name="shadowColor1"
              placeholder="Escolha a cor da sombra"
              value={shadowColor1}
              setValue={setShadowColor1}
            />
            <InputColor
              label="Cor 2"
              name="shadowColor2"
              placeholder="Escolha a cor da sombra"
              value={shadowColor2}
              setValue={setShadowColor2}
            />
          </>
        )}
      </ExpandContainer>

      {/* SMALL TEXT */}
      <p className="options-text">Opções do texto menor</p>
      <ExpandContainer>
        <Input
          label="Texto menor"
          name="smallText"
          placeholder="Digite o texto menor"
          value={smallText}
          setValue={setSmallText}
        />
        <InputSelect
          label="Família da Fonte"
          name="smallTextFontFamily"
          placeholder="Escolha a fonte do título"
          value={smallTextFontFamily}
          setValue={setSmallTextFontFamily}
          options={[
            {
              label: 'impact',
              value: 'impact',
            },
            {
              label: 'edo',
              value: 'edo',
            },
          ]}
        />
        <InputColor
          label="Cor"
          name="smallTextColor"
          placeholder="Escolha a cor do título"
          value={smallTextColor}
          setValue={setSmallTextColor}
        />
        <InputColor
          label="Cor da borda"
          name="smallTextBorderColor"
          placeholder="Escolha a cor da borda do título"
          value={smallTextBorderColor}
          setValue={setSmallTextBorderColor}
        />
        <Input
          type="number"
          label="Tamanho"
          name="smallTextSize"
          placeholder="Escolha o tamanho do título"
          value={smallTextSize}
          setValue={setSmallTextSize}
        />
        <Input
          type="number"
          label="Posição X"
          name="smallTextPositionX"
          placeholder="Digite a posição X"
          value={smallTextPositionX}
          setValue={setSmallTextPositionX}
        />
        <Input
          type="number"
          label="Posição Y"
          name="smallTextPositionY"
          placeholder="Digite a posição Y"
          value={smallTextPositionY}
          setValue={setSmallTextPositionY}
        />
      </ExpandContainer>

      {/* BIG TEXT */}
      <p className="options-text">Opções do texto maior</p>
      <ExpandContainer>
        <Input
          label="Texto maior"
          name="smallText"
          placeholder="Digite o texto maior"
          value={bigText}
          setValue={setBigText}
        />
        <InputSelect
          label="Família da Fonte"
          name="bigTextFontFamily"
          placeholder="Escolha a fonte do título"
          value={bigTextFontFamily}
          setValue={setBigTextFontFamily}
          options={[
            {
              label: 'impact',
              value: 'impact',
            },
            {
              label: 'edo',
              value: 'edo',
            },
          ]}
        />
        <InputColor
          label="Cor"
          name="bigTextColor"
          placeholder="Escolha a cor do título"
          value={bigTextColor}
          setValue={setBigTextColor}
        />
        <InputColor
          label="Cor da borda"
          name="bigTextBorderColor"
          placeholder="Escolha a cor da borda do título"
          value={bigTextBorderColor}
          setValue={setBigTextBorderColor}
        />
        <Input
          type="number"
          label="Tamanho"
          name="bigTextSize"
          placeholder="Escolha o tamanho do título"
          value={bigTextSize}
          setValue={setBigTextSize}
        />
        <Input
          type="number"
          label="Posição X"
          name="bigTextPositionX"
          placeholder="Digite a posição X"
          value={bigTextPositionX}
          setValue={setBigTextPositionX}
        />
        <Input
          type="number"
          label="Posição Y"
          name="bigTextPositionY"
          placeholder="Digite a posição Y"
          value={bigTextPositionY}
          setValue={setBigTextPositionY}
        />
      </ExpandContainer>
    </Container>
  )
}
