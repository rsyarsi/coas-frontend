<script setup>

const props = defineProps (
{
    badge: Array,
    header: Array,
    forms: Object,
    apis: Object,

    fnApiGetItem: Function,
    fnUpdateItem: Function,
    fnApiExportItems: Function,
});

const datatableBody = reactive (
{
    isLoaded: false,
    isAccessorDialog: false,
    isMutatorDialog: false,

    searchables: [],
    searchBy: "",
    search: "",

    icon: "mdi-hospital-building",

    headers: props.header,

    itemsIsLoading: false,
    itemsLength: 0,
    itemPerPage: 10,
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
    datatableBody.forms = props.forms;
    datatableBody.item = {};

    await nextTick ();
};

const findItem = (target) => datatableBody.items.indexOf (datatableBody.items.find (item => item.id == target));

const getAnItem = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, } = useItem (tokenData);

    await getItem (props.apis.getItem, target,
    success =>
    {
        datatableBody.item = success;

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
    { getItem, } = useItem (tokenData),

    limitBy = () => "limit=" + datatableBody.itemPerPage + "&",
    orderBy = () =>
    {
        let by = toRaw (target.sortBy) ?? [];

        if (by.length) {

            let { order, key, } = by[0];

            if (order == "asc") {

                return "order=" + key + "&";

            } else if (order == "desc") {

                return "order=-" + key + "&";
            }

        } else {

            return "";
        }
    },
    filterBy = () =>
    {
        if (datatableBody.searchables.length && datatableBody.searchBy && target.search) {

            return "filter[" + datatableBody.searchBy + "]=" + target.search + "&";

        } else {

            return "";
        }
    };

    await getItem (props.apis.getAllItems + "?"
    + orderBy ()
    + filterBy ()
    + limitBy ()
    + "current_page=" + (typeof target === "object" ? target.page : target),
    "",
    (success, total, per_page, next_page_url, prev_page_url, first_page_url, last_page_url) =>
    {
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

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (props.forms)) {

        formTarget[form] = datatableBody.forms[form];
    }

    await setItem (props.apis.updateItem, target,
    formTarget,
    (success) =>
    {
        datatableBody.items[findItem (success.id)] = { ...datatableBody.items[findItem (success.id)], ...success, };

        clearForms ();
        closeDialog ();
    },
    error => {});
};

const setItems = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (props.forms)) {

        formTarget[form] = datatableBody.forms[form];
    }

    await setItem (props.apis.createItem, "",
    formTarget,
    (success) =>
    {
        datatableBody.items.unshift (success);

        clearForms ();
        closeDialog ();
    },
    error => {});
};

//

const fnApiGetItem = props.apis.fnApiGetItem ?? (async (item) =>
{
    datatableBody.isAccessorDialog = true;

    await getAnItem (item.id);
});

const fnUpdateItem = props.apis.fnUpdateItem ?? (async (item) => {

    showDialog ();

    await getAnItem (item.id);
});

const fnApiExportItems = props.apis.fnApiExportItems ?? (async (extension) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { downloadItem, } = useItem (tokenData),
    url = props.apis.exportItem + "?file=" + extension;

    await downloadItem (url, extension);
});

onBeforeMount (async () =>
{
    clearForms ();
});

onMounted (async () =>
{
    datatableBody.searchables = props.header.filter (header => header.key != "id" && (header.searchable ?? header.sortable) === true);

    if (datatableBody.searchables.length) datatableBody.searchBy = datatableBody.searchables[0].key;

    await getItems ({ page: 1, });
});

</script>

<style scoped>

