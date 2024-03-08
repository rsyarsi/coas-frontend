"use strict";

export default defineEventHandler ((event) => [

    {
        for: [ "admin", "dosen", "mahasiswa", ],
        title: "Dasbor",
        icon: "mdi-apps",
        to: "/dashboard",
    },
    {
        for: [ "admin", ],
        title: "Master Data",
        icon: "mdi-database",
        to: [

            {
                for: [ "admin", ],
                title: "Rumah Sakit",
                icon: "mdi-hospital-building",
                to: "/master/data/hospital",
            },
            {
                for: [ "admin", ],
                title: "Universitas",
                icon: "mdi-office-building",
                to: "/master/data/university",
            },
            {
                for: [ "admin", ],
                title: "Tahun",
                icon: "mdi-calendar",
                to: "/master/data/year",
            },
            {
                for: [ "admin", ],
                title: "Semester",
                icon: "mdi-text-box",
                to: "/master/data/semester",
            },
            {
                for: [ "admin", ],
                title: "Grup Spesialis (ASM)",
                icon: "mdi-account-group",
                to: "/master/data/group_specialist",
            },
            {
                for: [ "admin", ],
                title: "Spesialis (POLIKLINIK)",
                icon: "mdi-doctor",
                to: "/master/data/specialist",
            },
            {
                for: [ "admin", ],
                title: "Grup Assesment Final",
                icon: "mdi-text",
                to: "/master/data/group_assessmentfinal",
            },
            {
                for: [ "admin", ],
                title: "Grup Penilaian",
                icon: "mdi-text-box-multiple",
                to: "/master/data/group_assessment",
            },
            {
                for: [ "admin", ],
                title: "Penilaian",
                icon: "mdi-text",
                to: "/master/data/assessment",
            },
            {
                for: [ "admin", ],
                title: "Dosen",
                icon: "mdi-account-tie",
                to: "/master/data/lecturer",
            },
            {
                for: [ "admin", ],
                title: "Mahasiswa/i",
                icon: "mdi-account-school",
                to: "/master/data/coas",
            },
        ],
    },
    {
        for: [ "admin", ],
        title: "Master Pengguna",
        icon: "mdi-account-group",
        to: [

            {
                for: [ "admin", ],
                title: "Input Pengguna",
                icon: "mdi-import",
                to: "/master/user/input",
            },
        ],
    },
    {
        for: [ "admin", "dosen", "mahasiswa", ],
        title: "Mahasiswa/i",
        icon: "mdi-account-school",
        to: [

            {
                for: [ "admin", "dosen", "mahasiswa", ],
                title: "Pasien",
                icon: "mdi-account-injury",
                to: "/master/coas/patient",
            },
        ],
    },
    {
        for: [ "admin", "dosen", ],
        title: "Dosen",
        icon: "mdi-account-tie",
        to: [

            {
                for: [ "admin", "dosen", ],
                title: "Input Penilaian",
                icon: "mdi-import",
                to: "/master/lecturer/assesment",
            },
        ],
    },
    {
        for: [ "admin", "dosen", ],
        title: "Rekapitulasi Penilaian",
        icon: "mdi-account-tie",
        to: [
            {
                for: [ "admin", "dosen", ],
                title: "Data Rekapitulasi Penilaian",
                icon: "mdi-import",
                to: "/master/lecturer/rekapitulasi",
            },
        ],
    },
]);
