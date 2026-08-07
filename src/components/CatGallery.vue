<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import britishImage from '../assets/cats/british.png'
import orangeImage from '../assets/cats/orange.png'
import lihuaImage from '../assets/cats/lihua.png'
import maineImage from '../assets/cats/maine.png'
import ragdollImage from '../assets/cats/ragdoll.png'
import siameseImage from '../assets/cats/siamese.png'
import calicoImage from '../assets/cats/calico.png'
import tuxedoImage from '../assets/cats/tuxedo.png'
import persianImage from '../assets/cats/persian.png'
import sphynxImage from '../assets/cats/sphynx.png'
import abyssinianImage from '../assets/cats/abyssinian.png'
import bengalImage from '../assets/cats/bengal.png'

interface Cat {
  name: string
  breed: string
  note: string
  image: string
  tint: string
}

const cats: Cat[] = [
  { name: '团子', breed: '英短', note: '正在认真发呆', image: britishImage, tint: '#c9c0ee' },
  { name: '橘宝', breed: '橘猫', note: '随时准备开饭', image: orangeImage, tint: '#ffd69d' },
  { name: '虎妞', breed: '狸花', note: '巡逻每颗毛线球', image: lihuaImage, tint: '#c9e7bd' },
  { name: '森林', breed: '缅因', note: '威风外表软内心', image: maineImage, tint: '#f2bccb' },
  { name: '棉花', breed: '布偶', note: '蓝眼睛会放电', image: ragdollImage, tint: '#badff5' },
  { name: '焦糖', breed: '暹罗', note: '话多又很黏人', image: siameseImage, tint: '#ffe39b' },
  { name: '花卷', breed: '三花', note: '每天都有新主意', image: calicoImage, tint: '#ffc5ae' },
  { name: '警长', breed: '奶牛猫', note: '负责把家拆得整齐', image: tuxedoImage, tint: '#bde5e6' },
  { name: '雪球', breed: '波斯', note: '蓬松得像一朵云', image: persianImage, tint: '#f5c6d3' },
  { name: '桃桃', breed: '无毛猫', note: '自带暖手宝功能', image: sphynxImage, tint: '#cdbdef' },
  { name: '栗子', breed: '阿比西尼亚', note: '好奇心永不关机', image: abyssinianImage, tint: '#badcf1' },
  { name: '豹豹', breed: '孟加拉', note: '跑酷选手已上线', image: bengalImage, tint: '#ffe394' },
]

function sampleCats(excludedNames: ReadonlySet<string> = new Set()): Cat[] {
  const shuffled = cats.filter((cat) => !excludedNames.has(cat.name))

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled.slice(0, 4)
}

const firstBatch = sampleCats()
const visibleCats = ref<Cat[]>(firstBatch)
const selectedCat = ref<string | null>(null)
const isShuffling = ref(false)
let shuffleTimer: number | undefined

function shuffleCats(): void {
  if (isShuffling.value) return

  isShuffling.value = true
  const currentNames = new Set(visibleCats.value.map((cat) => cat.name))
  const nextBatch = sampleCats(currentNames)

  visibleCats.value = nextBatch
  selectedCat.value = null
  shuffleTimer = window.setTimeout(() => {
    isShuffling.value = false
    shuffleTimer = undefined
  }, 680)
}

onBeforeUnmount(() => {
  if (shuffleTimer !== undefined) window.clearTimeout(shuffleTimer)
})
</script>

