<script setup>
definePageMeta({
    layout: "dashboard",
    title: "Konservasi",
});

const tab = ref(null);
const tab2 = ref(null);
const tab3 = ref(null);
const ListComponent = ref(null);

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
    // if (sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi : "MERAH") {
    //     sblmperawatanfaktorrisikokaries_penilaianakhir_saliva: "MERAH",
    // } else {
    //     sblmperawatanfaktorrisikokaries_penilaianakhir_saliva: "KUNING",
    // },
});

const setItems = async (target) => {
    const { token: tokenData, getUser, } = await useAuth(),
        userData = await getUser(tokenData),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }

    await setItem(
        "/v1/emr/konservasi/create/medicaldentalhistory",
        "",
        formTarget,
        async (success) => {

            alert(success.message);

            var statusRoute = useRouter().currentRoute.value.query;
            statusRoute.id_emr = statusRoute.id_emr ?? success.data.id;

            console.log (statusRoute);

            if (userData.role == "mahasiswa") await updateStatusToWrite (statusRoute);



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
            forms.pekerjaan = success.pekerjaan;
            ListComponent.value.getItems("");

            //console.log(forms);

            // for (let form of Object.keys (forms)) {
            //     forms[form] = success[form];
            //   }
        },
        (error) => {}
    );
};

const getByID = async (noreg, nim) => {
    const { token: tokenData, getUser } = await useAuth(),
        userData = await getUser(tokenData),
        { getItem, setItem } = useItem(tokenData),
        formTarget = { nim: userData.username, noregister: noreg };

    await setItem(
        "/v1/emr/konservasi/viewemrbyRegOperator",
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
                ListComponent.value.getItems("");
            }
        },
        (error) => {
            console.log(error);
        }
    );
};

const setUploadFile = async (event, filetype, fileurl, fileid, deskripsi) => {
    // console.log(event);
    // console.log(filetype);
    // console.log(fileurl);
    // console.log(fileid);
    // console.log(deskripsi);

    const formData = new FormData();

    formData.append("id", fileid);
    formData.append("", deskripsi);
    formData.append("select_file", event.target.files[0]);

    const { token: tokenData } = await useAuth(),
        { data, error } = await useCall(
            fileurl,
            "post",
            "multipart/form-data",
            formData,
            tokenData
        );

    // forms[`${filetype}`] = data.data.data.select_file;

    if (filetype == "uploadrestorasibefore")
        forms.uploadrestorasibefore = data.data.data.select_file;
    if (filetype == "uploadrestorasiafter")
        forms.uploadrestorasiafter = data.data.data.select_file;
};

onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg);
    //await getAnItem ( useRouter().currentRoute.value.query.noreg );

    // image.designgigi.push(forms.designgigi);
});

const COMPONENT_TITLE = "LEMBAR PEMERIKSAAN KONSERVASI GIGI";

const COMPONENT_HEADER = [
    {
        key: "datejob",
        title: "Tgl",
        sortable: false,
    },
    {
        key: "keadaangigi",
        title: "Keadaan Gigi",
        sortable: false,
    },
    {
        key: "tindakan",
        title: "Tindakan",
        sortable: false,
    },
    {
        key: "keterangan",
        title: "Keterangan",
        sortable: false,
    },
    {
        key: "user_entry_name",
        title: "User Entry",
        sortable: false,
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
    },
];

const COMPONENT_FORMS = {
    keadaangigi: "",
    tindakan: "",
    keterangan: "",
};

const COMPONENT_APIS = {
    getAllItems: "/v1/emr/konservasi/jobs/showall",
    getItem: "/v1/emr/konservasi/jobs/showbyid",
    createItem: "/v1/emr/konservasi/jobs/create",
    updateItem: "/v1/emr/konservasi/jobs/update",
    deleteItem: "/v1/emr/konservasi/jobs/delete",
};

const getSalivaBefore = async (target) => {
    var tanpastimulasi_hidrasi =
        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi;
    if (tanpastimulasi_hidrasi === undefined) {
        tanpastimulasi_hidrasi = 'NULL';
    }
    var tanpastimulasi_viskosita =
        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita;
    if (tanpastimulasi_viskosita === undefined) {
        tanpastimulasi_viskosita = 'NULL';
    }
    var tanpastimulasi_pH =
        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH;
    if (tanpastimulasi_pH === undefined) {
        tanpastimulasi_pH = 'NULL';
    }
    var denganstimulasi_kecepata =
        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata;
    if (denganstimulasi_kecepata === undefined) {
        denganstimulasi_kecepata = 'NULL';
    }
    var denganstimulasi_kapasita =
        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita;
    if (denganstimulasi_kapasita === undefined) {
        denganstimulasi_kapasita = 'NULL';
    }
    var denganstimulasi_pH =
        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH;
    if (denganstimulasi_pH === undefined) {
        denganstimulasi_pH = 'NULL';
    }


    // if (
    //     tanpastimulasi_hidrasi === undefined ||
    //     tanpastimulasi_viskosita === undefined ||
    //     tanpastimulasi_pH === undefined ||
    //     denganstimulasi_kecepata === undefined ||
    //     denganstimulasi_kapasita === undefined ||
    //     denganstimulasi_pH === undefined
    // ) {
    //     forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            tanpastimulasi_hidrasi.substring(0, 1),
            tanpastimulasi_viskosita.substring(0, 1),
            tanpastimulasi_pH.substring(0, 1),
            denganstimulasi_kecepata.substring(0, 1),
            denganstimulasi_kapasita.substring(0, 1),
            denganstimulasi_pH.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "AU AH";
        }
        console.log(hasil);
    // }
};

