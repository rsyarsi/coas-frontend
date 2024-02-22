<script setup>
import { useRouter } from "vue-router";

definePageMeta({
    layout: "dashboard",
    title: "emrpedodonsi",
});

const forms = reactive({
    nim: "",
    namamahasiswa: "",
    tahunklinik: "",
    noepisode: "",
    namasupervisor: "",
    tandatangan: "",
    namapasien: "",
    jeniskelamin: "",
    usiapasien: "",
    pendidikan: "",
    tgllahirpasien: "",
    namaorangtua: "",
    telephone: "",
    pekerjaan: "",
    dokteranak: "",
    alamatpekerjaan: "",
    telephonedranak: "",
    anamnesis: "",
    noregister: useRouter().currentRoute.value.query.noreg,
    odontogramfoto: "",
    physicalgrowth: "",
    heartdesease: "",
    bruiseeasily: "",
    anemia: "",
    hepatitis: "",
    allergic: "",
    takinganymedicine: "",
    beenhospitalized: "",
    toothache: "",
    childtoothache: "",
    firstdental: "",
    unfavorabledentalexperience: "",
    ifyes: "",
    where: "",
    reason: "",
    fingersucking: "",
    diffycultyopeningsjaw: "",
    howoftenbrushtooth: "",
    usefluoridepasta: "",
    fluoridetreatmen: "",
    bilateralsymmetry: "",
    asymmetry: "",
    straight: "",
    convex: "",
    concave: "",
    lipsseal: "",
    clicking: "",
    clickingleft: "",
    clickingright: "",
    pain: "",
    painleft: "",
    painright: "",
    bodypostur: "",
    stageofdentition: "",
    gingivitis: "",
    stomatitis: "",
    gumboil: "",
    dentalanomali: "",
    prematurloss: "",
    overretainedprimarytooth: "",
    franklscale_definitelynegative_before_treatment: "",
    franklscale_definitelynegative_during_treatment: "",
    franklscale_negative_before_treatment: "",
    franklscale_negative_during_treatment: "",
    franklscale_positive_before_treatment: "",
    franklscale_positive_during_treatment: "",
    franklscale_definitelypositive_before_treatment: "",
    franklscale_definitelypositive_during_treatment: "",
    BuccalPalatal_18: "",
    BuccalPalatal_17: "",
    BuccalPalatal_16: "",
    BuccalPalatal_15_55: "",
    BuccalPalatal_14_54: "",
    BuccalPalatal_13_53: "",
    BuccalPalatal_12_52: "",
    BuccalPalatal_11_51: "",
    BuccalPalatal_21_61: "",
    BuccalPalatal_22_62: "",
    BuccalPalatal_23_63: "",
    BuccalPalatal_24_64: "",
    BuccalPalatal_25_65: "",
    BuccalPalatal_26: "",
    BuccalPalatal_27: "",
    BuccalPalatal_28: "",
    BuccalPalatal_48: "",
    BuccalPalatal_47: "",
    BuccalPalatal_46: "",
    BuccalPalatal_45_85: "",
    BuccalPalatal_44_84: "",
    BuccalPalatal_43_83: "",
    BuccalPalatal_42_82: "",
    BuccalPalatal_41_81: "",
    BuccalPalatal_31_71: "",
    BuccalPalatal_32_72: "",
    BuccalPalatal_33_73: "",
    BuccalPalatal_34_74: "",
    BuccalPalatal_35_75: "",
    BuccalPalatal_36: "",
    BuccalPalatal_37: "",
    BuccalPalatal_38: "",
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
            forms.tahunklinik = success.Visit_Date;
            forms.namapasien = success.PatientName;
            forms.norekamedik = success.NoMR;
            forms.alamatpasien = success.Address;
            forms.telephone = success.MobilePhone;
            forms.noregister = success.NoRegistrasi;
            forms.noepisode = success.NoEpisode;
            forms.jeniskelamin = success.Gander;
            forms.dokteranak = success.NamaDokter;
        },
        (error) => {}
    );
};

