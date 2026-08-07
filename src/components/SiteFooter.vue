<template>
  <footer>
    <div class="footer-cat" aria-hidden="true">
      <span class="ear left"></span>
      <span class="ear right"></span>
      <span class="face">ᴗ</span>
    </div>
    <p>今天也要被猫猫治愈呀</p>
    <small>MADE WITH LOTS OF PURR · 2026</small>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 72px 20px calc(34px + env(safe-area-inset-bottom));
  text-align: center;
  background: var(--cream);

  .footer-cat {
    position: relative;
    display: grid;
    width: 50px;
    height: 43px;
    margin: 0 auto 13px;
    place-items: center;
    border-radius: 48% 48% 44% 44%;
    color: #94737b;
    background: #f0d4ca;
    font-size: 17px;
    font-weight: 900;

    .ear {
      position: absolute;
      top: -7px;
      width: 17px;
      height: 17px;
      border-radius: 4px 1px 8px 2px;
      background: #f0d4ca;
      transform: rotate(45deg);

      &.left { left: 3px; }
      &.right { right: 3px; }
    }

    .face {
      position: relative;
      z-index: 1;
    }
  }

  p {
    margin: 0 0 7px;
    color: #735761;
    font-family: var(--font-cute);
    font-size: 17px;
  }

  small {
    color: #bba1a7;
    font-family: var(--font-round);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.1em;
  }
}
</style>
