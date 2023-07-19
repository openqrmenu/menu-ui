<template>
    <button @click="$emit('IconButtonClicked')" type="button" class="-m-1.5 flex items-center p-1.5" aria-expanded="false" 
        aria-haspopup="true">
        <span class="sr-only">Open user menu</span>

        <span class="lg:flex lg:items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  class="w-5 h-5" :fill="color">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>
        </span>
    </button>
</template>

<script setup>
import {ref, computed } from 'vue';

const props = defineProps(
    {
        color: {
            type: String,
            default: "rgb(107 114 128)" // equates to tailwind css text-gray-500
        },
        icon: {
            type: String,
            default: "ellipsis" // this is ellippses icon
        }
    })




</script>