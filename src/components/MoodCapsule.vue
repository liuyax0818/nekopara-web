<script setup lang="ts">
import { ref } from 'vue'

interface Mood {
  emoji: string
  title: string
  copy: string
}

const moods: Mood[] = [
  { emoji: '☁️', title: '云朵肚皮', copy: '适合躺平，允许自己慢一点。' },
  { emoji: '🐟', title: '小鱼冲刺', copy: '今天的好运正在飞奔过来。' },
  { emoji: '🧶', title: '毛线球脑袋', copy: '灵感绕成一团，也是一种可爱。' },
  { emoji: '🌷', title: '花花尾巴', copy: '路过的风都想和你打招呼。' },
  { emoji: '🥛', title: '奶呼呼模式', copy: '先休息五分钟，再决定下一步。' },
]

const mood = ref<Mood>(moods[0])
const rolling = ref(false)

function rollMood(): void {
  if (rolling.value) return
  rolling.value = true
  const choices = moods.filter((item) => item.title !== mood.value.title)
  mood.value = choices[Math.floor(Math.random() * choices.length)]
  window.setTimeout(() => (rolling.value = false), 480)
}
</script>

<template>
  <section class="mood-wrap" aria-labelledby="mood-title">
    <div class="mood-section">
      <span class="mood-star" aria-hidden="true">✦</span>
      <p class="section-label">MEOW MOOD CAPSULE</p>
      <h2 id="mood-title">抽取今日猫咪心情</h2>

      <div class="mood-card" :class="{ rolling }">
        <span class="mood-emoji" aria-hidden="true">{{ mood.emoji }}</span>
        <div>
          <strong>{{ mood.title }}</strong>
          <p>{{ mood.copy }}</p>
        </div>
      </div>

      <button class="mood-button" type="button" @click="rollMood">
        <span>↻</span> 再抽一张
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.mood-wrap {
  padding: 22px 20px 18px;
  background: var(--cream);
}

.mood-section {
  position: relative;
  padding: 34px 24px 27px;
  overflow: hidden;
  border-radius: 34px;
  color: white;
  background:
    radial-gradient(circle at 92% 12%, rgba(255, 255, 255, 0.22), transparent 21%),
    linear-gradient(145deg, #9d91d7, #796bc0);
  box-shadow: 0 18px 40px rgba(95, 79, 164, 0.22), 0 7px 0 #e2daf2;
}

.mood-section::after {
  position: absolute;
  right: -70px;
  bottom: -90px;
  width: 210px;
  height: 210px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
  content: '';
}

.section-label {
  position: relative;
  z-index: 1;
  margin: 0 0 7px;
  color: #ded8ff;
  font-family: var(--font-round);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

h2 {
  position: relative;
  z-index: 1;
  margin: 0;
  color: white;
  font-family: var(--font-cute);
  font-size: 28px;
  font-weight: 400;
}

.mood-star {
  position: absolute;
  top: 25px;
  right: 28px;
  color: #ffe497;
  font-size: 23px;
  animation: twinkle 2.4s ease-in-out infinite;
}

.mood-card {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 96px;
  margin: 24px 0 17px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);

  &.rolling {
    animation: card-flip 480ms ease;
  }

  strong {
    font-family: var(--font-cute);
    font-size: 20px;
    font-weight: 400;
  }

  p {
    margin: 4px 0 0;
    color: #ece8ff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.6;
  }
}

.mood-emoji {
  display: grid;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 19px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 7px 16px rgba(64, 50, 117, 0.22);
  font-size: 28px;
}

.mood-button {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border: 0;
  border-radius: 16px;
  color: #6e61ad;
  background: #fff8dc;
  box-shadow: 0 5px 0 #ddd2ac;
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;

  &:active {
    box-shadow: 0 2px 0 #ddd2ac;
    transform: translateY(3px);
  }

  span {
    font-size: 17px;
  }
}

@keyframes card-flip {
  0% { transform: rotateY(0) scale(1); opacity: 1; }
  45% { transform: rotateY(85deg) scale(0.92); opacity: 0.65; }
  100% { transform: rotateY(0) scale(1); opacity: 1; }
}

@keyframes twinkle {
  0%, 100% { transform: rotate(0) scale(1); }
  50% { transform: rotate(18deg) scale(1.22); }
}

@media (max-width: 360px) {
  .mood-wrap { padding-inline: 16px; }
  .mood-section { padding-inline: 20px; }
}
</style>
