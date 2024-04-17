<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Patient",
});

const router = useRouter ();

const tableComponent = ref (null);

const isType = ref (false), type = ref ("active");

const USER_ROLE = ref (null);

const COMPONENT_BADGE = ref ([ "Master", "Mahasiswa/i", ]);

const COMPONENT_HEADER = reactive (
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "nomr",
        title: "Nomor MR",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "patientname",
        title: "Nama Pasien",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noregistrasi",
        title: "Nomor Registrasi",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noepisode",
        title: "Nomor Episode",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namaunit",
        title: "Poliklinik",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namadokter",
        title: "Dokter",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namajaminan",
        title: "Jaminan",
        sortable: true,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "visit_date",
        title: "Kunjungan",
        sortable: true,
        searchable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "status_penilaian",
        value: item => ! item.noreg || ! item.status_penilaian ? "OPEN" : item.status_penilaian,
        title: "Status Penilaian",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "status_emr",
        value: item => ! item.noreg || ! item.status_emr ? "OPEN" : item.status_emr,
        title: "Status EMR",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
]);

const COMPONENT_FORMS = reactive ({});

const COMPONENT_APIS = reactive (
{
    getAllItems: "",
    getItem: true,
    getItemIcon: "mdi-eye",
    updateItem: true,
    updateItemIcon: "mdi-checkbox-marked-circle",
    fnUpdateItemIconIsDisabled: (item) =>
    {
        // if (USER_ROLE.value == "dosen" && (! item.status_penilaian || item.status_penilaian == "OPEN" || item.status_penilaian == "FINISH")) {

        if (USER_ROLE.value == "dosen") {

            return true;

        } else if (USER_ROLE.value == "mahasiswa" && (! item.status_emr || item.status_emr == "OPEN" || item.status_emr == "FINISH")) {

            return true;
        }

        return false;
    },
});

const

DATETIME_FROM = ref (null),
DATETIME_TO = ref (null);

const unit = (idunit) =>
{
    if (idunit == 46) {

        return "emrortodonsi";

    } else if (idunit == 58) {

        return "emrpedodonsi";

    } else if (idunit == 59) {

        return "emrperiodonsi";

    } else if (idunit == 60) {

        return "prostodonsia";

    } else if (idunit == 137) {

        return "konservasi";

    } else if (idunit == 10) {

        return "emr/radiologi";
    }
};

const

format_datetime_start = (value) =>
{
    return useDateTime (value).ins.format ('YYYY-MM-DD') + " " + "00:00:00";
},

format_datetime_to = (value) =>
{
    return useDateTime (value).ins.format ('YYYY-MM-DD') + " " + "23:59:59";
};

const updateDateTime = async () =>
{
    const

    { idunit, } = router.currentRoute.value.query,

    start = format_datetime_start (DATETIME_FROM.value ?? new Date),
    to = format_datetime_to (DATETIME_TO.value ?? new Date),

    url_api = COMPONENT_APIS.getAllItems.split("?")[0];

    if (idunit) {

        COMPONENT_APIS.getAllItems = url_api
        + "?type=" + type.value
        + "&idunit=" + idunit
        + "&start=" + start
        + "&to=" + to;

    } else {

        COMPONENT_APIS.getAllItems = url_api
        + "?type=" + type.value
        + "&start=" + start
        + "&to=" + to;
    }

    await tableComponent.value.getItems ({ page: 1, });
};

const updateType = async () =>
{
    const

    { idunit, } = router.currentRoute.value.query,

    url_api = COMPONENT_APIS.getAllItems.split("?")[0];

    if (idunit) {

        COMPONENT_APIS.getAllItems = url_api
        + "?type=" + type.value
        + "&idunit=" + idunit;

    } else {

        COMPONENT_APIS.getAllItems = url_api
        + "?type=" + type.value;
    }

    if (type.value == "active") tableComponent.value.datatableBody.colors.toolbar = "#BC1010";
    else if (type.value == "history") tableComponent.value.datatableBody.colors.toolbar = "teal";

    await tableComponent.value.getItems ({ page: 1, });
};

const fnApiGetItem = (async (item) =>
{
    const { noregistrasi, idunit, } = item;
    var unitname = unit (idunit);

    if (unitname == "emr/radiologi") {

        unitname = unitname + "/" + String (item.jenis_radiologi).toLowerCase ();
    }

    const routeTo = router.resolve ({ path: "/master/coas/" + unitname, query: { noreg: noregistrasi, idunit, }, });

    await window.open (routeTo.href, "_blank");
});

const fnUpdateItem = (async (item) =>
{
    await updateStatusToFinish (item);
});

