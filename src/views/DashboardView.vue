<template>
<div class="min-h-full">

<AppHeader></AppHeader>
<AppMain></AppMain>

</div>
</template>

<script setup>
import AppHeader from '../components/containers/AppHeader.vue';
import AppMain from '../components/containers/AppMain.vue'
components:  {
    AppHeader, AppMain
}

</script>

