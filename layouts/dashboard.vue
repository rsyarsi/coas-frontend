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

    search: computed (() =>
    {
        return dashboardSidebar.items.flatMap ((item) =>
        {
            if (typeof item.to == "string") return item;
            else return item.to.flat ();
        });
    }),

    icon: "/logo.jpg",

    version: "1.0.4",

    items: [],
});

const isDialog = ref (false);

//

var logout;

onMounted (async () =>
{
    const { token: tokenData, setToken, delToken, getUser, delUser, } = await useAuth (), userData = await getUser (tokenData),

    { data: menuData, } = await useFetch ("/api/v1/menu");

    logout = delUser;

    user.id = userData.id;
    user.name = userData.name;
    user.email = userData.email;
    user.role = userData.role;
    user.avatar = userData.avatar;

    dashboardSidebar.isLoaded = true;

    dashboardSidebar.items = menuData.value.filter (item => item.for.includes (user.role));
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
                <template v-for="(item, index) in dashboardSidebar.items">
                    <v-list-item v-if="! Array.isArray (item.to)" :key="item.title" :prepend-icon="item.icon" :title="item.title" :value="item.title" :href="item.to" rounded="xl"></v-list-item>
                    <v-list-group v-else>
                        <template v-slot:activator="{ props, }">
                            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" :value="item.title" rounded="xl"></v-list-item>
                        </template>
                        <v-list-item v-for="(child_item, child_index) in item.to" :key="child_item.title" :prepend-icon="child_item.icon" :title="child_item.title" :value="child_item.title" :href="child_item.to" rounded="xl"></v-list-item>
                    </v-list-group>
                </template>
            </v-list>
            <template v-slot:append>
                <v-list-item class="text-center">
                    <div v-text="dashboardSidebar.version"></div>
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
                <v-autocomplete @update:modelValue="navigateTo ($event?.to, { open: { target: '_self' } })" :items="dashboardSidebar.search" prepend-inner-icon="mdi-magnify" density="compact" class="mt-5" variant="solo" :menu-props="{ margin: '10px', }" style="width: 5px;" clearable return-object></v-autocomplete>
                <v-spacer></v-spacer>
                <v-btn @click="logout" icon="mdi-logout"></v-btn>
            </v-app-bar>
            <v-container fluid>
                <v-card outlined tile>
                    <slot />
                </v-card>
            </v-container>
        </v-main>
    </v-layout>
</template>
