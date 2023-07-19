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
    <Menu></Menu>
    
    </div>
    </template>
    
    <script setup>
    import AppHeader from '../components/containers/AppHeader.vue';
    import Menu from '../components/containers/Menu.vue'
    components:  {
        AppHeader, Menu
    }
    
    </script>
    
    