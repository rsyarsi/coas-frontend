<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "EMR/EHR Radiologi Periapikal",
});

const router = useRouter ();

const

USER = ref (null),

form = ref ({});

const

updateEmr = async () =>
{
    const

    { token: tokenData, getUser, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData);

    var userData = USER.value;

    await setItem ("/v1/emr/radiologi/update", null,
    form.value,
    async (success) =>
    {
        var statusRoute = router.currentRoute.value.query;

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

    { token: tokenData, getUser, } = await useAuth (), userData = await getUser (tokenData);

    var

    { noreg, } = router.currentRoute.value.query,
    query = "?nim=" + (router.currentRoute.value.query.nim ? router.currentRoute.value.query.nim : userData.username),

    data_form = await useCall ("/v1/emr/radiologi/show/" + noreg + query, "get", "application/json", {}, tokenData);

    USER.value = userData;
    form.value = data_form?.data?.data?.data;
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
                        <v-text-field type="text" v-model="form.noregistrasi" :rules="['Required']" label="NOMOR REGISTRASI EMR/EHR" variant="outlined" disabled></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field type="text" v-model="form.nim" :rules="['Required']" label="MAHASISWA/I" variant="outlined" disabled></v-text-field>
                    </v-col>
                </v-row>
                <v-row><v-col><v-divider></v-divider></v-col></v-row>
                <v-row><v-col><h3>Identitas Pasien</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-text-field type="text" v-model="form.namapasien" :rules="['Required']" label="Nama" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field type="text" v-model="form.usia" :rules="['Required']" label="Usia" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.alamat" :rules="['Required']" label="Alamat" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row><v-col><h3>Diagnosa Klinis</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-text-field type="text" v-model="form.namadokter" label="Nama Dokter" variant="outlined" disabled></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field type="text" v-model="form.namaoperator" :rules="['Required']" label="Nama Operator" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="form.foto">
                        <v-text-field type="date" v-model="form.tglpotret" :rules="['Required']" label="Pemotretan" variant="outlined" disabled></v-text-field>
                    </v-col>
                    <v-col v-if="USER">
                        <v-file-input v-if="USER.role == 'mahasiswa'" @change="uploadFile" :rules="['Required']" label="Upload Foto Diagnosa" variant="outlined" density="compact"></v-file-input>
                    </v-col>
                </v-row>
                <v-row v-if="form.foto">
                    <v-col>
                        <v-img :src="form.foto" cover></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.diagnosaklinik" :rules="['Required']" label="Deskripsi Diagnosa" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row><v-col><h3>Data Interpretasi</h3></v-col></v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_kondisi_periaprikal" :rules="['Required']" label="Kondisi Periapikal" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_akar" :rules="['Required']" label="Akar" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_alveoral" :rules="['Required']" label="Alveolar" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_furkasi" :rules="['Required']" label="Furkasi" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_kesan" :rules="['Required']" label="Kesan" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_lamina_dura" :rules="['Required']" label="Lamina Dura" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_lesigigi" :rules="['Required']" label="Lesi Gigi" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_mahkota" :rules="['Required']" label="Mahkota" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_membran" :rules="['Required']" label="Membran" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea type="text" v-model="form.periaprikal_int_suspek" :rules="['Required']" label="Suspek" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-row v-if="USER">
                    <v-col>
                        <v-text-field v-if="USER.role == 'mahasiswa'" type="url" v-model="form.url" label="Video" variant="outlined"></v-text-field>
                        <v-btn v-else-if="USER.role == 'dosen'" :href="form.url" target="_blank" variant="outlined">Video</v-btn>
                    </v-col>
                </v-row>
                <v-row><v-col><v-divider></v-divider></v-col></v-row>
                <v-row v-if="USER">
                    <v-col v-if="USER.role == 'mahasiswa'">
                        <v-btn @click="updateEmr" color="primary" variant="flat">Simpan</v-btn>
                    </v-col>
                    <v-spacer v-if="USER.role == 'mahasiswa'"></v-spacer>
                    <v-col v-if="USER.role == 'dosen'">
                        <v-btn color="green" variant="flat">Buat Laporan</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>