const getPlakBefore = async (target) => {
    var risikokaries_plak_pH = forms.sblmperawatanfaktorrisikokaries_plak_pH;
    if (risikokaries_plak_pH === undefined) {
        risikokaries_plak_pH = 'NULL';
    }
    var risikokaries_plak_aktivitas =
        forms.sblmperawatanfaktorrisikokaries_plak_aktivitas;
    if (risikokaries_plak_aktivitas === undefined) {
        risikokaries_plak_aktivitas = 'NULL';
    }
    // if (
    //     risikokaries_plak_pH === undefined ||
    //     risikokaries_plak_aktivitas === undefined
    // ) {
    //     forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            risikokaries_plak_pH.substring(0, 1),
            risikokaries_plak_aktivitas.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak = "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak = "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak = "AU AH";
        }
        console.log(hasil);
    // }
};

const getFluorBefore = async (target) => {
    var risikokaries_fluor_pastagigi =
        forms.sblmperawatanfaktorrisikokaries_fluor_pastagigi;
    if (risikokaries_fluor_pastagigi === undefined) {
        risikokaries_fluor_pastagigi = 'NULL';
    }
    var risikokaries_fluor_airminum =
        forms.sblmperawatanfaktorrisikokaries_fluor_airminum;
    if (risikokaries_fluor_airminum === undefined) {
        risikokaries_fluor_airminum = 'NULL';
    }
    var risikokaries_fluor_topikal =
        forms.sblmperawatanfaktorrisikokaries_fluor_topikal;
    if (risikokaries_fluor_topikal === undefined) {
        risikokaries_fluor_topikal = 'NULL';
    }
    // if (
    //     risikokaries_fluor_pastagigi === undefined ||
    //     risikokaries_fluor_airminum === undefined ||
    //     risikokaries_fluor_topikal === undefined
    // ) {
    //     forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    //else {
        var arrTarget = [
            risikokaries_fluor_pastagigi,
            risikokaries_fluor_airminum,
            risikokaries_fluor_topikal,
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetYa = 0;
        var arrTargetTidak = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "Ya") {
                arrTargetYa = arrTargetYa + 1;
            }
            if (arrTarget[i] == "Tidak") {
                arrTargetTidak = arrTargetTidak + 1;
            }
        }
        console.log(arrTargetYa);
        console.log(arrTargetTidak);

        if (arrTargetYa > 2) {
            var hasil = "MERAH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "MERAH";
        } else if (arrTargetYa < 1) {
            var hasil = "HIJAU";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "HIJAU";
        } else {
            var hasil = "KUNING";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "KUNING";
        }
        console.log(hasil);
    // }
};

const getDietBefore = async (target) => {
    var risikokaries_diet_gula =
        forms.sblmperawatanfaktorrisikokaries_diet_gula;
        if (risikokaries_diet_gula === undefined) {
            risikokaries_diet_gula = 'NULL';
    }
    var risikokaries_diet_asam =
        forms.sblmperawatanfaktorrisikokaries_diet_asam;
        if (risikokaries_diet_asam === undefined) {
            risikokaries_diet_asam = 'NULL';
    }
    // if (
    //     risikokaries_diet_gula === undefined ||
    //     risikokaries_diet_asam === undefined
    // ) {
    //     forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            risikokaries_diet_gula.substring(0, 1),
            risikokaries_diet_asam.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet = "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet = "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet = "AU AH";
        }
        console.log(hasil);
    // }
};

