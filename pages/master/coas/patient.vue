<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Patient",
});

const router = useRouter ();

const COMPONENT_BADGE = ref ([ "Master", "Mahasiswa/i", ]);

const COMPONENT_HEADER =
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
        key: "actions",
        title: "Aksi",
        sortable: false,
        align: "center",
        headerProps: { class: "font-weight-bold", },
    },
];

const COMPONENT_APIS = reactive (
{
    getAllItems: "/v1/transaction/patient/listksmgigi",
    getItem: true,
});

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

const fnApiGetItem = (async (item) =>
{
    const { noregistrasi, idunit, } = item;

    router.push({ path: "/master/coas/" + unit (idunit), query: { noreg: noregistrasi, }, });
});

onMounted (async () =>
{
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
    <TableComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :apis="COMPONENT_APIS" :fnApiGetItem="fnApiGetItem"></TableComponent>
</template>
