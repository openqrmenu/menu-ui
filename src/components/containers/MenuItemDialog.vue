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
                                <h2 class="text-base font-semibold leading-7 text-gray-900">New Menu Item</h2>

                                <!-- LANG-->
                                <div>
                                    <label id="listbox-label"
                                        class="block text-sm font-medium leading-6 text-gray-900">Editing for
                                        Language</label>
                                    <span class="flex items-center">
                                        <span :class="getCountryClass(lang)"></span>
                                        <span class="ml-3 block truncate">{{ currLanguage }}</span>
                                    </span>

                                </div>

                                <!-- LANG-->


                                <div class="mt-1 gap-x-6 gap-y-8">
                                    <div class="sm:col-span-4">
                                        <label for="menuitemname"
                                            class="block text-sm font-medium leading-6 text-gray-900">Item Name</label>
                                        <div class="mt-2">
                                            <input ref="target" v-model="menuitemname" type="text" name="menuitemname"
                                                id="menuitemname"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-4">
                                        <label for="menuitemdescription"
                                            class="block mt-3 text-sm font-medium leading-6 text-gray-900">Item
                                            Description</label>
                                        <div class="mt-2">
                                            <input v-model="menudescription" type="text" name="menuitemdescription"
                                                id="menuitemdescription"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-4">
                                        <label for="menuitemprice"
                                            class="block mt-3 text-sm font-medium leading-6 text-gray-900">Item
                                            Price</label>
                                        <div class="mt-2">
                                            <input v-model="menuitemprice" type="text" name="menuitemprice"
                                                id="menuitemprice"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-4">
                                        <label for="menuitemprice"
                                            class="block mt-3 text-sm font-medium leading-6 text-gray-900">Enabled</label>
                                        <div class="mt-2">
                                            <Switch v-model="menuitemenabled" :class="[menuitemenabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                                                <span class="sr-only">Use setting</span>
                                                <span aria-hidden="true" :class="[menuitemenabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                            </Switch>

                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" @click="$emit('DialogClose')"
                                class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="button" @click="onSave"
                                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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
import { ref, onMounted, computed } from 'vue'
import { useFocus } from '@vueuse/core'
import LangDropDown from '../generic/LangDropDown.vue';
import { addMenuItem, updateMenuItem } from '../../utils/api.js'
import { getLanguageName, getCountryCode } from '../../utils/lang';
import { _ } from 'lodash';
import { Switch } from '@headlessui/vue'

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const routeid = route.params.id;
const store = useStore()

const emit = defineEmits(['DialogClose'])
const menuitemname = ref('')
const menudescription = ref('')
const menuitemprice = ref('')
const menuitemenabled = ref(true);
const target = ref()

const menucard = store.getters.getMenuForId(routeid)

const { focused } = useFocus(target, { initialValue: true })

const props = defineProps(
    {
        menucategory: {
            type: Object,
            default: (() => { })
        },
        lang: {
            type: String,
            default: ""
        },
        menuitem: {
            type: Object,
            default: (() => { })
        },
        edit: {
            type: Boolean,
            default: false
        }
    })


onMounted(() => {
    const obj = getData();
    menuitemname.value = obj.name;
    menudescription.value = obj.description;
    menuitemprice.value = obj.price;
    menuitemenabled.value = obj.enabled;
})


function getData() {
    if (!props.edit)
        return { name: "", description: "", price: "0.0", enabled: true };


    const entry = props.menuitem.details.find(item => {
        if (item.language == props.lang) {
            return true;
        }
        return false;
    });
    if (entry == undefined) {
        // Return the first available one
        return { name: props.menuitem.details[0].name, description: props.menuitem.details[0].description, price: props.menuitem.price, enabled: props.menuitem.enabled }
    }
    return { name: entry.name, description: entry.description, price: props.menuitem.price, enabled: props.menuitem.enabled };
}

function getCountryClass(code)
{
  const country = getCountryCode(code);
  return  "fi fi-" + country;
}



function setData(name, description, price, enabled) {
    const copy = _.cloneDeep(props.menuitem);
    const entry = copy.details.find(item => {
        if (item.language == props.lang) {
            return true;
        }
        return false;
    });
    if (entry == undefined) {
        copy.details.push({ language: props.lang, name: name, description: description, enabled: enabled });
        return copy;
    }
    entry.name = name;
    entry.description = description;
    copy.price = price;
    copy.enabled = enabled;

    return copy;
}


function onSave() {
    if (!props.edit) {

        const menuitem = {
            menucardid: menucard._id,
            type: "menuitem",
            parentid: props.menucategory.category._id,
            price: menuitemprice.value,
            enabled: menuitemenabled.value,
            details: [{ language: props.lang, name: menuitemname.value, description: menudescription.value }]
        };


        addMenuItem(menuitem).then(function (response) {
            store.dispatch("getCurrentMenu", menucard._id);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
            });
    }
    else {
        const item = setData(menuitemname.value, menudescription.value, menuitemprice.value, menuitemenabled.value);
        updateMenuItem(item).then(function (response) {
            store.dispatch("getCurrentMenu", props.menuitem.menucardid);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
            });
    }
    emit('DialogClose')
}

const currLanguage = computed(() => {
    return getLanguageName(props.lang);
})


</script>
