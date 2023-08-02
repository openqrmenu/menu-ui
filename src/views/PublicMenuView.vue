<template>
    <div class="min-h-full">
   
    <Menu :id="routeid" :lang="lang" :public="true"></Menu>
    
    </div>
    </template>
    
    <script setup>
    import Menu from '../components/containers/Menu.vue'
    import { useRouter, useRoute } from 'vue-router'
    import { ref, computed } from 'vue';
    const route = useRoute()
    const routeid = route.params.id;
    const lang = route.query.lang ??= 'en';

         components:  {
         Menu
    }
    
    </script>
    
    