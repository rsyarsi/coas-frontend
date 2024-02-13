<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Group Assessment",
});

const COMPONENT_BADGE = [ "Master", "Data", "Grup Penilaian", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: false,
    },
    {
        key: "assementgroupname",
        title: "Nama",
        sortable: false,
    },
    {
        key: "type",
        title: "Tipe",
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
    assementgroupname: "",
    type: "",
    specialistid: "",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/assesmentgroups/viewall",
    getItem: "/v1/masterdata/assesmentgroups/view/id",
    createItem: "/v1/masterdata/assesmentgroups/create",
    updateItem: "/v1/masterdata/assesmentgroups/update",
};

const

groups = ref ([]),
group = (target) =>
{
    return groups?.value[groups.value.indexOf (groups.value.find (item => item.id == target))]?.specialistname;
};

onMounted (async () =>
{
    const

    { token: tokenData, } = await useAuth (),
    { data: { data: { data: datas = [], } = {}, error, } = {}, } = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData);

    groups.value = datas;
});

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.assementgroupname" label="Nama"></v-text-field>
                <v-text-field v-model="forms.type" label="Tipe"></v-text-field>
                <v-select v-model="forms.specialistid" :items="groups" item-value="id" item-title="specialistname" label="Grup Spesialis"></v-select>
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
                                <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.assementgroupname"></v-text-field></v-row>
                                <v-row><v-text-field label="Tipe" variant="underlined" :model-value="item.type"></v-text-field></v-row>
                                <v-row><v-text-field label="Grup" variant="underlined" :value="group (item.specialistid)" active></v-text-field></v-row>
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
