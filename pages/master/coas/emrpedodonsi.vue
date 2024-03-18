<script setup>
import { useRouter } from "vue-router";
import EmrComponentPedo from '../../../components/EmrComponentPedo.vue'
  import { ref } from 'vue'

definePageMeta({
    layout: "dashboard",
    title: "emrpedodonsi",
});

const tab = ref(null);
const tab2 = ref(null);
const tab3 = ref(null);
 const ListComponent = ref(null);
// const ListComponent2 = ref(null);

const forms = reactive({
    noregister: useRouter().currentRoute.value.query.noreg,
});

const setItems = async (target) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }

    await setItem(
        "/v1/emr/pedodointi/create/medicaldentalhistory",
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
            forms.tanggal_pemeriksaan = success.Visit_Date;
            forms.namapasien = success.PatientName;
            //forms.no_rekammedik = success.NoMR;
            forms.alamat = success.Address;
            forms.no_telephone_pasien = success.MobilePhone;
            forms.noregister = success.NoRegistrasi;
            forms.noepisode = success.NoEpisode;
            forms.jenis_kelamin_pasien = success.Gander;
            forms.konsuldari = success.NamaDokter;
            forms.usiapasien = success.Usia;
            forms.pendidikan = success.Education;
            forms.jeniskelamin = success.Gander;
            forms.tgllahirpasien = success.Date_of_birth;
            forms.namaorangtua = '';
            forms.alamatpasien = success.Address;
            forms.telephone = success.MobilePhone;
            forms.pekerjaan = success.pekerjaan;
            forms.dokteranak = success.NamaDokter;
            forms.dokteranak = success.NamaDokter;
             ListComponent.value.getItems();
            // ListComponent2.value.getItems('');
            // console.log(success.);

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
        "/v1/emr/pedodointi/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                if (success.data.noepisode == null) {
                    forms.id = success.data.id;
                    forms.nim = userData.username;
                    forms.namamahasiswa = userData.name;
                    getAnItem(noreg);
                    return false;
                }
                for (const [key, value] of Object.entries(success.data)) {
                    forms[`${key}`] = value;
                }
                 ListComponent.value.getItems();
                // ListComponent2.value.getItems('');
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
    formData.append(deskripsi, deskripsi);
    formData.append("select_file", event.target.files[0]);

    const { token: tokenData } = await useAuth(),
        { data, error } = await useCall(
            fileurl,
            "post",
            "multipart/form-data",
            formData,
            tokenData
        );

    forms[`${filetype}`] = data.data.data.select_file;

    // forms.namamahasiswa = userData.name;
};

onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg);
});

const COMPONENT_TITLE = "TREATMENT PLANNING";

