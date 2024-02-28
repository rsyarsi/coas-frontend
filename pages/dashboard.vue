<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Dashboard",
});


const overlay  = ref(true);

const user = reactive (
{
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    absentime_in: "Anda Sudah Absen Masuk Pada: 2024-02-27 08.15.55",
    absentime_out: "Anda Belum Absen Pulang",
});

onBeforeMount (async () =>
{
    const { token: tokenData, setToken, delToken, getUser, delUser, } = await useAuth (), userData = await getUser (tokenData);

    user.id = userData.id;
    user.name = userData.name;
    user.email = userData.email;
    user.role = userData.role;
    user.avatar = userData.avatar;
});

</script>

<template>
    <!-- <v-skeleton-loader type="card"></v-skeleton-loader> -->
        <v-container>
    <v-form>
            <h1 class="font-weight-bold text-left text-basil">
                Selamat Datang, {{ user.name }}
            </h1>
            <br/>
            <h3 class="font-weight-bold text-left text-basil">
                Silahkan melakukan presensi
            </h3>
            <v-card-actions>
                <v-btn color="blue" variant="elevated"><v-icon start icon="mdi mdi-location-enter"></v-icon> ABSEN IN</v-btn>
                &nbsp&nbsp&nbsp
                <v-row>
                    <v-col>
                        {{ user.absentime_in }}
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-card-actions>
                <v-btn color="red" variant="elevated"><v-icon start icon="mdi mdi-location-exit"></v-icon> ABSEN OUT</v-btn>
                &nbsp&nbsp&nbsp
                <v-row>
                    <v-col>
                        {{ user.absentime_out }}
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-form>
    </v-container>
</template>
