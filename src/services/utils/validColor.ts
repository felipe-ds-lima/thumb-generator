export function validColor(color: string) {
  if (!color) return '#000000'
  if (color.startsWith('#')) {
    if (color.length === 7 || color.length === 9) {
      return color
    } else {
      return color.padEnd(7, '0').substring(0, 7)
    }
  } else if (color.startsWith('rgba')) {
    const splitedRgba = color.split(',')
    if (splitedRgba.length !== 4) {
      return 'rgba(0,0,0,1)'
    }
    splitedRgba[0] = splitedRgba[0].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    splitedRgba[1] = splitedRgba[1].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    splitedRgba[2] = splitedRgba[2].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    splitedRgba[3] = splitedRgba[3].replace(/(?!\.)(?![0-9])\D/g, '') || '1'
    return `rgba(${splitedRgba.join(',')})`
  } else if (color.startsWith('rgb')) {
    const splitedRgba = color.split(',')
    if (splitedRgba.length !== 3) {
      return 'rgb(0,0,0)'
    }
    splitedRgba[0] = splitedRgba[0].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    splitedRgba[1] = splitedRgba[1].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    splitedRgba[2] = splitedRgba[2].replace(/(?!\.)(?![0-9])\D/g, '') || '0'
    return `rgb(${splitedRgba.join(',')})`
  }

  return '#000000'
}
