import type { Ref } from 'vue'

export const circle = (
  ctx: CanvasRenderingContext2D,
  startX: Ref<number>,
  startY: Ref<number>,
  endX: Ref<number>,
  endY: Ref<number>,
  isFilled: Ref<boolean>
) => {
  const centerX = (startX.value + endX.value) / 2
  const centerY = (startY.value + endY.value) / 2

  const radius = Math.sqrt(
    (endX.value - centerX) * (endX.value - centerX) +
      (endY.value - centerY) * (endY.value - centerY)
  )
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()

  isFilled.value && ctx.fill()
}
