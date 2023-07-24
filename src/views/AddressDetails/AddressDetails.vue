<template>
    <div class="container-fluid mt-3">
        <button type="button" class="btn btn-outline-danger" role="button" @click="deleteAddress()">Delete Address</button>
    </div>
    <div class="container-lg mt-3">
        <Currency :totalBalance="Number(currentAddress.balance || 0)"/>
        <div v-if="currentAddress.isOld" class="mt-3 alert alert-danger wallet-old" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i> Wallet is old
        </div>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
.wallet-old {
    display: flex;
    gap: 5px;
}
</style>