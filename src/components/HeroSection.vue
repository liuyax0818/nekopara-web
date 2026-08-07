<script setup lang="ts">
import heroImage from '../assets/images/cat-hero.png'
</script>

<template>
  <section id="top" class="hero">
    <div class="eyebrow"><span>✦</span> 欢迎进入软乎乎地带</div>
    <h1>烦恼退散，<br /><em>猫猫登场！</em></h1>
    <p class="hero-copy">没有知识点，只有一群圆滚滚的小猫，排着队等你来摸摸。</p>

    <figure class="hero-card">
      <div class="hero-image-wrap">
        <img :src="heroImage" alt="八只不同品种的 Q 版小猫在动画风猫咪乐园里玩耍" />
        <span class="cat-count">8 位主角</span>
      </div>
      <figcaption>
        <span class="tip-paw">🐾</span>
        <span><strong>试着点点屏幕</strong>每次都会掉落不一样的猫爪印</span>
      </figcaption>
    </figure>

    <div class="scroll-hint" aria-hidden="true">
      <span></span>
      往下认识更多朋友
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  padding: 30px 20px 50px;
}

.hero::before,
.hero::after {
  position: absolute;
  z-index: 0;
  color: #efd8c7;
  content: '✦';
  pointer-events: none;
}

.hero::before { top: 104px; right: 26px; font-size: 25px; }
.hero::after { top: 178px; left: 8px; color: #dcd2f0; font-size: 14px; }

.eyebrow {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  border-radius: 999px;
  color: #a66b75;
  background: #fae9e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;

  span {
    color: var(--pink);
  }
}

h1 {
  position: relative;
  z-index: 1;
  margin: 20px 0 14px;
  color: var(--ink);
  font-family: var(--font-cute);
  font-size: clamp(42px, 12vw, 56px);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.12;

  em {
    color: var(--pink);
    font-style: normal;
    text-shadow: 0 4px 0 #ffe0dc;
  }
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 330px;
  margin: 0;
  color: #846b73;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.8;
}

.hero-card {
  position: relative;
  margin: 28px 0 0;
  overflow: hidden;
  border: 6px solid white;
  border-radius: 32px;
  background: white;
  box-shadow: 0 22px 44px rgba(115, 76, 80, 0.16), 0 6px 0 #f0d7d0;
}

.hero-image-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 25px 25px 16px 16px;

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 9 / 14.8;
    object-fit: cover;
    object-position: center;
  }

  .cat-count {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 7px 10px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 999px;
    color: #7a5c63;
    background: rgba(255, 255, 255, 0.84);
    box-shadow: 0 7px 18px rgba(83, 53, 60, 0.1);
    font-size: 10px;
    font-weight: 900;
    backdrop-filter: blur(5px);
  }
}

figcaption {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 70px;
  padding: 11px 13px 10px;
  color: #967881;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.45;

  strong {
    display: block;
    margin-bottom: 2px;
    color: #644750;
    font-size: 12px;
    font-weight: 900;
  }
}

.tip-paw {
  display: grid;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 14px;
  background: #fee5e2;
  font-size: 20px;
}

.scroll-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 30px;
  color: #a98991;
  font-size: 11px;
  font-weight: 800;

  > span {
    position: relative;
    width: 18px;
    height: 27px;
    border: 1.5px solid #d3b9be;
    border-radius: 10px;

    &::after {
      position: absolute;
      top: 5px;
      left: 50%;
      width: 3px;
      height: 5px;
      border-radius: 3px;
      background: var(--pink);
      content: '';
      transform: translateX(-50%);
      animation: scroll-dot 1.5s ease-in-out infinite;
    }
  }
}

@keyframes scroll-dot {
  0% { opacity: 0; transform: translate(-50%, 0); }
  35% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 10px); }
}

@media (max-width: 360px) {
  .hero { padding-inline: 16px; }
  h1 { font-size: 41px; }
}
</style>
