<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
        <a class="navbar-brand nav-bar-btn" @click="$router.push('/')">
          <img src="@/assets/eth-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            Dashboard Wallet
        </a>
    </div>
  </nav>
</template>
<style lang="scss">
.nav-bar-btn {
  cursor: pointer;
}
</style>