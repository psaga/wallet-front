<template>
<div class="modal fade" ref="modalAddNewAddress" id="addNewAddressModal" aria-hidden="true" aria-labelledby="addNewAddressModal" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addNewAddressModal">Add New Address</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="form-floating">
                    <input v-model="newAddress" id="addressInput" :class="{ 'is-invalid': invalidAddress || repeatedAddress }" type="text" class="form-control" placeholder="ETH Address" aria-label="ETH Address">
                    <label for="addressInput" v-if="repeatedAddress">A duplicate address has been entered.</label>
                    <label for="addressInput" v-if="invalidAddress">An invalid address has been entered.</label>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="addNewAddress()">Add</button>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts" src="./index.ts"></script>
