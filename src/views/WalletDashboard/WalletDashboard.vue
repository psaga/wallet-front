<template>
    <div class="container-fluid mt-3">
        <button type="button" class="btn btn-light" data-bs-toggle="modal" href="#addNewAddressModal" role="button">Add New Address</button>
    </div>
    <div class="container-lg mt-3">
        <Currency :totalBalance="totalBalance"/>
        <Addresses />
    </div>
    <ModalNewAddress />
</template>
<script lang="ts" src="./index.ts"></script>