const fnOnShowDialog = () =>
{
    COMPONENT_FORMS.noregistrasi = "RKG" + useDateTime (new Date).ins.format ('DDMMYY') + '-' + String (Math.floor (100000 + Math.random () * 900000)).substring (0, 4);
};

const

form_doctor = ref (null),

groups_lecturer = ref ([]),
groups_student = ref ([]),

group_lecturer = (target) => groups_lecturer?.value[groups_lecturer.value.indexOf (groups_lecturer.value.find (item => item.doctotidsimrs == target))]?.name,
group_student = (target) => groups_student?.value[groups_student.value.indexOf (groups_student.value.find (item => item.id == target))]?.name;

watch (type, (value) =>
{
    updateType ();
});

watch (form_doctor, (idsimrs) =>
{
    COMPONENT_FORMS.iddokter = idsimrs;
    COMPONENT_FORMS.namadokter = group_lecturer (idsimrs);
});

onMounted (async () =>
{
    const

    { token: tokenData, getUser, } = await useAuth (), userData = await getUser (tokenData),
    { idunit, } = router.currentRoute.value.query, unitname = unit (idunit);

    USER_ROLE.value = userData.role;

    if (USER_ROLE.value == "dosen" || USER_ROLE.value == "mahasiswa") {

        if (unitname != "emr/radiologi") {

            isType.value = true;

        } else {

            if (USER_ROLE.value == "dosen") {

                let

                datas_lecturer = await useCall ("/v1/masterdata/lectures/viewallwithotpaging", "get", "application/json", {}, tokenData),
                datas_student = await useCall ("/v1/emr/radiologi/students", "get", "application/json", {}, tokenData);

                groups_lecturer.value = datas_lecturer.data.data.data;
                groups_student.value = datas_student.data.data.data;

                COMPONENT_APIS.createItem = "/v1/emr/radiologi/store";

                COMPONENT_FORMS.nim = "";
                COMPONENT_FORMS.noepisode = "";
                COMPONENT_FORMS.noregistrasi = "";
                COMPONENT_FORMS.nomr = "";
                COMPONENT_FORMS.patientname = "";
                COMPONENT_FORMS.namajaminan = "KEPANITERAAN FKG";
                COMPONENT_FORMS.noantrianall = "";
                COMPONENT_FORMS.gander = "";
                COMPONENT_FORMS.date_of_birth = useDateTime (new Date).ins.format ('YYYY-MM-DD');
                COMPONENT_FORMS.address = "";
                COMPONENT_FORMS.idunit = "10";
                COMPONENT_FORMS.visit_date = useDateTime (new Date).ins.format ('YYYY-MM-DD HH:mm:ss');
                COMPONENT_FORMS.namaunit = "Poli Gigi Spesialis Radiologi";
                COMPONENT_FORMS.iddokter = "";
                COMPONENT_FORMS.namadokter = "";
                COMPONENT_FORMS.patienttype = "PERUSAHAAN";
                COMPONENT_FORMS.jenis_radiologi = "";
                COMPONENT_FORMS.statusid = 0;
            }

            COMPONENT_HEADER.push (
            {
                key: "jenis_radiologi",
                title: "Jenis Radiologi",
                sortable: true,
                searchable: true,
                align: "center",
                headerProps: { class: "font-weight-bold", },
            });
        }

        COMPONENT_HEADER.push (
        {
            key: "actions",
            title: "Aksi",
            sortable: false,
            align: "center",
            headerProps: { class: "font-weight-bold", },
        });
    }

    let url_api = "/v1/transaction/patient/listksmgigi";

    if (idunit) {

        let componentname = unitname.replace("emr", "").match (/\w+$/)[0];
            componentname = componentname[0].toUpperCase () + componentname.slice (1);

        COMPONENT_BADGE.value.push ("Pasien " + componentname);

        if (unitname != "radiologi") {

            COMPONENT_APIS.getAllItems = url_api
            + "?type=" + type.value
            + "&idunit=" + router.currentRoute.value.query.idunit;

        } else {

            COMPONENT_APIS.getAllItems = url_api
            + "?idunit=" + router.currentRoute.value.query.idunit;
        }

    } else {

        isType.value = true;

        COMPONENT_APIS.getAllItems = url_api
        + "?type=" + type.value;

        COMPONENT_BADGE.value.push ("Pasien");
    }
});

</script>

