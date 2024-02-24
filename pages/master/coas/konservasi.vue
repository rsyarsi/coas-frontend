<script setup>
definePageMeta({
    layout: "dashboard",
    title: "Konservasi",
});

const forms = reactive({
    id: "",
    noregister: useRouter().currentRoute.value.query.noreg,
    noepisode: "",
    nomorrekammedik: "",
    tanggal: "",
    namapasien: "",
    pekerjaan: "",
    jeniskelamin: "",
    alamatpasien: "",
    nomortelpon: "",
    namaoperator: "",
    nim: "",
});

const setItems = async (target) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }

    await setItem(
        "/v1/emr/konservasi/create/medicaldentalhistory",
        "",
        formTarget,
        (success) => {
            //console.log(success);
            alert(success.message);
            //datatableBody.items.unshift (success);

            // clearForms ();
            // closeDialog ();
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
            console.log(success);
            forms.tanggal = success.Visit_Date;
            forms.namapasien = success.PatientName;
            forms.jeniskelamin = success.Gander;
            forms.alamatpasien = success.Address;
            forms.nomortelpon = success.MobilePhone;
            forms.noregister = success.NoRegistrasi;
            forms.noepisode = success.NoEpisode;
            forms.nomorrekammedik = success.NoMR;

            //console.log(forms);

            // for (let form of Object.keys (forms)) {
            //     forms[form] = success[form];
            //   }
        },
        (error) => {}
    );
};

const getByID = async (noreg, nim) => {
    const 
    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),
    { getItem,setItem } = useItem (tokenData),
    formTarget = {"nim" : userData.username,"noregister" : noreg};

    await setItem(
        "/v1/emr/konservasi/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                if (success.data.noepisode == null) {
                    forms.id = success.data.id;
                    forms.nim = userData.username;
                    forms.namaoperator = userData.name
                    getAnItem(noreg);
                    return false;
                }
                for (const [key, value] of Object.entries(success.data)) {
                    forms[`${key}`] = value;
                }
            } else {
                getAnItem(noreg);
            }
        },
        (error) => {
            console.log(error);
        }
    );
};
onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg);
    //await getAnItem ( useRouter().currentRoute.value.query.noreg );

    // image.designgigi.push(forms.designgigi);
});
</script>