<template>
  <section class="cat-section" aria-labelledby="cat-title">
    <div class="section-label">MEET THE CATS · 12 FRIENDS</div>
    <div class="section-heading">
      <h2 id="cat-title">这次谁来营业？</h2>
      <button
        class="shuffle-button"
        :class="{ 'is-shuffling': isShuffling }"
        type="button"
        :disabled="isShuffling"
        :aria-busy="isShuffling"
        @click="shuffleCats"
      >
        <span>↻</span> 换一批
      </button>
    </div>
    <p class="section-copy">每次随机遇见四位猫猫朋友，点一下就能送出摸摸。</p>

    <p class="pet-result" aria-live="polite">
      <template v-if="selectedCat"><span>♥</span> {{ selectedCat }} 收到了一次摸摸！</template>
      <template v-else><span>♡</span> 选一只猫猫，送出摸摸吧！</template>
    </p>

    <TransitionGroup name="cat-shuffle" tag="div" class="cat-grid" aria-live="polite">
      <button
        v-for="(cat, index) in visibleCats"
        :key="cat.name"
        class="cat-card"
        :class="{ selected: selectedCat === cat.name }"
        :style="{ '--tint': cat.tint, '--index': index }"
        type="button"
        :aria-label="`摸摸${cat.name}，${cat.breed}`"
        @click="selectedCat = cat.name"
      >
        <span class="cat-visual">
          <img :src="cat.image" alt="" aria-hidden="true" />
          <span class="heart">♥</span>
        </span>
        <span class="cat-info">
          <span class="breed">{{ cat.breed }}</span>
          <strong>{{ cat.name }}</strong>
          <small>{{ cat.note }}</small>
        </span>
      </button>
    </TransitionGroup>

  </section>
</template>