const getByID = async (noreg, nim) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {
            nim: nim,
            noregister: noreg,
        };

    await setItem(
        "/v1/emr/pedodointi/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            console.log(success);
            if (success.status) {
                forms.id = success.data.id;
                forms.odontogramfoto = success.data.odontogramfoto;
                forms.nim = success.data.nim;
                forms.namamahasiswa = success.data.namamahasiswa;
                forms.tahunklinik = success.data.tahunklinik;
                forms.noepisode = success.data.noepisode;
                forms.namasupervisor = success.data.namasupervisor;
                forms.tandatangan = success.data.tandatangan;
                forms.namapasien = success.data.namapasien;
                forms.jeniskelamin = success.data.jeniskelamin;
                forms.usiapasien = success.data.usiapasien;
                forms.pendidikan = success.data.pendidikan;
                forms.tgllahirpasien = success.data.tgllahirpasien;
                forms.namaorangtua = success.data.namaorangtua;
                forms.telephone = success.data.telephone;
                forms.pekerjaan = success.data.pekerjaan;
                forms.dokteranak = success.data.dokteranak;
                forms.alamatpekerjaan = success.data.alamatpekerjaan;
                forms.telephonedranak = success.data.telephonedranak;
                forms.anamnesis = success.data.anamnesis;
                forms.noregister = success.data.noregister;
                forms.odontogramfoto = success.data.odontogramfoto;
                forms.physicalgrowth = success.data.physicalgrowth;
                forms.heartdesease = success.data.heartdesease;
                forms.bruiseeasily = success.data.bruiseeasily;
                forms.anemia = success.data.anemia;
                forms.hepatitis = success.data.hepatitis;
                forms.allergic = success.data.allergic;
                forms.takinganymedicine = success.data.takinganymedicine;
                forms.beenhospitalized = success.data.beenhospitalized;
                forms.toothache = success.data.toothache;
                forms.childtoothache = success.data.childtoothache;
                forms.firstdental = success.data.firstdental;
                forms.unfavorabledentalexperience =
                    success.data.unfavorabledentalexperience;
                forms.ifyes = success.data.ifyes;
                forms.where = success.data.where;
                forms.reason = success.data.reason;
                forms.fingersucking = success.data.fingersucking;
                forms.diffycultyopeningsjaw =
                    success.data.diffycultyopeningsjaw;
                forms.howoftenbrushtooth = success.data.howoftenbrushtooth;
                forms.usefluoridepasta = success.data.usefluoridepasta;
                forms.fluoridetreatmen = success.data.fluoridetreatmen;
                forms.bilateralsymmetry = success.data.bilateralsymmetry;
                forms.asymmetry = success.data.asymmetry;
                forms.straight = success.data.straight;
                forms.convex = success.data.convex;
                forms.concave = success.data.concave;
                forms.lipsseal = success.data.lipsseal;
                forms.clicking = success.data.clicking;
                forms.clickingleft = success.data.clickingleft;
                forms.clickingright = success.data.clickingright;
                forms.pain = success.data.pain;
                forms.painleft = success.data.painleft;
                forms.painright = success.data.painright;
                forms.bodypostur = success.data.bodypostur;
                forms.stageofdentition = success.data.stageofdentition;
                forms.gingivitis = success.data.gingivitis;
                forms.stomatitis = success.data.stomatitis;
                forms.gumboil = success.data.gumboil;
                forms.dentalanomali = success.data.dentalanomali;
                forms.prematurloss = success.data.prematurloss;
                forms.overretainedprimarytooth =
                    success.data.overretainedprimarytooth;
                forms.franklscale_definitelynegative_before_treatment =
                    success.data.franklscale_definitelynegative_before_treatment;
                forms.franklscale_definitelynegative_during_treatment =
                    success.data.franklscale_definitelynegative_during_treatment;
                forms.franklscale_negative_before_treatment =
                    success.data.franklscale_negative_before_treatment;
                forms.franklscale_negative_during_treatment =
                    success.data.franklscale_negative_during_treatment;
                forms.franklscale_positive_before_treatment =
                    success.data.franklscale_positive_before_treatment;
                forms.franklscale_positive_during_treatment =
                    success.data.franklscale_positive_during_treatment;
                forms.franklscale_definitelypositive_before_treatment =
                    success.data.franklscale_definitelypositive_before_treatment;
                forms.franklscale_definitelypositive_during_treatment =
                    success.data.franklscale_definitelypositive_during_treatment;
                forms.BuccalPalatal_18 = success.data.BuccalPalatal_18;
                forms.BuccalPalatal_17 = success.data.BuccalPalatal_17;
                forms.BuccalPalatal_16 = success.data.BuccalPalatal_16;
                forms.BuccalPalatal_15_55 = success.data.BuccalPalatal_15_55;
                forms.BuccalPalatal_14_54 = success.data.BuccalPalatal_14_54;
                forms.BuccalPalatal_13_53 = success.data.BuccalPalatal_13_53;
                forms.BuccalPalatal_12_52 = success.data.BuccalPalatal_12_52;
                forms.BuccalPalatal_11_51 = success.data.BuccalPalatal_11_51;
                forms.BuccalPalatal_21_61 = success.data.BuccalPalatal_21_61;
                forms.BuccalPalatal_22_62 = success.data.BuccalPalatal_22_62;
                forms.BuccalPalatal_23_63 = success.data.BuccalPalatal_23_63;
                forms.BuccalPalatal_24_64 = success.data.BuccalPalatal_24_64;
                forms.BuccalPalatal_25_65 = success.data.BuccalPalatal_25_65;
                forms.BuccalPalatal_26 = success.data.BuccalPalatal_26;
                forms.BuccalPalatal_27 = success.data.BuccalPalatal_27;
                forms.BuccalPalatal_28 = success.data.BuccalPalatal_28;
                forms.BuccalPalatal_48 = success.data.BuccalPalatal_48;
                forms.BuccalPalatal_47 = success.data.BuccalPalatal_47;
                forms.BuccalPalatal_46 = success.data.BuccalPalatal_46;
                forms.BuccalPalatal_45_85 = success.data.BuccalPalatal_45_85;
                forms.BuccalPalatal_44_84 = success.data.BuccalPalatal_44_84;
                forms.BuccalPalatal_43_83 = success.data.BuccalPalatal_43_83;
                forms.BuccalPalatal_42_82 = success.data.BuccalPalatal_42_82;
                forms.BuccalPalatal_41_81 = success.data.BuccalPalatal_41_81;
                forms.BuccalPalatal_31_71 = success.data.BuccalPalatal_31_71;
                forms.BuccalPalatal_32_72 = success.data.BuccalPalatal_32_72;
                forms.BuccalPalatal_33_73 = success.data.BuccalPalatal_33_73;
                forms.BuccalPalatal_34_74 = success.data.BuccalPalatal_34_74;
                forms.BuccalPalatal_35_75 = success.data.BuccalPalatal_35_75;
                forms.BuccalPalatal_36 = success.data.BuccalPalatal_36;
                forms.BuccalPalatal_37 = success.data.BuccalPalatal_37;
                forms.BuccalPalatal_38 = success.data.BuccalPalatal_38;
                if (success.data.noepisode == null) {
                    getAnItem(noreg);
                    return false;
                }
            }
        },
        (error) => {
            console.log(error);
        }
    );
};