<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.id"
                        label="ID"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.noregister"
                        label="Nomor Registrasi"
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.noepisode"
                        label="No.Episode"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.nomorrekammedik"
                        label="Nomor Rekam Medik"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.tanggal"
                        label="Tanggal"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
            <h4>IDENTITAS</h4>
            <br />
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.namapasien"
                        label="Nama Pasien"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.pekerjaan"
                        label="Pekerjaan"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.jeniskelamin"
                        label="Jenis Kelamin"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.alamatpasien"
                        label="Alamat Pasien"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.namaoperator"
                        label="Nama Operator"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.nomortelpon"
                        label="Nomor Telpon"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.nim"
                        label="NIM"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
            <br />
            <h1 class="font-weight-bold text-center text-basil">
                PEMERIKSAAN KASUS RESTORASI
            </h1>
            <h2>Sebelum Perawatan</h2>
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">18</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_18_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_18_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_18_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">21</td>
                        <td class="text-left">61</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_21_61_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_21_61_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_21_61_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">17</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_17_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_17_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_17_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">22</td>
                        <td class="text-left">62</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_22_62_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_22_62_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_22_62_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">16</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_16_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_16_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_16_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">23</td>
                        <td class="text-left">63</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_23_63_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_23_63_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_23_63_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">15</td>
                        <td colspan="1" class="text-left">55</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_15_55_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_15_55_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_15_55_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">24</td>
                        <td class="text-left">64</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_24_64_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_24_64_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_24_64_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">14</td>
                        <td colspan="1" class="text-left">54</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_14_54_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_14_54_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_14_54_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">25</td>
                        <td class="text-left">65</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_25_65_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_25_65_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_25_65_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">13</td>
                        <td colspan="1" class="text-left">53</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_13_53_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_13_53_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_13_53_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_26_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_26_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_26_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">12</td>
                        <td colspan="1" class="text-left">52</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_12_52_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_12_52_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_12_52_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">27</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_27_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_27_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_27_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">11</td>
                        <td colspan="1" class="text-left">51</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_11_51_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_11_51_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_11_51_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">28</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_28_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_28_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_28_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gambar.jpeg"></v-img>
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">41</td>
                        <td colspan="1" class="text-left">81</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_41_81_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_41_81_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_41_81_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">38</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_38_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_38_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_38_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">42</td>
                        <td colspan="1" class="text-left">82</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_42_82_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_42_82_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_42_82_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">37</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_37_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_37_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_37_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">43</td>
                        <td colspan="1" class="text-left">83</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_43_83_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_43_83_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_43_83_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_36_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_36_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_36_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">44</td>
                        <td colspan="1" class="text-left">84</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_44_84_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_44_84_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_44_84_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">35</td>
                        <td class="text-left">75</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_35_75_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_35_75_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_35_75_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">45</td>
                        <td colspan="1" class="text-left">85</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_45_85_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_45_85_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_45_85_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">74</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_34_74_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_34_74_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_34_74_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">46</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_46_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_46_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_46_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">33</td>
                        <td class="text-left">73</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_33_73_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_33_73_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_33_73_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">47</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_47_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_47_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_47_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">72</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_32_72_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_32_72_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_32_72_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">48</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_48_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_48_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_48_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">71</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_31_71_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_31_71_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.sblmperawatanpemeriksaangigi_31_71_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <h5>
                KETERANGAN: Coret yang tidak perlu, TV= Tes Vitalitas : +/-,
                Diagnosis : Kelainan jaringan pulpa dan periapeks, Kelainan
                jaringan keras D1-D6(site, size)/KS/Lesi non karies Rencana
                Perawatan Non Invasif/Invasif (Restorasi/PSA disertai Restorasi
                Paska PSA)
            </h5>
            <hr />
            <br />
            <h2>Sesudah Perawatan</h2>
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">18</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_18_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_18_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_18_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">21</td>
                        <td class="text-left">61</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_21_61_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_21_61_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_21_61_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">17</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_17_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_17_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_17_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">22</td>
                        <td class="text-left">62</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_22_62_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_22_62_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_22_62_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">16</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_16_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_16_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_16_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">23</td>
                        <td class="text-left">63</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_23_63_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_23_63_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_23_63_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">15</td>
                        <td colspan="1" class="text-left">55</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_15_55_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_15_55_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_15_55_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">24</td>
                        <td class="text-left">64</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_24_64_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_24_64_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_24_64_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">14</td>
                        <td colspan="1" class="text-left">54</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_14_54_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_14_54_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_14_54_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">25</td>
                        <td class="text-left">65</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_25_65_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_25_65_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_25_65_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">13</td>
                        <td colspan="1" class="text-left">53</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_13_53_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_13_53_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_13_53_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_26_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_26_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_26_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">12</td>
                        <td colspan="1" class="text-left">52</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_12_52_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_12_52_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_12_52_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">27</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_27_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_27_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_27_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">11</td>
                        <td colspan="1" class="text-left">51</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_11_51_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_11_51_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_11_51_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">28</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_28_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_28_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_28_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gambar.jpeg"></v-img>
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">41</td>
                        <td colspan="1" class="text-left">81</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_41_81_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_41_81_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_41_81_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">38</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_38_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_38_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_38_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">42</td>
                        <td colspan="1" class="text-left">82</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_42_82_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_42_82_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_42_82_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">37</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_37_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_37_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_37_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">43</td>
                        <td colspan="1" class="text-left">83</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_43_83_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_43_83_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_43_83_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_36_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_36_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_36_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">44</td>
                        <td colspan="1" class="text-left">84</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_44_84_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_44_84_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_44_84_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">35</td>
                        <td class="text-left">75</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_35_75_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_35_75_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_35_75_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">45</td>
                        <td colspan="1" class="text-left">85</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_45_85_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_45_85_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_45_85_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">74</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_34_74_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_34_74_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_34_74_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">46</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_46_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_46_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_46_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">33</td>
                        <td class="text-left">73</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_33_73_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_33_73_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_33_73_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">47</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_47_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_47_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_47_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">72</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_32_72_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_32_72_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_32_72_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">48</td>
                        <td colspan="1" class="text-left"></td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_48_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_48_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_48_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">71</td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_31_71_tv
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_31_71_diagnosis
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.ssdhperawatanpemeriksaangigi_31_71_rencanaperawatan
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <h5>KETERANGAN: lengkapi gambar kavitas yang telah dirawat.</h5>
            <br />
            <h1 class="font-weight-bold text-center text-basil">
                PEMERIKSAAN FAKTOR RISIKO KARIES
            </h1>
            <h2>Sebelum Perawatan</h2>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                FAKTOR RISIKO KARIES
            </h2>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_sikap"
                        label="Sikap"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'A. Mau Mengubah Sikap',
                            'B. Mungkin Mengubah Sikap',
                            'C. Tidak Mau Mengubah Sikap',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_status"
                        label="Status"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            '1. Tidak Ada Penyakit',
                            '2. Perlu Diperbaiki',
                            '3. Penyakit Aktif',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi
                        "
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi Hidrasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. > dari 60 Detik',
                            'K. 30-60 Detik',
                            'H. < dari 30 Detik',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita"
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi Viskositas"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. Kental',
                            'K. Berbusa',
                            'H. Jenrnih, Cair',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH
                        "
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. 5,0-5,8',
                            'K. 6,0-6,6',
                            'H. 6,8-7,8',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Hidrasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. > dari 60 Detik',
                            'K. 30-60 Detik',
                            'H. < dari 30 Detik',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Kecepatan Aliran Per 5 menit"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. < 3,5 ml',
                            'K. 3,5-5,0 ml',
                            'H. > 5,0 ml',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Kapasitas Buffer"
                        required
                        hide-details
                        variant="outlined"
                        :items="['M. 0-5', 'K. 6-9', 'H. 10-12']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. 5,0-5,8',
                            'K. 6,0-6,6',
                            'H. 6,8-7,8',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_plak_pH"
                        label="Faktor Risiko Karies Plak pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. <= 5,5',
                            'K. 6,0-6,5',
                            'H. >= 7,0',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_plak_aktivitas
                        "
                        label="Faktor Risiko Karies Plak Aktivitas"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. Stain Biru',
                            'K. Merah Kebiruan',
                            'H. Stain Merah',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_fluor"
                        label="Faktor Risiko Karies Fluor"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.sblmperawatanfaktorrisikokaries_diet"
                        label="Faktor Risiko Karies Diet"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                FAKTOR MODIFIKASI
            </h2>
            <br />

            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata
                        "
                        label="Faktor Modifikasi Obat Peningkat Aliran Saliva"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb
                        "
                        label="Faktor Modifikasi Penyakit Penyebab Mulut Kering"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa
                        "
                        label="Faktor Modifikasi Protesa / Alat Orthodonsi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif
                        "
                        label="Faktor Modifikasi Karies Aktif"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap
                        "
                        label="Faktor Modifikasi Sikap"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_keterangan
                        "
                        label="Faktor Modifikasi Keterangan"
                        required
                        hide-details
                        variant="outlined"
                        :items="['5 Ya', '2 - 4 Ya', '1 Ya']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                PENILAIAN AKHIR RISIKO KARIES
            </h2>
            <br />
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva
                        "
                        label="Penilaian Akhir Risiko Karies Saliva"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak
                        "
                        label="Penilaian Akhir Risiko Karies Plak"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet
                        "
                        label="Penilaian Akhir Risiko Karies Diet"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor
                        "
                        label="Penilaian Akhir Risiko Karies Fluor"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi
                        "
                        label="Penilaian Akhir Risiko Karies Faktor Modifikasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h1 class="font-weight-bold text-center text-basil">
                PEMERIKSAAN FAKTOR RISIKO KARIES
            </h1>
            <h2>Sesudah Perawatan</h2>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                FAKTOR RISIKO KARIES
            </h2>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.ssdhperawatanfaktorrisikokaries_sikap"
                        label="Sikap"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'A. Mau Mengubah Sikap',
                            'B. Mungkin Mengubah Sikap',
                            'C. Tidak Mau Mengubah Sikap',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.ssdhperawatanfaktorrisikokaries_status"
                        label="Status"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            '1. Tidak Ada Penyakit',
                            '2. Perlu Diperbaiki',
                            '3. Penyakit Aktif',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi
                        "
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi Hidrasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. > dari 60 Detik',
                            'K. 30-60 Detik',
                            'H. < dari 30 Detik',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita
                        "
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi Viskositas"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. Kental',
                            'K. Berbusa',
                            'H. Jenrnih, Cair',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH
                        "
                        label="Faktor Risiko Karies Saliva Tanpa Stimulasi pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. 5,0-5,8',
                            'K. 6,0-6,6',
                            'H. 6,8-7,8',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Hidrasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. > dari 60 Detik',
                            'K. 30-60 Detik',
                            'H. < dari 30 Detik',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Kecepatan Aliran Per 5 menit"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. < 3,5 ml',
                            'K. 3,5-5,0 ml',
                            'H. > 5,0 ml',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi Kapasitas Buffer"
                        required
                        hide-details
                        variant="outlined"
                        :items="['M. 0-5', 'K. 6-9', 'H. 10-12']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH
                        "
                        label="Faktor Risiko Karies Saliva Dengan Stimulasi pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. 5,0-5,8',
                            'K. 6,0-6,6',
                            'H. 6,8-7,8',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.ssdhperawatanfaktorrisikokaries_plak_pH"
                        label="Faktor Risiko Karies Plak pH"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. <= 5,5',
                            'K. 6,0-6,5',
                            'H. >= 7,0',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_plak_aktivitas
                        "
                        label="Faktor Risiko Karies Plak Aktivitas"
                        required
                        hide-details
                        variant="outlined"
                        :items="[
                            'M. Stain Biru',
                            'K. Merah Kebiruan',
                            'H. Stain Merah',
                        ]"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.ssdhperawatanfaktorrisikokaries_fluor"
                        label="Faktor Risiko Karies Fluor"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.ssdhperawatanfaktorrisikokaries_diet"
                        label="Faktor Risiko Karies Diet"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                FAKTOR MODIFIKASI
            </h2>
            <br />

            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata
                        "
                        label="Faktor Modifikasi Obat Peningkat Aliran Saliva"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb
                        "
                        label="Faktor Modifikasi Penyakit Penyebab Mulut Kering"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa
                        "
                        label="Faktor Modifikasi Protesa / Alat Orthodonsi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif
                        "
                        label="Faktor Modifikasi Karies Aktif"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap
                        "
                        label="Faktor Modifikasi Sikap"
                        required
                        hide-details
                        variant="outlined"
                        :items="['Ya', 'Tidak']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_keterangan
                        "
                        label="Faktor Modifikasi Keterangan"
                        required
                        hide-details
                        variant="outlined"
                        :items="['5 Ya', '2 - 4 Ya', '1 Ya']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                PENILAIAN AKHIR RISIKO KARIES
            </h2>
            <br />
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva
                        "
                        label="Penilaian Akhir Risiko Karies Saliva"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak
                        "
                        label="Penilaian Akhir Risiko Karies Plak"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet
                        "
                        label="Penilaian Akhir Risiko Karies Diet"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor
                        "
                        label="Penilaian Akhir Risiko Karies Fluor"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="
                            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi
                        "
                        label="Penilaian Akhir Risiko Karies Faktor Modifikasi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['MERAH', 'KUNING', 'HIJAU']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                PERAWATAN NON INVASIF
            </h2>
            <br />
            <br />
            <h5>Pembersihan Gigi dan Mulut</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.sikatgigi2xsehari"
                        label="Sikat Gigi 2x Sehari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>

                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.sikatgigi3xsehari"
                        label="Sikat Gigi 3x Sehari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.flossingsetiaphari"
                        label="Flossing Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.sikatinterdental"
                        label="Sikat Interdental"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Agen antibakteri</h5>
            <br />
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.agenantibakteri_obatkumur"
                        label="Sikat Interdental"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Diet mengurangi</h5>
            <br />
            <v-row>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.guladancemilandiantarawaktumakanutama"
                        label="Gula dan cemilan di antara waktu makan utama"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.minumanasamtinggi"
                        label="Minuman asam tinggi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.minumanberkafein"
                        label="Minuman berkafein"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Saliva</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.meningkatkanasupanair"
                        label="Meningkatkan asupan air"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.obatkumurbakingsoda"
                        label="Obat kumur baking soda"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.konsumsimakananminumanberbahandasarsusu"
                        label="Konsumsi makanan/minuman berbahan dasar susu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.permenkaretxylitolccpacp"
                        label="Permen karet xylitol/ CCP-ACP"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Fluor</h5>
            <br />
            <v-row>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.pastagigi"
                        label="Pasta gigi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.kumursetiaphari"
                        label="Kumur Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.kumursetiapminggu"
                        label="Kumur Setiap Minggu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.gelsetiaphari"
                        label="Gel Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.gelsetiapminggu"
                        label="Gel Setiap Minggu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Penutupan pit dan fisur dengan GIC</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.perlu"
                        label="Perlu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.tidakperlu"
                        label="Tidak Perlu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h2 class="font-weight-bold text-center text-basil">
                PERAWATAN NON INVASIF (EVALUASI)
            </h2>
            <br />
            <br />
            <h5>Pembersihan Gigi dan Mulut</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_sikatgigi2xsehari"
                        label="Sikat Gigi 2x Sehari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>

                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_sikatgigi3xsehari"
                        label="Sikat Gigi 3x Sehari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_flossingsetiaphari"
                        label="Flossing Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_sikatinterdental"
                        label="Sikat Interdental"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Agen antibakteri</h5>
            <br />
            <v-row>
                <v-col cols="6" md="12">
                    <v-select
                        v-model="forms.evaluasi_agenantibakteri_obatkumur"
                        label="Sikat Interdental"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Diet mengurangi</h5>
            <br />
            <v-row>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="
                            forms.evaluasi_guladancemilandiantarawaktumakanutama
                        "
                        label="Gula dan cemilan di antara waktu makan utama"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.evaluasi_minumanasamtinggi"
                        label="Minuman asam tinggi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.evaluasi_minumanberkafein"
                        label="Minuman berkafein"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Saliva</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_meningkatkanasupanair"
                        label="Meningkatkan asupan air"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_obatkumurbakingsoda"
                        label="Obat kumur baking soda"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="
                            forms.evaluasi_konsumsimakananminumanberbahandasarsusu
                        "
                        label="Konsumsi makanan/minuman berbahan dasar susu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_permenkaretxylitolccpacp"
                        label="Permen karet xylitol/ CCP-ACP"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Fluor</h5>
            <br />
            <v-row>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.evaluasi_pastagigi"
                        label="Pasta gigi"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.evaluasi_kumursetiaphari"
                        label="Kumur Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="4">
                    <v-select
                        v-model="forms.evaluasi_kumursetiapminggu"
                        label="Kumur Setiap Minggu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_gelsetiaphari"
                        label="Gel Setiap Hari"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_gelsetiapminggu"
                        label="Gel Setiap Minggu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>Penutupan pit dan fisur dengan GIC</h5>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_perlu"
                        label="Perlu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                    <v-select
                        v-model="forms.evaluasi_tidakperlu"
                        label="Tidak Perlu"
                        required
                        hide-details
                        variant="outlined"
                        :items="['YA', 'TIDAK']"></v-select>
                </v-col>
            </v-row>
        </v-container>
        <v-btn @click="setItems" color="blue" variant="outlined">{{
            $t("action.button.save")
        }}</v-btn>
    </v-form>
</template>
