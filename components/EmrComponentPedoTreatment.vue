<script setup>

const props = defineProps (
{
    title: String,
    header: Array,
    forms: Object,
    apis: Object,
    idemr: String,
});

const datatableBody = reactive (
{
    isLoaded: false,
    isAccessorDialog: false,
    isMutatorDialog: false,

    search: "",

    icon: "mdi-tooth-outline",

    headers: props.header,

    itemsIsLoading: false,
    itemsLength: 0,
    itemPerPage: 0,
    itemNextPageUrl: "",
    itemPreviousPageUrl: "",
    item: {},
    items: [],

    forms: props.forms,
});

const showDialog = () =>
{
    datatableBody.isMutatorDialog = true;
};

const closeDialog = () =>
{
    datatableBody.isMutatorDialog = false;
};

const clearForms = async () =>
{
    datatableBody.forms = {};
    datatableBody.item = {};

    await nextTick ();
};

const findItem = (target) => datatableBody.items.indexOf (datatableBody.items.find (item => item.id == target));

const getAnItem = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItemPostMethod, } = useItem (tokenData),
    formTarget = {
        "id" : target,
    };

    await getItemPostMethod (props.apis.getItem, "-",formTarget,
    success =>
    {
        datatableBody.item = success.data;

          for (let form of Object.keys (props.forms)) {
            datatableBody.forms[form] = datatableBody.item[form];
            }

    },
    error => {});
};

const getItems = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItemPostMethod, } = useItem (tokenData),
    formTarget = {
        "emrid" : props.idemr,
    };
    await getItemPostMethod (props.apis.getAllItems + "?page=" + (typeof target === "object" ? target.page : target), "",formTarget,
    (success, total, per_page, next_page_url, prev_page_url, first_page_url, last_page_url) =>
    {
        console.log(success)
        datatableBody.items = success;
        datatableBody.itemsLength = total;
        datatableBody.itemPerPage = per_page;
        datatableBody.itemNextPageUrl = next_page_url;
        datatableBody.itemPreviousPageUrl = prev_page_url;
        datatableBody.isLoaded = true;
        closeDialog ();
    },
    error => {});
};

const setAnItem = async (target) =>
{
    
    const
    { token: tokenData, getUser } = await useAuth(),
        userData = await getUser(tokenData),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (props.forms)) {
        formTarget[form] = datatableBody.forms[form];
    }
    formTarget.emrid = props.idemr;
    formTarget.datetreatmentplanentry = "2024-02-24";
    formTarget.userentry = userData.id;
    formTarget.userentryname = userData.name;

    await setItem (props.apis.updateItem, target,
    formTarget,
    (success) =>
    {
        //datatableBody.items[findItem (success.id)] = success;
        getItems();
        clearForms ();
        closeDialog ();
    },
    error => {});
};

const setItems = async (target) =>
{
    const

    { token: tokenData, getUser } = await useAuth(),
        userData = await getUser(tokenData),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (props.forms)) {
        formTarget[form] = datatableBody.forms[form];
    }
    formTarget.emrid = props.idemr;
    formTarget.userentry = userData.id;
    formTarget.userentryname = userData.name;

    await setItem (props.apis.createItem, "",
    formTarget,
    (success) =>
    {
        //datatableBody.items.unshift (success.data);
        getItems();
        clearForms ();
        closeDialog ();
    },
    error => {
        alert(error.data.message)
    });
};

const DeleteItem = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {
        "id" : target,
        "active": "0"
    };


    await setItem (props.apis.deleteItem, "",
    formTarget,
    (success) =>
    {
        if (success.code == 200){
            // const index = findItem (success.data.id);
            // if (index > -1) { 
            //     datatableBody.items.splice(index, 1); 
            // }
            getItems();
            alert(success.message)
        }else{
            alert(success.message)
        }
    },
    error => {
        alert(error.data.message)
    });
};

// defineExpose({
//     getItems
// });

onBeforeMount (async () =>
{
    clearForms ();
});

onMounted (async () =>
{
    await getItems ({ page: 1, });
});

</script>

<template>
    <v-layout v-if="datatableBody.isLoaded">
        <v-data-table-server item-value="id" @update:options="getItems" :headers="datatableBody.headers" :items="datatableBody.items" :items-length="datatableBody.itemsLength" v-model:items-per-page="datatableBody.itemPerPage" :loading="datatableBody.itemsIsLoading">
            <template v-slot:top>
                <v-toolbar color="#D3D3D3">
                    <!-- <v-breadcrumbs :items="title">
                        <template v-slot:prepend>
                            <v-icon :icon="datatableBody.icon"></v-icon>
                        </template>
                        <template v-slot:divider>
                            <v-icon icon="mdi-forward"></v-icon>
                        </template>
                    </v-breadcrumbs> -->
                    <span class="font-weight-black px-5">{{ title }}</span>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="datatableBody.isMutatorDialog">
                        <template v-slot:activator="{ properties, }">
                            <v-btn @click="getItems({ page: 1, })" icon="mdi mdi-refresh-circle" color="secondary" title="Refresh"></v-btn>
                            <v-btn @click="showDialog" v-bind="properties" icon="mdi mdi-plus-box" color="primary" title="Add New"></v-btn>
                        </template>
                        <template v-slot:default="{ isActive, }">
                            <v-card width="550" min-height="480px" class="mx-auto">
                                <v-card-text>
                                    <slot name="form" :state="datatableBody.isMutatorDialog" :forms="datatableBody.forms" />
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="clearForms (); closeDialog ();" color="red" variant="outlined">{{ $t ("action.button.close") }}</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="Object.keys (datatableBody.item).length" @click="setAnItem (datatableBody.item.id);" color="blue" variant="outlined">{{ $t ("action.button.save") }}</v-btn>
                                    <v-btn v-else @click="setItems " color="blue" variant="outlined">{{ $t ("action.button.save") }}</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item, index, }">
                <v-dialog v-model="datatableBody.isAccessorDialog" transition="dialog-bottom-transition" fullscreen>
                    <template v-slot:default="{ isActive, }">
                        <v-card>
                            <v-card-title>
                                <v-toolbar color="#800000">
                                    <v-btn @click="datatableBody.isAccessorDialog = false; clearForms ();" icon><v-icon>mdi-close</v-icon></v-btn>
                                </v-toolbar>
                            </v-card-title>
                            <v-card-text>
                                <slot name="item" :state="datatableBody.isAccessorDialog" :item="datatableBody.item" />
                            </v-card-text>
                        </v-card>
                    </template>
                </v-dialog>
                <v-btn @click="datatableBody.isAccessorDialog = true; getAnItem (item.id);" icon="mdi-eye" color="light-green-darken-4" class="mx-2" variant="text" density="compact"></v-btn>
                <v-btn @click="showDialog (); getAnItem (item.id);" icon="mdi-pencil" color="lime-darken-4" class="mx-2" variant="text" density="compact"></v-btn>
                <v-btn @click="DeleteItem (item.id);" icon="mdi mdi-delete-circle" color="red-darken-4" class="mx-2" variant="text" density="compact"></v-btn>
            </template>
        </v-data-table-server>
    </v-layout>
</template>
