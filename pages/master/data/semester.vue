<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Semester",
});

const COMPONENT_BADGE = [ "Master", "Data", "Semester", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: false,
    },
    {
        key: "semestername",
        title: "Nama",
        sortable: false,
    },
    {
        key: "semestervalue",
        title: "Nilai",
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
    semestername: "",
    semestervalue: "",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/semesters/viewall",
    getItem: "/v1/masterdata/semesters/view/id",
    createItem: "/v1/masterdata/semesters/create",
    updateItem: "/v1/masterdata/semesters/update",
};

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.semestername" label="Nama"></v-text-field>
                <v-text-field v-model="forms.semestervalue" label="Nilai"></v-text-field>
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
                                <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.semestername"></v-text-field></v-row>
                                <v-row><v-text-field label="Nilai" variant="underlined" :model-value="item.semestervalue"></v-text-field></v-row>
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
