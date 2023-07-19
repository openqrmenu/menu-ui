<template>
            <header>
          <div class="mx-auto max-w-7xl">
            <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Menu</h1>
          </div>
        </header>

        <div class="relative flex gap-x-3 items-center w-full">
          <p class="hover: underline text-sm text-gray-500 mb-5">Add New Category</p>
          <p class="hover: underline text-sm text-gray-500 mb-5">Add Language</p>


          <!-- DROPDOWN -->

          <div>
            <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Switch Language</label>
            <div class="relative mt-2">
              <button type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
                  <span class="ml-3 block truncate">English</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
          
              <!--
                Select popover, show/hide based on select state.
          
                Entering: ""
                  From: ""
                  To: ""
                Leaving: "transition ease-in duration-100"
                  From: "opacity-100"
                  To: "opacity-0"
              -->
              <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <!--
                  Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
          
                  Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
                -->
                <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="font-normal ml-3 block truncate">Spanish</span>
                  </div>
          
                  <!--
                    Checkmark, only display for selected option.
          
                    Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                  -->
                  <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </li>
          
                <!-- More items... -->
              </ul>
            </div>
          </div>
          
          <!-- DROPDOWN-->

        </div>

        
        <!-- SEPARATOR -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Appetizers</span>
          </div>
        </div>

        <div class="relative flex gap-x-3 items-center w-full">
          <p class="hover: underline text-sm text-gray-500 mb-5">Add New Item</p>
          <p class="hover: underline text-sm text-gray-500 mb-5">Edit Category</p>
        </div>


        
        <!-- SEPARATOR -->

        <!-- SAMPLE MENU -->

        <ul role="list" class="divide-y divide-gray-100">
          <li class="flex justify-between gap-x-6 py-5">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/chick65.png" alt="">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" class="hover:underline">Chicken 65</a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                  Cubes hello of marinated chicken deep fried
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-6">
              <div class="sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900 whitespace-nowrap">$ 13.50</p>
                <p class="mt-1 text-xs leading-5 text-gray-500 whitespace-nowrap">Large: $ 24.66</p>
              </div>
              <div class="relative flex-none">
                <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open options</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
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
          <li class="flex justify-between gap-x-6 py-5">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/chick65.png" alt="">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" class="hover:underline">Chicken Drumsticks</a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-6">
              <div class="sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900 whitespace-nowrap">$ 12.00</p>
                <p class="mt-1 text-xs leading-5 text-gray-500"></p>
              </div>
              <div class="relative flex-none">
                <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" id="options-menu-1-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open options</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
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
                <div class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-1-button" tabindex="-1">
                  <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-1-item-0">View profile<span class="sr-only">, Michael Foster</span></a>
                  <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-1-item-1">Message<span class="sr-only">, Michael Foster</span></a>
                </div>
                -->
              </div>
            </div>
          </li>
          <li class="flex justify-between gap-x-6 py-5">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="/public/malai.png" alt="">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a href="#" class="hover:underline">Hyderabadi Onion Samosa</a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-gray-500">
                  Seasonal Samosa made in Hyderabadi or Irani Crispy style with onions, Curry Leaf and other ingredients
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-6">
              <div class="sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-gray-900 whitespace-nowrap">$ 8.04</p>
              </div>
              <div class="relative flex-none">
                <button type="button" class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900" id="options-menu-2-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open options</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
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
                <div class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-2-button" tabindex="-1">
                
                  <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-2-item-0">View profile<span class="sr-only">, Dries Vincent</span></a>
                  <a href="#" class="block px-3 py-1 text-sm leading-6 text-gray-900" role="menuitem" tabindex="-1" id="options-menu-2-item-1">Message<span class="sr-only">, Dries Vincent</span></a>
                </div>
                -->
              </div>
            </div>
          </li>

        </ul>
        

        <!-- SAMPLE MENU-->

</template>
    
<script setup>
    
</script>
    