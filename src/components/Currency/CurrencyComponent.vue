<template>
<div class="currency-container">
    <div class="card exchange-rate-card" style="width: 18rem;">
        <div class="edit-container">
            <button v-if="!editRate" type="button" class="btn" @click="toogleEditRate()">
                <i class="bi bi-pencil-square"></i>
            </button>
            <div v-if="editRate">
                <button type="button" class="btn cancel-edit" @click="toogleEditRate()">
                    <i class="bi bi-x"></i>
                </button>
                <button type="button" class="btn save-edit" @click="saveNewRate()">
                    <i class="bi bi-check"></i>
                </button>
            </div>
        </div>
        <div class="card-body exchange-rate-body">
            <div class="card-text">
                <div class="rate-container">
                    <span>{{selectedCurrency.currency}}/ETH:</span>
                    <span v-if="!editRate">{{selectedCurrency.rate}}</span>
                    <div class="input-group input-group-sm mb-3">
                        <input v-if="editRate" :value="selectedCurrency.rate" @input="event => newExchangeRate = Number(event.target?.value)" class="form-control" placeholder="Rate" aria-label="Rate" type="number">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <p class="card-text balance-container">
                <select :value="selectedCurrency.currency" class="form-select" aria-label="Currency select" @change="toogleCurrency($event.target?.value)">
                    <option v-bind:key="exchangeRate.id" v-for="exchangeRate in exchangeRates">{{exchangeRate.currency}}</option>
                </select>
                <span>Total balance: {{((totalBalance || 0) * selectedCurrency.rate).toFixed(2)}} {{selectedCurrency.currency}}</span>            
            </p>
        </div>
    </div>
</div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