:deep() .v-table .v-table__wrapper > table > thead > tr > th:not(:last-child)
{
    border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep() .v-table .v-table__wrapper > table > tbody > tr > td:not(:last-child), .v-table .v-table__wrapper > table > tbody > tr > th:not(:last-child)
{
    border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

</style>

<template>
    <v-layout v-if="datatableBody.isLoaded">
        <v-data-table-server @update:options="getItems" :headers="datatableBody.headers" :items="datatableBody.items" :items-length="datatableBody.itemsLength" v-model:items-per-page="datatableBody.itemPerPage" :search="datatableBody.search" :loading="datatableBody.itemsIsLoading" hover>
            <template v-slot:top>
                <v-toolbar color="#BC1010">
                    <v-breadcrumbs :items="badge">
                        <template v-slot:prepend>
                            <v-icon :icon="datatableBody.icon"></v-icon>
                        </template>
                        <template v-slot:divider>
                            <v-icon icon="mdi-forward"></v-icon>
                        </template>
                    </v-breadcrumbs>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="datatableBody.search" variant="outlined" density="compact" placeholder="Filter" single-line hide-details></v-text-field>
                    <v-select v-model="datatableBody.searchBy" :items="datatableBody.searchables" item-title="title" item-value="key" class="mx-2" variant="plain" density="compact" style="max-width: 33px" single-line hide-details></v-select>
                    <v-btn-toggle v-if="props?.apis?.exportItem" variant="outlined" rounded="xl" density="compact" divided>
                        <v-btn @click="fnApiExportItems ('csv')"><span class="font-weight-medium text-caption text-white">CSV</span></v-btn>
                        <v-btn @click="fnApiExportItems ('xls')"><span class="font-weight-medium text-caption text-white">XLS</span></v-btn>
                        <v-btn @click="fnApiExportItems ('xlsx')"><span class="font-weight-medium text-caption text-white">XLSX</span></v-btn>
                    </v-btn-toggle>
                    <v-dialog v-model="datatableBody.isMutatorDialog" transition="dialog-top-transition" fullscreen>
                        <template v-if="props.apis.createItem" v-slot:activator="{ properties, }">
                            <v-btn @click="showDialog" v-bind="properties" icon="mdi-format-float-right"></v-btn>
                        </template>
                        <template v-slot:default="{ isActive, }">
                            <v-card>
                                <v-card-title>
                                    <v-toolbar color="#800000">
                                        <v-btn @click="clearForms (); closeDialog ()" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
                                    </v-toolbar>
                                </v-card-title>
                                <v-card-text class="pa-10">
                                    <slot name="form" :isMutator="datatableBody.isMutatorDialog" :isCreate="! Boolean (Object.keys (datatableBody.item).length)" :isUpdate="Boolean (Object.keys (datatableBody.item).length)" :forms="datatableBody.forms" />
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="Object.keys (datatableBody.item).length" @click="setAnItem (datatableBody.item.id)" color="indigo-darken-2" variant="elevated" class="text-capitalize">
                                        <v-icon start icon="mdi-content-save-all"></v-icon>
                                        {{ $t ("action.button.save") }}
                                    </v-btn>
                                    <v-btn v-else @click="setItems" color="indigo-darken-2" variant="elevated" class="text-capitalize">
                                        <v-icon start icon="mdi-content-save-all"></v-icon>
                                        {{ $t ("action.button.save") }}
                                    </v-btn>
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
                                    <v-btn @click="datatableBody.isAccessorDialog = false; clearForms ()" icon><v-icon>mdi-close</v-icon></v-btn>
                                </v-toolbar>
                            </v-card-title>
                            <v-card-text>
                                <slot name="item" :isAccessor="datatableBody.isAccessorDialog" :item="datatableBody.item" />
                            </v-card-text>
                        </v-card>
                    </template>
                </v-dialog>
                <v-btn v-if="props.apis.getItem" @click="fnApiGetItem (item)" icon="mdi-eye" color="indigo-darken-4" class="mx-2" variant="text" density="compact"></v-btn>
                <v-btn v-if="props.apis.updateItem" @click="fnUpdateItem (item)" icon="mdi-pencil" color="lime-darken-4" class="mx-2" variant="text" density="compact"></v-btn>
            </template>
        </v-data-table-server>
    </v-layout>
</template>
