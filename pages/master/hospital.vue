<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Hospital",
});

const COMPONENT_BADGE = [ "Rumah Sakit", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: false,
    },
    {
        key: "name",
        title: "Nama",
        sortable: false,
    },
    {
        key: "active",
        value: item => item.active ? "Aktif" : "Tidak Aktif",
        title: "Status",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_FORMS =
{
    name: "",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/hospitals/viewall",
    getItem: "/v1/masterdata/hospitals/view/id",
    createItem: "/v1/masterdata/hospitals/create",
    updateItem: "/v1/masterdata/hospitals/update",
};

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.name" label="Nama"></v-text-field>
                <v-radio-group v-model="forms.active">
                    <template v-slot:label>
                        <div><strong>{{ $t ("action.state") }}</strong></div>
                    </template>
                    <v-radio label="Aktif" :value="1"></v-radio>
                    <v-radio label="Tidak Aktif" :value="0"></v-radio>
                </v-radio-group>
            </v-form>
        </template>
        <template v-slot:item="{ item, }">
            <v-form color="success">
                <v-container>
                    <v-row>
                        <v-row>
                            <v-col>
                                <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id"></v-text-field></v-row>
                                <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.name"></v-text-field></v-row>
                                <v-row v-if="item.updated_at"><v-text-field label="Tanggal Waktu" variant="underlined" :model-value="item.updated_at"></v-text-field></v-row>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-radio-group v-model="item.active">
                                    <template v-slot:label>
                                        <div><strong>{{ $t ("action.state") }}</strong></div>
                                    </template>
                                    <v-radio label="Aktif" :value="1"></v-radio>
                                    <v-radio label="Tidak Aktif" :value="0"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </ItemComponent>
</template>
