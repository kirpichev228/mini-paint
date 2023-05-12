import type { FigureCoordinates } from '@/components/types'

export const line = (ctx: CanvasRenderingContext2D, coordinates: FigureCoordinates) => {
  ctx.beginPath()
  ctx.moveTo(coordinates.startX, coordinates.startY)
  ctx.lineTo(coordinates.endX, coordinates.endY)
  ctx.stroke()
}
