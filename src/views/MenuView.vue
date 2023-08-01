<template>
    <!--
      This example requires updating your template:
    
      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
    <div class="min-h-full">
    
    <AppHeader></AppHeader>
    <Menu :id="routeid" :lang="lang" ></Menu>
    
    </div>
    </template>
    
    <script setup>
    import AppHeader from '../components/containers/AppHeader.vue';
    import Menu from '../components/containers/Menu.vue'
    import { useRouter, useRoute } from 'vue-router'
    import { ref, computed } from 'vue';
    const route = useRoute()
    const routeid = route.params.id;
    const lang = route.query.lang;

    
     components:  {
        AppHeader, Menu
    }
    
    </script>
    
    