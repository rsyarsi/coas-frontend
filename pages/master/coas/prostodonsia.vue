<script setup>
definePageMeta({
    layout: "dashboard",
    title: "prostodonsia",
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
        userData = await getUser(tokenData),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }

    await setItem(
        "/v1/emr/prostodonti/create/medicaldentalhistory",
        "",
        formTarget,
        async (success) => {
            if (success.code == 200) {
                alert(success.message);

                var statusRoute = useRouter().currentRoute.value.query;
                statusRoute.id_emr = statusRoute.id_emr ?? success.data.id;

                if (userData.role == "mahasiswa") await updateStatusToWrite (statusRoute);

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
            forms.tanggal = success.Visit_Date;
            forms.namapasien = success.PatientName;
            forms.jeniskelamin = success.Gander;
            forms.alamatpasien = success.Address;
            forms.nomortelpon = success.MobilePhone;
            forms.noregister = success.NoRegistrasi;
            forms.noepisode = success.NoEpisode;
            forms.nomorrekammedik = success.NoMR;
            forms.pekerjaan = success.pekerjaan;
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
        "/v1/emr/prostodonti/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                if (success.data.noepisode == null) {
                    forms.id = success.data.id;
                    forms.npm = userData.username;
                    forms.namaoperator = userData.name;
                    getAnItem(noreg);
                    return false;
                }
                for (const [key, value] of Object.entries(success.data)) {
                    forms[`${key}`] = value;
                }
                if (success.data.reliningregiotanggal != null) {
                    forms.reliningregiotanggal = useDateTime(
                        success.data.reliningregiotanggal
                    ).ins.format("YYYY-MM-DD");
                }
                if (success.data.reparasiregiotanggal != null) {
                    forms.reparasiregiotanggal = useDateTime(
                        success.data.reparasiregiotanggal
                    ).ins.format("YYYY-MM-DD");
                }
                if (success.data.perawatanulanglainlaintanggal != null) {
                    forms.perawatanulanglainlaintanggal = useDateTime(
                        success.data.perawatanulanglainlaintanggal
                    ).ins.format("YYYY-MM-DD");
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

    if (filetype == "designngigitext")
        forms.designngigitext = data.data.data.select_file;
    if (filetype == "fotoodontogram")
        forms.fotoodontogram = data.data.data.select_file;
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
                <h1 align="center">REKAM MEDIK<br />PROSTODONTI</h1>
                <v-tabs
                    v-model="tab"
                    bg-color="indigo-darken-2"
                    align-tabs="center">
                    <v-tab :value="1">PEMERIKSAAN PROSTODONTI</v-tab>
                    <v-tab :value="2">RENCARA PERAWATAN</v-tab>
                    <v-tab :value="3">GIGI TIRUAN SEBAGIAN LEPASAN</v-tab>
                    <v-tab :value="4">PROGNOSIS & PERAWATAN ULANG</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                        <v-container fluid>
                            <v-tabs
                                v-model="tab2"
                                color="deep-purple-accent-4"
                                align-tabs="center">
                                <v-tab :value="1"
                                    >1. PATIENT IDENTITY & ANAMNESIS</v-tab
                                >
                                <v-tab :value="2">2. EXTRA ORAL</v-tab>
                                <v-tab :value="3">3. INTRA ORAL</v-tab>
                                <v-tab :value="4"
                                    >4. INTRA ORAL LAIN - LAIN</v-tab
                                >
                            </v-tabs>
                            <v-window v-model="tab2">
                                <v-window-item :value="1">
                                    <v-container fluid>
                                        <br />
                                        <v-text-field
                                            v-model="forms.id"
                                            type="hidden"></v-text-field>
                                        <h1
                                            class="font-weight-bold text-center text-basil">
                                            IDENTITAS PASIEN
                                        </h1>
                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    v-model="forms.noregister"
                                                    label="Nomor Registrasi"
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    v-model="forms.noepisode"
                                                    label="No.Episode"
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    v-model="
                                                        forms.nomorrekammedik
                                                    "
                                                    label="Nomor Rekam Medik"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    v-model="forms.tanggal"
                                                    label="Tanggal"
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="forms.namapasien"
                                                    label="Nama Pasien"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="forms.alamatpasien"
                                                    label="Alamat Pasien"
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="4">
                                                <v-text-field
                                                    v-model="forms.pekerjaan"
                                                    label="Pekerjaan"
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-text-field
                                                    v-model="forms.jeniskelamin"
                                                    label="Jenis Kelamin"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-text-field
                                                    v-model="forms.nomortelpon"
                                                    label="Nomor Telpon"
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.namaoperator"
                                                    label="Nama Operator"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="forms.npm"
                                                    label="NIM"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <br />
                                        <hr />
                                        <br />
                                        <h4>A. ANAMNESIS</h4>

                                        <br />
                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.keluhanutama"
                                                    label="Keluhan Utama"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.riwayatgeligi
                                                    "
                                                    label="Riwayat Geligi"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.pengalamandengangigitiruan
                                                    "
                                                    label="Pengalaman Dengan Gigi Tiruan"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.estetis"
                                                    label="- Estetis"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.fungsibicara"
                                                    label="- Fungsi Bicara"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.penguyahan"
                                                    label="- Penguyahan"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.pembiayaan"
                                                    label="Pembiayaan"
                                                    variant="outlined"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col rows="2" cols="12">
                                                <v-textarea
                                                    v-model="forms.lainlain"
                                                    label="Lain-lain"
                                                    variant="outlined"></v-textarea>
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
                                        <hr />
                                        <h4>B. PEMERIKSAAN</h4>
                                        <br />
                                        <h5>1. EKSTRA ORAL</h5>
                                        <br />
                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="forms.wajah"
                                                    label="a. Wajah"
                                                    :items="[
                                                        'Ovoid',
                                                        'Squere',
                                                        'Tappering',
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="forms.profilmuka"
                                                    label="b. Profil Muka"
                                                    :items="[
                                                        'Lurus',
                                                        'Cembung',
                                                        'Cekung *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="forms.pupil"
                                                    label=" c. Pupil"
                                                    :items="[
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="forms.tragus"
                                                    label="d. Tragus"
                                                    :items="[
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="forms.hidung"
                                                    label="e. Hidung"
                                                    :items="[
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.pernafasanmelaluihidung
                                                    "
                                                    label="Pernafasan Melalui Hidung"
                                                    :items="[
                                                        'Lancar',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.bibiratas"
                                                    label="f. Bibir Atas"
                                                    :items="[
                                                        'Hipotonus',
                                                        'Normal',
                                                        'Hipertonus',
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.bibiratas_b"
                                                    label=""
                                                    :items="['Tebal', 'Tipis*']"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.bibirbawah"
                                                    label="g. Bibir Bawah"
                                                    :items="[
                                                        'Hipotonus',
                                                        'Normal',
                                                        'Hipertonus',
                                                        'Simetris',
                                                        'Asimetris *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.bibirbawah_b"
                                                    label=""
                                                    :items="['Tebal', 'Tipis*']"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <h4>h. Kelenjar Getah Bening :</h4>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.submandibulariskanan
                                                    "
                                                    label="Submandibularis Kanan"
                                                    :items="[
                                                        'Sakit',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.submandibulariskanan_b
                                                    "
                                                    label=""
                                                    :items="[
                                                        'Teraba',
                                                        'Tidak*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.submandibulariskiri
                                                    "
                                                    label="Submandibularis Kiri"
                                                    :items="[
                                                        'Sakit',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.submandibulariskiri_b
                                                    "
                                                    label=""
                                                    :items="[
                                                        'Teraba',
                                                        'Tidak*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.sublingualis"
                                                    label="Sublingualis"
                                                    :items="[
                                                        'Sakit',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.sublingualis_b
                                                    "
                                                    label=""
                                                    :items="[
                                                        'Teraba',
                                                        'Tidak*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <h4>i. Sendi Rahang :</h4>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.sisikiri"
                                                    label="Sisi Kiri"
                                                    :items="[
                                                        'bunyi',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col rows="1" cols="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.sisikirisejak
                                                    "
                                                    label="sejak"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.sisikanan"
                                                    label="Sisi Kanan"
                                                    :items="[
                                                        'bunyi',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col rows="1" cols="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.sisikanansejak
                                                    "
                                                    label="sejak"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.membukamulut"
                                                    label="Membuka Mulut"
                                                    :items="[
                                                        'Deviasi',
                                                        'Tidak Deviasi *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.membukamulut_b
                                                    "
                                                    label=""
                                                    :items="[
                                                        'Ke Kiri',
                                                        'Ke Kanan*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-textarea
                                                    v-model="forms.kelainanlain"
                                                    label="j. Kelainan lain"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <br />
                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab2">
                                <v-window-item :value="3">
                                    <v-container fluid>
                                        <br />
                                        <hr />
                                        <br />

                                        <h5>2. INTRA ORAL</h5>
                                        <br />
                                        <h5>a. PEMERIKSAAN UMUM</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="forms.higienemulut"
                                                    label="1) Higiene mulut"
                                                    :items="[
                                                        'Baik',
                                                        'Sedang',
                                                        'Buruk *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.salivakuantitas
                                                    "
                                                    label="2) Saliva: -Kuantitas"
                                                    :items="[
                                                        'Sedikit',
                                                        'Normal',
                                                        'Banyak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.salivakonsisten
                                                    "
                                                    label="Saliva: -Konsisten"
                                                    :items="[
                                                        'Encer',
                                                        'Normal',
                                                        'Kental *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.lidahukuran"
                                                    label="3) Lidah: -Ukuran"
                                                    :items="[
                                                        'Kecil',
                                                        'Normal',
                                                        'Besar *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.lidahposisiwright
                                                    "
                                                    label="Lidah: -Posisi Wright"
                                                    :items="[
                                                        'Kelas I',
                                                        'Kelas II',
                                                        'Kelas III *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.lidahmobilitas
                                                    "
                                                    label="Lidah: -Mobilitas"
                                                    :items="[
                                                        'Normal',
                                                        'Aktif *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.refleksmuntah
                                                    "
                                                    label="4) Refleks Muntah"
                                                    :items="[
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.mukosamulut"
                                                    label="5) Mukosa Mulut"
                                                    :items="[
                                                        'Sehat',
                                                        'Ada Kelainan *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.mukosamulutberupa
                                                    "
                                                    label="Berupa"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.gigitan"
                                                    label="6) Gigitan"
                                                    :items="['Ada', 'Tidak *']"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.gigitanbilaada
                                                    "
                                                    label="Bila Ada"
                                                    :items="[
                                                        'Stabil',
                                                        'Tidak Stabil*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.gigitanterbuka
                                                    "
                                                    label="Gigitan Terbuka"
                                                    :items="['Ada', 'Tidak *']"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.gigitanterbukaregion
                                                    "
                                                    label="Region"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.gigitansilang
                                                    "
                                                    label="Gigitan Silang"
                                                    :items="['Ada', 'Tidak *']"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.gigitansilangregion
                                                    "
                                                    label="Region"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.hubunganrahang
                                                    "
                                                    label="Hubungan Rahang"
                                                    :items="[
                                                        'Ortognati',
                                                        'Retrognati',
                                                        'Prognati *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.pemeriksaanrontgendental
                                                    "
                                                    label="7) Pemeriksaan Rontgen : -Dental"
                                                    :items="[
                                                        'Perlu',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="forms.elemengigi"
                                                    label="Elemen gigi"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.pemeriksaanrontgenpanoramik
                                                    "
                                                    label="Pemeriksaan Rontgen : -Panoramik"
                                                    :items="[
                                                        'Perlu',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.pemeriksaanrontgentmj
                                                    "
                                                    label="Pemeriksaan Rontgen : -TMJ"
                                                    :items="[
                                                        'Perlu',
                                                        'Tidak *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="forms.frakturgigi"
                                                    label="8) Fraktur : -Gigi"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>

                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.frakturarah"
                                                    label="Fraktur : -Arah"
                                                    :items="[
                                                        'Horisontal',
                                                        'Diagonal',
                                                        'Vertical *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.frakturbesar"
                                                    label="Fraktur : -Besar"
                                                    :items="[
                                                        '<1/3,1/3-1/2.2/3>',
                                                        'Serviko Insisal/oklusal mesio distal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.intraorallainlain
                                                    "
                                                    label="9) Lain-lain "
                                                    variant="outlined"
                                                    rows="2"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.perbandinganmahkotadanakargigi
                                                    "
                                                    label="10) Perbandingan Mahkota & akar gigi "
                                                    variant="outlined"
                                                    rows="2"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.interprestasifotorontgen
                                                    "
                                                    label="-Interprestasi Foto Rontgen "
                                                    variant="outlined"
                                                    rows="2"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="
                                                        forms.intraoralkebiasaanburuk
                                                    "
                                                    label="11) Kebiasaan Buruk "
                                                    :items="[
                                                        'Ada',
                                                        'Tidak Ada*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-textarea
                                                    v-model="
                                                        forms.intraoralkebiasaanburukberupa
                                                    "
                                                    label="Berupa"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>b. PEMERIKSAAN ODONTOGRAM</h5>
                                        <br />
                                        <v-table
                                            density="compact"
                                            class="border">
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">
                                                        11[51]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_11_51
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_61_21
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [61]21
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        12[52]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_12_52
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_62_22
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [62]22
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        13[53]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_13_53
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_63_23
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [63]23
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        14[54]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_14_54
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_64_24
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [64]24
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        15[55]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_15_55
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_65_25
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [65]25
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        16
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_16
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_26
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        26
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        17
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_17
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_27
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        27
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        18
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_18
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_28
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        28
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </v-table>
                                        <br />
                                        <!-- <v-img
                                            :width="1500"
                                            aspect-ratio="16/9"
                                            cover
                                            src="/img/gigi.jpeg"></v-img> -->
                                        <v-dialog width="300">
                                            <template
                                                v-slot:activator="{ props }">
                                                <v-btn
                                                    v-bind="props"
                                                    text="UPLOAD ODONTOGRAM">
                                                </v-btn>
                                            </template>

                                            <template
                                                v-slot:default="{ isActive }">
                                                <v-card title="Upload File">
                                                    <v-file-input
                                                        @change="
                                                            setUploadFile(
                                                                $event,
                                                                'fotoodontogram',
                                                                '/v1/emr/prostodonti/create/uploadodontogram',
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
                                                                :src="
                                                                    forms.fotoodontogram
                                                                "
                                                                height="300"
                                                                class="bg-grey-lighten-2"></v-img>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-fade-transition>
                                        </v-container>
                                        <br />
                                        <v-table
                                            density="compact"
                                            class="border">
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">
                                                        48
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_48
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_38
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        38
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        47
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_47
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_37
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        37
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        46
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_46
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_36
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        36
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        45[85]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_45_85
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_75_35
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [75]35
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        44[84]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_44_84
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_74_34
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [74]34
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        43[83]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_43_83
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_73_33
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [73]33
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        42[82]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_42_82
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_72_32
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [72]32
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        41[81]
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_41_81
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        <v-text-field
                                                            v-model="
                                                                forms.pemeriksaanodontogram_71_31
                                                            "></v-text-field>
                                                    </td>
                                                    <td class="text-center">
                                                        [71]31
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
                                        <br />
                                        <hr />
                                        <br />
                                        <h5>c. PEMERIKSAAN LAIN</h5>
                                        <br />
                                        <h5>1. Vestibulum</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangataspostkiri
                                                    "
                                                    label="Rahang Atas : -Post Kiri"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangataspostkanan
                                                    "
                                                    label="Rahang Atas : -Post Kanan"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasanterior
                                                    "
                                                    label="Rahang Atas : -Anterior"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahpostkiri
                                                    "
                                                    label="Rahang Bawah : -Post Kiri"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahpostkanan
                                                    "
                                                    label="Rahang Bawah : -Post Kanan"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahanterior
                                                    "
                                                    label="Rahang Bawah : -Anterior"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <h5>
                                            2. Prosesus Alveolaris / Residual
                                            Ridge Regio
                                        </h5>
                                        <br />
                                        <h5>Rahang Atas :</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukpostkiri
                                                    "
                                                    label="Bentuk : -Post Kiri"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukpostkanan
                                                    "
                                                    label="Bentuk : -Post Kanan"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukanterior
                                                    "
                                                    label="Bentuk : -Anterior"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasketinggianpostkiri
                                                    "
                                                    label="Ketinggian : -Post Kiri"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasketinggianpostkanan
                                                    "
                                                    label="Ketinggian : -Post Kanan"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasketinggiananterior
                                                    "
                                                    label="Ketinggian : -Anterior"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatastahananjaringanpostkiri
                                                    "
                                                    label="Tahanan Jaringan : -Post Kiri"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatastahananjaringanpostkanan
                                                    "
                                                    label="Tahanan Jaringan : -Post Kanan"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatastahananjaringananterior
                                                    "
                                                    label="Tahanan Jaringan : -Anterior"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukpermukaanpostkiri
                                                    "
                                                    label="Bentuk Permukaan : -Post Kiri"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukpermukaanpostkanan
                                                    "
                                                    label="Bentuk Permukaan : -Post Kanan"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangatasbentukpermukaananterior
                                                    "
                                                    label="Bentuk Permukaan : -Anterior"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>Rahang Bawah :</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukpostkiri
                                                    "
                                                    label="Bentuk : -Post Kiri"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukpostkanan
                                                    "
                                                    label="Bentuk : -Post Kanan"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukanterior
                                                    "
                                                    label="Bentuk : -Anterior"
                                                    :items="[
                                                        'Segi 4',
                                                        'Oval',
                                                        'Segi 3 *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahketinggianpostkiri
                                                    "
                                                    label="Ketinggian : -Post Kiri"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahketinggianpostkanan
                                                    "
                                                    label="Ketinggian : -Post Kanan"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahketinggiananterior
                                                    "
                                                    label="Ketinggian : -Anterior"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahtahananjaringanpostkiri
                                                    "
                                                    label="Tahanan Jaringan : -Post Kiri"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahtahananjaringanpostkanan
                                                    "
                                                    label="Tahanan Jaringan : -Post Kanan"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahtahananjaringananterior
                                                    "
                                                    label="Tahanan Jaringan : -Anterior"
                                                    :items="[
                                                        'Flby',
                                                        'Tinggi',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukpermukaanpostkiri
                                                    "
                                                    label="Bentuk Permukaan : -Post Kiri"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukpermukaanpostkanan
                                                    "
                                                    label="Bentuk Permukaan : -Post Kanan"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.rahangbawahbentukpermukaananterior
                                                    "
                                                    label="Bentuk Permukaan : -Anterior"
                                                    :items="[
                                                        'Rata',
                                                        'Tidak Rata *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>Relasi Rahang :</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.anterior"
                                                    label="Anterior"
                                                    :items="[
                                                        'Prognati',
                                                        'Normal',
                                                        'Retrognati*',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.prosteriorkiri
                                                    "
                                                    label="Prosterior :-Kiri"
                                                    :items="[
                                                        'Normal',
                                                        'Crossbite',
                                                        'Scissors Bite *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="
                                                        forms.prosteriorkanan
                                                    "
                                                    label="Prosterior :-Kanan"
                                                    :items="[
                                                        'Normal',
                                                        'Crossbite',
                                                        'Scissors Bite *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>3. Frenulum</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.labialissuperior
                                                    "
                                                    label="-Labialis Superior"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.labialisinferior
                                                    "
                                                    label="-Labialis Inferior"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.bukalisrahangataskiri
                                                    "
                                                    label="-Bukalis Rahang Atas Kiri"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.bukalisrahangataskanan
                                                    "
                                                    label="-Bukalis Rahang Atas Kanan"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.bukalisrahangbawahkiri
                                                    "
                                                    label="-Bukalis Rahang Bawah Kiri"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.bukalisrahangbawahkanan
                                                    "
                                                    label="-Bukalis Rahang Bawah Kanan"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="forms.lingualis"
                                                    label="-Lingualis"
                                                    :items="[
                                                        'Tinggi',
                                                        'Sedang',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>4. Palatum</h5>
                                        <br />
                                        <v-row>
                                            <v-col cols="10" md="8">
                                                <v-select
                                                    v-model="forms.palatum"
                                                    label="Palatum"
                                                    :items="[
                                                        'Persegi',
                                                        'Oval',
                                                        'Segitiga *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="4">
                                                <v-select
                                                    v-model="forms.kedalaman"
                                                    label="Kedalaman"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.toruspalatinus
                                                    "
                                                    label="Torus Palatinus"
                                                    :items="[
                                                        'Besar',
                                                        'Kecil',
                                                        'Tidak Ada *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="forms.palatummolle"
                                                    label="Palatum Molle"
                                                    :items="[
                                                        'House Kelas I',
                                                        'House Kelas II',
                                                        'House Kelas III *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>5. Tuberositas Alveolaris</h5>
                                        <br />
                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.tuberorositasalveolariskiri
                                                    "
                                                    label="-Kiri"
                                                    :items="[
                                                        'Besar',
                                                        'Kecil *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.tuberorositasalveolariskanan
                                                    "
                                                    label="-Kanan"
                                                    :items="[
                                                        'Besar',
                                                        'Kecil *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>6. Ruang Retromilohioid</h5>
                                        <br />
                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ruangretromilahioidkiri
                                                    "
                                                    label="-Kiri"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ruangretromilahioidkanan
                                                    "
                                                    label="-Kanan"
                                                    :items="[
                                                        'Dalam',
                                                        'Sedang',
                                                        'Dangkal *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h5>7. Bentuk Lekung Rahang</h5>
                                        <br />

                                        <v-row>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.bentuklengkungrahangatas
                                                    "
                                                    label="-Rahang Atas"
                                                    :items="[
                                                        'Persegi',
                                                        'Oval',
                                                        'Segitiga *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                            <v-col cols="10" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.bentuklengkungrahangbawah
                                                    "
                                                    label="-Rahang Bawah"
                                                    :items="[
                                                        'Persegi',
                                                        'Oval',
                                                        'Segitiga *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-select
                                                    v-model="
                                                        forms.perlekatandasarmulut
                                                    "
                                                    label="8. Perlekatan Dasar Mulut"
                                                    :items="[
                                                        'Tinggi',
                                                        'Normal',
                                                        'Rendah *',
                                                    ]"
                                                    variant="outlined"></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="10" md="12">
                                                <v-textarea
                                                    v-model="
                                                        forms.pemeriksaanlain_lainlain
                                                    "
                                                    label="9. Lain-Lain"
                                                    variant="outlined"
                                                    rows="1"></v-textarea>
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
                            <h4>C. SIKAP MENTAL</h4>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-select
                                        v-model="forms.sikapmental"
                                        label="SIKAP MENTAL"
                                        :items="[
                                            'Filoofis',
                                            'Exacting',
                                            'Indifferent',
                                            'Histerical *',
                                        ]"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>
                            <h4>D. DIAGNOSA</h4>
                            <br />
                            <v-row>
                                <v-col rows="2" cols="12">
                                    <v-textarea
                                        v-model="forms.diagnosa"
                                        label="DIAGNOSA"
                                        variant="outlined"></v-textarea>
                                </v-col>
                            </v-row>
                            <h4>E. RENCANA PERAWATAN</h4>
                            <br />
                            <h5>1. Gigi Tiruan Sebagian Lepasan</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-select
                                        v-model="forms.rahangatas"
                                        label="Rahang Atas"
                                        :items="['Sebagian', 'Penuh *']"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.rahangataselemen"
                                        label="Elemen"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-select
                                        v-model="forms.rahangbawah"
                                        label="Rahang Bawah"
                                        :items="['Sebagian', 'Penuh *']"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.rahangbawahelemen"
                                        label="Elemen"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <h5>2. Gigi Tiruan Cekat</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-select
                                        v-model="forms.gigitiruancekat"
                                        label="Gigi Tiruan Cekat"
                                        :items="[
                                            'Mahkota Tiruan Penuh',
                                            'Mahkota Tiruan Pasak',
                                            'Jembatan *',
                                        ]"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.gigitiruancekatelemen"
                                        label="Elemen"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                </v-window>
                <v-window v-model="tab">
                    <v-window-item :value="3">
                        <v-container fluid>
                            <h4>Gigi Tiruan Sebagian Lepasan</h4>
                            <br />
                            <h5>a. PERAWATAN PRA PROSTODONTIK</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-select
                                        v-model="forms.perawatanperiodontal"
                                        label="1) Perawatan Periodontal"
                                        :items="['Ada', 'Tidak Ada *']"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-select
                                        v-model="forms.perawatanbedah"
                                        label="2) Perawatan Bedah"
                                        :items="['Ada', 'Tidak Ada *']"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="10" md="4">
                                    <v-select
                                        v-model="forms.perawatanbedah_ada"
                                        label="Ada"
                                        :items="['Pencabutan Gigi']"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.perawatanbedahelemen"
                                        label="Elemen"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.perawatanbedahlainlain"
                                        label="-Lain-lain"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="4">
                                    <v-select
                                        v-model="forms.konservasigigi"
                                        label="3) Konservasi Gigi"
                                        :items="['Ada', 'Tidak Ada *']"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="8">
                                    <v-textarea
                                        v-model="forms.konservasigigielemen"
                                        label="Ada, Pada Elemen"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-select
                                        v-model="forms.rekonturing"
                                        label="4) Rekonturing"
                                        :items="['Ada', 'Tidak Ada *']"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.adapembuatanmahkota"
                                        label="Ada -Pembuatan Mahkota"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.pengasahangigimiring"
                                        label="-Pengasahan Gigi Miring"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-textarea
                                        v-model="forms.pengasahangigiextruded"
                                        label="-Pengasahan Gigi Extruded"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.rekonturinglainlain"
                                        label="Lain-lain"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <h5>5) Macam Cetakan</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="6">
                                    <v-select
                                        v-model="forms.macamcetakan_ra"
                                        label="* R.A. "
                                        :items="[
                                            'Mukostatis',
                                            'Mukokompresi',
                                            'Mukofungsional',
                                            'Selective Pressure *',
                                        ]"
                                        variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="10" md="6">
                                    <v-select
                                        v-model="forms.acamcetakan_rb"
                                        label="* R.B. "
                                        :items="[
                                            'Mukostatis',
                                            'Mukokompresi',
                                            'Mukofungsional',
                                            'Selective Pressure *',
                                        ]"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.warnagigi"
                                        label="6) Warna Gigi"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <h5>b. DESAIN GIGI TIRUAN LEPAS SEBAGIAN</h5>
                            <br />
                            <h5>Klasifikasi Daerah tidak Bergigi</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="
                                            forms.klasifikasidaerahtidakbergigirahangatas
                                        "
                                        label="Rahang Atas :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="
                                            forms.klasifikasidaerahtidakbergigirahangbawah
                                        "
                                        label="Rahang Bawah :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <h5>Komponen Gigi Tiruan Lepas Sebagian</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.gigipenyangga"
                                        label="1) Gigi Penyangga :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <h5>2) Retainer</h5>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.direk"
                                        label="a. Direk :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.indirek"
                                        label="b. Indirek :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.platdasar"
                                        label="3) Plat Dasar :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.anasirgigi"
                                        label="4) Anasir Gigi :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="6">
                                    <v-textarea
                                        v-model="forms.keterangan"
                                        label="KETERANGAN DESIGN GIGI TIRUAN"
                                        variant="outlined"
                                        rows="8"></v-textarea
                                ></v-col>
                                <v-col cols="10" md="6">
                                    <v-dialog width="300">
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                v-bind="props"
                                                text="UPLOAD DESIGN GIGI TIRUAN">
                                            </v-btn>
                                        </template>

                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Upload File">
                                                <v-file-input
                                                    @change="
                                                        setUploadFile(
                                                            $event,
                                                            'designngigitext',
                                                            '/v1/emr/prostodonti/create/uploadgigi',
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
                                                            :src="
                                                                forms.designngigitext
                                                            "
                                                            height="300"
                                                            class="bg-grey-lighten-2"></v-img>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-fade-transition>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <br />
                        </v-container>
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="4">
                        <v-container fluid>
                            <h4>F. PROGNOSIS</h4>
                            <br />
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-select
                                        v-model="forms.prognosis"
                                        label="PROGNOSIS"
                                        :items="['Baik', 'Sedang', 'Buruk *']"
                                        variant="outlined"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col rows="2" cols="12">
                                    <v-textarea
                                        v-model="forms.prognosisalasan"
                                        label="Alasan"
                                        variant="outlined"></v-textarea>
                                </v-col>
                            </v-row>
                            <h4>G. PERAWATAN ULANG</h4>
                            <br />
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-textarea
                                        v-model="forms.reliningregio"
                                        label="1. Relining : Regio :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-text-field
                                        v-model="forms.reliningregiotanggal"
                                        label="Tanggal :"
                                        variant="outlined"
                                        type="date"
                                        rows="1"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-textarea
                                        v-model="forms.reparasiregio"
                                        label="2. Reparasi : Regio :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-text-field
                                        v-model="forms.reparasiregiotanggal"
                                        label="Tanggal :"
                                        variant="outlined"
                                        type="date"
                                        rows="1"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="12">
                                    <v-textarea
                                        v-model="forms.perawatanulangsebab"
                                        label="Sebab :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" md="8">
                                    <v-textarea
                                        v-model="forms.perawatanulanglainlain"
                                        label="3. Lain-lain :"
                                        variant="outlined"
                                        rows="1"></v-textarea>
                                </v-col>
                                <v-col cols="10" md="4">
                                    <v-text-field
                                        v-model="
                                            forms.perawatanulanglainlaintanggal
                                        "
                                        label="Tanggal :"
                                        variant="outlined"
                                        type="date"
                                        rows="1"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col rows="2" cols="12">
                                    <v-textarea
                                        v-model="forms.perawatanulangketerangan"
                                        label="Keterangan :"
                                        variant="outlined"></v-textarea>
                                </v-col>
                            </v-row>
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
