import type { FigureCoordinates } from '@/types'

export const line = (ctx: CanvasRenderingContext2D, coordinates: FigureCoordinates): void => {
  ctx.beginPath()
  ctx.moveTo(coordinates.startX, coordinates.startY)
  ctx.lineTo(coordinates.endX, coordinates.endY)
  ctx.stroke()
}
