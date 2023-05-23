import type { FigureCoordinates } from '@/types'

export const star = (
  ctx: CanvasRenderingContext2D,
  coordinates: FigureCoordinates,
  isFilled: boolean,
  vertexAmount: number
) => {
  const centerX = (coordinates.startX + coordinates.endX) / 2
  const centerY = (coordinates.startY + coordinates.endY) / 2
  const radius = Math.sqrt((coordinates.endX - centerX) ** 2 + (coordinates.endY - centerY) ** 2)
  const innerRadius = radius / 2.5

  const points = []
  for (let i = 0; i < vertexAmount * 2; i++) {
    const angle = (Math.PI / vertexAmount) * i - Math.PI / 2
    const radiusAtAngle = i % 2 === 0 ? radius : innerRadius
    const x = centerX + radiusAtAngle * Math.cos(angle)
    const y = centerY + radiusAtAngle * Math.sin(angle)
    points.push({ x, y })
  }

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < vertexAmount * 2; i++) {
    const point = points[i % (vertexAmount * 2)]
    ctx.lineTo(point.x, point.y)
  }
  ctx.closePath()
  ctx.stroke()

  isFilled && ctx.fill()
}
