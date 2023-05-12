import type { Ref } from 'vue'

export const polygon = (
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

  const radius = Math.sqrt(
    (endX.value - centerX) * (endX.value - centerX) +
      (endY.value - centerY) * (endY.value - centerY)
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

  isFilled.value && ctx.fill()
}
