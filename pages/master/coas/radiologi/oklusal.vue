<script setup>
definePageMeta({
    layout: "dashboard",
    title: "Oklusal",
});

const tab = ref(null);
const tab2 = ref(null);
const tab3 = ref(null);
const ListComponent = ref(null);

var forms = reactive({
    noregister: useRouter().currentRoute.value.query.noreg,
});

const setItems = async (target) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }
    formTarget['jenisradiologi'] = 'OKLUSAL'
    await setItem(
        "/v1/emr/radiologi/create/medicalwaktuperawatan",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                alert(success.message);
            } else {
                alert(success.message);
            }
        },
        (error) => {
            alert(error.data.message);
        }
    );
};
const getAnItem = async (target) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData);

    await getItem(
        "/v1/transaction/patient/detailbyNoregistrasi",
        target,
        (success) => {
            forms.namadokter = success.NamaDokter;
            forms.tglpotret = success.Visit_Date;
            forms.namapasien = success.PatientName;
            forms.alamat = success.Address;
            forms.noregistrasi = success.NoRegistrasi;
            forms.noepisode = success.NoEpisode;
            forms.nomr = success.NoMR;
            forms.usia = success.Usia;
            //console.log(forms);

            // for (let form of Object.keys (forms)) {
            //     forms[form] = success[form];
            //   }
        },
        (error) => {}
    );
};
const getByID = async (noreg) => {
    const { token: tokenData, getUser } = await useAuth(),
        userData = await getUser(tokenData),
        { getItem, setItem } = useItem(tokenData),
        formTarget = { nim: userData.username, noregister: noreg };

    await setItem(
        "/v1/emr/radiologi/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                if (success.data.noepisode == null) {
                    forms.id = success.data.id;
                    forms.nim = userData.username;
                    forms.namaoperator = userData.name;
                    getAnItem(noreg);
                    return false;
                }
                for (const [key, value] of Object.entries(success.data)) {
                    forms[`${key}`] = value;
                }
                
                // image.designngigitext.push(success.data.designngigitext);
            }
        },
        (error) => {
            console.log(error);
        }
    );
};

const setUploadFile = async (event, filetype, fileurl, fileid, deskripsi) => {
    const formData = new FormData();

    formData.append("id", fileid);
    formData.append("notes", deskripsi);
    formData.append("select_file", event.target.files[0]);

    const { token: tokenData } = await useAuth(),
        { data, error } = await useCall(
            fileurl,
            "post",
            "multipart/form-data",
            formData,
            tokenData
        );

    if (filetype == "foto")
        forms.foto = data.data.data.select_file;
};

onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg);
    //await getAnItem ( useRouter().currentRoute.value.query.noreg );

    //image.designngigitext.push(forms.designngigitext);
});
</script>

<template v-slot:form="{ forms }">
    <v-form>
        <v-container>
            <v-card>
                <h1 align="center">LEMBAR INTERPRETASI OKLUSAL RKG 2<br /></h1>

                <v-container fluid>
                    <v-container fluid>
                        <br />
                        <v-text-field
                            v-model="forms.id"
                            type="hidden"></v-text-field>
                        <h1 class="font-weight-bold text-center text-basil">
                            IDENTITAS PASIEN
                        </h1>
                        <br />
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="forms.noregistrasi"
                                    label="No Registrasi"
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="forms.noepisode"
                                    label="No Episode"
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="forms.nomr"
                                    label="No. RM"
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="forms.tglpotret"
                                    label="Tanggal Pemotretan"
                                    hide-details
                                    required
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="forms.namadokter"
                                    label="Nama Dokter"
                                    hide-details
                                    required
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="forms.namapasien"
                                    label="Nama Pasien"
                                    required
                                    hide-details
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="forms.usia"
                                    label="Usia"
                                    required
                                    hide-details
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="forms.alamat"
                                    label="Alamat Pasien"
                                    hide-details
                                    required
                                    variant="outlined"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>

                        <br />

                        <h4>Diagnosa Klinis</h4>

                        <br />
                        <v-row>
                            <v-col rows="2" cols="12">
                                <v-textarea
                                    v-model="forms.diagnosaklinik"
                                    label="Diagnosa Klinis"
                                    variant="outlined"></v-textarea>
                            </v-col>
                        </v-row>

                        <v-col cols="10" md="6">
                            <v-dialog width="300">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        v-bind="props"
                                        text="UPLOAD FOTO DIAGNOSA">
                                    </v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Upload File">
                                        <v-file-input
                                            @change="
                                                setUploadFile(
                                                    $event,
                                                    'foto',
                                                    '/v1/emr/radiologi/foto/uploadfoto',
                                                    forms.id,
                                                    forms.keterangan
                                                )
                                            "
                                            show-size
                                            counter
                                            label="File input"></v-file-input>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                text="Close Dialog"
                                                @click="
                                                    isActive.value = false
                                                "></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <v-container
                                class="fill-height"
                                fluid
                                style="min-height: 300px">
                                <v-fade-transition mode="out-in">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-card>
                                                <v-img
                                                    :src="forms.foto"
                                                    height="300"
                                                    class="bg-grey-lighten-2"></v-img>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-fade-transition>
                            </v-container>
                        </v-col>

                        <h1 class="font-weight-bold text-center text-basil">
                            DATA INTERPRETASI
                        </h1>

                        <br />

                        <v-row>
                            <v-col rows="2" cols="12">
                                <v-textarea
                                    v-model="forms.oklusal_kesan"
                                    label="Kesan"
                                    variant="outlined"></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col rows="2" cols="12">
                                <v-textarea
                                    v-model="forms.oklusal_suspek_radiognosis"
                                    label="Suspek Radiognosis"
                                    variant="outlined"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-card>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="setItems" color="primary" variant="outlined">{{
                $t("action.button.save")
            }}</v-btn>
        </v-card-actions>
    </v-form>
</template>