<template>
    <v-tabs v-if="isType" v-model="type" bg-color="warning" fixed-tabs>
        <v-tab value="active">Aktif</v-tab>
        <v-tab value="history">Riwayat</v-tab>
    </v-tabs>
    <v-divider v-if="isType"></v-divider>
    <TableComponent ref="tableComponent" :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS" :fnApiGetItem="fnApiGetItem" :fnUpdateItem="fnUpdateItem" :fnOnShowDialog="fnOnShowDialog">
        <template v-slot:field>
            <v-dialog width="380" :return-value.sync="DATETIME_FROM">
                <template v-slot:activator="{ props: activatorProps, }">
                    <v-btn v-bind="activatorProps" placeholder="DATETIME_FROM" density="compact" variant="outlined" class="ma-1">{{ format_datetime_start (DATETIME_FROM).split (" ")[0] }}</v-btn>
                </template>
                <template v-slot:default="{ isActive, }">
                    <v-card>
                        <v-card-actions class="justify-center">
                            <v-date-picker v-model="DATETIME_FROM" @update:modelValue="DATETIME_FROM.value = format_datetime_start (DATETIME_FROM.value); isActive.value = false; updateDateTime ()" title="Filter Kunjungan Dari" color="primary" show-adjacent-months></v-date-picker>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-dialog width="380" :return-value.sync="DATETIME_TO">
                <template v-slot:activator="{ props: activatorProps, }">
                    <v-btn v-bind="activatorProps" placeholder="DATETIME_TO" density="compact" variant="outlined" class="ma-1">{{ format_datetime_to (DATETIME_TO).split (" ")[0] }}</v-btn>
                </template>
                <template v-slot:default="{ isActive, }">
                    <v-card>
                        <v-card-actions class="justify-center">
                            <v-date-picker v-model="DATETIME_TO" @update:modelValue="DATETIME_TO.value = format_datetime_to (DATETIME_TO.value); isActive.value = false; updateDateTime ()" title="Filter Kunjungan Sampai" color="primary" show-adjacent-months></v-date-picker>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </template>
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row><v-select v-model="forms.nim" :rules="['Required']" :items="groups_student" item-value="nim" item-title="name" label="Mahasiswa/i"></v-select></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.noregistrasi" :rules="['Required']" label="Nomor Registrasi" disabled></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.noepisode" :rules="['Required']" label="Nomor Episode" autocomplete></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.nomr" :rules="['Required']" label="Nomor MR" autocomplete></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.noantrianall" :rules="['Required']" label="Nomor Antrian"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row v-if="false">
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.namajaminan" :rules="['Required']" label="Nama Jaminan" autocomplete></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.patientname" :rules="['Required']" label="Nama Pasien" autocomplete></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-select v-model="forms.gander" :rules="['Required']" :items="[ { id: 'M', name: 'Pria', }, { id: 'F', name: 'Wanita', }, ]" item-value="id" item-title="name" label="Jenis Kelamin"></v-select></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field @input="forms.date_of_birth = useDateTime (forms.date_of_birth).ins.format ('YYYY-MM-DD')" type="date" v-model="forms.date_of_birth" :rules="['Required']" label="Tanggal Lahir"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-textarea type="text" v-model="forms.address" :rules="['Required']" label="Alamat"></v-textarea></v-row>
                        </v-col>
                    </v-row>
                    <v-row v-if="false">
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.idunit" :rules="['Required']" label="ID Unit" autocomplete></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.namaunit" :rules="['Required']" label="Nama Unit" autocomplete></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field @input="forms.visit_date = useDateTime (forms.visit_date).ins.format ('YYYY-MM-DD HH:mm:ss')" type="datetime-local" v-model="forms.visit_date" :rules="['Required']" label="Kunjungan"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-select v-model="form_doctor" :rules="['Required']" :items="groups_lecturer" item-value="doctotidsimrs" item-title="name" label="Dokter"></v-select></v-row>
                        </v-col>
                    </v-row>
                    <v-row v-if="false">
                        <v-col>
                            <v-row><v-text-field type="text" v-model="forms.patienttype" :rules="['Required']" label="Tipe Pasien" autocomplete></v-text-field></v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row><v-select v-model="forms.jenis_radiologi" :rules="['Required']" :items="[ { id: 'PERIAPIKAL', name: 'Periapikal', }, { id: 'PANORAMIK', name: 'Panoramik', }, { id: 'OKLUSI', name: 'Oklusi', }, ]" item-value="id" item-title="name" label="Jenis Radiologi"></v-select></v-row>
                        </v-col>
                        <v-spacer v-if="false"></v-spacer>
                        <v-col v-if="false">
                            <v-row><v-select v-model="forms.statusid" :rules="['Required']" :items="[ { id: '0', name: '0', }, { id: '1', name: '1', }, { id: '2', name: '2', }, { id: '3', name: '3', }, { id: '4', name: '4', }, ]" item-value="id" item-title="name" label="Status"></v-select></v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </TableComponent>
</template>
