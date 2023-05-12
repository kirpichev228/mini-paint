import type { Ref } from 'vue'

export const line = (
  ctx: CanvasRenderingContext2D,
  startX: Ref<number>,
  startY: Ref<number>,
  endX: Ref<number>,
  endY: Ref<number>
) => {
  ctx.beginPath()
  ctx.moveTo(startX.value, startY.value)
  ctx.lineTo(endX.value, endY.value)
  ctx.stroke()
}
