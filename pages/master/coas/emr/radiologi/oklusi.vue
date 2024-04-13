<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "EMR/EHR Radiologi",
});

const router = useRouter ();

const

USER = ref (null),

form = ref ({});

const

updateEmr = async () =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData);

    var userData = USER.value;

    await setItem ("/v1/emr/radiologi/update", form.value.id,
    form.value,
    async (success) =>
    {
        var statusRoute = router.currentRoute.value.query;
        statusRoute.id_emr = statusRoute.id_emr ?? success.data.id;

        if (userData.role == "mahasiswa") {

            await updateStatusToWrite (statusRoute);

            alert ("Data berhasil diupdate!");
        }
    },
    error => {});
},

uploadFile = async (event) =>
{
    const

    { token: tokenData, } = await useAuth (),
    formData = new FormData ();

    formData.append ("file", event.target.files[0]);

    var { data, error, } = await useCall ("/v1/emr/radiologi/upload", "post", "multipart/form-data", formData, tokenData);

    form.value.tglpotret = data.data.data.updated_at;
    form.value.foto = data.data.data.url;
};

onMounted (async () =>
{
    const

    { token: tokenData, getUser, } = await useAuth (), userData = await getUser (tokenData),
    { id_emr, } = router.currentRoute.value.query,

    data_form = await useCall ("/v1/emr/radiologi/show/" + id_emr, "get", "application/json", {}, tokenData);

    USER.value = userData;
    form.value = data_form.data.data.data;
});

</script>

<template>
    <v-card variant="flat" elevation="8">
        <v-card-title class="text-center">
            <h1 v-text="form.jenis_radiologi"></h1>
        </v-card-title>
        <v-form>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-text-field v-model="form.noregistrasi" type="text" label="NOMOR REGISTRASI EMR/EHR" variant="outlined" disabled></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="form.nim" type="text" label="MAHASISWA/I" variant="outlined" disabled></v-text-field>
                    </v-col>
                </v-row>
                <v-row><v-col><v-divider></v-divider></v-col></v-row>
                <v-row><v-col><h3>Identitas Pasien</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="form.namapasien" type="text" label="Nama" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="form.usia" type="text" label="Usia" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea v-model="form.alamat" type="text" label="Alamat" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row><v-col><h3>Diagnosa Klinis</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="form.namadokter" type="text" label="Nama Dokter" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="form.namaoperator" type="text" label="Nama Operator" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="form.foto">
                        <v-text-field v-model="form.tglpotret" type="date" label="Pemotretan" variant="outlined" disabled></v-text-field>
                    </v-col>
                    <v-col v-if="USER">
                        <v-file-input v-if="USER.role == 'mahasiswa'" @change="uploadFile" label="Upload Foto Diagnosa" variant="outlined" density="compact"></v-file-input>
                    </v-col>
                </v-row>
                <v-row v-if="form.foto">
                    <v-col>
                        <v-img :src="form.foto" cover></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea v-model="form.diagnosaklinik" type="text" label="Deskripsi Diagnosa" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row><v-col><h3>Data Interpretasi</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-textarea v-model="form.oklusal_suspek_radiognosis" type="text" label="Suspek" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea v-model="form.oklusal_kesan" type="text" label="Kesan" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row><v-col><v-divider></v-divider></v-col></v-row>
                <v-row v-if="USER">
                    <v-col v-if="USER.role == 'mahasiswa'">
                        <v-btn @click="updateEmr" color="primary" variant="flat">Simpan</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>