const getModifBefore = async (target) => {
    var faktormodifikasi_obatpeningkata =
        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata;
        if (faktormodifikasi_obatpeningkata === undefined) {
            faktormodifikasi_obatpeningkata = 'NULL';
    }
    var faktormodifikasi_penyakitpenyeb =
        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb;
        if (faktormodifikasi_penyakitpenyeb === undefined) {
            faktormodifikasi_penyakitpenyeb = 'NULL';
    }
    var faktormodifikasi_protesa =
        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa;
        if (faktormodifikasi_protesa === undefined) {
            faktormodifikasi_protesa = 'NULL';
    }
    var faktormodifikasi_kariesaktif =
        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif;
        if (faktormodifikasi_kariesaktif === undefined) {
            faktormodifikasi_kariesaktif = 'NULL';
    }
    var faktormodifikasi_sikap =
        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap;
        if (faktormodifikasi_sikap === undefined) {
            faktormodifikasi_sikap = 'NULL';
    }

    // if (
    //     faktormodifikasi_obatpeningkata === undefined ||
    //     faktormodifikasi_penyakitpenyeb === undefined ||
    //     faktormodifikasi_protesa === undefined ||
    //     faktormodifikasi_kariesaktif === undefined ||
    //     faktormodifikasi_sikap === undefined
    // ) {
    //     forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            faktormodifikasi_obatpeningkata,
            faktormodifikasi_penyakitpenyeb,
            faktormodifikasi_protesa,
            faktormodifikasi_kariesaktif,
            faktormodifikasi_sikap,
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetYa = 0;
        var arrTargetTidak = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "Ya") {
                arrTargetYa = arrTargetYa + 1;
            }
            if (arrTarget[i] == "Tidak") {
                arrTargetTidak = arrTargetTidak + 1;
            }
        }
        console.log(arrTargetYa);
        console.log(arrTargetTidak);

        if (arrTargetYa > 4) {
            var hasil = "MERAH";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "MERAH";
        } else if (arrTargetYa < 2) {
            var hasil = "HIJAU";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "HIJAU";
        } else {
            var hasil = "KUNING";
            forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "KUNING";
        }
        console.log(hasil);
    // }
};
const getSalivaAfter = async (target) => {
    var tanpastimulasi_hidrasi =
        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi;
        if (tanpastimulasi_hidrasi === undefined) {
            tanpastimulasi_hidrasi = 'NULL';
    }
    var tanpastimulasi_viskosita =
        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita;
        if (tanpastimulasi_viskosita === undefined) {
            tanpastimulasi_viskosita = 'NULL';
    }
    var tanpastimulasi_pH =
        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH;
        if (tanpastimulasi_pH === undefined) {
            tanpastimulasi_pH = 'NULL';
    }
    var denganstimulasi_kecepata =
        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata;
        if (denganstimulasi_kecepata === undefined) {
            denganstimulasi_kecepata = 'NULL';
    }
    var denganstimulasi_kapasita =
        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita;
        if (denganstimulasi_kapasita === undefined) {
            denganstimulasi_kapasita = 'NULL';
    }
    var denganstimulasi_pH =
        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH;
        if (denganstimulasi_pH === undefined) {
            denganstimulasi_pH = 'NULL';
    }
    // if (
    //     tanpastimulasi_hidrasi === undefined ||
    //     tanpastimulasi_viskosita === undefined ||
    //     tanpastimulasi_pH === undefined ||
    //     denganstimulasi_kecepata === undefined ||
    //     denganstimulasi_kapasita === undefined ||
    //     denganstimulasi_pH === undefined
    // ) {
    //     forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            tanpastimulasi_hidrasi.substring(0, 1),
            tanpastimulasi_viskosita.substring(0, 1),
            tanpastimulasi_pH.substring(0, 1),
            denganstimulasi_kecepata.substring(0, 1),
            denganstimulasi_kapasita.substring(0, 1),
            denganstimulasi_pH.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva = "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva =
                "AU AH";
        }
        console.log(hasil);
    // }
};

const getPlakAfter = async (target) => {
    var risikokaries_plak_pH = forms.ssdhperawatanfaktorrisikokaries_plak_pH;
    if (risikokaries_plak_pH === undefined) {
        risikokaries_plak_pH = 'NULL';
    }
    var risikokaries_plak_aktivitas =
        forms.ssdhperawatanfaktorrisikokaries_plak_aktivitas;
    if (risikokaries_plak_aktivitas === undefined) {
            risikokaries_plak_aktivitas = 'NULL';
    }
    // if (
    //     risikokaries_plak_pH === undefined ||
    //     risikokaries_plak_aktivitas === undefined
    // ) {
    //     forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            risikokaries_plak_pH.substring(0, 1),
            risikokaries_plak_aktivitas.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak = "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak = "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak = "AU AH";
        }
        console.log(hasil);
    // }
};

const getFluorAfter = async (target) => {
    var risikokaries_fluor_pastagigi =
        forms.ssdhperawatanfaktorrisikokaries_fluor_pastagigi;
        if (risikokaries_fluor_pastagigi === undefined) {
            risikokaries_fluor_pastagigi = 'NULL';
    }
    var risikokaries_fluor_airminum =
        forms.ssdhperawatanfaktorrisikokaries_fluor_airminum;
        if (risikokaries_fluor_airminum === undefined) {
            risikokaries_fluor_airminum = 'NULL';
    }
    var risikokaries_fluor_topikal =
        forms.ssdhperawatanfaktorrisikokaries_fluor_topikal;
        if (risikokaries_fluor_topikal === undefined) {
            risikokaries_fluor_topikal = 'NULL';
    }
    // if (
    //     risikokaries_fluor_pastagigi === undefined ||
    //     risikokaries_fluor_airminum === undefined ||
    //     risikokaries_fluor_topikal === undefined
    // ) {
    //     forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            risikokaries_fluor_pastagigi,
            risikokaries_fluor_airminum,
            risikokaries_fluor_topikal,
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetYa = 0;
        var arrTargetTidak = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "Ya") {
                arrTargetYa = arrTargetYa + 1;
            }
            if (arrTarget[i] == "Tidak") {
                arrTargetTidak = arrTargetTidak + 1;
            }
        }
        console.log(arrTargetYa);
        console.log(arrTargetTidak);

        if (arrTargetYa > 2) {
            var hasil = "MERAH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "MERAH";
        } else if (arrTargetYa < 1) {
            var hasil = "HIJAU";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "HIJAU";
        } else {
            var hasil = "KUNING";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor =
                "KUNING";
        }
        console.log(hasil);
    // }
};

