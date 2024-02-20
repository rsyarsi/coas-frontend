<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Coas",
});

const COMPONENT_BADGE = [ "Master", "Data", "Koas", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "nim",
        title: "Nomor Induk",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "name",
        title: "Nama",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "specialistid",
        value: item => group_specialist (item.specialistid),
        title: "Spesialis",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "university",
        value: item => group_university (item.university),
        title: "Universitas",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "semesterid",
        value: item => group_semester (item.semesterid),
        title: "Semester",
        sortable: true,
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
    nim: "",
    name: "",
    datein: null,
    specialistid: "",
    university: "",
    semesterid: "",
    hospitalfrom: "",
    hospitalto: "",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/students/viewall",
    getItem: "/v1/masterdata/students/view/id",
    createItem: "/v1/masterdata/students/create",
    updateItem: "/v1/masterdata/students/update",
};

const datetime = ref (null);

const

groups_specialist = ref ([]),
groups_university = ref ([]),
groups_semester = ref ([]),
groups_hospital = ref ([]),

group_specialist = (target) => groups_specialist?.value[groups_specialist.value.indexOf (groups_specialist.value.find (item => item.id == target))]?.specialistname,
group_university = (target) => groups_university?.value[groups_university.value.indexOf (groups_university.value.find (item => item.id == target))]?.name,
group_semester = (target) => groups_semester?.value[groups_semester.value.indexOf (groups_semester.value.find (item => item.id == target))]?.semestername,
group_hospital = (target) => groups_hospital?.value[groups_hospital.value.indexOf (groups_hospital.value.find (item => item.id == target))]?.name;

onMounted (async () =>
{
    const { token: tokenData, } = await useAuth (),

    datas_specialist = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_university = await useCall ("/v1/masterdata/universities/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_semester = await useCall ("/v1/masterdata/semesters/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_hospital = await useCall ("/v1/masterdata/hospitals/viewallwithotpaging", "get", "application/json", {}, tokenData);

    groups_specialist.value = datas_specialist.data.data.data;
    groups_university.value = datas_university.data.data.data;
    groups_semester.value = datas_semester.data.data.data;
    groups_hospital.value = datas_hospital.data.data.data;
});

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.nim" label="Nomor Induk"></v-text-field>
                <v-text-field v-model="forms.name" label="Nama"></v-text-field>
                <v-date-picker v-model="datetime" @update:modelValue="forms.datein = useDateTime (datetime).ins.format ('YYYY-MM-DD')" title="Sejak" color="primary" show-adjacent-months></v-date-picker>
                <v-select v-model="forms.specialistid" :items="groups_specialist" item-value="id" item-title="specialistname" label="Spesialis"></v-select>
                <v-select v-model="forms.university" :items="groups_university" item-value="id" item-title="name" label="Universitas"></v-select>
                <v-select v-model="forms.semesterid" :items="groups_semester" item-value="id" item-title="semestername" label="Semester"></v-select>
                <v-select v-model="forms.hospitalfrom" :items="groups_hospital" item-value="id" item-title="name" label="Rumah Sakit Asal"></v-select>
                <v-select v-model="forms.hospitalto" :items="groups_hospital" item-value="id" item-title="name" label="Rumah Sakit Tujuan"></v-select>
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
                            <v-row><v-text-field label="Nomor Induk" variant="underlined" :model-value="item.nim"></v-text-field></v-row>
                            <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.name"></v-text-field></v-row>
                            <v-row><v-text-field label="Sejak" variant="underlined" :model-value="item.datein"></v-text-field></v-row>
                            <v-row><v-text-field label="Spesialis" variant="underlined" :value="group_specialist (item.specialistid)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Universitas" variant="underlined" :value="group_university (item.university)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Semester" variant="underlined" :value="group_semester (item.semesterid)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Rumah Sakit Asal" variant="underlined" :value="group_hospital (item.hospitalfrom)" active></v-text-field></v-row>
                            <v-row><v-text-field label="Rumah Sakit Tujuan" variant="underlined" :value="group_hospital (item.hospitalto)" active></v-text-field></v-row>
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
