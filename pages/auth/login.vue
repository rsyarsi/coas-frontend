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

    const { token, } = await useAuth (formUserIdentity.value, formUserPassword.value);

    if (token) {

        isError.value = false;

        await navigateTo ("/dashboard");

    } else {

        isError.value = true;
    }
};

</script>

<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col>
                <v-card :loading="isLoading" rounded>
                    <v-card-title class="font-weight-bold">
                        {{ $t ("auth.title") }}
                    </v-card-title>
                    <v-card-subtitle>
                        <v-alert v-if="isError" type="warning" :text="$t ('auth.error')"></v-alert>
                    </v-card-subtitle>
                    <v-form>
                        <v-card-text>
                            <v-text-field v-model="formUserIdentity" type="text" :label="$t ('auth.form_identity')" variant="outlined" color="#E6BE8A"></v-text-field>
                            <v-text-field v-model="formUserPassword" prepend-inner-icon="mdi-lock-outline" :append-inner-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="isPassword = !isPassword" :type="isPassword ? 'text' : 'password'" :label="$t ('auth.form_password')" variant="outlined" color="#E6BE8A"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="login" variant="flat" color="#800000" class="text-none" block>{{ $t ("auth.form_submit") }}</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
