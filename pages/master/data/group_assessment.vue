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
        sortable: true,
        align: " d-none",
    },
    {
        key: "assementgroupname",
        title: "Nama",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "specialistid",
        value: item => group (item.specialistid),
        title: "Spesialis",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "type",
        title: "Tipe",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "valuetotal",
        title: "Total Nilai Bobot",
        sortable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "active",
        value: item => item.active ? "Aktif" : "Tidak Aktif",
        title: "Status",
        sortable: true,
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
    assementgroupname: "",
    type: "",
    specialistid: "",    
    valuetotal: "", 
    active: 1,
    isskala: 1,
    idassesmentgroupfinal: "",
    bobotprosenfinal: ""
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

 const

 groupfinals = ref ([])
 ,
groupfinal = (target) =>
{
    return groupfinals?.value[groupfinals.value.indexOf (groupfinals.value.find (item => item.id == target))]?.name;
}
;

onMounted (async () =>
{
    const

    { token: tokenData, } = await useAuth (),
    { data: { data: { data: datas = [], } = {}, error, } = {}, } = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData)
    ,{ data: { data: { data: datas_groupfinal = [], } = {}, errorx, } = {}, } = await useCall ("/v1/masterdata/assesmentgroupfinals/viewallwithotpaging", "get", "application/json", {}, tokenData)
    ;

    groups.value = datas;
    groupfinals.value = datas_groupfinal;
});

</script>

<template> 
     <v-alert
        type="success"
        title="Informasi"
        class="multi-line"
        text="Untuk Type Group isikan : 1. ( ORTHODONSIA & PROSTODONSIA ), 3. ( PEDODONTIA ), 4. ( KONSERVASI ), 5. ( PERIODONSIA ), 6. ( Kontrol Orthodonti ), 7. ( Penilaian Hasil Perawatan Orthodonti ). Untuk Value Total masukan total Nilai Bobot. "
    ></v-alert>
    <br>  
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.assementgroupname" label="Nama"></v-text-field>
                <v-text-field v-model="forms.type" label="Tipe"></v-text-field>
                <v-text-field v-model="forms.valuetotal" label="Total Nilai Bobot"></v-text-field>
                <v-select v-model="forms.idassesmentgroupfinal" :items="groupfinals" item-value="id" item-title="name" label="Group Final Assesment"></v-select>
                <v-radio-group v-model="forms.isskala">
                    <template v-slot:label>
                        <div><strong>{{ $t ("action.skala") }}</strong></div>
                    </template>
                    <v-radio label="Ya" :value="1"></v-radio>
                    <v-radio label="Tidak" :value="0"></v-radio>
                </v-radio-group>
                <v-text-field v-model="forms.bobotprosenfinal" label="Bobot Prosen Final"></v-text-field>
                <v-select v-model="forms.specialistid" :items="groups" item-value="id" item-title="specialistname" label="Spesialis"></v-select>
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
                            <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.assementgroupname"></v-text-field></v-row>
                            <v-row><v-text-field label="Tipe" variant="underlined" :model-value="item.type"></v-text-field></v-row>
                            <v-row><v-text-field label="Total Nilai Bobot" variant="underlined" :model-value="item.valuetotal"></v-text-field></v-row>
                            <v-row><v-text-field label="Spesialis" variant="underlined" :value="group (item.specialistid)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Group Final" variant="underlined" :value="groupfinal (item.idassesmentgroupfinal)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Skala" variant="underlined" :model-value="item.isskala"></v-text-field></v-row>
                            <v-row><v-text-field label="Total Nilai Bobot" variant="underlined" :model-value="item.bobotprosenfinal"></v-text-field></v-row>
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
    </ItemComponent>
</template>
