import type { FigureCoordinates } from '@/types'

export const circle = (
  ctx: CanvasRenderingContext2D,
  coordinates: FigureCoordinates,
  isFilled: boolean
) => {
  const centerX = (coordinates.startX + coordinates.endX) / 2
  const centerY = (coordinates.startY + coordinates.endY) / 2

  const radius = Math.sqrt(
    (coordinates.endX - centerX) * (coordinates.endX - centerX) +
      (coordinates.endY - centerY) * (coordinates.endY - centerY)
  )
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()

  isFilled && ctx.fill()
}
