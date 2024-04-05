<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Patient",
});

const router = useRouter ();

const COMPONENT_BADGE = [ "Master", "Mahasiswa/i", "Pasien", ];

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
        key: "visit_date",
        title: "Waktu Kunjungan",
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

const COMPONENT_APIS =
{
    getAllItems: "/v1/transaction/patient/listksmgigi",
    getItem: true,
};

const fnApiGetItem = (async (item) =>
{
    const { noregistrasi, idunit, } = item;
    var path = "";

    if (idunit == 46) {

        path = "emrortodonsi";

    } else if (idunit == 58) {

        path = "emrpedodonsi";

    } else if (idunit == 59) {

        path = "emrperiodonsi";

    } else if (idunit == 60) {

        path = "prostodonsia";

    } else if (idunit == 137) {

        path = "konservasi";
    }

    router.push({ path: "/master/coas/" + path, query: { noreg: noregistrasi, }, });
});

</script>

<template>
    <TableComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :apis="COMPONENT_APIS" :fnApiGetItem="fnApiGetItem"></TableComponent>
</template>
