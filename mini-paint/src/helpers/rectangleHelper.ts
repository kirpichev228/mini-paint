import type { Ref } from 'vue'

export const rectangle = (
  ctx: CanvasRenderingContext2D,
  startX: Ref<number>,
  startY: Ref<number>,
  endX: Ref<number>,
  endY: Ref<number>,
  isFilled: Ref<boolean>
) => {
  ctx.strokeRect(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value)
  isFilled.value &&
    ctx.fillRect(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value)
}
