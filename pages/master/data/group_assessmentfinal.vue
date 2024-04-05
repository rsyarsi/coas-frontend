<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Group Final Assesment",
});

const COMPONENT_BADGE = [ "Master", "Data", "Grup Final Assesment", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "name",
        title: "Nama",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "active",
        value: item => item.active ? "Aktif" : "Tidak Aktif",
        title: "Status",
        sortable: true,
        searchable: false,
        align: "center",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
        align: "center",
        headerProps: { class: "font-weight-bold", },
    },
];

const COMPONENT_FORMS =
{
    name: "",
    active: 1,
    specialistid: "",    
    bobotvaluefinal: "",    
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/assesmentgroupfinals/viewall",
    getItem: "/v1/masterdata/assesmentgroupfinals/view/id",
    createItem: "/v1/masterdata/assesmentgroupfinals/create",
    updateItem: "/v1/masterdata/assesmentgroupfinals/update",
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
    <TableComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.name" label="Nama"></v-text-field>
                <v-select v-model="forms.specialistid" :items="groups" item-value="id" item-title="specialistname" label="Spesialis"></v-select>
                <v-text-field v-model="forms.bobotvaluefinal" label="Bobot Value Final"></v-text-field>
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
                        <v-col>
                            <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id"></v-text-field></v-row>
                            <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.name"></v-text-field></v-row>
                            <v-row><v-text-field label="Bobot Value Final" variant="underlined" :model-value="item.bobotvaluefinal"></v-text-field></v-row>
                            <v-row><v-text-field label="Spesialis" variant="underlined" :value="group (item.specialistid)" active></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row>
                                <v-text-field label="Status" variant="underlined" :model-value="item.active ? 'Aktif' : 'Tidak Aktif'">
                                    <template v-slot:prepend>
                                        <v-icon :color="item.active ? 'primary' : 'warning'">{{ item.active ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle' }}</v-icon>
                                    </template>
                                </v-text-field>
                            </v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row v-if="item.updated_at"><v-text-field label="Pembaharuan" variant="underlined" :model-value="useDateTime (item.updated_at).ins.fromNow ()"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </TableComponent>
</template>
