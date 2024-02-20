<script setup>

const isLoading = ref (false);
const isPassword = ref (false);
const isError = ref (false);
const formUserIdentity = ref ("");
const formUserPassword = ref ("");

definePageMeta (
{
    title: "Login",
});

const login = async () =>
{
    isLoading.value = true;

    const { token: tokenData, setToken, delToken, getUser, delUser, } = await useAuth (formUserIdentity.value, formUserPassword.value), userData = await getUser (tokenData);

    if (tokenData) {

        if (userData.role == "admin") await navigateTo ("/dashboard");
        else if (userData.role == "dosen") await navigateTo ("/master/lecturer/input");
        else if (userData.role == "mahasiswa") await navigateTo ("/master/coas/patient");
        else isError.value = true;

        isLoading.value = false;

    } else {

        await delUser ();

        isError.value = true;
        isLoading.value = false;
    }
};

</script>

<template>
<v-app style="background-image: url('/ground.jpg'); background-size: cover; background-position: top; background-repeat: no-repeat;">
    <v-container fill-height fluid>
        <v-row class="mt-12">
            <v-col cols="5">
                <v-card :loading="isLoading" color="transparent" class="elevation-0">
                    <template v-slot:title>
                        <v-row justify="center" align="center">
                            <v-col cols="6" align="center" class="text-center">
                                <v-img src="/welcome.png" max-width="256" max-heigth="256"></v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="text-center text-white font-weight-bold">Sistem Informasi Kepaniteraan Mahasiswa</v-col>
                        </v-row>
                    </template>
                    <v-card-subtitle>
                        <v-alert v-if="isError" type="warning" :text="$t ('auth.error')"></v-alert>
                    </v-card-subtitle>
                    <v-form @keyup.native.enter="login">
                        <v-card-text>
                            <v-text-field v-model="formUserIdentity" type="text" :label="$t ('auth.form_identity')" variant="solo-filled" light></v-text-field>
                            <v-text-field v-model="formUserPassword" prepend-inner-icon="mdi-lock-outline" :append-inner-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="isPassword = !isPassword" :type="isPassword ? 'text' : 'password'" :label="$t ('auth.form_password')" variant="solo-filled" autocomplete="on"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="login" variant="flat" color="#800000" class="text-none" block>{{ $t ("auth.form_submit") }}</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>
