<template>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex gap-x-4">
            <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/chick65.png" alt=""> -->
            <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                    <a href="#" class="hover:underline"> {{ data.details[0].name }}</a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                    {{ data.details[0].description }}
                </p>
            </div>
        </div>
        <div class="flex items-center gap-x-6">
            <div class="sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900 whitespace-nowrap">{{ data.currencysymbol }} {{ data.price }}</p>
                <p class="mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">{{ otherpricing}}</p>
            </div>
            <div class="relative flex-none">
                <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                    id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open options</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                    </svg>
                </button>

                <!--
              Dropdown menu, show/hide based on menu state.
    
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                <!-- 
            <div class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-0-button" tabindex="-1">
              <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-0">View profile<span class="sr-only">, Leslie Alexander</span></a>
              <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-0-item-1">Message<span class="sr-only">, Leslie Alexander</span></a>
            </div>
            -->
            </div>
        </div>
    </li>



    <!-- SAMPLE MENU-->
</template>
    
<script setup>

import { ref, computed, onMounted } from 'vue';

const props = defineProps(
    {
        data: {
            type: Object,
            default: (() => { })
        },
    })
const mystring = "hello world"

onMounted(() => {

})

const otherpricing = computed(() => {
    var combined = "";
    var otherprice;
    for (otherprice of props.data.otherprice)
    {
        combined = combined + " " + otherprice.description + " : "+ props.data.currencysymbol + otherprice.price
    }
    return combined
})

</script>
    