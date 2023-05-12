import type { FigureCoordinates } from '@/components/types'

export const polygon = (
  ctx: CanvasRenderingContext2D,
  coordinates: FigureCoordinates,
  isFilled: boolean,
  vertexAmount: number
) => {
  const centerX = (coordinates.startX + coordinates.endX) / 2
  const centerY = (coordinates.startY + coordinates.endY) / 2

  const radius = Math.sqrt(
    (coordinates.endX - centerX) * (coordinates.endX - centerX) +
      (coordinates.endY - centerY) * (coordinates.endY - centerY)
  )

  const angle = (Math.PI * 2) / vertexAmount

  ctx.beginPath()
  ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0))

  for (let i = 1; i <= vertexAmount; i++) {
    const x = centerX + radius * Math.cos(i * angle)
    const y = centerY + radius * Math.sin(i * angle)
    ctx.lineTo(x, y)
  }

  ctx.stroke()

  isFilled && ctx.fill()
}
