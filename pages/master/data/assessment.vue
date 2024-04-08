<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Assessment",
});

const COMPONENT_BADGE = [ "Master", "Data", "Penilaian", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "kodesub",
        title: "Kode Sub",
        sortable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "assesmentnumbers",
        title: "Nomor",
        sortable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "assesmentgroupid",
        value: item => group (item.assesmentgroupid),
        title: "Grup",
        sortable: true,
        searchable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "assesmentdescription", 
        title: "Description",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "specialistid",
        value: item => specialist_group (item.specialistid),
        title: "Spesialis",
        sortable: false,
        searchable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "index_sub", 
        title: "Kode Sub Index",
        sortable: false,
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
    assesmentgroupid: "",
    assesmentnumbers: "",
    assesmentdescription: "",

    assesmentbobotvalue: "0",
    assesmentvaluestart: "0",
    assesmentvalueend: "0",

    assesmentskalavalue: "0",
    assesmentskalavaluestart: "0",
    assesmentskalavalueend: "0",

    assesmentkonditevalue: "0",
    assesmentkonditevaluestart: "0",
    assesmentkonditevalueend: "0",

    index_sub:"0",
    kodesub:"0",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/assesmentdetails/viewall",
    getItem: "/v1/masterdata/assesmentdetails/view/id",
    createItem: "/v1/masterdata/assesmentdetails/create",
    updateItem: "/v1/masterdata/assesmentdetails/update",
};

const

groups = ref ([]),
specialist_groups = ref ([]),
group = (target) =>
{
    return groups?.value[groups.value.indexOf (groups.value.find (item => item.id == target))]?.assementgroupname;
},
specialist_group = (target) =>
{
    return specialist_groups?.value[specialist_groups.value.indexOf (specialist_groups.value.find (item => item.id == target))]?.specialistname;
};

onMounted (async () =>
{
    const

    { token: tokenData, } = await useAuth (),
    { data: { data: { data: datas = [], } = {}, error, } = {}, } = await useCall ("/v1/masterdata/assesmentgroups/viewallwithotpaging", "get", "application/json", {}, tokenData),
    { data: { data: { data: datasSpecialist = [], } = {}, error: errorSpecialist, } = {}, } = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData);

    groups.value = datas;
    specialist_groups.value = datasSpecialist;
});

</script>

<template>
    <TableComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field v-model="forms.assesmentnumbers" label="Nomor"></v-text-field></v-row>
                            <v-row><v-select v-model="forms.assesmentgroupid" :items="groups" item-value="id" item-title="assementgroupname" label="Grup"></v-select></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field v-model="forms.assesmentbobotvalue" label="Nilai Bobot"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentvaluestart" label="Nilai Bobot Awal"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentvalueend" label="Nilai Bobot Akhir"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field v-model="forms.assesmentskalavalue" label="Nilai Skala"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentskalavaluestart" label="Nilai Skala Awal"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentskalavalueend" label="Nilai Skala Akhir"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field v-model="forms.assesmentkonditevalue" label="Nilai Kondite"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentkonditevaluestart" label="Nilai Kondite Awal"></v-text-field></v-row>
                            <v-row><v-text-field v-model="forms.assesmentkonditevalueend" label="Nilai Kondite Akhir"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field v-model="forms.kodesub" label="Kode Sub"></v-text-field></v-row> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-textarea v-model="forms.assesmentdescription" label="Deskripsi"></v-textarea></v-row>
                            <v-row>
                                <v-radio-group v-model="forms.active">
                                    <template v-slot:label>
                                        <div><strong>{{ $t ("action.state") }}</strong></div>
                                    </template>
                                    <v-radio label="Aktif" :value="1"></v-radio>
                                    <v-radio label="Tidak Aktif" :value="0"></v-radio>
                                </v-radio-group>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field v-model="forms.index_sub" label="Kode Sub Index"></v-text-field></v-row> 
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
        <template v-slot:item="{ state, item, }">
            <v-form color="success">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id"></v-text-field></v-row>
                            <v-row><v-text-field label="Nomor" variant="underlined" :model-value="item.assesmentnumbers"></v-text-field></v-row>
                            <v-row><v-text-field label="Grup" variant="underlined" :value="group (item.assesmentgroupid)" active></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field label="Nilai Bobot" variant="underlined" :model-value="item.assesmentbobotvalue"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Bobot Awal" variant="underlined" :model-value="item.assesmentvaluestart"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Bobot Akhir" variant="underlined" :model-value="item.assesmentvalueend"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field label="Nilai Skala" variant="underlined" :model-value="item.assesmentskalavalue"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Skala Awal" variant="underlined" :model-value="item.assesmentskalavaluestart"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Skala Akhir" variant="underlined" :model-value="item.assesmentskalavalueend"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field label="Nilai Kondite" variant="underlined" :model-value="item.assesmentkonditevalue"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Kondite Awal" variant="underlined" :model-value="item.assesmentkonditevaluestart"></v-text-field></v-row>
                            <v-row><v-text-field label="Nilai Kondite Akhir" variant="underlined" :model-value="item.assesmentkonditevalueend"></v-text-field></v-row>
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
                    <v-row>
                        <v-col>
                            <v-row><v-textarea label="Deskripsi" variant="underlined" :model-value="item.assesmentdescription"></v-textarea></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Kode Sub" variant="underlined" :model-value="item.kodesub"></v-text-field> 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field label="Kode Sub Index" variant="underlined" :model-value="item.index_sub"></v-text-field> 
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </TableComponent>
</template>
