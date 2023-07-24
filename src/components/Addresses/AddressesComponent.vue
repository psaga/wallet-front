<template>
<div class="mt-3">
    <div class="container-center" v-if="loading">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-if="!loading">
        <div v-if="!addresses.length" class="container-center">
            The wallet has no addresses
        </div>
        <button class="btn btn-light" v-if="addresses.length" @click="toogleSortByFavorite()">        
              <i class="bi bi-arrow-down"></i>
              <i :class="{ 'bi-star-fill': sortByFavorite, 'bi-star': !sortByFavorite }" class="bi"></i>
        </button>
        <ul class="list-group" v-bind:key="address.id" v-for="address in addresses">
            <li class="list-group-item address-item">
                <span class="fav-icon" @click="toogleFavoriteAddress(address)">        
                    <i :class="{ 'bi-star-fill': address.isFavorite, 'bi-star': !address.isFavorite }" class="bi"></i>
                </span>
                <div>
                    <span>
                        <router-link :to="`/address/${address.account}`">{{ address.account }}</router-link>
                    </span>
                    <span class="balance-container">
                        <span class="fw-light">{{(Number(address.balance)).toFixed(8)}} ETH</span>
                        <span class="fw-light">{{((Number(address.balance) || 0) * selectedCurrency.rate).toFixed(2)}} {{selectedCurrency.currency}}</span>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>