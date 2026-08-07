<script setup lang="ts">
import PawTrail from './components/PawTrail.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import CatGallery from './components/CatGallery.vue'
import MoodCapsule from './components/MoodCapsule.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <main class="page">
    <PawTrail />
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>

    <div class="phone-shell">
      <SiteHeader />
      <HeroSection />
      <CatGallery />
      <MoodCapsule />
      <SiteFooter />
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 9% 12%, rgba(255, 239, 187, 0.78), transparent 28rem),
    radial-gradient(circle at 92% 46%, rgba(234, 173, 195, 0.48), transparent 30rem),
    #e9ddd6;

  .phone-shell {
    position: relative;
    z-index: 1;
    width: min(100%, 480px);
    min-height: 100svh;
    margin: 0 auto;
    overflow: hidden;
    background: var(--cream);
    box-shadow: 0 0 70px rgba(79, 51, 58, 0.16);
  }

  .ambient {
    position: fixed;
    z-index: 0;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 50%;
    pointer-events: none;

    &-one {
      top: 4%;
      left: -110px;
    }

    &-two {
      right: -120px;
      bottom: 12%;
      width: 250px;
      height: 250px;
    }
  }
}

@media (min-width: 700px) {
  .page {
    .phone-shell {
      margin-block: 28px;
      border-radius: 40px;
    }
  }
}
</style>
