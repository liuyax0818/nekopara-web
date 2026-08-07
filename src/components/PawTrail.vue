<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface PawPrint {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotate: number
}

const colors = ['#ef7187', '#f0a046', '#639bd4', '#957ad2', '#58a783', '#d768ac']
const pawPrints = ref<PawPrint[]>([])
const timers = new Set<number>()
let nextId = 0

function dropPaw(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const id = ++nextId
  pawPrints.value.push({
    id,
    x: event.clientX,
    y: event.clientY,
    size: Math.round(32 + Math.random() * 42),
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: Math.round(-42 + Math.random() * 84),
  })

  if (pawPrints.value.length > 18) pawPrints.value.shift()
  const timer = window.setTimeout(() => {
    pawPrints.value = pawPrints.value.filter((paw) => paw.id !== id)
    timers.delete(timer)
  }, 1100)
  timers.add(timer)
}

onMounted(() => window.addEventListener('pointerdown', dropPaw, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', dropPaw)
  timers.forEach((timer) => window.clearTimeout(timer))
})
</script>

<template>
  <div class="paw-layer" aria-hidden="true">
    <div
      v-for="paw in pawPrints"
      :key="paw.id"
      class="paw-print"
      :style="{
        '--x': `${paw.x}px`,
        '--y': `${paw.y}px`,
        '--size': `${paw.size}px`,
        '--paw-color': paw.color,
        '--rotate': `${paw.rotate}deg`,
      }"
    >
      <i class="toe toe-one"></i>
      <i class="toe toe-two"></i>
      <i class="toe toe-three"></i>
      <i class="toe toe-four"></i>
      <i class="pad"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.paw-layer {
  position: fixed;
  z-index: 100;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  .paw-print {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: var(--size);
    height: calc(var(--size) * 0.88);
    color: var(--paw-color);
    filter: drop-shadow(0 3px 2px rgba(92, 59, 68, 0.13));
    opacity: 0;
    transform-origin: center;
    animation: paw-pop 1.1s cubic-bezier(0.16, 0.78, 0.3, 1) forwards;

    i {
      position: absolute;
      display: block;
      background: currentColor;
    }

    .toe {
      width: 21%;
      height: 27%;
      border-radius: 52% 52% 46% 46%;

      &-one { top: 18%; left: 1%; transform: rotate(-35deg); }
      &-two { top: 1%; left: 25%; transform: rotate(-12deg); }
      &-three { top: 1%; right: 25%; transform: rotate(12deg); }
      &-four { top: 18%; right: 1%; transform: rotate(35deg); }
    }

    .pad {
      left: 21%;
      bottom: 3%;
      width: 58%;
      height: 48%;
      border-radius: 52% 52% 45% 45% / 58% 58% 42% 42%;
      transform: rotate(45deg);
    }
  }
}

@keyframes paw-pop {
  0% { opacity: 0; transform: translate(-50%, -45%) rotate(var(--rotate)) scale(0.35); }
  18% { opacity: 0.92; transform: translate(-50%, -55%) rotate(var(--rotate)) scale(1.06); }
  68% { opacity: 0.72; transform: translate(-50%, -60%) rotate(var(--rotate)) scale(0.97); }
  100% { opacity: 0; transform: translate(-50%, -105%) rotate(calc(var(--rotate) + 8deg)) scale(0.82); }
}
</style>
