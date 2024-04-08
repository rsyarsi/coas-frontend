<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Recapitulation",
});

const router = useRouter ();

const tableComponent = ref (null);

const COMPONENT_BADGE = ref ([ "Master", "Dosen", "Rekapitulasi Mahasiswa/i", ]);

const

form_yearid = ref (null),
form_semesterid = ref (null),
form_specialistid = ref (null),

groups_year = ref ([]),
groups_semester = ref ([]),
groups_specialist = ref ([]);

const getAnItem = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, } = useItem (tokenData);

    await getItem ("/v1/masterdata/specialists/view/id",
    target,
    (success) =>
    {
        let { simrsid: idunit, } = success;
        var path = "";

        if (idunit == 46) {

            path = "ortodonsi";

        } else if (idunit == 58) {

            path = "pedodonsi";

        } else if (idunit == 59) {

            path = "periodonsi";

        } else if (idunit == 60) {

            path = "prostodonsia";

        } else if (idunit == 137) {

            path = "konservasi";

        } else if (idunit == 10) {

            path = "radiologi";
        }

        const routeTo = router.resolve ({ path: "/master/lecturer/rekap/" + path, query: { yearid: form_yearid.value, semesterid: form_semesterid.value, }, });

        window.open (routeTo.href, "_blank");
    },
    error => {});
};

onMounted (async () =>
{
    const { token: tokenData, } = await useAuth (),

    datas_year = await useCall ("/v1/masterdata/years/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_semester = await useCall ("/v1/masterdata/semesters/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_specialist = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData);

    groups_year.value = datas_year.data.data.data;
    groups_semester.value = datas_semester.data.data.data;
    groups_specialist.value = datas_specialist.data.data.data;
});

</script>

<template>
    <template v-if="true">
        <v-alert type="warning" title="Informasi" class="multi-line" style="white-space: pre-line;" text="
        Silahkan Pilih Tahun, Semester, Spesialisasi sebelum melakukan Proses entri Rekapitulasi!" closable></v-alert>
        <br>

        <v-layout>
            <v-toolbar color="#BC1010" class="mb-2">
                <v-breadcrumbs :items="COMPONENT_BADGE">
                    <template v-slot:divider>
                        <v-icon icon="mdi-forward"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-toolbar>
        </v-layout>
        <v-layout>
            <v-form class="w-100 ma-2">
                <v-row>
                    <v-col>
                        <v-select v-model="form_yearid" :items="groups_year" item-value="id" item-title="name" label="Tahun" variant="outlined" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select v-model="form_semesterid" :items="groups_semester" item-value="id" item-title="semestername" label="Semester" variant="outlined" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select v-model="form_specialistid" :items="groups_specialist" item-value="id" item-title="specialistname" label="Spesialis" variant="outlined" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn @click="getAnItem (form_specialistid)" variant="flat" color="primary">Merekap</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-layout>
    </template>
</template>
