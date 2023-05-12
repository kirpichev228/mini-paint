import type { Ref } from 'vue'

export const star = (
  ctx: CanvasRenderingContext2D,
  startX: Ref<number>,
  startY: Ref<number>,
  endX: Ref<number>,
  endY: Ref<number>,
  isFilled: Ref<boolean>,
  vertexAmount: number
) => {
  const centerX = (startX.value + endX.value) / 2
  const centerY = (startY.value + endY.value) / 2
  const radius = Math.sqrt((endX.value - centerX) ** 2 + (endY.value - centerY) ** 2)
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

  isFilled.value && ctx.fill()
}