const getDietAfter = async (target) => {
    var risikokaries_diet_gula =
        forms.ssdhperawatanfaktorrisikokaries_diet_gula;
        if (risikokaries_diet_gula === undefined) {
            risikokaries_diet_gula = 'NULL';
    }
    var risikokaries_diet_asam =
        forms.ssdhperawatanfaktorrisikokaries_diet_asam;
        if (risikokaries_diet_asam === undefined) {
            risikokaries_diet_asam = 'NULL';
    }
    // if (
    //     risikokaries_diet_gula === undefined ||
    //     risikokaries_diet_asam === undefined
    // ) {
    //     forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
    // else {
        var arrTarget = [
            risikokaries_diet_gula.substring(0, 1),
            risikokaries_diet_asam.substring(0, 1),
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetMerah = 0;
        var arrTargetKuning = 0;
        var arrTargetHijau = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "M") {
                arrTargetMerah = arrTargetMerah + 1;
            }
            if (arrTarget[i] == "K") {
                arrTargetKuning = arrTargetKuning + 1;
            }
            if (arrTarget[i] == "H") {
                arrTargetHijau = arrTargetHijau + 1;
            }
        }
        console.log(arrTargetMerah);
        console.log(arrTargetKuning);
        console.log(arrTargetHijau);

        if (
            arrTargetMerah >= arrTargetKuning &&
            arrTargetMerah >= arrTargetHijau
        ) {
            var hasil = "MERAH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet = "MERAH";
        } else if (
            arrTargetKuning > arrTargetMerah &&
            arrTargetKuning >= arrTargetHijau
        ) {
            var hasil = "KUNING";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet =
                "KUNING";
        } else if (
            arrTargetHijau > arrTargetKuning &&
            arrTargetHijau > arrTargetMerah
        ) {
            var hasil = "HIJAU";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet = "HIJAU";
        } else {
            var hasil = "AU AH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet = "AU AH";
        }
        console.log(hasil);
    //}
};

const getModifAfter = async (target) => {
    var faktormodifikasi_obatpeningkata =
        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata;
        if (faktormodifikasi_obatpeningkata === undefined) {
            faktormodifikasi_obatpeningkata = 'NULL';
    }
    var faktormodifikasi_penyakitpenyeb =
        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb;
        if (faktormodifikasi_penyakitpenyeb === undefined) {
            faktormodifikasi_penyakitpenyeb = 'NULL';
    }
    var faktormodifikasi_protesa =
        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa;
        if (faktormodifikasi_protesa === undefined) {
            faktormodifikasi_protesa = 'NULL';
    }
    var faktormodifikasi_kariesaktif =
        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif;
        if (faktormodifikasi_kariesaktif === undefined) {
            faktormodifikasi_kariesaktif = 'NULL';
    }
    var faktormodifikasi_sikap =
        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap;
        if (faktormodifikasi_sikap === undefined) {
            faktormodifikasi_sikap = 'NULL';
    }

    // if (
    //     faktormodifikasi_obatpeningkata === undefined ||
    //     faktormodifikasi_penyakitpenyeb === undefined ||
    //     faktormodifikasi_protesa === undefined ||
    //     faktormodifikasi_kariesaktif === undefined ||
    //     faktormodifikasi_sikap === undefined
    // ) {
    //     forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
    //         "PROSESSS.......";
    // }
    // Data sudah lengkap
   // else {
        var arrTarget = [
            faktormodifikasi_obatpeningkata,
            faktormodifikasi_penyakitpenyeb,
            faktormodifikasi_protesa,
            faktormodifikasi_kariesaktif,
            faktormodifikasi_sikap,
        ];
        console.log(arrTarget);

        //Rumus
        var arrTargetYa = 0;
        var arrTargetTidak = 0;
        for (let i = 0; i < arrTarget.length; i++) {
            if (arrTarget[i] == "Ya") {
                arrTargetYa = arrTargetYa + 1;
            }
            if (arrTarget[i] == "Tidak") {
                arrTargetTidak = arrTargetTidak + 1;
            }
        }
        console.log(arrTargetYa);
        console.log(arrTargetTidak);

        if (arrTargetYa > 4) {
            var hasil = "MERAH";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "MERAH";
        } else if (arrTargetYa < 2) {
            var hasil = "HIJAU";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "HIJAU";
        } else {
            var hasil = "KUNING";
            forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                "KUNING";
        }
        console.log(hasil);
    // }
};
</script>