const image = reactive({
    uploadodontogramfoto: [],
});

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

    if (filetype == "uploadodontogramfoto")
        image.uploadodontogramfoto.push(data.data.data.select_file);
};

onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg, "141300001");
    // image.uploadodontogramfoto.push(forms.uploadodontogramfoto);

    image.uploadodontogramfoto.push(forms.odontogramfoto);
});
//foto

//table
const COMPONENT_BADGE  = [ "Master", "Coas", "Assesment Oralfinding", ];
const COMPONENT_BADGE_1  = [ "Master", "Coas", "Assesment Treatment", ];

const COMPONENT_HEADER =
[
    {
        key: "idoral",
        title: "ID",
        sortable: false,
    },
    {
        key: "temukan",
        title: "ORAL FINDING / TEMUKAN",
        sortable: false,
    },
    {
        key: "diagnosis",
        title: "DIAGNOSIS / Diagnosis",
        sortable: false,
    },
    {
        key: "planning",
        title: "TREATMENT PLANING / Rencana Perawatan",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_HEADER_1 =
[
    {
        key: "idtreatment",
        title: "ID",
        sortable: false,
    },
    {
        key: "datetratment",
        title: "Date / Tanggal",
        sortable: false,
    },
    {
        key: "itemdetail",
        title: "Item / Uraian",
        sortable: false,
    },
    {
        key: "signature",
        title: "Supervisor Signature / Tandatangan Supervisor",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_FORMS =
{
    subject_s: "",
    object_o: "",
    assesment_a: "",
    plan_p: "",
};

const COMPONENT_FORMS_1 =
{
    subject_s: "",
    object_o: "",
    assesment_a: "",
    plan_p: "",
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/emr/periodonti/soap/showall",
    getItem: "/v1/emr/periodonti/soap/showbyid",
    createItem: "/v1/masterdata/semesters/create",
    updateItem: "/v1/masterdata/semesters/update",
};

const COMPONENT_APIS_1 =
{
    getAllItems: "/v1/emr/periodonti/soap/showall",
    getItem: "/v1/emr/periodonti/soap/showbyid",
    createItem: "/v1/masterdata/semesters/create",
    updateItem: "/v1/masterdata/semesters/update",
};

const COMPONENT_IDEMR =
{
    idemr: forms.id,
};

const COMPONENT_IDEMR_1 =
{
    idemr: forms.id,
};
//end table
</script>

<template v-slot:form="{ forms }">
    <v-form v-model="valid">
        <v-container>
            <h1 align="center">REKAM MEDIK<br />PEDODONSI</h1>
            <hr />
            <br />
            <v-row>
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
                        v-model="forms.namamahasiswa"
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
                        v-model="forms.namasupervisor"
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
                    <h4><br /></h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br /></h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.id"
                        hide-details
                        required></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />

            <br /><br />
            <h4>
                I. PATIENT IDENTITY / <small><i>IDENTITAS PASIEN</i></small>
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
                        v-model="forms.tgllahirpasien"
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
                        v-model="forms.alamatpekerjaan"
                        label="11. ADDRESS / Alamat :"
                        hide-details
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="forms.telephonedranak"
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
            <h4>
                II. MEDICAL AND DENTAL HISTORY /
                <small><i>RIWAYAT KESEHATAN UMUM DAN GIGI</i></small>
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
                        v-model="forms.takinganymedicineobat"
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
                        v-model="forms.beenhospitalizedalasan"
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
                v-model="forms.unfavorabledentalexperience"
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
                v-model="forms.diffycultyopeningsjaw"
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
                        v-model="forms.howoftenbrushtoothkali"
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
            <h4>
                III. PATIENT BEHAVIOUR RATINGS /
                <small><i>PERINGKAT PRILAKU PASIEN</i></small>
            </h4>
            <hr />
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-left">Rating No</th>
                        <th colspan="1" class="text-left">Frankl scale</th>
                        <th colspan="1" class="text-left">
                            Before treatment / Sebelum perawatan
                        </th>
                        <th colspan="1" class="text-left">
                            During treatment / Selama perawatan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">1</td>
                        <td class="text-left">
                            Definitely negative , refusal of treatment , crying
                            forcefully , fearful , extreme negativism / Sangat
                            negative , penolakan perawatan , menangis meronta -
                            ronta ketakutan , negatif ekstrim
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_definitelynegative_before_treatment
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_definitelynegative_during_treatment
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">2</td>
                        <td class="text-left">
                            Negative , reluctant , uncooperative , limited
                            negativism , withdrawn / Negatif , keberatan , tidak
                            koopratif , negatif terbatas
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_negative_before_treatment
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_negative_during_treatment
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">3</td>
                        <td class="text-left">
                            Positive , accept treatment but may be cautious or
                            reserve , follows directions / Positif , menerima
                            perawatan dengan waspada , mengikuti instruksi
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_positive_before_treatment
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_positive_during_treatment
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">4</td>
                        <td class="text-left">
                            Definitely positive , good rapport , interested in
                            dental procedure , laugh and enjoy / Sangat positif
                            , hubungan yang simpatik , tertarik dengan prosedur
                            dental
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_definitelypositive_before_treatment
                                ">
                            </v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field
                                label=""
                                v-model="
                                    forms.franklscale_definitelypositive_during_treatment
                                ">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <br />
            <br />
            <h4>
                IV. PLAQUE SCORE / <small><i>NILAI PLAK</i></small>
            </h4>
            <hr />
            <br />
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-left"></th>
                        <th colspan="1" class="text-left">18</th>
                        <th colspan="1" class="text-left">17</th>
                        <th colspan="1" class="text-left">16</th>
                        <th colspan="1" class="text-left">15</th>
                        <th colspan="1" class="text-left">14</th>
                        <th colspan="1" class="text-left">13</th>
                        <th colspan="1" class="text-left">12</th>
                        <th colspan="1" class="text-left">11</th>
                        <th colspan="1" class="text-left">21</th>
                        <th colspan="1" class="text-left">22</th>
                        <th colspan="1" class="text-left">23</th>
                        <th colspan="1" class="text-left">24</th>
                        <th colspan="1" class="text-left">25</th>
                        <th colspan="1" class="text-left">26</th>
                        <th colspan="1" class="text-left">27</th>
                        <th colspan="1" class="text-left">28</th>
                    </tr>
                    <tr>
                        <th class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left">55</th>
                        <th colspan="1" class="text-left">54</th>
                        <th colspan="1" class="text-left">53</th>
                        <th colspan="1" class="text-left">52</th>
                        <th colspan="1" class="text-left">51</th>
                        <th colspan="1" class="text-left">61</th>
                        <th colspan="1" class="text-left">62</th>
                        <th colspan="1" class="text-left">63</th>
                        <th colspan="1" class="text-left">64</th>
                        <th colspan="1" class="text-left">65</th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">Buccal Palatal</td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_18">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_17">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_16">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_15_55">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_14_54">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_13_53">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_12_52">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_11_51">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_21_61">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_22_62">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_23_63">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_24_64">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_25_65">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_26">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_27">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_28">
                            </v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Buccal Palatal</td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_48">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_47">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_46">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_45_85">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_44_84">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_43_83">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_42_82">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_41_81">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_31_71">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_32_72">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_33_73">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_34_74">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_35_75">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_36">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_37">
                            </v-text-field>
                        </td>
                        <td colspan="1" class="text-left">
                            <v-text-field
                                label=""
                                v-model="forms.BuccalPalatal_38">
                            </v-text-field>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left">85</th>
                        <th colspan="1" class="text-left">84</th>
                        <th colspan="1" class="text-left">83</th>
                        <th colspan="1" class="text-left">82</th>
                        <th colspan="1" class="text-left">81</th>
                        <th colspan="1" class="text-left">71</th>
                        <th colspan="1" class="text-left">72</th>
                        <th colspan="1" class="text-left">73</th>
                        <th colspan="1" class="text-left">74</th>
                        <th colspan="1" class="text-left">75</th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left"></th>
                    </tr>
                    <tr>
                        <th class="text-left"></th>
                        <th colspan="1" class="text-left">48</th>
                        <th colspan="1" class="text-left">47</th>
                        <th colspan="1" class="text-left">46</th>
                        <th colspan="1" class="text-left">45</th>
                        <th colspan="1" class="text-left">44</th>
                        <th colspan="1" class="text-left">43</th>
                        <th colspan="1" class="text-left">42</th>
                        <th colspan="1" class="text-left">41</th>
                        <th colspan="1" class="text-left">31</th>
                        <th colspan="1" class="text-left">32</th>
                        <th colspan="1" class="text-left">33</th>
                        <th colspan="1" class="text-left">34</th>
                        <th colspan="1" class="text-left">35</th>
                        <th colspan="1" class="text-left">36</th>
                        <th colspan="1" class="text-left">37</th>
                        <th colspan="1" class="text-left">38</th>
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

            <br />
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
                    <v-text-field
                        v-model="forms.bilateralsymmetry"
                        label="a. Bilateral Symmetry / simetri bilateral ________"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="forms.asymmetry"
                        label="Asymmetri / Asimetri ________"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="forms.straight"
                        label="b. Profile / profil : straight / lurus ________"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="forms.convex"
                        label="convex / cembung ________"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="forms.concave"
                        label="concave / cekung ________"></v-text-field>
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

            <h4>2. Soft tissue status / Status jaringan lunak :</h4>
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
            <h4>5. Over retained primary tooth / Persintensi gigi sulung</h4>
            <br />
            <v-text-field
                v-model="forms.overretainedprimarytooth"
                label="?__________"></v-text-field>

            <br />
            <br />
            <h4>
                ODONTOGRAM / <small><i>ODONTOGRAM</i></small>
            </h4>
            <br />
            <v-row>
                <v-col cols="6" md="6">
                    <v-dialog width="500">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" text="Upload foto Odontogram">
                            </v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card title="Upload File">
                                <v-file-input
                                    @change="
                                        setUploadFile(
                                            $event,
                                            'uploadodontogramfoto',
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
                                        @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" md="6">
                    <v-container
                        class="fill-height"
                        fluid
                        style="min-height: 434px">
                        <v-fade-transition mode="out-in">
                            <v-row>
                                <v-col
                                    v-for="(
                                        item, index
                                    ) in image.uploadodontogramfoto"
                                    :key="index"
                                    cols="10">
                                    <v-card>
                                        <v-img
                                            :src="item"
                                            height="300"
                                            class="bg-grey-lighten-2"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-fade-transition>
                    </v-container>
                </v-col>

                <!-- <v-col cols="6" md="6">
                    <v-container
                        class="fill-height"
                        fluid
                        style="min-height: 434px">
                        <v-fade-transition mode="out-in">
                            <v-row>
                                <v-col
                                    v-for="(
                                        item, index
                                    ) in image.uploadodontogramfoto"
                                    :key="index"
                                    cols="10">
                                    <v-card>
                                        <v-img
                                            :src="item"
                                            height="300"
                                            class="bg-grey-lighten-2"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-fade-transition>
                    </v-container>
                </v-col> -->

                <!-- <v-col cols="6" md="6">
                    <v-container
                        class="fill-height"
                        fluid
                        style="min-height: 434px">
                        <v-fade-transition mode="out-in">
                            <v-row>
                                <v-col
                                    v-for="(
                                        item, index
                                    ) in image.uploadodontogramfoto"
                                    :key="index"
                                    cols="10">
                                    <v-card>
                                        <v-img
                                            :src="item"
                                            height="300"
                                            class="bg-grey-lighten-2"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-fade-transition>
                    </v-container>
                </v-col> -->
            </v-row>
            <!-- <v-img
                :width="1000"
                aspect-ratio="16/9"
                cover
                src="/img/gigi.png"></v-img> -->
            <h4>Palatal</h4>
            <br />
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field label="d:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="e:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="f:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="def:"></v-text-field>
                </v-col>
            </v-row>
            <h4>Lingual</h4>
            <br />
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field label="d:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="e:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="f:"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field label="def:"></v-text-field>
                </v-col>
            </v-row>

            <h4>
                Surface are to be noted using the following capital letters /
                bidang orientasi notasi dengan huruf-huruf besar berikut
            </h4>
            <br />

            <h4>M = Mesial</h4>
            <h4>D = Distal</h4>
            <h4>V = Lingual</h4>
            <h4>O = Occlusal</h4>
            <br />

            <h4>Material (FILLING) / bahan (penambahan)</h4>
            <h4>Use the following colors / Gunakan warna-warni berikut</h4>
            <h4>
                Black / Hitam = Amalgam / amalgam, in,lay, uplay, stainless
                steel crown
            </h4>
            <h4>Red / Merah = Gold / Emas</h4>
            <h4>
                Green / Hijau = Tooth collor material / bahan tambal sesuai
                warna gigi
            </h4>
            <br />

            <h4>
                Missing teeth / gigi tanggal = place large cros over the tooth /
                silang pada posisi gigi tanggal (X)
            </h4>
            <h4>
                Cavity / Kavitas = Outline cavity is black / jejaki kavitas
                dengan garis hitam (O)
            </h4>
            <h4>
                Restoration / Tambal = Block out restorationusing the
                aforementioned color coding / tambahan diberi warna penuh dengan
                kode di atas (.)
            </h4>
            <h4>
                Fracture / Patah = Fracture of tooth material denoted by "=/"
                symbol over effected tooth / patahan material ggig ditunjukkan
                dengan tanda "=/" pada gig yang bersangkutan
            </h4>
            <h4>
                Crown / Mahkota = color tooth with appropriate color / beri
                warna yang sesuai dengan bahan tambal
            </h4>
            <h4>
                Space closed/ Penutupan ruang = Use arrow / gunakan tanda -><-
            </h4>
            <h4>
                Space opened/ perenggangan = Use arrow / gunakan tanda <- ->
            </h4>
            <h4>
                Tooth Rotate/ Gigi Terputar = Use of a curve arrow under tooth /
                gunakan tanda panah lekung di bawah gigi tsb 0
            </h4>
            <h4>Retained root/ Sisa Akar = RR / tandai dengan RR</h4>
            <h4>Non Vital / gigi mati = NV / tandai dengan NV</h4>
            <h4>
                Unerupted tooth / gigi tidak tumbuh = use capital letters "UE" /
                tandai dengan hurud besar "UE"
            </h4>
            <h4>
                Partial Eruption / gig tumbuh sebagian = use capital letters
                "PE" / tandai dengan huruf besar "PE"
            </h4>

            <br />
            <br />

            <h4>
                VII. ORAL FINDING DIAGNOSIS & TREATMENT PLAN /
                <small><i>DIAGNOSA & RENCANA PERAWATAN</i></small>
            </h4>
            <hr />
            <EmrComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms2="COMPONENT_FORMS" :apis="COMPONENT_APIS" :idemr="COMPONENT_IDEMR">
                          <template v-slot:form="{ forms2, }">
                              <v-form>
                                <v-text-field label="ID" readonly></v-text-field>
                                <v-text-field label="Oral Finding"></v-text-field>
                                <v-text-field label="Diagnosis"></v-text-field>
                                <v-text-field label="Treatment Planning"></v-text-field>
                                  <!-- <v-text-field v-model="forms2.subject_s" label="Nama"></v-text-field>
                                  <v-text-field v-model="forms2.object_o" label="Nilai"></v-text-field>
                                  <v-text-field v-model="forms2.assesment_a" label="Nilai"></v-text-field>
                                  <v-text-field v-model="forms2.plan_p" label="Nilai"></v-text-field> -->
                              </v-form>
                          </template>
                          <template v-slot:item="{ item, }">
                              <v-form color="success">
                                  <v-container>
                                      <v-row>
                                          <v-row>
                                            <v-col>
                                                  <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.idoral"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Oral Finding" variant="underlined" :model-value="item.temukan"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Diagnosis" variant="underlined" :model-value="item.diagnosis"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Treatment Planning" variant="underlined" :model-value="item.planning"></v-text-field></v-row>
                                              </v-col>
                                              <v-spacer></v-spacer>
                                              <v-col>
                                                  <v-radio-group v-model="item.active">
                                                      <template v-slot:label>
                                                          <div><strong>{{ $t ("action.state") }}</strong></div>
                                                      </template>
                                                      <v-radio label="Aktif" :value="1"></v-radio>
                                                      <v-radio label="Tidak Aktif" :value="0"></v-radio>
                                                  </v-radio-group>
                                              </v-col>
                                          </v-row>
                                      </v-row>
                                  </v-container>
                              </v-form>
                          </template>
                      </EmrComponent>
            <br />
            <!-- <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center">ORAL FINDING / TEMUKAN</th>
                        <th colspan="1" class="text-center">
                            DIAGNOSIS / DIagnosis
                        </th>
                        <th colspan="1" class="text-center">
                            TREATMENT PLANING / Rencana Perawatan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                </tbody>
            </v-table> -->

            <br />
            <br />
            <h4>
                VIII. TREATMENT / <small><i>PERAWATAN</i></small>
            </h4>
            <hr />
            <br />
            <EmrComponentPedo :badge="COMPONENT_BADGE_1" :header="COMPONENT_HEADER_1" :forms2="COMPONENT_FORMS_1" :apis="COMPONENT_APIS_1" :idemr="COMPONENT_IDEMR_1">
                          <template v-slot:form="{ forms2, }">
                              <v-form>
                                <v-text-field label="ID" readonly></v-text-field>
                                <v-text-field label="Tanggal"></v-text-field>
                                <v-text-field label="Item"></v-text-field>
                                <v-text-field label="Signature Supervisor"></v-text-field>
                                  <!-- <v-text-field v-model="forms2.subject_s" label="Nama"></v-text-field>
                                  <v-text-field v-model="forms2.object_o" label="Nilai"></v-text-field>
                                  <v-text-field v-model="forms2.assesment_a" label="Nilai"></v-text-field>
                                  <v-text-field v-model="forms2.plan_p" label="Nilai"></v-text-field> -->
                              </v-form>
                          </template>
                          <template v-slot:item="{ item, }">
                              <v-form color="success">
                                  <v-container>
                                      <v-row>
                                          <v-row>
                                              <v-col>
                                                  <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.idtreatment"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Date / Tanggal" variant="underlined" :model-value="item.datetratment"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Item / Uraian" variant="underlined" :model-value="item.itemdetail"></v-text-field></v-row>
                                                  <v-row><v-text-field label="Supervisor Signature" variant="underlined" :model-value="item.signature"></v-text-field></v-row>
                                              </v-col>
                                              <v-spacer></v-spacer>
                                              <v-col>
                                                  <v-radio-group v-model="item.active">
                                                      <template v-slot:label>
                                                          <div><strong>{{ $t ("action.state") }}</strong></div>
                                                      </template>
                                                      <v-radio label="Aktif" :value="1"></v-radio>
                                                      <v-radio label="Tidak Aktif" :value="0"></v-radio>
                                                  </v-radio-group>
                                              </v-col>
                                          </v-row>
                                      </v-row>
                                  </v-container>
                              </v-form>
                          </template>
                      </EmrComponentPedo>
            <!-- <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-left">Date / Tanggal</th>
                        <th colspan="1" class="text-left">Item / Uraian</th>
                        <th colspan="1" class="text-left">
                            Superviso Signature / Tandatangan Supervisi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                </tbody>
            </v-table> -->
        </v-container>
        <v-btn @click="setItems" color="blue" variant="outlined">{{
            $t("action.button.save")
        }}</v-btn>
    </v-form>
</template>
