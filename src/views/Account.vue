<template>
  <div id="account">
    <ec-account
      @login="login"
      :customer.sync="customer"
    />
  </div>
</template>
<script src="./js/Account.js"></script>