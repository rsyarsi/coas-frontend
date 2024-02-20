<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "User",
});

const COMPONENT_BADGE = [ "Master", "Pengguna", "Input", ];

const COMPONENT_HEADER =
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "username",
        title: "Nomor Induk",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "name",
        title: "Nama Lengkap",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "role",
        title: "Role",
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

const COMPONENT_FORMS =
{
    username: "",
    name: "",
    role: "",
    email: "",
    password: "",
    password_confirmation: "",
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/auth/viewall",
    getItem: "/v1/auth/view/id",
    updateItem: "/v1/auth/update",
};

const roles = ref ([]);

onMounted (async () =>
{
    const

    { data: roleData, } = await useFetch ("/api/v1/role");

    roles.value = roleData.value;
});

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.username" label="Nomor Induk" disabled></v-text-field>
                <v-text-field v-model="forms.name" label="Nama Lengkap"></v-text-field>
                <v-select v-model="forms.role" :items="roles" item-value="id" item-title="role" label="Role"></v-select>
                <v-text-field v-model="forms.email" label="E-Mail"></v-text-field>
                <v-text-field v-model="forms.password" type="password" label="Password" autocomplete="on"></v-text-field>
                <v-text-field v-model="forms.password_confirmation" type="password" label="Konfirmasi Password" autocomplete="on"></v-text-field>
            </v-form>
        </template>
        <template v-slot:item="{ item, }">
            <v-form color="success">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id"></v-text-field></v-row>
                            <v-row><v-text-field label="Nomor Induk" variant="underlined" :model-value="item.username"></v-text-field></v-row>
                            <v-row><v-text-field label="Nama Lengkap" variant="underlined" :model-value="item.name"></v-text-field></v-row>
                            <v-row><v-text-field label="Role" variant="underlined" :model-value="item.role"></v-text-field></v-row>
                            <v-row><v-text-field label="E-Mail" variant="underlined" :model-value="item.email"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row v-if="item.updated_at"><v-text-field label="Pembaharuan" variant="underlined" :model-value="useDateTime (item.updated_at).ins.fromNow ()"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </ItemComponent>
</template>