<template>
    <v-form>
        <v-container>
            <v-card>
                <h1 align="center">REKAM MEDIK<br />KONSERVASI</h1>
                <v-tabs
                    v-model="tab"
                    bg-color="indigo-darken-2"
                    align-tabs="center">
                    <v-tab :value="1">PEMERIKSAAN KASUS RESTORASI</v-tab>
                    <v-tab :value="2">PEMERIKSAAN FAKTOR RISIKO KARIES</v-tab>
                    <v-tab :value="3">PERAWATAN NON INVASIF </v-tab>
                    <v-tab :value="4">PERAWATAN NON INVASIF (EVALUASI)</v-tab>
                    <v-tab :value="5">LEMBAR PEMERIKSAAN KONSERVASI GIGI</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item :value="1">
                        <v-container fluid>
                            <v-tabs
                                v-model="tab2"
                                color="deep-purple-accent-4"
                                align-tabs="center">
                                <v-tab :value="1">1. PATIENT IDENTITY</v-tab>
                                <v-tab :value="2">2. Sebelum Perawatan</v-tab>
                                <v-tab :value="3">3. Sesudah Perawatan</v-tab>
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
                                                    v-model="forms.nim"
                                                    label="NIM"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-window-item>
                            </v-window>

                            <v-window v-model="tab2">
                                <v-window-item :value="2">
                                    <v-container fluid>
                                        <h1
                                            class="font-weight-bold text-center text-basil">
                                            PEMERIKSAAN KASUS RESTORASI
                                        </h1>
                                        <h2>Sebelum Perawatan</h2>
                                        <v-table
                                            density="compact"
                                            class="border">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="text-center"></th>
                                                    <th
                                                        colspan="10"
                                                        class="text-center">
                                                        PEMERIKSAAN GIGI DAN
                                                        RENCANA PERAWATAN
                                                        INVASIF
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        18
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        21
                                                    </td>
                                                    <td class="text-left">
                                                        61
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        17
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        22
                                                    </td>
                                                    <td class="text-left">
                                                        62
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        16
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        23
                                                    </td>
                                                    <td class="text-left">
                                                        63
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        15
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        55
                                                    </td>
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
                                                    <td class="text-left">
                                                        24
                                                    </td>
                                                    <td class="text-left">
                                                        64
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        14
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        54
                                                    </td>
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
                                                    <td class="text-left">
                                                        25
                                                    </td>
                                                    <td class="text-left">
                                                        65
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        13
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        53
                                                    </td>
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
                                                    <td class="text-left">
                                                        26
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        12
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        52
                                                    </td>
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
                                                    <td class="text-left">
                                                        27
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        11
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        51
                                                    </td>
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
                                                    <td class="text-left">
                                                        28
                                                    </td>
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

                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-dialog width="500">
                                                    <template
                                                        v-slot:activator="{
                                                            props,
                                                        }">
                                                        <v-btn
                                                            v-bind="props"
                                                            text="Upload foto gigi sebelum perawatan">
                                                        </v-btn>
                                                    </template>

                                                    <template
                                                        v-slot:default="{
                                                            isActive,
                                                        }">
                                                        <v-card
                                                            title="Upload File">
                                                            <v-file-input
                                                                @change="
                                                                    setUploadFile(
                                                                        $event,
                                                                        'uploadrestorasibefore',
                                                                        '/v1/emr/konservasi/uploadrestorasibefore',
                                                                        forms.id,
                                                                        '-'
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
                                            <v-col cols="12" md="12">
                                                <v-container
                                                    class="fill-height"
                                                    fluid
                                                    style="min-height: 434px">
                                                    <v-fade-transition
                                                        mode="out-in">
                                                        <v-row>
                                                            <v-col cols="10">
                                                                <v-card>
                                                                    <v-img
                                                                        :src="
                                                                            forms.uploadrestorasibefore
                                                                        "
                                                                        height="300"
                                                                        class="bg-grey-lighten-2"></v-img>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                        <br />
                                                        <h5>
                                                            KETERANGAN: Coret
                                                            yang tidak perlu,
                                                            TV= Tes Vitalitas :
                                                            +/-, Diagnosis :
                                                            Kelainan jaringan
                                                            pulpa dan periapeks,
                                                            Kelainan jaringan
                                                            keras D1-D6(site,
                                                            size)/KS/Lesi non
                                                            karies Rencana
                                                            Perawatan Non
                                                            Invasif/Invasif
                                                            (Restorasi/PSA
                                                            disertai Restorasi
                                                            Paska PSA)
                                                        </h5>
                                                    </v-fade-transition>
                                                </v-container>
                                            </v-col>
                                        </v-row>

                                        <v-table
                                            density="compact"
                                            class="border">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="text-center"></th>
                                                    <th
                                                        colspan="10"
                                                        class="text-center">
                                                        PEMERIKSAAN GIGI DAN
                                                        RENCANA PERAWATAN
                                                        INVASIF
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        41
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        81
                                                    </td>
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
                                                    <td class="text-left">
                                                        38
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        42
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        82
                                                    </td>
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
                                                    <td class="text-left">
                                                        37
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        43
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        83
                                                    </td>
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
                                                    <td class="text-left">
                                                        36
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        44
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        84
                                                    </td>
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
                                                    <td class="text-left">
                                                        35
                                                    </td>
                                                    <td class="text-left">
                                                        75
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        45
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        85
                                                    </td>
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
                                                    <td class="text-left">
                                                        34
                                                    </td>
                                                    <td class="text-left">
                                                        74
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        46
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        33
                                                    </td>
                                                    <td class="text-left">
                                                        73
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        47
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        32
                                                    </td>
                                                    <td class="text-left">
                                                        72
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        48
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        31
                                                    </td>
                                                    <td class="text-left">
                                                        71
                                                    </td>
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


                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab2">
                                <v-window-item :value="3">
                                    <v-container fluid>
                                        <h1
                                            class="font-weight-bold text-center text-basil">
                                            PEMERIKSAAN KASUS RESTORASI
                                        </h1>
                                        <h2>Sesudah Perawatan</h2>
                                        <!-- <v-table
                                            density="compact"
                                            class="border">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="text-center"></th>
                                                    <th
                                                        colspan="10"
                                                        class="text-center">
                                                        PEMERIKSAAN GIGI DAN
                                                        RENCANA PERAWATAN
                                                        INVASIF
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                    <th class="text-center">
                                                        Elemen
                                                    </th>
                                                    <th
                                                        class="text-center"></th>
                                                    <th class="text-center">
                                                        TV
                                                    </th>
                                                    <th class="text-center">
                                                        DIAGNOSA
                                                    </th>
                                                    <th class="text-center">
                                                        RENCANA PERAWATAN
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        18
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        21
                                                    </td>
                                                    <td class="text-left">
                                                        61
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        17
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        22
                                                    </td>
                                                    <td class="text-left">
                                                        62
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        16
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left"></td>
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
                                                    <td class="text-left">
                                                        23
                                                    </td>
                                                    <td class="text-left">
                                                        63
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        15
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        55
                                                    </td>
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
                                                    <td class="text-left">
                                                        24
                                                    </td>
                                                    <td class="text-left">
                                                        64
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        14
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        54
                                                    </td>
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
                                                    <td class="text-left">
                                                        25
                                                    </td>
                                                    <td class="text-left">
                                                        65
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        13
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        53
                                                    </td>
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
                                                    <td class="text-left">
                                                        26
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        12
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        52
                                                    </td>
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
                                                    <td class="text-left">
                                                        27
                                                    </td>
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
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        11
                                                    </td>
                                                    <td
                                                        colspan="1"
                                                        class="text-left">
                                                        51
                                                    </td>
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
                                                    <td class="text-left">
                                                        28
                                                    </td>
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
                                        </v-table> -->
                                        <br />

                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-dialog width="500">
                                                    <template
                                                        v-slot:activator="{
                                                            props,
                                                        }">
                                                        <v-btn
                                                            v-bind="props"
                                                            text="Upload foto gigi sesudah perawatan">
                                                        </v-btn>
                                                    </template>

                                                    <template
                                                        v-slot:default="{
                                                            isActive,
                                                        }">
                                                        <v-card
                                                            title="Upload File">
                                                            <v-file-input
                                                                @change="
                                                                    setUploadFile(
                                                                        $event,
                                                                        'uploadrestorasiafter',
                                                                        '/v1/emr/konservasi/uploadrestorasiafter',
                                                                        forms.id,
                                                                        '-'
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
                                            <v-col cols="12" md="12">
                                                <v-container
                                                    class="fill-height"
                                                    fluid
                                                    style="min-height: 434px">
                                                    <v-fade-transition
                                                        mode="out-in">
                                                        <v-row>
                                                            <v-col cols="10">
                                                                <v-card>
                                                                    <v-img
                                                                        :src="
                                                                            forms.uploadrestorasiafter
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

                                        <!-- <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gambar.png"></v-img>
            <br /> -->

                                       
                                        <br />
                                        <!-- <h5>
                                            KETERANGAN: Coret yang tidak perlu,
                                            TV= Tes Vitalitas : +/-, Diagnosis :
                                            Kelainan jaringan pulpa dan
                                            periapeks, Kelainan jaringan keras
                                            D1-D6(site, size)/KS/Lesi non karies
                                            Rencana Perawatan Non
                                            Invasif/Invasif (Restorasi/PSA
                                            disertai Restorasi Paska PSA)
                                        </h5> -->
                                        <hr />
                                        <br />

                                        <br />
                                        <h5>
                                            KETERANGAN: lengkapi gambar kavitas
                                            yang telah dirawat.
                                        </h5>
                                    </v-container>
                                </v-window-item>
                            </v-window>
                        </v-container>
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="2">
                        <v-container fluid>
                            <v-tabs
                                v-model="tab3"
                                color="deep-purple-accent-4"
                                align-tabs="center">
                                <v-tab :value="1">1. Sebelum Perawatan</v-tab>
                                <v-tab :value="2">2. Sesudah Perawatan</v-tab>
                            </v-tabs>
                            <v-window v-model="tab3">
                                <v-window-item :value="1">
                                    <v-container fluid>
                                        <h1
                                            class="font-weight-bold text-center text-basil">
                                            PEMERIKSAAN FAKTOR RISIKO KARIES
                                        </h1>
                                        <h2>Sebelum Perawatan</h2>
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            FAKTOR RISIKO KARIES
                                        </h2>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>Sikap</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_sikap
                                                    "
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
                                            <v-col cols="12" md="6">
                                                <h2>Status</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_status
                                                    "
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
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi Hidrasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi
                                                    "
                                                    :items="[
                                                        'M. > dari 60 Detik',
                                                        'K. 30-60 Detik',
                                                        'H. < dari 30 Detik',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi Hidrasi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi Viskosita
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita
                                                    "
                                                    :items="[
                                                        'M. Kental',
                                                        'K. Berbusa',
                                                        'H. Jenrnih, Cair',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi Viskositas"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH
                                                    "
                                                    :items="[
                                                        'M. 5,0-5,8',
                                                        'K. 6,0-6,6',
                                                        'H. 6,8-7,8',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <!-- <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Hidrasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi
                                                    "
                                                    :items="[
                                                        'M. > dari 60 Detik',
                                                        'K. 30-60 Detik',
                                                        'H. < dari 30 Detik',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi Hidrasi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row> -->
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Kecepatan
                                                    Aliran Per 5 menit
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata
                                                    "
                                                    :items="[
                                                        'M. < 3,5 ml',
                                                        'K. 3,5-5,0 ml',
                                                        'H. > 5,0 ml',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi Kecepatan Aliran Per 5 menit"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Kapasitas
                                                    Buffer
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita
                                                    "
                                                    :items="[
                                                        'M. 0-5',
                                                        'K. 6-9',
                                                        'H. 10-12',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi Kapasitas Buffer"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH
                                                    "
                                                    :items="[
                                                        'M. 5,0-5,8',
                                                        'K. 6,0-6,6',
                                                        'H. 6,8-7,8',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Plak pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_plak_pH
                                                    "
                                                    :items="[
                                                        'M. <= 5,5',
                                                        'K. 6,0-6,5',
                                                        'H. >= 7,0',
                                                    ]"
                                                    label="Faktor Risiko Karies Plak pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getPlakBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Plak
                                                    Aktivitas
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_plak_aktivitas
                                                    "
                                                    :items="[
                                                        'M. Stain Biru',
                                                        'K. Merah Kebiruan',
                                                        'H. Stain Merah',
                                                    ]"
                                                    label="Faktor Risiko Karies Plak Aktivitas"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getPlakBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Pasta Gigi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_fluor_pastagigi
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Pasta Gigi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Air Minum
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_fluor_airminum
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Air Minum"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Topikal
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_fluor_topikal
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Topikal"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Diet
                                                    Gula
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_diet_gula
                                                    "
                                                    :items="[
                                                        'M. >2x/hr',
                                                        'K. 1-2x/hr',
                                                        'H. Tidak',
                                                    ]"
                                                    label="Faktor Risiko Karies Diet Gula"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getDietBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Diet
                                                    Asam
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_diet_asam
                                                    "
                                                    :items="[
                                                        'M. >2x/hr',
                                                        'K. 1-2x/hr',
                                                        'H. Tidak',
                                                    ]"
                                                    label="Faktor Risiko Karies Diet Asam"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getDietBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            FAKTOR MODIFIKASI
                                        </h2>
                                        <br />

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Obat
                                                    Peningkat Aliran Saliva
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Obat Peningkat Aliran Saliva"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Penyakit
                                                    Penyebab Mulut Kering
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Penyakit Penyebab Mulut Kering"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Protesa /
                                                    Alat Orthodonsi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Protesa / Alat Orthodonsi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Karies
                                                    Aktif
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Karies Aktif"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>Faktor Modifikasi Sikap</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Sikap"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifBefore('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <!-- <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Keterangan
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_keterangan
                                                    "
                                                    label="Faktor Modifikasi Keterangan"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    :items="[
                                                        '5 Ya',
                                                        '2 - 4 Ya',
                                                        '1 Ya',
                                                    ]"></v-select>
                                            </v-col>
                                        </v-row> -->
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            PENILAIAN AKHIR RISIKO KARIES
                                        </h2>
                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Saliva
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Plak
                                                </h2>
                                            </v-col>
                                            <v-col cols="612" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Diet
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Fluor
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Faktor Modifikasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-window-item>
                            </v-window>
                            <v-window v-model="tab3">
                                <v-window-item :value="2">
                                    <v-container fluid>
                                        <h1
                                            class="font-weight-bold text-center text-basil">
                                            PEMERIKSAAN FAKTOR RISIKO KARIES
                                        </h1>
                                        <h2>Sesudah Perawatan</h2>
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            FAKTOR RISIKO KARIES
                                        </h2>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>Sikap</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_sikap
                                                    "
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
                                            <v-col cols="12" md="6">
                                                <h2>Status</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_status
                                                    "
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
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi Hidrasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi
                                                    "
                                                    :items="[
                                                        'M. > dari 60 Detik',
                                                        'K. 30-60 Detik',
                                                        'H. < dari 30 Detik',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi Hidrasi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi Viskositas
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskosita
                                                    "
                                                    :items="[
                                                        'M. Kental',
                                                        'K. Berbusa',
                                                        'H. Jenrnih, Cair',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi Viskositas"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Tanpa Stimulasi pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH
                                                    "
                                                    :items="[
                                                        'M. 5,0-5,8',
                                                        'K. 6,0-6,6',
                                                        'H. 6,8-7,8',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Tanpa Stimulasi pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <!-- <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Hidrasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
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
                                        </v-row> -->
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Kecepatan
                                                    Aliran Per 5 menit
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepata
                                                    "
                                                    :items="[
                                                        'M. < 3,5 ml',
                                                        'K. 3,5-5,0 ml',
                                                        'H. > 5,0 ml',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi Kecepatan Aliran Per 5 menit"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi Kapasitas
                                                    Buffer
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasita
                                                    "
                                                    :items="[
                                                        'M. 0-5',
                                                        'K. 6-9',
                                                        'H. 10-12',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi Kapasitas Buffer"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Saliva
                                                    Dengan Stimulasi pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH
                                                    "
                                                    :items="[
                                                        'M. 5,0-5,8',
                                                        'K. 6,0-6,6',
                                                        'H. 6,8-7,8',
                                                    ]"
                                                    label="Faktor Risiko Karies Saliva Dengan Stimulasi pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getSalivaAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Plak pH
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_plak_pH
                                                    "
                                                    :items="[
                                                        'M. <= 5,5',
                                                        'K. 6,0-6,5',
                                                        'H. >= 7,0',
                                                    ]"
                                                    label="Faktor Risiko Karies Plak pH"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getPlakAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Plak
                                                    Aktivitas
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_plak_aktivitas
                                                    "
                                                    :items="[
                                                        'M. Stain Biru',
                                                        'K. Merah Kebiruan',
                                                        'H. Stain Merah',
                                                    ]"
                                                    label="Faktor Risiko Karies Plak Aktivitas"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getPlakAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Pasta Gigi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_fluor_pastagigi
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Pasta Gigi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Air Minum
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_fluor_airminum
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Air Minum"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Fluor
                                                    Topikal
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_fluor_topikal
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Risiko Karies Fluor Topikal"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getFluorAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Diet
                                                    Gula
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_diet_gula
                                                    "
                                                    :items="[
                                                        'M. >2x/hr',
                                                        'K. 1-2x/hr',
                                                        'H. Tidak',
                                                    ]"
                                                    label="Faktor Risiko Karies Diet Gula"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getDietAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Risiko Karies Diet
                                                    Asam
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_diet_asam
                                                    "
                                                    :items="[
                                                        'M. >2x/hr',
                                                        'K. 1-2x/hr',
                                                        'H. Tidak',
                                                    ]"
                                                    label="Faktor Risiko Karies Diet Asam"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getDietAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            FAKTOR MODIFIKASI
                                        </h2>
                                        <br />

                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Obat
                                                    Peningkat Aliran Saliva
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkata
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Obat Peningkat Aliran Saliva"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Penyakit
                                                    Penyebab Mulut Kering
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyeb
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Penyakit Penyebab Mulut Kering"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Protesa /
                                                    Alat Orthodonsi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Protesa / Alat Orthodonsi"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Karies
                                                    Aktif
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Karies Aktif"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>Faktor Modifikasi Sikap</h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap
                                                    "
                                                    :items="['Ya', 'Tidak']"
                                                    label="Faktor Modifikasi Sikap"
                                                    variant="outlined"
                                                    required
                                                    @update:modelValue="
                                                        getModifAfter('uhuy')
                                                    "></v-select>
                                            </v-col>
                                        </v-row>
                                        <!-- <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Faktor Modifikasi Keterangan
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-select
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_keterangan
                                                    "
                                                    label="Faktor Modifikasi Keterangan"
                                                    required
                                                    hide-details
                                                    variant="outlined"
                                                    :items="[
                                                        '5 Ya',
                                                        '2 - 4 Ya',
                                                        '1 Ya',
                                                    ]"></v-select>
                                            </v-col>
                                        </v-row> -->
                                        <br />
                                        <h2
                                            class="font-weight-bold text-center text-basil">
                                            PENILAIAN AKHIR RISIKO KARIES
                                        </h2>
                                        <br />
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Saliva
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                    <v-text-field
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Plak
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                 <v-text-field
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Diet
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Fluor
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                    <v-text-field
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <h2>
                                                    Penilaian Akhir Risiko
                                                    Karies Faktor Modifikasi
                                                </h2>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field
                                                    v-model="
                                                        forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi
                                                    "
                                                    hide-details
                                                    required
                                                    variant="outlined"
                                                    readonly></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-window-item>
                            </v-window>
                        </v-container>
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="3">
                        <v-container fluid>
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
                                        v-model="
                                            forms.agenantibakteri_obatkumur
                                        "
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
                                            forms.guladancemilandiantarawaktumakanutama
                                        "
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
                                        v-model="
                                            forms.konsumsimakananminumanberbahandasarsusu
                                        "
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
                        </v-container>
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="4">
                        <v-container fluid>
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
                                        v-model="
                                            forms.evaluasi_sikatgigi2xsehari
                                        "
                                        label="Sikat Gigi 2x Sehari"
                                        required
                                        hide-details
                                        variant="outlined"
                                        :items="['YA', 'TIDAK']"></v-select>
                                </v-col>

                                <v-col cols="6" md="6">
                                    <v-select
                                        v-model="
                                            forms.evaluasi_sikatgigi3xsehari
                                        "
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
                                        v-model="
                                            forms.evaluasi_flossingsetiaphari
                                        "
                                        label="Flossing Setiap Hari"
                                        required
                                        hide-details
                                        variant="outlined"
                                        :items="['YA', 'TIDAK']"></v-select>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-select
                                        v-model="
                                            forms.evaluasi_sikatinterdental
                                        "
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
                                        v-model="
                                            forms.evaluasi_agenantibakteri_obatkumur
                                        "
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
                                        v-model="
                                            forms.evaluasi_minumanasamtinggi
                                        "
                                        label="Minuman asam tinggi"
                                        required
                                        hide-details
                                        variant="outlined"
                                        :items="['YA', 'TIDAK']"></v-select>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-select
                                        v-model="
                                            forms.evaluasi_minumanberkafein
                                        "
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
                                        v-model="
                                            forms.evaluasi_meningkatkanasupanair
                                        "
                                        label="Meningkatkan asupan air"
                                        required
                                        hide-details
                                        variant="outlined"
                                        :items="['YA', 'TIDAK']"></v-select>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-select
                                        v-model="
                                            forms.evaluasi_obatkumurbakingsoda
                                        "
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
                                        v-model="
                                            forms.evaluasi_permenkaretxylitolccpacp
                                        "
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
                                        v-model="
                                            forms.evaluasi_kumursetiapminggu
                                        "
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
                    </v-window-item>
                </v-window>

                <v-window v-model="tab">
                    <v-window-item :value="5">
                        <v-container fluid>
                            <EmrComponent
                                ref="ListComponent"
                                :title="COMPONENT_TITLE"
                                :header="COMPONENT_HEADER"
                                :forms="COMPONENT_FORMS"
                                :apis="COMPONENT_APIS"
                                :idemr="forms.id">
                                <template v-slot:form="{ forms }">
                                    <v-form>
                                        <v-textarea
                                            v-model="forms.keadaangigi"
                                            label="Keadaan Gigi"></v-textarea>
                                        <v-textarea
                                            v-model="forms.tindakan"
                                            label="Tindakan"></v-textarea>
                                        <v-textarea
                                            v-model="forms.keterangan"
                                            label="Keterangan"></v-textarea>
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
                                                                "
                                                                readonly></v-text-field
                                                        ></v-row>
                                                        <v-row
                                                            ><v-textarea
                                                                label="Keadaan Gigi"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.keadaangigi
                                                                "
                                                                readonly></v-textarea
                                                        ></v-row>
                                                        <v-row
                                                            ><v-textarea
                                                                label="Tindakan"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.tindakan
                                                                "
                                                                readonly></v-textarea
                                                        ></v-row>
                                                        <v-row
                                                            ><v-textarea
                                                                label="Keterangan"
                                                                variant="underlined"
                                                                :model-value="
                                                                    item.keterangan
                                                                "
                                                                readonly></v-textarea
                                                        ></v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </template>
                            </EmrComponent>
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

<script></script>
