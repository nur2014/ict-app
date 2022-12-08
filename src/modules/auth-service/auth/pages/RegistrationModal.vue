<template>
    <div>
  <div class="text-center">
       <router-link :to="{ name: 'authSignUp.sign_up' }">
            Farmer Sign Up
        </router-link>
    </div>
    <div class="text-center">
       <router-link :to="{ name: 'auth.e_registration' }">
            WareHouseUser Sign Up
        </router-link>
    </div>
    </div>
</template>
<script>
export default {
}
</script>
<style>
</style>
