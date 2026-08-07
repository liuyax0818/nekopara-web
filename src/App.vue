<script setup>
import { onBeforeUnmount, ref } from 'vue'

const cats = [
  { name: '团子', breed: '英短', note: '正在认真发呆', className: 'british', position: '20% 53%', tint: '#b8c9e4' },
  { name: '橘宝', breed: '橘猫', note: '随时准备开饭', className: 'orange', position: '57% 52%', tint: '#ffc77d' },
  { name: '虎妞', breed: '狸花', note: '巡逻每一颗毛线球', className: 'lihua', position: '22% 76%', tint: '#a8b99d' },
  { name: '森林', breed: '缅因', note: '外表威风内心软软', className: 'maine', position: '78% 76%', tint: '#d2b69e' },
]

const moods = [
  { emoji: '☁️', title: '云朵肚皮', copy: '适合躺平，允许自己慢一点。' },
  { emoji: '🐟', title: '小鱼冲刺', copy: '今天的好运正在飞奔过来。' },
  { emoji: '🧶', title: '毛线球脑袋', copy: '灵感绕成一团，也是一种可爱。' },
  { emoji: '🌷', title: '花花尾巴', copy: '路过的风都想和你打招呼。' },
  { emoji: '🥛', title: '奶呼呼模式', copy: '先休息五分钟，再决定下一步。' },
]

const pawColors = ['#ef7d8d', '#f6a04d', '#7aa6d8', '#9881d0', '#65aa8d', '#d76eaf']
const pawPrints = ref([])
const selectedCat = ref('团子')
const mood = ref(moods[0])
const moodRolling = ref(false)
const cleanups = []
let pawId = 0

function dropPaw(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return

  const id = ++pawId
  pawPrints.value.push({
    id,
    x: event.clientX,
    y: event.clientY,
    size: Math.round(34 + Math.random() * 34),
    color: pawColors[Math.floor(Math.random() * pawColors.length)],
    rotate: Math.round(-38 + Math.random() * 76),
  })

  if (pawPrints.value.length > 16) pawPrints.value.shift()
  const timer = window.setTimeout(() => {
    pawPrints.value = pawPrints.value.filter((paw) => paw.id !== id)
  }, 1050)
  cleanups.push(timer)
}

function pickCat(cat) {
  selectedCat.value = cat.name
}

function rollMood() {
  if (moodRolling.value) return
  moodRolling.value = true
  const current = mood.value.title
  const choices = moods.filter((item) => item.title !== current)
  mood.value = choices[Math.floor(Math.random() * choices.length)]
  window.setTimeout(() => (moodRolling.value = false), 480)
}

onBeforeUnmount(() => cleanups.forEach(window.clearTimeout))
</script>

<template>
  <main class="page" @pointerdown="dropPaw">
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>

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

    <div class="phone-shell">
      <header class="topbar">
        <a class="brand" href="#top" aria-label="回到猫猫乐园顶部">
          <span class="brand-mark">猫</span>
          <span>MEOW PARK</span>
        </a>
        <span class="open-pill"><i></i> 今日营业中</span>
      </header>

      <section id="top" class="hero">
        <div class="eyebrow"><span>✦</span> 欢迎进入软乎乎地带</div>
        <h1>烦恼退散，<br /><em>猫猫登场！</em></h1>
        <p class="hero-copy">这里没有知识点，只有一群圆滚滚的小猫，等你来摸摸。</p>

        <div class="hero-card">
          <img src="/assets/cat-garden.png" alt="英短、橘猫、狸花猫和缅因猫在花园里一起玩耍" />
          <div class="hero-glow"></div>
          <div class="float-fish fish-one">🐟</div>
          <div class="float-fish fish-two">🐟</div>
          <div class="tap-tip">
            <span class="mini-paw">●</span>
            点点屏幕，留下你的猫爪印
          </div>
        </div>

        <div class="scroll-hint" aria-hidden="true">
          <span></span>
          往下认识新朋友
        </div>
      </section>

      <section class="cat-section" aria-labelledby="cat-title">
        <div class="section-heading">
          <div>
            <p>MEET THE CATS</p>
            <h2 id="cat-title">今天谁来营业？</h2>
          </div>
          <span class="count">04 只</span>
        </div>

        <div class="cat-list">
          <button
            v-for="cat in cats"
            :key="cat.name"
            class="cat-card"
            :class="{ selected: selectedCat === cat.name }"
            :style="{ '--tint': cat.tint }"
            type="button"
            :aria-label="`摸摸${cat.name}，${cat.breed}`"
            @click="pickCat(cat)"
          >
            <span class="cat-thumb">
              <span
                class="cat-photo"
                :style="{ backgroundPosition: cat.position }"
              ></span>
              <span class="heart">♥</span>
            </span>
            <span class="cat-info">
              <span class="breed">{{ cat.breed }}</span>
              <strong>{{ cat.name }}</strong>
              <small>{{ cat.note }}</small>
            </span>
          </button>
        </div>

        <p class="pet-result"><span>♥</span> {{ selectedCat }} 收到了一次摸摸！</p>
      </section>

      <section class="mood-section" aria-labelledby="mood-title">
        <div class="mood-stars" aria-hidden="true">✦</div>
        <div class="mood-copy">
          <p>MEOW MOOD CAPSULE</p>
          <h2 id="mood-title">抽取今日猫咪心情</h2>
        </div>
        <div class="mood-card" :class="{ rolling: moodRolling }">
          <span class="mood-emoji" aria-hidden="true">{{ mood.emoji }}</span>
          <div>
            <strong>{{ mood.title }}</strong>
            <p>{{ mood.copy }}</p>
          </div>
        </div>
        <button class="mood-button" type="button" @click="rollMood">
          <span>↻</span>
          再抽一张
        </button>
      </section>

      <footer>
        <div class="footer-cat" aria-hidden="true">
          <span class="ear left"></span>
          <span class="ear right"></span>
          <span class="face">ᴗ</span>
        </div>
        <p>今天也要被猫猫治愈呀</p>
        <small>MADE WITH LOTS OF PURR · 2026</small>
      </footer>
    </div>
  </main>
</template>