<style scoped lang="scss">
.cat-section {
  padding: 62px 20px 66px;
  background:
    radial-gradient(circle at 10% 22%, rgba(255, 255, 255, 0.75) 0 3px, transparent 4px) 0 0 / 24px 24px,
    linear-gradient(180deg, #fbeae5, #fff6ef);

  .section-label {
    margin-bottom: 8px;
    color: #ae737b;
    font-family: var(--font-round);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.1em;
  }

  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    h2 {
      margin: 0;
      color: var(--ink);
      font-family: var(--font-cute);
      font-size: 29px;
      font-weight: 400;
      letter-spacing: -0.02em;
    }

    .shuffle-button {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: 5px;
      padding: 8px 11px;
      border: 1px solid #edcbd0;
      border-radius: 999px;
      color: #9b626e;
      background: rgba(255, 255, 255, 0.86);
      box-shadow: 0 4px 0 #efd4d5;
      font-size: 11px;
      font-weight: 900;
      cursor: pointer;
      transition: color 180ms ease, background 180ms ease, transform 180ms ease, box-shadow 180ms ease;

      span {
        font-size: 15px;
      }

      &:active {
        box-shadow: 0 2px 0 #efd4d5;
        transform: translateY(2px);
      }

      &.is-shuffling {
        color: #b16f7d;
        background: #fff5f5;
        cursor: wait;

        span {
          animation: shuffle-spin 620ms cubic-bezier(0.32, 0.72, 0.28, 1);
        }
      }

      &:disabled {
        opacity: 0.82;
      }
    }
  }

  .section-copy {
    margin: 10px 0 24px;
    color: #997c83;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.65;
  }

  .cat-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    align-items: start;
  }

  .cat-shuffle-enter-active {
    animation: cat-card-arrive 520ms cubic-bezier(0.2, 0.86, 0.25, 1.2) backwards;
    animation-delay: calc(var(--index) * 55ms);
  }

  .cat-shuffle-leave-active {
    position: absolute;
    width: calc((100% - 14px) / 2);
    transition: opacity 220ms ease, transform 220ms ease, filter 220ms ease;
  }

  .cat-shuffle-leave-to {
    opacity: 0;
    filter: blur(3px);
    transform: translateY(-16px) rotate(-3deg) scale(0.82);
  }

  .cat-shuffle-move {
    transition: transform 430ms cubic-bezier(0.22, 0.8, 0.25, 1);
  }

  .cat-card {
    display: block;
    min-width: 0;
    padding: 0;
    overflow: hidden;
    border: 2px solid transparent;
    border-radius: 24px;
    text-align: left;
    background: white;
    box-shadow: 0 11px 24px rgba(101, 65, 74, 0.09);
    cursor: pointer;
    transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;

    &:active {
      transform: scale(0.97);
    }

    &.selected {
      border-color: var(--pink);
      box-shadow: 0 13px 28px color-mix(in srgb, var(--tint) 42%, transparent);

      .cat-visual {
        img {
          animation: cat-bounce 480ms ease;
        }

        .heart {
          color: var(--pink);
          transform: scale(1.15) rotate(-7deg);
          animation: heartbeat 480ms ease;
        }
      }
    }

    .cat-visual {
      position: relative;
      display: grid;
      width: 100%;
      aspect-ratio: 1;
      place-items: center;
      overflow: hidden;
      background:
        radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.58) 0 8px, transparent 9px),
        radial-gradient(circle at 82% 76%, rgba(255, 255, 255, 0.35) 0 20px, transparent 21px),
        linear-gradient(145deg, color-mix(in srgb, var(--tint) 82%, white), var(--tint));

      &::after {
        position: absolute;
        right: 12px;
        bottom: 10px;
        width: 38px;
        height: 38px;
        border: 1px solid rgba(255, 255, 255, 0.42);
        border-radius: 50%;
        content: '';
      }

      img {
        position: relative;
        z-index: 1;
        display: block;
        width: 96%;
        height: 96%;
        object-fit: contain;
        filter: drop-shadow(0 8px 8px rgba(89, 59, 66, 0.12));
        transition: transform 220ms ease;
      }

      .heart {
        position: absolute;
        z-index: 2;
        top: 10px;
        right: 10px;
        display: grid;
        width: 32px;
        height: 32px;
        place-items: center;
        border-radius: 50%;
        color: #cbb4ba;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 12px rgba(75, 47, 54, 0.09);
        font-size: 14px;
        transition: color 180ms ease, transform 220ms ease;
      }
    }

    .cat-info {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 4px 8px;
      min-height: 96px;
      padding: 13px 13px 15px;

      .breed {
        grid-column: 1 / -1;
        width: max-content;
        padding: 4px 8px;
        border-radius: 999px;
        color: #73535c;
        background: color-mix(in srgb, var(--tint) 65%, white);
        font-size: 10px;
        font-weight: 900;
      }

      strong {
        grid-column: 1 / -1;
        color: #5a3e47;
        font-family: var(--font-cute);
        font-size: 20px;
        font-weight: 400;
      }

      small {
        grid-column: 1 / -1;
        overflow: hidden;
        color: #9e858b;
        font-size: 10px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .pet-result {
    width: max-content;
    max-width: 100%;
    margin: 0 auto 26px;
    padding: 10px 14px;
    border: 1px dashed #dfb9c0;
    border-radius: 14px;
    color: #8f626c;
    background: rgba(255, 255, 255, 0.74);
    font-size: 12px;
    font-weight: 800;

    span {
      margin-right: 4px;
      color: var(--pink);
    }
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1.15) rotate(-7deg); }
  50% { transform: scale(1.42) rotate(5deg); }
}

@keyframes cat-bounce {
  0%, 100% { transform: translateY(0) rotate(0); }
  45% { transform: translateY(-7px) rotate(-2deg); }
}

@keyframes shuffle-spin {
  0% { transform: rotate(0) scale(1); }
  50% { transform: rotate(200deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes cat-card-arrive {
  0% {
    opacity: 0;
    filter: blur(3px);
    transform: translateY(20px) rotate(3deg) scale(0.76);
  }
  65% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(-5px) rotate(-1deg) scale(1.025);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) rotate(0) scale(1);
  }
}

@media (max-width: 360px) {
  .cat-section {
    padding-inline: 16px;

    .cat-grid {
      gap: 11px;
    }

    .cat-card .cat-info {
      min-height: 92px;
      padding-inline: 11px;
    }
  }
}
</style>
