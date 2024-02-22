<script setup>
import {useRouter} from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Penilaian Detail",
});

</script>

<template v-slot:form="{ forms, }">
    <v-container>
         <h4>Form Penilaian Mahasiswa ortodonsi</h4> <br>
         <v-alert
            type="error"
            title="Informasi"
            text="Silahkan Pilih Tahun, Semester, Spesialisasi, dan Nama Mahasiswa sebelum melakukan Proses entri Penilaian."
        ></v-alert> 
        </v-container>
</template>