const COMPONENT_HEADER = [
    {
        key: "oralfinding",
        title: "Oral Fiding",
        sortable: false,
    },
    {
        key: "diagnosis",
        title: "Diagnosis",
        sortable: false,
    },
    {
        key: "treatmentplanning",
        title: "Treatment Planning",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_FORMS = {
    oralfinding: "",
    diagnosis: "",
    treatmentplanning: "",
};

const COMPONENT_APIS = {
    getAllItems: "/v1/emr/pedodointi/treatmentplan/viewall",
    getItem: "/v1/emr/pedodointi/treatmentplan/viewabyId",
    createItem: "/v1/emr/pedodointi/treatmentplan/create",
    updateItem: "/v1/emr/pedodointi/treatmentplan/update",
    deleteItem: "/v1/emr/pedodointi/treatmentplan/delete",
};

const COMPONENT_TITLE2 = "TREATMENT";

const COMPONENT_HEADER2 = [
    {
        key: "datetreatment",
        title: "Date",
        sortable: false,
    },
    {
        key: "itemtreatment",
        title: "Items",
        sortable: false,
    },
    {
        key: "supervisorname",
        title: "Supervisor Signature",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_FORMS2 = {
    datetreatment: "",
    itemtreatment: "",
    supervisorname: "",
};

const COMPONENT_APIS2 = {
    getAllItems: "/v1/emr/pedodointi/treatment/viewall",
    getItem: "/v1/emr/pedodointi/treatment/viewabyId",
    createItem: "/v1/emr/pedodointi/treatment/create",
    updateItem: "/v1/emr/pedodointi/treatment/update",
    deleteItem: "/v1/emr/pedodointi/treatment/delete",
};
</script>

<template v-slot:form="{ forms }">
    <v-form>
        <v-container>
            <v-card>
                <h1 align="center">REKAM MEDIK<br />PEDODONSI</h1>
                <v-tabs
                    v-model="tab"
                    bg-color="indigo-darken-2"
                    align-tabs="center">
                    <v-tab :value="1">PEMERIKSAAN PEDODONSI</v-tab>
                    <v-tab :value="2">ORAL EXAMINATION</v-tab>
                    <v-tab :value="3">ODONTOGRAM</v-tab>
                    <v-tab :value="4"
                        >ORAL FINDING DIAGNOSIS & TREATMENT PLAN</v-tab
                    >
                    <v-tab :value="5">TREATMENT</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                        <v-container fluid>
                            <v-tabs
                                v-model="tab2"
                                color="deep-purple-accent-4"
                                align-tabs="center">
                                <v-tab :value="1"
                                    >1. PATIENT IDENTITY & Assesment</v-tab
                                >
                                <v-tab :value="2">2. MEDICAL HISTORY</v-tab>
                                <v-tab :value="3"
                                    >3. PATIENT BEHAVIOUR RATINGS</v-tab
                                >
                                <v-tab :value="4">4. PLAQUE SCORE</v-tab>
                            </v-tabs>
                            <v-window v-model="tab2">
                                <v-window-item :value="1">
                                    <v-container fluid>
                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="forms.id"
                                                    hide-details
                                                    required
                                                    type="hidden"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="2">
                                                <h4><br />No. Registrasi</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br />:</h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="forms.noregister"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="2">
                                                <h4><br />No. Episode</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br />:</h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="forms.noepisode"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="2">
                                                <h4><br />Nama Mahasiswa</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br />:</h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="
                                                        forms.namamahasiswa
                                                    "
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="2">
                                                <h4><br />Nama Supervisor</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br />:</h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="
                                                        forms.namasupervisor
                                                    "
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="2">
                                                <h4><br />Tanda Tangan</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br />:</h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="forms.tandatangan"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="2">
                                                <h4><br />NIM</h4>
                                            </v-col>
                                            <v-col cols="12" md="1">
                                                <h4><br /></h4>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    background="transparent"
                                                    v-model="forms.nim"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <hr />

                                        <br /><br />
                                        <h4>
                                            I. PATIENT IDENTITY /
                                            <small
                                                ><i>IDENTITAS PASIEN</i></small
                                            >
                                        </h4>
                                        <hr />
                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.namapasien"
                                                    label="1. CHILD'S FULL NAME / Nama Lengkap Anak :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.jeniskelamin"
                                                    label="2. GENDER / Jenis Kelamin :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.usiapasien"
                                                    label="3. AGE / Usia :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.pendidikan"
                                                    label="4. SCHOOL LEVEL / Kelas :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.tgllahirpasien
                                                    "
                                                    label="5. DATE OF BIRTH / Tanggal Lahir :"
                                                    hide-details
                                                    type="date"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.namaorangtua"
                                                    label="6. PARENT'S NAME / Nama Orang Tua :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.alamatpasien"
                                                    label="7. ADDRESS / Alamat :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.telephone"
                                                    label="8. TELEPHONE / Telepon :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.pekerjaan"
                                                    label="9. OCUUPATION / Pekerjaan :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.dokteranak"
                                                    label="10. CHILD's PHYCISIAN / PEDIATRICIAN / Dokter / Dokter Anak :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.alamatpekerjaan
                                                    "
                                                    label="11. ADDRESS / Alamat :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.telephonedranak
                                                    "
                                                    label="12. TELEPHONE / Telepon :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-textarea
                                                    v-model="forms.anamnesis"
                                                    label="13. ANAMNESIS / Chief Complain (s) / Keluhan Utama :"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <br />
                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab2">
                                <v-window-item :value="2">
                                    <v-container fluid>
                                        <br />
                                        <h4>
                                            II. MEDICAL AND DENTAL HISTORY /
                                            <small
                                                ><i
                                                    >RIWAYAT KESEHATAN UMUM DAN
                                                    GIGI</i
                                                ></small
                                            >
                                        </h4>
                                        <hr />
                                        <br />

                                        <v-select
                                            v-model="forms.physicalgrowth"
                                            label="1. Any problem with physical growth / Apakah ada gangguan pertumbuhan fisik ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.heartdesease"
                                            label="2. Any history of congenital heart disease / Apakah ada riwayat penyakit jantung bawaan ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.bruiseeasily"
                                            label="3. Does your child bruise easily or bised for a prolonged periode of after being cut / Apakah anak anda mudah berdarah atau lama waktu berdarah jika luka ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.anemia"
                                            label="4. Any history of anemia / Apakah pernah menderita anemia ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.hepatitis"
                                            label="5. Any history of hepatitis or jaundice / Apakah pernah menderita hepatitis ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.allergic"
                                            label="6. Is your child's allergic to any medication / Apakah anak anda alergi pada obat tertentu ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.takinganymedicine"
                                            label="7. Is your child currently taking any medicine / Apakah saat ini anda sedang minum obat ?"
                                            :items="['Yes', 'No']"></v-select>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="
                                                        forms.takinganymedicineobat
                                                    "
                                                    label="7a. If yes, medication / Jika ya, sebutkan nama obatnya"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />

                                        <v-select
                                            v-model="forms.beenhospitalized"
                                            label="8. Has your child been hospitalized / Apakah anak anda pernah masuk rumah sakit ?"
                                            :items="['Yes', 'No']"></v-select>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="
                                                        forms.beenhospitalizedalasan
                                                    "
                                                    label="8a. Reason / Alasan"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />

                                        <v-select
                                            v-model="forms.toothache"
                                            label="9. Does your child have a tooth ache / Apakah anak anda sedang sakit gigi ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.childtoothache"
                                            label="10. Has your child ever had a tooth ache / Pernahkah anak anda sedang sakit gigi ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.firstdental"
                                            label="11. It this your child First Dental Visit / Apakah ini kunjungan pertama ke dokter gigi ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="
                                                forms.unfavorabledentalexperience
                                            "
                                            label="12. Has Your child ever had an unfavorable dentral experience / Apakah anak anda punya pengalaman yang kurang menyenangkan dengan dokter gigi ?"
                                            :items="['Yes', 'No']"></v-select>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.ifyes"
                                                    label="12a. If yes, when / Bila ya, kapan"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.where"
                                                    label=", where / dimana"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="forms.reason"
                                                    label="12b. Reason(s) / Mengapa"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />

                                        <v-select
                                            v-model="forms.fingersucking"
                                            label="13. Does ( has ) your child having oral sucking habit beyond 1 year of age / Apakah anak anda punya kebiasaan buruk setelah usia 1 tahun ?"
                                            :items="[
                                                'Finger sucking / Isap jari',
                                                'Lip biting / Gigit bibir',
                                                'Tongue thrust / mendorongkan lidah',
                                            ]"></v-select>

                                        <v-select
                                            v-model="
                                                forms.diffycultyopeningsjaw
                                            "
                                            label="14. Does ( has ) your child have ( had ) difficulty openings his / her jaw / Apakah anak anda sedang / pernah mengalangi kesulitan membuka mulut ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.xxxxxxxxxx"
                                            label="15. Does ( has ) your child have ( had ) popping or clicking noise or pain during eating or yawning / Apakah pada saat membuka mulut terasa sakit atau terdengar suara klik , popping pada sendi rahangnya ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.howoftenbrushtooth"
                                            label="16. How often does your child brush / Berapa kalo menyikat gigi ?"
                                            :items="['Yes', 'No']"></v-select>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="
                                                        forms.howoftenbrushtoothkali
                                                    "
                                                    label="16a. ____ time(s) / kali"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />

                                        <v-select
                                            v-model="forms.usefluoridepasta"
                                            label="17. Does your child use a fluoride pasta / Apakah menggunakan pasta mengandung fluor ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <v-select
                                            v-model="forms.fluoridetreatmen"
                                            label="18. Has your child ever had fluoride treatment / Pernahkah diberikan fluor ?"
                                            :items="['Yes', 'No']"></v-select>

                                        <br />
                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab2">
                                <v-window-item :value="3">
                                    <v-container fluid>
                                        <h4>
                                            III. PATIENT BEHAVIOUR RATINGS /
                                            <small
                                                ><i
                                                    >PERINGKAT PRILAKU PASIEN</i
                                                ></small
                                            >
                                        </h4>
                                        <hr />
                                        <br />

                                        <v-table
                                            density="compact"
                                            class="border">
                                            <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Rating No
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        Frankl scale
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        Before treatment /
                                                        Sebelum perawatan
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        During treatment /
                                                        Selama perawatan
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="text-left">1</td>
                                                    <td class="text-left">
                                                        Definitely negative ,
                                                        refusal of treatment ,
                                                        crying forcefully ,
                                                        fearful , extreme
                                                        negativism / Sangat
                                                        negative , penolakan
                                                        perawatan , menangis
                                                        meronta - ronta
                                                        ketakutan , negatif
                                                        ekstrim
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_definitelynegative_before_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_definitelynegative_during_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">2</td>
                                                    <td class="text-left">
                                                        Negative , reluctant ,
                                                        uncooperative , limited
                                                        negativism , withdrawn /
                                                        Negatif , keberatan ,
                                                        tidak koopratif ,
                                                        negatif terbatas
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_negative_before_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_negative_during_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">3</td>
                                                    <td class="text-left">
                                                        Positive , accept
                                                        treatment but may be
                                                        cautious or reserve ,
                                                        follows directions /
                                                        Positif , menerima
                                                        perawatan dengan waspada
                                                        , mengikuti instruksi
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_positive_before_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_positive_during_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">4</td>
                                                    <td class="text-left">
                                                        Definitely positive ,
                                                        good rapport ,
                                                        interested in dental
                                                        procedure , laugh and
                                                        enjoy / Sangat positif ,
                                                        hubungan yang simpatik ,
                                                        tertarik dengan prosedur
                                                        dental
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_definitelypositive_before_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                    <td class="text-left">
                                                        <v-select
                                                        v-model="
                                                        forms.franklscale_definitelypositive_during_treatment
                                                        "
                                                        label=""
                                                        :items="['Ya', 'Tidak']"></v-select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-table>
                                        <br />
                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab2">
                                <v-window-item :value="4">
                                    <v-container fluid>
                                        <h4>
                                            IV. PLAQUE SCORE /
                                            <small><i>NILAI PLAK</i></small>
                                        </h4>
                                        <hr />
                                        <br />
                                        <v-table
                                            density="compact"
                                            class="border">
                                            <thead>
                                                <tr>
                                                    <th class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        18
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        17
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        16
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        15
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        14
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        13
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        12
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        11
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        21
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        22
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        23
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        24
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        25
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        26
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        27
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        28
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        55
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        54
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        53
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        52
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        51
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        61
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        62
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        63
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        64
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        65
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="text-left">
                                                        Buccal
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_18
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_17
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_16
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_15
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_14
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_13
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_12
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_11
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_21
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_22
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_23
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_24
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_25
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_26
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_27
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_28
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td class="text-left">
                                                         Palatal
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_55
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_54
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_53
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_52
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_51
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_61
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_62
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_63
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_64
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_65
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>


                                                <tr>
                                                    <td class="text-left">
                                                        Buccal
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_85
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_84
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_83
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_82
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_81
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_71
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_72
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_73
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_74
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.buccal_75
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                                <tr>
                                                    <td class="text-left">
                                                         Palatal
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_48
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_47
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_46
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_45
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_44
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_43
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_42
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_41
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_31
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_32
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_33
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_34
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_35
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_36
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_37
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        <v-text-field
                                                            label=""
                                                            v-model="
                                                                forms.palatal_38
                                                            ">
                                                        </v-text-field>
                                                    </td>
                                                </tr>

                                                
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        85
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        84
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        83
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        82
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        81
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        71
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        72
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        73
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        74
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        75
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left"></th>
                                                </tr>
                                                <tr>
                                                    <th class="text-left"></th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        48
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        47
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        46
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        45
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        44
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        43
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        42
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        41
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        31
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        32
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        33
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        34
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        35
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        36
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        37
                                                    </th>
                                                    <th
                                                        colspan="1"
                                                        class="text-left">
                                                        38
                                                    </th>
                                                </tr>
                                            </tfoot>
                                        </v-table>

                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="forms.firstname"
                                                    label="Score / Nilai :"
                                                    hide-details
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />
                                    </v-container>
                                </v-window-item>
                            </v-window>
                        </v-container>
                    </v-window-item>
                </v-window>
                <v-window v-model="tab">
                    <v-window-item :value="2">
                        <v-container fluid>
                            <h4>
                                V. EXTRA ORAL EXAMINATION /
                                <small><i>PEMERIKSAAN EXTRA ORAL</i></small>
                            </h4>
                            <hr />
                            <br />
                            <h4>1. Facial form / Bentuk wajah</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="6">
                                        <v-select
                                        v-model="forms.bilateralsymmetry"
                                                        label="a. Bilateral Symmetry / simetri bilateral"
                                                        :items="['Yes', 'No']"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                        <v-select
                                        v-model="forms.asymmetry"
                                                        label="Asymmetri / Asimetri"
                                                        :items="['Yes', 'No']"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                        <v-select
                                        v-model="forms.straight"
                                                        label="b. Profile / profil : straight / lurus"
                                                        :items="['Yes', 'No']"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                        <v-select
                                        v-model="forms.convex"
                                                        label="convex / cembung"
                                                        :items="['Yes', 'No']"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                        <v-select
                                        v-model="forms.concave"
                                                        label="concave / cekung"
                                                        :items="['Yes', 'No']"></v-select>
                                </v-col>
                            </v-row>

                            <br />
                            <h4>2. Lips seal / Katup bibir</h4>
                            <br />
                            <v-select
                                v-model="forms.lipsseal"
                                label="Positive or Negative"
                                :items="['Positive', 'Negative']"></v-select>

                            <br />
                            <h4>3. TMJ</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.clicking"
                                        label="a. Clicking / Bunyi klik :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.clickingleft"
                                        label="Left / Kiri :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.clickingright"
                                        label="Right / Kanan :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.pain"
                                        label="b. Pain / Nyeri :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.painleft"
                                        label="Left / Kiri :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                                <v-col cols="12" md="4"
                                    ><v-select
                                        v-model="forms.painright"
                                        label="Right / Kanan :"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                            </v-row>

                            <br />
                            <h4>4. Body posture/ postur tubuh</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="12"
                                    ><v-select
                                        v-model="forms.bodypostur"
                                        label="Select Postur"
                                        :items="[
                                            'Stright / Tegap',
                                            'Kiphosis / Kifosis',
                                            'Scoliosis/Skoliosis',
                                            'Lordosis / Lordosis',
                                        ]"></v-select
                                ></v-col>
                            </v-row>

                            <br />
                            <h4>
                                VI. INTRA ORAL EXAMINATION /
                                <small><i>PEMERIKSAAN INTRA ORAL</i></small>
                            </h4>
                            <hr />
                            <br />
                            <h4>1. Stage of detention / Tahapan geligi</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="12"
                                    ><v-select
                                        v-model="forms.stageofdentition"
                                        label="Select Stage"
                                        :items="[
                                            'Primary / Sulung',
                                            'Mixed / Campuran',
                                            'Early/Awal',
                                            'Late / Lanjut',
                                            'Permanent / Tetap',
                                        ]"></v-select
                                ></v-col>
                            </v-row>

                            <h4>
                                2. Soft tissue status / Status jaringan lunak :
                            </h4>
                            <br />
                            <v-text-field
                                v-model="forms.gingivitis"
                                label="a. Gingivitis : region ________"></v-text-field>
                            <v-text-field
                                v-model="forms.stomatitis"
                                label="b. Stomatitis : region ________"></v-text-field>
                            <v-text-field
                                v-model="forms.gumboil"
                                label="c. Gum Boil / fistulate : region ________"></v-text-field>

                            <br />
                            <h4>3. Dental anomaly / Anomal gigi</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="12"
                                    ><v-select
                                        v-model="forms.dentalanomali"
                                        label="YES OR NO"
                                        :items="['Yes', 'No']"></v-select
                                ></v-col>
                            </v-row>

                            <br />
                            <h4>4. Premature loss / Gigi tanggal dini</h4>
                            <br />
                            <v-text-field
                                v-model="forms.prematurloss"
                                label="?__________"></v-text-field>

                            <br />
                            <h4>
                                5. Over retained primary tooth / Persintensi
                                gigi sulung
                            </h4>
                            <br />
                            <v-text-field
                                v-model="forms.overretainedprimarytooth"
                                label="?__________"></v-text-field>

                            <br />
                        </v-container>
                    </v-window-item>
                </v-window>
                <v-window v-model="tab">
                    <v-window-item :value="3">
                        <v-container fluid>
                            <h4>
                                ODONTOGRAM / <small><i>ODONTOGRAM</i></small>
                            </h4>
                            <br />
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-dialog width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                v-bind="props"
                                                text="Upload foto Odontogram">
                                            </v-btn>
                                        </template>
                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Upload File">
                                                <v-file-input
                                                    @change="
                                                        setUploadFile(
                                                            $event,
                                                            'odontogramfoto',
                                                            '/v1/emr/pedodointi/create/uploadodontogramfoto',
                                                            forms.id,
                                                            'notes'
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
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-container class="fill-height" fluid>
                                        <v-fade-transition mode="out-in">
                                            <v-row>
                                                <v-col cols="10">
                                                    <v-card>
                                                        <v-img
                                                            style="
                                                                min-width: 500;
                                                            "
                                                            :src="
                                                                forms.odontogramfoto
                                                            "
                                                            class="bg-grey-lighten-2"></v-img>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-fade-transition>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <h4>Rahang Atas</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="d:"
                                        v-model="forms.dpalatal"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="e:"
                                        v-model="forms.epalatal"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="f:"
                                        v-model="forms.fpalatal"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="def:"
                                        v-model="
                                            forms.defpalatal
                                        "></v-text-field>
                                </v-col>
                            </v-row>
                            <h4>Rahang Bawah</h4>
                            <br />
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="d:"
                                        v-model="forms.dlingual"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="e:"
                                        v-model="forms.elingual"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="f:"
                                        v-model="forms.flingual"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        label="def:"
                                        v-model="
                                            forms.deflingual
                                        "></v-text-field>
                                </v-col>
                            </v-row>
                            <br />
                        </v-container>
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="4">
                        <v-container fluid>
                            <h4>
                                Surface are to be noted using the following
                                capital letters / bidang orientasi notasi dengan
                                huruf-huruf besar berikut
                            </h4>
                            <br />

                            <h4>M = Mesial</h4>
                            <h4>D = Distal</h4>
                            <h4>V = Lingual</h4>
                            <h4>O = Occlusal</h4>
                            <br />

                            <h4>Material (FILLING) / bahan (penambahan)</h4>
                            <h4>
                                Use the following colors / Gunakan warna-warni
                                berikut
                            </h4>
                            <h4>
                                Black / Hitam = Amalgam / amalgam, in,lay,
                                uplay, stainless steel crown
                            </h4>
                            <h4>Red / Merah = Gold / Emas</h4>
                            <h4>
                                Green / Hijau = Tooth collor material / bahan
                                tambal sesuai warna gigi
                            </h4>
                            <br />

                            <h4>
                                Missing teeth / gigi tanggal = place large cros
                                over the tooth / silang pada posisi gigi tanggal
                                (X)
                            </h4>
                            <h4>
                                Cavity / Kavitas = Outline cavity is black /
                                jejaki kavitas dengan garis hitam (O)
                            </h4>
                            <h4>
                                Restoration / Tambal = Block out
                                restorationusing the aforementioned color coding
                                / tambahan diberi warna penuh dengan kode di
                                atas (.)
                            </h4>
                            <h4>
                                Fracture / Patah = Fracture of tooth material
                                denoted by "=/" symbol over effected tooth /
                                patahan material ggig ditunjukkan dengan tanda
                                "=/" pada gig yang bersangkutan
                            </h4>
                            <h4>
                                Crown / Mahkota = color tooth with appropriate
                                color / beri warna yang sesuai dengan bahan
                                tambal
                            </h4>
                            <h4>
                                Space closed/ Penutupan ruang = Use arrow /
                                gunakan tanda -><-
                            </h4>
                            <h4>
                                Space opened/ perenggangan = Use arrow / gunakan
                                tanda <- ->
                            </h4>
                            <h4>
                                Tooth Rotate/ Gigi Terputar = Use of a curve
                                arrow under tooth / gunakan tanda panah lekung
                                di bawah gigi tsb 0
                            </h4>
                            <h4>
                                Retained root/ Sisa Akar = RR / tandai dengan RR
                            </h4>
                            <h4>
                                Non Vital / gigi mati = NV / tandai dengan NV
                            </h4>
                            <h4>
                                Unerupted tooth / gigi tidak tumbuh = use
                                capital letters "UE" / tandai dengan hurud besar
                                "UE"
                            </h4>
                            <h4>
                                Partial Eruption / gig tumbuh sebagian = use
                                capital letters "PE" / tandai dengan huruf besar
                                "PE"
                            </h4>

                            <br />
                            <br />

                            <h4>
                                VII. ORAL FINDING DIAGNOSIS & TREATMENT PLAN /
                                <small
                                    ><i>DIAGNOSA & RENCANA PERAWATAN</i></small
                                >
                            </h4>
                            <hr />
                            <EmrComponentPedo
                                ref="ListComponent"
                                :title="COMPONENT_TITLE"
                                :header="COMPONENT_HEADER"
                                :forms="COMPONENT_FORMS"
                                :apis="COMPONENT_APIS"
                                :idemr="forms.id">
                                <template v-slot:form="{ forms }">
                                    <v-form>
                                        <!-- <v-text-field
                                            label="ID"
                                            readonly></v-text-field>
                                        <v-text-field
                                            label="Oral Finding"></v-text-field>
                                        <v-text-field
                                            label="Diagnosis"></v-text-field>
                                        <v-text-field
                                            label="Treatment Planning"></v-text-field> -->
                                        <v-text-field
                                            v-model="forms.oralfinding"
                                            label="oralfinding"></v-text-field>
                                        <v-text-field
                                            v-model="forms.diagnosis"
                                            label="diagnosis"></v-text-field>
                                        <v-text-field
                                            v-model="forms.treatmentplanning"
                                            label="treatmentplanning"></v-text-field>
                                    </v-form>
                                </template>
                                <template v-slot:item="{ item }">
                                    <v-form color="success">
                                        <v-container>
                                            <v-row>
                                                <v-row>
                                                    <v-col>
                                                        <v-row
                                                            ><v-text-field
                                                                color="success"
                                                                label="ID"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.id
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="Oral Finding"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.oralfinding
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="Diagnosis"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.diagnosis
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="Treatment Planning"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.treatmentplanning
                                                                "></v-text-field
                                                        ></v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </template>
                            </EmrComponentPedo>
                            <br />

                            <br />
                        </v-container>
                    </v-window-item>
                </v-window>
                <v-window v-model="tab">
                    <v-window-item :value="5">
                        <v-container fluid>
                            <h4>
                                VIII. TREATMENT /
                                <small><i>PERAWATAN</i></small>
                            </h4>
                            <hr />
                            <br />

                            <EmrComponentPedoTreatment
                                ref="ListComponent2"
                                :title="COMPONENT_TITLE2"
                                :header="COMPONENT_HEADER2"
                                :forms="COMPONENT_FORMS2"
                                :apis="COMPONENT_APIS2"
                                :idemr="forms.id">
                                <template v-slot:form="{ forms }">
                                    <v-form>
                                        <v-text-field
                                            v-model="forms.datetreatment"
                                            label="datetreatment"></v-text-field>
                                        <v-text-field
                                            v-model="forms.itemtreatment"
                                            label="itemtreatment"></v-text-field>
                                        <v-text-field
                                            v-model="forms.supervisorname"
                                            label="supervisorname"></v-text-field>
                                    </v-form>
                                </template>
                                <template v-slot:item="{ item }">
                                    <v-form color="success">
                                        <v-container>
                                            <v-row>
                                                <v-row>
                                                    <v-col>
                                                        <v-row
                                                            ><v-text-field
                                                                color="success"
                                                                label="ID"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.id
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="datetreatment"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.datetreatment
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="itemtreatment"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.itemtreatment
                                                                "></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-text-field
                                                                label="supervisorname"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.supervisorname
                                                                "></v-text-field
                                                        ></v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </template>
                            </EmrComponentPedoTreatment>

                        </v-container>
                    </v-window-item>
                </v-window>
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
