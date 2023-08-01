<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>


        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">


                    <!-- FORM -->

                    <form>
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">New Category</h2>

                                <!-- LANG-->
                                <div>
                                    <label id="listbox-label"
                                        class="block text-sm font-medium leading-6 text-gray-900">Switch Language</label>
                                    <LangDropDown :menucard="props.menucard"></LangDropDown>
                                </div>

                                <!-- LANG-->


                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-4">
                                        <label for="username"
                                            class="block text-sm font-medium leading-6 text-gray-900">Category Name</label>
                                        <div class="mt-2">
                                            <input ref="target" v-model="categoryname" type="text" name="first-name"
                                                id="first-name" autocomplete="given-name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" @click="$emit('DialogClose')"
                                class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="button" @click="onSave"
                                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </form>

                    <!-- FORM -->


                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useFocus } from '@vueuse/core'
import LangDropDown from '../generic/LangDropDown.vue';
import { addMenuItem } from '../../utils/api.js'

const emit = defineEmits(['DialogClose'])
const store = useStore()
const categoryname = ref('')
const target = ref()

const { focused } = useFocus(target, { initialValue: true })

const props = defineProps(
    {
        menucard: {
            type: Object,
            default: (() => { })
        },
        
    })

function onSave() {
    const category = {
        menucardid: props.menucard._id,
        type: "category",
        parentid: "",
        price: 0,
        details: [{ language: "en", name: categoryname.value, description: "" }]
    };


    addMenuItem(category).then(function (response) {
        store.dispatch("getCurrentMenu", props.menucard._id);
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
        });
    emit('DialogClose')
}

onMounted(() => {
 //console.log(props.menucard);
})

</script>
