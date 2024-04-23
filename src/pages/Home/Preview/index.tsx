import { useEffect, useRef } from 'react'

import { parseToRgb } from 'polished'
import { type RgbaColor } from 'polished/lib/types/color'

import { Button } from '../../../components/Button'
import { type IThumbOptions } from '../../../types/IThumbOptions'
import { Container } from './styles'

interface IFonts {
  edo: FontFace | null
  impact: FontFace | null
}
interface IImages {
  frame: HTMLImageElement | null
  frameNoEp: HTMLImageElement | null
  currentFrame: HTMLImageElement | null
  background: HTMLImageElement | null
}
interface IData {
  started: boolean
  fonts: IFonts
  images: IImages
  context: CanvasRenderingContext2D | null
  options: IThumbOptions | null
}

interface IPreviewProps {
  options: IThumbOptions
}

const WIDTH = 1280
const HEIGHT = 720

const asyncContent: IData = {
  started: false,
  fonts: {
    edo: null,
    impact: null,
  },
  images: {
    frame: null,
    frameNoEp: null,
    currentFrame: null,
    background: null,
  },
  context: null,
  options: null,
}

function buildPreview() {
  const context = asyncContent.context
  if (!context || !asyncContent.options) return
  context.clearRect(0, 0, WIDTH, HEIGHT)

  buildBackgroundLayer(context)
  buildBackgroundShadowLayer(context, asyncContent.options)
  buildFrameLayer(context, asyncContent.options)
  buildTitleLayer(context, asyncContent.options)
  buildEpisodeLayer(context, asyncContent.options)
  buildSmallTextLayer(context, asyncContent.options)
  buildBigTextLayer(context, asyncContent.options)

  window.requestAnimationFrame(buildPreview)
}

async function loadFont(url: string, name: keyof IFonts) {
  const font = new FontFace(name, `url('${url}')`)

  const loadedFont = await font.load()
  document.fonts.add(loadedFont)
  asyncContent.fonts[name] = loadedFont

  return loadedFont
}

async function loadImage(
  url: string,
  name?: keyof IImages,
): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    try {
      const image = document.createElement('img')
      image.src = url
      image.onload = () => {
        if (name) {
          asyncContent.images[name] = image
        }
        resolve(image)
      }
    } catch (err) {
      reject(err)
    }
  })
}

async function loadData() {
  await Promise.all([
    !asyncContent.fonts.edo
      ? loadFont('/assets/fonts/edosz.ttf', 'edo')
      : Promise.resolve(),
    !asyncContent.fonts.impact
      ? loadFont('/assets/fonts/impact.ttf', 'impact')
      : Promise.resolve(),
    !asyncContent.images.frame
      ? loadImage('/assets/images/frame.png', 'frame')
      : Promise.resolve(),
    !asyncContent.images.frameNoEp
      ? loadImage('/assets/images/frame-noep.png', 'frameNoEp')
      : Promise.resolve(),
    !asyncContent.images.background
      ? loadImage('/assets/images/defaults/factorio.jpg', 'background')
      : Promise.resolve(),
  ])
}

function getColor(
  color: string,
  colorToGet: 'red' | 'green' | 'blue' | 'alpha',
) {
  const rgba = parseToRgb(color) as RgbaColor
  if (colorToGet === 'alpha' && !rgba[colorToGet]) {
    return 255
  }
  return rgba[colorToGet]
}

function buildBackgroundLayer(context: CanvasRenderingContext2D) {
  const image = asyncContent.images.background
  if (!image) return
  const canvasWidth = context.canvas.width
  const canvasHeight = context.canvas.height

  // Tamanho da imagem
  const imgWidth = image.width
  const imgHeight = image.height

  // Calcular a proporção da imagem
  const imgAspectRatio = imgWidth / imgHeight
  const canvasAspectRatio = canvasWidth / canvasHeight

  // Definir as dimensões para desenhar a imagem
  let renderWidth, renderHeight, xStart, yStart

  if (imgAspectRatio > canvasAspectRatio) {
    renderHeight = canvasHeight
    renderWidth = renderHeight * imgAspectRatio
    xStart = (canvasWidth - renderWidth) / 2
    yStart = 0
  } else {
    renderWidth = canvasWidth
    renderHeight = renderWidth / imgAspectRatio
    yStart = (canvasHeight - renderHeight) / 2
    xStart = 0
  }

  // Desenhar a imagem no canvas
  context.drawImage(image, xStart, yStart, renderWidth, renderHeight)
}

function buildBackgroundShadowLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  if (options.backgroundShadow.type === 'solid') {
    if (options.backgroundShadow.color) {
      context.fillStyle = options.backgroundShadow.color
    }
  } else {
    if (options.backgroundShadow.color1 && options.backgroundShadow.color2) {
      const gradient = context.createLinearGradient(0, 0, WIDTH, 0)
      gradient.addColorStop(0, options.backgroundShadow.color1)
      gradient.addColorStop(1, options.backgroundShadow.color2)
      context.fillStyle = gradient
    }
  }
  context.fillRect(0, 0, WIDTH, HEIGHT)
}

function buildFrameLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  if (!asyncContent.images.currentFrame) {
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = WIDTH
    tempCanvas.height = HEIGHT
    const tempContext = tempCanvas.getContext('2d')
    if (!asyncContent.images.frame) {
      return
    }
    const image =
      asyncContent.options?.frame.frameType === 'frame-noep'
        ? asyncContent.images.frameNoEp
        : asyncContent.images.frame
    if (!tempContext || !image) {
      throw new Error('Temp context not created')
    }

    tempContext.clearRect(0, 0, WIDTH, HEIGHT)
    tempContext.drawImage(image, 0, 0, WIDTH, HEIGHT)
    const imageData = tempContext.getImageData(0, 0, WIDTH, HEIGHT)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i]
      const green = data[i + 1]
      const blue = data[i + 2]
      const alpha = data[i + 3]

      if (red === 255 && green === 255 && blue === 255) {
        data[i] = getColor(options.frame.color ?? '#000000', 'red') // vermelho
        data[i + 1] = getColor(options.frame.color ?? '#000000', 'green') // verde
        data[i + 2] = getColor(options.frame.color ?? '#000000', 'blue') // azul
      }
      data[i + 3] = alpha // transparencia
    }

    tempContext.putImageData(imageData, 0, 0)
    const modifiedImageData = tempCanvas.toDataURL()
    const modifiedImage: HTMLImageElement = document.createElement('img')
    modifiedImage.src = modifiedImageData

    asyncContent.images.currentFrame = modifiedImage
    tempCanvas.remove()
  }
  if (asyncContent.images.currentFrame) {
    context.drawImage(asyncContent.images.currentFrame, 0, 0, WIDTH, HEIGHT)
  }
}

function buildTitleLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  const text = options.title.text || 'Nome do Jogo'
  const fontSize = options.title.fontSize ?? 150
  const fontFamily = options.title.fontFamily ?? 'edo'
  const x = 100
  const y = 590

  context.font = `${fontSize}px '${fontFamily}'`
  context.textAlign = 'left'

  // Desenhe a borda
  context.strokeStyle = options.title.fontBorderColor ?? '#000000'
  context.lineWidth = 10
  context.strokeText(text, x, y)

  // Desenhe o texto
  context.fillStyle = options.title.fontColor ?? '#ffffff'
  context.fillText(text, x, y)
}

function buildEpisodeLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  if (options.frame.frameType === 'frame-noep') return
  const number = Number(options.episode.text.replace(/\D/, '')).toString()
  const text = number.padStart(2, '0')
  const fontSize = options.episode.fontSize ?? 150
  const fontFamily = options.episode.fontFamily ?? 'edo'
  const x = 970
  const y = 190

  context.font = `${fontSize}px '${fontFamily}'`
  context.textAlign = 'center'

  // Desenhe a borda
  context.strokeStyle = options.episode.fontBorderColor ?? '#000000'
  context.lineWidth = 10
  context.strokeText(text, x, y)

  // Desenhe o texto
  context.fillStyle = options.episode.fontColor ?? '#ffffff'
  context.fillText(text, x, y)
}

function buildSmallTextLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  const text = options.smallText.text
  const fontSize = options.smallText.fontSize ?? '50'
  const fontFamily = options.smallText.fontFamily ?? 'impact'
  const x = Number(options.smallText.positionX?.toString() ?? '100')
  const y = Number(options.smallText.positionY?.toString() ?? '120')

  context.font = `${fontSize}px '${fontFamily}'`
  context.textAlign = 'left'

  // Desenhe a borda
  context.strokeStyle = options.smallText.fontBorderColor ?? '#000000'
  context.lineWidth = 10
  context.strokeText(text, x, y)

  // Desenhe o texto
  context.fillStyle = options.smallText.fontColor ?? '#ffffff'
  context.fillText(text, x, y)
}
function buildBigTextLayer(
  context: CanvasRenderingContext2D,
  options: IThumbOptions,
) {
  const text = options.bigText.text
  const fontSize = options.bigText.fontSize ?? '100'
  const fontFamily = options.bigText.fontFamily ?? 'impact'
  const x = Number(options.bigText.positionX?.toString() ?? '100')
  const y = Number(options.bigText.positionY?.toString() ?? '210')

  context.font = `${fontSize}px '${fontFamily}'`
  context.textAlign = 'left'

  // Desenhe a borda
  context.strokeStyle = options.bigText.fontBorderColor ?? '#000000'
  context.lineWidth = 10
  context.strokeText(text, x, y)

  // Desenhe o texto
  context.fillStyle = options.bigText.fontColor ?? '#ffffff'
  context.fillText(text, x, y)
}

export const Preview: React.FC<IPreviewProps> = ({ options }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const smallCanvasRef = useRef<HTMLCanvasElement>(null)

  function handleSave() {
    if (!canvasRef.current) return
    console.log(JSON.stringify(options))
    const link = document.createElement('a')
    if (options.frame.frameType === 'frame') {
      link.download = `${options.title.text}-${options.episode.text}.png`
    } else {
      link.download = `${options.title.text}.png`
    }
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  useEffect(() => {
    async function start() {
      if (!asyncContent.started) {
        await loadData()
        if (asyncContent.images.background?.src !== options.background.url) {
          asyncContent.images.background = await loadImage(
            options.background.url,
            'background',
          )
        }

        if (canvasRef.current) {
          asyncContent.context = canvasRef.current.getContext('2d')

          buildPreview()

          if (smallCanvasRef.current) {
            const ctxPrev = canvasRef.current?.getContext('2d')
            const ctxSmallPrev = smallCanvasRef.current?.getContext('2d')
            if (ctxPrev !== null && ctxSmallPrev !== null) {
              const buildSmallPreview = () => {
                const imageData = ctxPrev.getImageData(0, 0, WIDTH, HEIGHT)
                ctxSmallPrev.putImageData(imageData, 0, 0)

                window.requestAnimationFrame(buildSmallPreview)
              }

              buildSmallPreview()
            }
          }
          asyncContent.started = true
        }

        asyncContent.options = options
      }

      if (asyncContent.images.background?.src !== options.background.url) {
        asyncContent.images.background = await loadImage(
          options.background.url,
          'background',
        )
      }

      if (
        asyncContent.options?.frame.color !== options.frame.color ||
        asyncContent.options?.frame.frameType !== options.frame.frameType
      ) {
        asyncContent.images.currentFrame = null
      }

      asyncContent.options = options
    }

    start().catch(console.error)
  }, [options])

  return (
    <Container>
      <h2>Preview</h2>
      <div className="button-holder">
        <Button type="button" onClick={handleSave}>
          Salvar
        </Button>
      </div>
      <section className="preview-container">
        <canvas
          ref={canvasRef}
          id="canvas"
          width={WIDTH}
          height={HEIGHT}
        ></canvas>
        <canvas
          ref={smallCanvasRef}
          id="small-canvas"
          width={WIDTH}
          height={HEIGHT}
        ></canvas>
      </section>
    </Container>
  )
}
