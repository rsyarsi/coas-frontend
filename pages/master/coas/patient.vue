<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Patient",
});

const router = useRouter ();

const tableComponent = ref (null);

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
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "patientname",
        title: "Nama Pasien",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noregistrasi",
        title: "Nomor Registrasi",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noepisode",
        title: "Nomor Episode",
        sortable: true,
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
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namajaminan",
        title: "Jaminan",
        sortable: true,
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
        value: item => ! item.id_emr || ! item.status_penilaian ? "OPEN" : item.status_penilaian,
        title: "Status Penilaian",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "status_emr",
        value: item => ! item.id_emr || ! item.status_emr ? "OPEN" : item.status_emr,
        title: "Status EMR",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
]);

const COMPONENT_APIS = reactive (
{
    getAllItems: "/v1/transaction/patient/listksmgigi",
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

        return "radiologi";
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
        + "?idunit=" + idunit
        + "&start=" + start
        + "&to=" + to;

    } else {

        COMPONENT_APIS.getAllItems = url_api
        + "?start=" + start
        + "&to=" + to;
    }

    await tableComponent.value.getItems ({ page: 1, });
};

const fnApiGetItem = (async (item) =>
{
    const { noregistrasi, idunit, id_emr, } = item,

    routeTo = router.resolve ({ path: "/master/coas/" + unit (idunit), query: { noreg: noregistrasi, idunit, id_emr, }, });

    await window.open (routeTo.href, "_blank");
});

const fnUpdateItem = (async (item) =>
{
    await updateStatusToFinish (item);
});

onMounted (async () =>
{
    const { token: tokenData, getUser, } = await useAuth (), userData = await getUser (tokenData);

    USER_ROLE.value = userData.role;

    if (USER_ROLE.value == "dosen" || USER_ROLE.value == "mahasiswa") {

        COMPONENT_HEADER.push (
        {
            key: "actions",
            title: "Aksi",
            sortable: false,
            align: "center",
            headerProps: { class: "font-weight-bold", },
        });
    }

    const { idunit, } = router.currentRoute.value.query, unitname = unit (idunit);

    if (idunit) {

        COMPONENT_BADGE.value.push ("Pasien " + unitname[0].toUpperCase () + unitname.slice (1));
        COMPONENT_APIS.getAllItems = COMPONENT_APIS.getAllItems + "?idunit=" + router.currentRoute.value.query.idunit;

    } else {

        COMPONENT_BADGE.value.push ("Pasien");
    }
});

</script>

<template>
    <TableComponent ref="tableComponent" :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :apis="COMPONENT_APIS" :fnApiGetItem="fnApiGetItem" :fnUpdateItem="fnUpdateItem">
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
    </TableComponent>
</template>
