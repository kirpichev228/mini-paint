import type { FigureCoordinates } from '@/types'

export const rectangle = (
  ctx: CanvasRenderingContext2D,
  coordinates: FigureCoordinates,
  isFilled: boolean
) => {
  ctx.strokeRect(
    coordinates.startX,
    coordinates.startY,
    coordinates.endX - coordinates.startX,
    coordinates.endY - coordinates.startY
  )
  isFilled &&
    ctx.fillRect(
      coordinates.startX,
      coordinates.startY,
      coordinates.endX - coordinates.startX,
      coordinates.endY - coordinates.startY
    )
}
