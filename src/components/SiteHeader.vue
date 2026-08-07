<template>
  <header class="topbar">
    <a class="brand" href="#top" aria-label="回到猫猫乐园顶部">
      <span class="brand-mark">猫</span>
      <span>MEOW PARK</span>
    </a>
    <span class="open-pill"><i></i> 今日营业中</span>
  </header>
</template>

<style scoped lang="scss">
.topbar {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  padding: max(18px, env(safe-area-inset-top)) 20px 10px;

  .brand {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--ink);
    font-family: var(--font-round);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-decoration: none;

    &-mark {
      display: grid;
      width: 36px;
      height: 36px;
      place-items: center;
      border-radius: 13px 13px 15px 15px;
      color: white;
      background: var(--pink);
      box-shadow: 0 5px 0 #d85b73;
      font-family: var(--font-cute);
      font-size: 17px;
      transform: rotate(-4deg);
    }
  }

  .open-pill {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 11px;
    border: 1px solid #eadbd4;
    border-radius: 999px;
    color: #876a72;
    background: rgba(255, 255, 255, 0.82);
    font-size: 11px;
    font-weight: 800;

    i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #62b783;
      box-shadow: 0 0 0 4px rgba(98, 183, 131, 0.14);
      animation: pulse 1.8s ease-in-out infinite;
    }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.8); }
}
</style>
