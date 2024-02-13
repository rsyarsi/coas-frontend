<script setup>

const user = reactive (
{
    id: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
});

const dashboardSidebar = reactive (
{
    isLoaded: false,
    isToggle: true,
    isRail: true,

    search: "",

    icon: "https://www.yarsi.ac.id/wp-content/uploads/2018/09/cropped-logo-yarsi-192x192.jpg",

    items: [

        {
            title: "Dasbor",
            icon: "mdi-apps",
            to: "/dashboard",
        },
        {
            title: "Rumah Sakit",
            icon: "mdi-hospital-building",
            to: "/master/hospital",
        },
        {
            title: "Universitas",
            icon: "mdi-office-building",
            to: "/master/university",
        },
        {
            title: "Master Data",
            icon: "mdi-database",
            to: [

                {
                    title: "Tahun",
                    icon: "mdi-calendar",
                    to: "/master/data/year",
                },
                {
                    title: "Semester",
                    icon: "mdi-text-box",
                    to: "/master/data/semester",
                },
                {
                    title: "Grup Spesialis (ASM)",
                    icon: "mdi-account-group",
                    to: "/master/data/group_specialist",
                },
                {
                    title: "Spesialis (POLIKLINIK)",
                    icon: "mdi-account",
                    to: "/master/data/specialist",
                },
                {
                    title: "Grup Penilaian",
                    icon: "mdi-text-box-multiple",
                    to: "/master/data/group_assessment",
                },
                {
                    title: "Penilaian",
                    icon: "mdi-text",
                    to: "/master/data/assessment",
                },
                {
                    title: "Dosen",
                    icon: "mdi-doctor",
                    to: "/master/data/lecturer",
                },
                {
                    title: "Koas",
                    icon: "mdi-account-school",
                    to: "/master/data/coas",
                },
            ],
        },
        {
            title: "Master Pengguna",
            icon: "mdi-account-group",
            to: [

                {
                    title: "Input Pengguna",
                    icon: "mdi-import",
                    to: "/master/user/input",
                },
            ],
        },
        {
            title: "Master Koas",
            icon: "mdi-account-school",
            to: [

                {
                    title: "Input Penilaian",
                    icon: "mdi-import",
                    to: "/master/coas/assessment",
                },
                {
                    title: "Emrortodonsi",
                    icon: "",
                    to: "/master/coas/emrortodonsi",
                },
                {
                    title: "Emrpedodonsi",
                    icon: "",
                    to: "/master/coas/emrpedodonsi",
                },
                {
                    title: "Emrperiodonsi",
                    icon: "",
                    to: "/master/coas/emrperiodonsi",
                },
                {
                    title: "Prostodonsia",
                    icon: "",
                    to: "/master/coas/prostodonsia",
                },
                {
                    title: "Konservasi",
                    icon: "",
                    to: "/master/coas/konservasi",
                },
            ],
        },
        {
            title: "Master Dosen",
            icon: "mdi-doctor",
            to: [

                {
                    title: "Input Penilaian",
                    icon: "mdi-import",
                    to: "/master/lecturer/input",
                },
                {
                    title: "Penilaian Semester",
                    icon: "",
                    to: "/master/lecturer/assessment_semester",
                },
                {
                    title: "Penilaian Grup",
                    icon: "",
                    to: "/master/lecturer/group_assessment",
                },
                {
                    title: "Penilaian Perincian",
                    icon: "",
                    to: "/master/lecturer/assessment_detail",
                },
            ],
        },
    ],
});

const isDialog = ref (false);

//

var logout;

onMounted (async () =>
{
    const { token: tokenData, setToken, delToken, getUser, delUser, } = await useAuth (), userData = await getUser (tokenData);

    logout = delUser;

    user.id = userData.id;
    user.name = userData.name;
    user.email = userData.email;
    user.role = userData.role;
    user.avatar = userData.avatar;

    dashboardSidebar.isLoaded = true;
});

</script>

<style scoped>

.v-list-group
{
    --prepend-width: -15px !important;
}

</style>

<template>
    <v-layout v-if="dashboardSidebar.isLoaded">
        <v-navigation-drawer v-model="dashboardSidebar.isToggle" @click="dashboardSidebar.isRail = false" :isRail="dashboardSidebar.isRail" permanent>
            <v-list-item :title="user.name" :subtitle="user.role" :prepend-avatar="user.avatar" class="text-center"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <template v-for="(item, index) in dashboardSidebar.items" :key="item.title">
                    <v-list-item v-if="! Array.isArray (item.to)" :prepend-icon="item.icon" :title="item.title" :value="item.title" :to="item.to" rounded="xl"></v-list-item>
                    <v-list-group v-else>
                        <template v-slot:activator="{ props, }">
                            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" :value="item.title" rounded="xl"></v-list-item>
                        </template>
                        <v-list-item v-for="(child_item, child_index) in item.to" :key="child_item.title" :prepend-icon="child_item.icon" :title="child_item.title" :value="child_item.title" :to="child_item.to" rounded="xl"></v-list-item>
                    </v-list-group>
                </template>
            </v-list>
            <template v-slot:append>
                <v-list-item class="text-center">
                    <v-btn :ripple="false" icon flat><v-icon><v-img :src="dashboardSidebar.icon"></v-img></v-icon></v-btn>
                </v-list-item>
            </template>
        </v-navigation-drawer>
        <v-main>
            <v-app-bar color="#800000">
                <v-btn @click.stop="dashboardSidebar.isRail = !dashboardSidebar.isRail; dashboardSidebar.isToggle = !dashboardSidebar.isToggle" density="compact" class="mr-2" icon>
                    <v-icon v-if="dashboardSidebar.isRail">mdi-chevron-left</v-icon>
                    <v-icon v-else>mdi-chevron-right</v-icon>
                </v-btn>
                <v-text-field v-model="dashboardSidebar.search" label="Search" density="compact" prepend-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon><v-badge content="1" color="warning"><v-icon>mdi-bell</v-icon></v-badge></v-btn>
                <v-btn icon="mdi-theme-light-dark"></v-btn>
                <v-btn icon="mdi-cog"></v-btn>
                <v-btn @click="logout" icon="mdi-logout"></v-btn>
            </v-app-bar>
            <slot />
        </v-main>
    </v-layout>
</template>
