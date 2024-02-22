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
    // blmperawatanpemeriksaangigi_18_tv: "",
    // blmperawatanpemeriksaangigi_17_tv: "",
    // blmperawatanpemeriksaangigi_16_tv: "",
    // sblmperawatanpemeriksaangigi_15_55_tv: "",
    // sblmperawatanpemeriksaangigi_14_54_tv: "",
    // sblmperawatanpemeriksaangigi_13_53_tv: "",
    // sblmperawatanpemeriksaangigi_12_52_tv: "",
    // sblmperawatanpemeriksaangigi_11_51_tv: "",
    // sblmperawatanpemeriksaangigi_21_61_tv: "",
    // sblmperawatanpemeriksaangigi_22_62_tv: "",
    // sblmperawatanpemeriksaangigi_23_63_tv: "",
    // sblmperawatanpemeriksaangigi_24_64_tv: "",
    // sblmperawatanpemeriksaangigi_25_65_tv: "",
    // sblmperawatanpemeriksaangigi_26_tv: "",
    // sblmperawatanpemeriksaangigi_27_tv: "",
    // sblmperawatanpemeriksaangigi_28_tv: "",
    // sblmperawatanpemeriksaangigi_18_diagnosis: "",
    // sblmperawatanpemeriksaangigi_17_diagnosis: "",
    // sblmperawatanpemeriksaangigi_16_diagnosis: "",
    // sblmperawatanpemeriksaangigi_15_55_diagnosis: "",
    // sblmperawatanpemeriksaangigi_14_54_diagnosis: "",
    // sblmperawatanpemeriksaangigi_13_53_diagnosis: "",
    // sblmperawatanpemeriksaangigi_12_52_diagnosis: "",
    // sblmperawatanpemeriksaangigi_11_51_diagnosis: "",
    // sblmperawatanpemeriksaangigi_21_61_diagnosis: "",
    // sblmperawatanpemeriksaangigi_22_62_diagnosis: "",
    // sblmperawatanpemeriksaangigi_23_63_diagnosis: "",
    // sblmperawatanpemeriksaangigi_24_64_diagnosis: "",
    // sblmperawatanpemeriksaangigi_25_65_diagnosis: "",
    // sblmperawatanpemeriksaangigi_26_diagnosis: "",
    // sblmperawatanpemeriksaangigi_27_diagnosis: "",
    // sblmperawatanpemeriksaangigi_28_diagnosis: "",
    // sblmperawatanpemeriksaangigi_18_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_17_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_16_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_15_55_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_14_54_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_13_53_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_12_52_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_11_51_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_21_61_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_22_62_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_23_63_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_24_64_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_25_65_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_26_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_27_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_28_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_41_81_tv: "",
    // sblmperawatanpemeriksaangigi_42_82_tv: "",
    // sblmperawatanpemeriksaangigi_43_83_tv: "",
    // sblmperawatanpemeriksaangigi_44_84_tv: "",
    // sblmperawatanpemeriksaangigi_45_85_tv: "",
    // sblmperawatanpemeriksaangigi_46_tv: "",
    // sblmperawatanpemeriksaangigi_47_tv: "",
    // sblmperawatanpemeriksaangigi_48_tv: "",
    // sblmperawatanpemeriksaangigi_38_tv: "",
    // sblmperawatanpemeriksaangigi_37_tv: "",
    // sblmperawatanpemeriksaangigi_36_tv: "",
    // sblmperawatanpemeriksaangigi_35_75_tv: "",
    // sblmperawatanpemeriksaangigi_34_74_tv: "",
    // sblmperawatanpemeriksaangigi_33_73_tv: "",
    // sblmperawatanpemeriksaangigi_32_72_tv: "",
    // sblmperawatanpemeriksaangigi_31_71_tv: "",
    // sblmperawatanpemeriksaangigi_41_81_diagnosis: "",
    // sblmperawatanpemeriksaangigi_42_82_diagnosis: "",
    // sblmperawatanpemeriksaangigi_43_83_diagnosis: "",
    // sblmperawatanpemeriksaangigi_44_84_diagnosis: "",
    // sblmperawatanpemeriksaangigi_45_85_diagnosis: "",
    // sblmperawatanpemeriksaangigi_46_diagnosis: "",
    // sblmperawatanpemeriksaangigi_47_diagnosis: "",
    // sblmperawatanpemeriksaangigi_48_diagnosis: "",
    // sblmperawatanpemeriksaangigi_38_diagnosis: "",
    // sblmperawatanpemeriksaangigi_37_diagnosis: "",
    // sblmperawatanpemeriksaangigi_36_diagnosis: "",
    // sblmperawatanpemeriksaangigi_35_75_diagnosis: "",
    // sblmperawatanpemeriksaangigi_34_74_diagnosis: "",
    // sblmperawatanpemeriksaangigi_33_73_diagnosis: "",
    // sblmperawatanpemeriksaangigi_32_72_diagnosis: "",
    // sblmperawatanpemeriksaangigi_31_71_diagnosis: "",
    // sblmperawatanpemeriksaangigi_41_81_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_42_82_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_43_83_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_44_84_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_45_85_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_46_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_47_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_48_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_38_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_37_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_36_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_35_75_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_34_74_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_33_73_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_32_72_rencanaperawatan: "",
    // sblmperawatanpemeriksaangigi_31_71_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_18_tv: "",
    // ssdhperawatanpemeriksaangigi_17_tv: "",
    // ssdhperawatanpemeriksaangigi_16_tv: "",
    // ssdhperawatanpemeriksaangigi_15_55_tv: "",
    // ssdhperawatanpemeriksaangigi_14_54_tv: "",
    // ssdhperawatanpemeriksaangigi_13_53_tv: "",
    // ssdhperawatanpemeriksaangigi_12_52_tv: "",
    // ssdhperawatanpemeriksaangigi_11_51_tv: "",
    // ssdhperawatanpemeriksaangigi_21_61_tv: "",
    // ssdhperawatanpemeriksaangigi_22_62_tv: "",
    // ssdhperawatanpemeriksaangigi_23_63_tv: "",
    // ssdhperawatanpemeriksaangigi_24_64_tv: "",
    // ssdhperawatanpemeriksaangigi_25_65_tv: "",
    // ssdhperawatanpemeriksaangigi_26_tv: "",
    // ssdhperawatanpemeriksaangigi_27_tv: "",
    // ssdhperawatanpemeriksaangigi_28_tv: "",
    // ssdhperawatanpemeriksaangigi_18_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_17_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_16_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_15_55_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_14_54_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_13_53_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_12_52_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_11_51_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_21_61_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_22_62_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_23_63_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_24_64_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_25_65_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_26_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_27_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_28_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_18_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_17_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_16_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_15_55_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_14_54_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_13_53_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_12_52_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_11_51_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_21_61_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_22_62_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_23_63_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_24_64_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_25_65_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_26_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_27_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_28_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_41_81_tv: "",
    // ssdhperawatanpemeriksaangigi_42_82_tv: "",
    // ssdhperawatanpemeriksaangigi_43_83_tv: "",
    // ssdhperawatanpemeriksaangigi_44_84_tv: "",
    // ssdhperawatanpemeriksaangigi_45_85_tv: "",
    // ssdhperawatanpemeriksaangigi_46_tv: "",
    // ssdhperawatanpemeriksaangigi_47_tv: "",
    // ssdhperawatanpemeriksaangigi_48_tv: "",
    // ssdhperawatanpemeriksaangigi_38_tv: "",
    // ssdhperawatanpemeriksaangigi_37_tv: "",
    // ssdhperawatanpemeriksaangigi_36_tv: "",
    // ssdhperawatanpemeriksaangigi_35_75_tv: "",
    // ssdhperawatanpemeriksaangigi_34_74_tv: "",
    // ssdhperawatanpemeriksaangigi_33_73_tv: "",
    // ssdhperawatanpemeriksaangigi_32_72_tv: "",
    // ssdhperawatanpemeriksaangigi_31_71_tv: "",
    // ssdhperawatanpemeriksaangigi_41_81_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_42_82_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_43_83_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_44_84_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_45_85_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_46_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_47_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_48_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_38_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_37_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_36_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_35_75_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_34_74_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_33_73_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_32_72_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_31_71_diagnosis: "",
    // ssdhperawatanpemeriksaangigi_41_81_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_42_82_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_43_83_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_44_84_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_45_85_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_46_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_47_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_48_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_38_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_37_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_36_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_35_75_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_34_74_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_33_73_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_32_72_rencanaperawatan: "",
    // ssdhperawatanpemeriksaangigi_31_71_rencanaperawatan: "",
    // sblmperawatanfaktorrisikokaries_sikap: "",
    // sblmperawatanfaktorrisikokaries_status: "",
    // sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi: "",
    // sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas: "",
    // sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH: "",
    // sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi: "",
    // sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit:
    //     "",
    // sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer: "",
    // sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH: "",
    // sblmperawatanfaktorrisikokaries_plak_pH: "",
    // sblmperawatanfaktorrisikokaries_plak_aktivitas: "",
    // sblmperawatanfaktorrisikokaries_fluor: "",
    // sblmperawatanfaktorrisikokaries_diet: "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva:
    //     "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering:
    //     "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa: "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif: "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap: "",
    // sblmperawatanfaktorrisikokaries_faktormodifikasi_keterangan: "",
    // sblmperawatanfaktorrisikokaries_penilaianakhir_saliva: "",
    // sblmperawatanfaktorrisikokaries_penilaianakhir_plak: "",
    // sblmperawatanfaktorrisikokaries_penilaianakhir_diet: "",
    // sblmperawatanfaktorrisikokaries_penilaianakhir_fluor: "",
    // sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi: "",
    // ssdhperawatanfaktorrisikokaries_sikap: "",
    // ssdhperawatanfaktorrisikokaries_status: "",
    // ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi: "",
    // ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas: "",
    // ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH: "",
    // ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi: "",
    // ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit:
    //     "",
    // ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer: "",
    // ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH: "",
    // ssdhperawatanfaktorrisikokaries_plak_pH: "",
    // ssdhperawatanfaktorrisikokaries_plak_aktivitas: "",
    // ssdhperawatanfaktorrisikokaries_fluor: "",
    // ssdhperawatanfaktorrisikokaries_diet: "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva:
    //     "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering:
    //     "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa: "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif: "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap: "",
    // ssdhperawatanfaktorrisikokaries_faktormodifikasi_keterangan: "",
    // ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva: "",
    // ssdhperawatanfaktorrisikokaries_penilaianakhir_plak: "",
    // ssdhperawatanfaktorrisikokaries_penilaianakhir_diet: "",
    // ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor: "",
    // ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi: "",
    // sikatgigi2xsehari: "",
    // sikatgigi3xsehari: "",
    // flossingsetiaphari: "",
    // sikatinterdental: "",
    // agenantibakteri_obatkumur: "",
    // guladancemilandiantarawaktumakanutama: "",
    // minumanasamtinggi: "",
    // minumanberkafein: "",
    // meningkatkanasupanair: "",
    // obatkumurbakingsoda: "",
    // konsumsimakananminumanberbahandasarsusu: "",
    // permenkaretxylitolccpacp: "",
    // pastagigi: "",
    // kumursetiaphari: "",
    // kumursetiapminggu: "",
    // gelsetiaphari: "",
    // gelsetiapminggu: "",
    // perlu: "",
    // tidakperlu: "",
    // evaluasi_sikatgigi2xsehari: "",
    // evaluasi_sikatgigi3xsehari: "",
    // evaluasi_flossingsetiaphari: "",
    // evaluasi_sikatinterdental: "",
    // evaluasi_agenantibakteri_obatkumur: "",
    // evaluasi_guladancemilandiantarawaktumakanutama: "",
    // evaluasi_minumanasamtinggi: "",
    // evaluasi_minumanberkafein: "",
    // evaluasi_meningkatkanasupanair: "",
    // evaluasi_obatkumurbakingsoda: "",
    // evaluasi_konsumsimakananminumanberbahandasarsusu: "",
    // evaluasi_permenkaretxylitolccpacp: "",
    // evaluasi_pastagigi: "",
    // evaluasi_kumursetiaphari: "",
    // evaluasi_kumursetiapminggu: "",
    // evaluasi_gelsetiaphari: "",
    // evaluasi_gelsetiapminggu: "",
    // evaluasi_perlu: "",
    // evaluasi_tidakperlu: "",
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
            console.log(success);
            alert(success);
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
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {
            nim: nim,
            noregister: noreg,
        };

    await setItem(
        "/v1/emr/konservasi/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                if (success.data.noepisode == null) {
                    getAnItem(noreg);
                    return false;
                }
                forms.id = success.data.id;
                forms.tanggal = success.data.visit_date;
                forms.namapasien = success.data.patientname;
                forms.jeniskelamin = success.data.gander;
                forms.alamatpasien = success.data.address;
                forms.nomortelpon = success.data.mobilephone;
                forms.noregister = success.data.noregister;
                forms.noepisode = success.data.noepisode;
                forms.blmperawatanpemeriksaangigi_18_tv =
                    success.data.blmperawatanpemeriksaangigi_18_tv;
                forms.blmperawatanpemeriksaangigi_17_tv =
                    success.data.blmperawatanpemeriksaangigi_17_tv;
                forms.blmperawatanpemeriksaangigi_16_tv =
                    success.data.blmperawatanpemeriksaangigi_16_tv;
                forms.sblmperawatanpemeriksaangigi_15_55_tv =
                    success.data.sblmperawatanpemeriksaangigi_15_55_tv;
                forms.sblmperawatanpemeriksaangigi_14_54_tv =
                    success.data.sblmperawatanpemeriksaangigi_14_54_tv;
                forms.sblmperawatanpemeriksaangigi_13_53_tv =
                    success.data.sblmperawatanpemeriksaangigi_13_53_tv;
                forms.sblmperawatanpemeriksaangigi_12_52_tv =
                    success.data.sblmperawatanpemeriksaangigi_12_52_tv;
                forms.sblmperawatanpemeriksaangigi_11_51_tv =
                    success.data.sblmperawatanpemeriksaangigi_11_51_tv;
                forms.sblmperawatanpemeriksaangigi_21_61_tv =
                    success.data.sblmperawatanpemeriksaangigi_21_61_tv;
                forms.sblmperawatanpemeriksaangigi_22_62_tv =
                    success.data.sblmperawatanpemeriksaangigi_22_62_tv;
                forms.sblmperawatanpemeriksaangigi_23_63_tv =
                    success.data.sblmperawatanpemeriksaangigi_23_63_tv;
                forms.sblmperawatanpemeriksaangigi_24_64_tv =
                    success.data.sblmperawatanpemeriksaangigi_24_64_tv;
                forms.sblmperawatanpemeriksaangigi_25_65_tv =
                    success.data.sblmperawatanpemeriksaangigi_25_65_tv;
                forms.sblmperawatanpemeriksaangigi_26_tv =
                    success.data.sblmperawatanpemeriksaangigi_26_tv;
                forms.sblmperawatanpemeriksaangigi_27_tv =
                    success.data.sblmperawatanpemeriksaangigi_27_tv;
                forms.sblmperawatanpemeriksaangigi_28_tv =
                    success.data.sblmperawatanpemeriksaangigi_28_tv;
                forms.sblmperawatanpemeriksaangigi_18_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_18_diagnosis;
                forms.sblmperawatanpemeriksaangigi_17_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_17_diagnosis;
                forms.sblmperawatanpemeriksaangigi_16_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_16_diagnosis;
                forms.sblmperawatanpemeriksaangigi_15_55_tv =
                    success.data.sblmperawatanpemeriksaangigi_15_55_diagnosis;
                forms.sblmperawatanpemeriksaangigi_14_54_tv =
                    success.data.sblmperawatanpemeriksaangigi_14_54_diagnosis;
                forms.sblmperawatanpemeriksaangigi_13_53_tv =
                    success.data.sblmperawatanpemeriksaangigi_13_53_diagnosis;
                forms.sblmperawatanpemeriksaangigi_12_52_tv =
                    success.data.sblmperawatanpemeriksaangigi_12_52_diagnosis;
                forms.sblmperawatanpemeriksaangigi_11_51_tv =
                    success.data.sblmperawatanpemeriksaangigi_11_51_diagnosis;
                forms.sblmperawatanpemeriksaangigi_21_61_tv =
                    success.data.sblmperawatanpemeriksaangigi_21_61_diagnosis;
                forms.sblmperawatanpemeriksaangigi_22_62_tv =
                    success.data.sblmperawatanpemeriksaangigi_22_62_diagnosis;
                forms.sblmperawatanpemeriksaangigi_23_63_tv =
                    success.data.sblmperawatanpemeriksaangigi_23_63_diagnosis;
                forms.sblmperawatanpemeriksaangigi_24_64_tv =
                    success.data.sblmperawatanpemeriksaangigi_24_64_diagnosis;
                forms.sblmperawatanpemeriksaangigi_25_65_tv =
                    success.data.sblmperawatanpemeriksaangigi_25_65_diagnosis;
                forms.sblmperawatanpemeriksaangigi_26_tv =
                    success.data.sblmperawatanpemeriksaangigi_26_diagnosis;
                forms.sblmperawatanpemeriksaangigi_27_tv =
                    success.data.sblmperawatanpemeriksaangigi_27_diagnosis;
                forms.sblmperawatanpemeriksaangigi_28_tv =
                    success.data.sblmperawatanpemeriksaangigi_28_diagnosis;
                forms.sblmperawatanpemeriksaangigi_18_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_18_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_17_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_17_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_16_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_16_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_15_55_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_15_55_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_14_54_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_14_54_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_13_53_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_13_53_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_12_52_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_12_52_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_11_51_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_11_51_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_21_61_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_21_61_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_22_62_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_22_62_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_23_63_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_23_63_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_24_64_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_24_64_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_25_65_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_25_65_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_26_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_26_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_27_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_27_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_28_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_28_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_41_81_tv =
                    success.data.sblmperawatanpemeriksaangigi_41_81_tv;
                forms.sblmperawatanpemeriksaangigi_42_82_tv =
                    success.data.sblmperawatanpemeriksaangigi_42_82_tv;
                forms.sblmperawatanpemeriksaangigi_43_83_tv =
                    success.data.sblmperawatanpemeriksaangigi_43_83_tv;
                forms.sblmperawatanpemeriksaangigi_44_84_tv =
                    success.data.sblmperawatanpemeriksaangigi_44_84_tv;
                forms.sblmperawatanpemeriksaangigi_45_85_tv =
                    success.data.sblmperawatanpemeriksaangigi_45_85_tv;
                forms.sblmperawatanpemeriksaangigi_46_tv =
                    success.data.sblmperawatanpemeriksaangigi_46_tv;
                forms.sblmperawatanpemeriksaangigi_47_tv =
                    success.data.sblmperawatanpemeriksaangigi_47_tv;
                forms.sblmperawatanpemeriksaangigi_48_tv =
                    success.data.sblmperawatanpemeriksaangigi_48_tv;
                forms.sblmperawatanpemeriksaangigi_38_tv =
                    success.data.sblmperawatanpemeriksaangigi_38_tv;
                forms.sblmperawatanpemeriksaangigi_37_tv =
                    success.data.sblmperawatanpemeriksaangigi_37_tv;
                forms.sblmperawatanpemeriksaangigi_36_tv =
                    success.data.sblmperawatanpemeriksaangigi_36_tv;
                forms.sblmperawatanpemeriksaangigi_35_75_tv =
                    success.data.sblmperawatanpemeriksaangigi_35_75_tv;
                forms.sblmperawatanpemeriksaangigi_34_74_tv =
                    success.data.sblmperawatanpemeriksaangigi_34_74_tv;
                forms.sblmperawatanpemeriksaangigi_33_73_tv =
                    success.data.sblmperawatanpemeriksaangigi_33_73_tv;
                forms.sblmperawatanpemeriksaangigi_32_72_tv =
                    success.data.sblmperawatanpemeriksaangigi_32_72_tv;
                forms.sblmperawatanpemeriksaangigi_31_71_tv =
                    success.data.sblmperawatanpemeriksaangigi_31_71_tv;
                forms.sblmperawatanpemeriksaangigi_41_81_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_41_81_diagnosis;
                forms.sblmperawatanpemeriksaangigi_42_82_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_42_82_diagnosis;
                forms.sblmperawatanpemeriksaangigi_43_83_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_43_83_diagnosis;
                forms.sblmperawatanpemeriksaangigi_44_84_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_44_84_diagnosis;
                forms.sblmperawatanpemeriksaangigi_45_85_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_45_85_diagnosis;
                forms.sblmperawatanpemeriksaangigi_46_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_46_diagnosis;
                forms.sblmperawatanpemeriksaangigi_47_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_47_diagnosis;
                forms.sblmperawatanpemeriksaangigi_48_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_48_diagnosis;
                forms.sblmperawatanpemeriksaangigi_38_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_38_diagnosis;
                forms.sblmperawatanpemeriksaangigi_37_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_37_diagnosis;
                forms.sblmperawatanpemeriksaangigi_36_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_36_diagnosis;
                forms.sblmperawatanpemeriksaangigi_35_75_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_35_75_diagnosis;
                forms.sblmperawatanpemeriksaangigi_34_74_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_34_74_diagnosis;
                forms.sblmperawatanpemeriksaangigi_33_73_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_33_73_diagnosis;
                forms.sblmperawatanpemeriksaangigi_32_72_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_32_72_diagnosis;
                forms.sblmperawatanpemeriksaangigi_31_71_diagnosis =
                    success.data.sblmperawatanpemeriksaangigi_31_71_diagnosis;
                forms.sblmperawatanpemeriksaangigi_41_81_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_41_81_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_42_82_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_42_82_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_43_83_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_43_83_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_44_84_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_44_84_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_45_85_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_45_85_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_46_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_46_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_47_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_47_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_48_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_48_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_38_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_38_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_37_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_37_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_36_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_36_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_35_75_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_35_75_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_34_74_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_34_74_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_33_73_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_33_73_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_32_72_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_32_72_rencanaperawatan;
                forms.sblmperawatanpemeriksaangigi_31_71_rencanaperawatan =
                    success.data.sblmperawatanpemeriksaangigi_31_71_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_18_tv =
                    success.data.ssdhperawatanpemeriksaangigi_18_tv;
                forms.ssdhperawatanpemeriksaangigi_17_tv =
                    success.data.ssdhperawatanpemeriksaangigi_17_tv;
                forms.ssdhperawatanpemeriksaangigi_16_tv =
                    success.data.ssdhperawatanpemeriksaangigi_16_tv;
                forms.ssdhperawatanpemeriksaangigi_15_55_tv =
                    success.data.ssdhperawatanpemeriksaangigi_15_55_tv;
                forms.ssdhperawatanpemeriksaangigi_14_54_tv =
                    success.data.ssdhperawatanpemeriksaangigi_14_54_tv;
                forms.ssdhperawatanpemeriksaangigi_13_53_tv =
                    success.data.ssdhperawatanpemeriksaangigi_13_53_tv;
                forms.ssdhperawatanpemeriksaangigi_12_52_tv =
                    success.data.ssdhperawatanpemeriksaangigi_12_52_tv;
                forms.ssdhperawatanpemeriksaangigi_11_51_tv =
                    success.data.ssdhperawatanpemeriksaangigi_11_51_tv;
                forms.ssdhperawatanpemeriksaangigi_21_61_tv =
                    success.data.ssdhperawatanpemeriksaangigi_21_61_tv;
                forms.ssdhperawatanpemeriksaangigi_22_62_tv =
                    success.data.ssdhperawatanpemeriksaangigi_22_62_tv;
                forms.ssdhperawatanpemeriksaangigi_23_63_tv =
                    success.data.ssdhperawatanpemeriksaangigi_23_63_tv;
                forms.ssdhperawatanpemeriksaangigi_24_64_tv =
                    success.data.ssdhperawatanpemeriksaangigi_24_64_tv;
                forms.ssdhperawatanpemeriksaangigi_25_65_tv =
                    success.data.ssdhperawatanpemeriksaangigi_25_65_tv;
                forms.ssdhperawatanpemeriksaangigi_26_tv =
                    success.data.ssdhperawatanpemeriksaangigi_26_tv;
                forms.ssdhperawatanpemeriksaangigi_27_tv =
                    success.data.ssdhperawatanpemeriksaangigi_27_tv;
                forms.ssdhperawatanpemeriksaangigi_28_tv =
                    success.data.ssdhperawatanpemeriksaangigi_28_tv;
                forms.ssdhperawatanpemeriksaangigi_18_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_18_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_17_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_17_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_16_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_16_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_15_55_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_15_55_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_14_54_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_14_54_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_13_53_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_13_53_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_12_52_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_12_52_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_11_51_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_11_51_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_21_61_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_21_61_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_22_62_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_22_62_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_23_63_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_23_63_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_24_64_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_24_64_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_25_65_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_25_65_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_26_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_26_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_27_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_27_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_28_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_28_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_18_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_18_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_17_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_17_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_16_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_16_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_15_55_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_15_55_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_14_54_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_14_54_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_13_53_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_13_53_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_12_52_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_12_52_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_11_51_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_11_51_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_21_61_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_21_61_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_22_62_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_22_62_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_23_63_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_23_63_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_24_64_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_24_64_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_25_65_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_25_65_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_26_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_26_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_27_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_27_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_28_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_28_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_41_81_tv =
                    success.data.ssdhperawatanpemeriksaangigi_41_81_tv;
                forms.ssdhperawatanpemeriksaangigi_42_82_tv =
                    success.data.ssdhperawatanpemeriksaangigi_42_82_tv;
                forms.ssdhperawatanpemeriksaangigi_43_83_tv =
                    success.data.ssdhperawatanpemeriksaangigi_43_83_tv;
                forms.ssdhperawatanpemeriksaangigi_44_84_tv =
                    success.data.ssdhperawatanpemeriksaangigi_44_84_tv;
                forms.ssdhperawatanpemeriksaangigi_45_85_tv =
                    success.data.ssdhperawatanpemeriksaangigi_45_85_tv;
                forms.ssdhperawatanpemeriksaangigi_46_tv =
                    success.data.ssdhperawatanpemeriksaangigi_46_tv;
                forms.ssdhperawatanpemeriksaangigi_47_tv =
                    success.data.ssdhperawatanpemeriksaangigi_47_tv;
                forms.ssdhperawatanpemeriksaangigi_48_tv =
                    success.data.ssdhperawatanpemeriksaangigi_48_tv;
                forms.ssdhperawatanpemeriksaangigi_38_tv =
                    success.data.ssdhperawatanpemeriksaangigi_38_tv;
                forms.ssdhperawatanpemeriksaangigi_37_tv =
                    success.data.ssdhperawatanpemeriksaangigi_37_tv;
                forms.ssdhperawatanpemeriksaangigi_36_tv =
                    success.data.ssdhperawatanpemeriksaangigi_36_tv;
                forms.ssdhperawatanpemeriksaangigi_35_75_tv =
                    success.data.ssdhperawatanpemeriksaangigi_35_75_tv;
                forms.ssdhperawatanpemeriksaangigi_34_74_tv =
                    success.data.ssdhperawatanpemeriksaangigi_34_74_tv;
                forms.ssdhperawatanpemeriksaangigi_33_73_tv =
                    success.data.ssdhperawatanpemeriksaangigi_33_73_tv;
                forms.ssdhperawatanpemeriksaangigi_32_72_tv =
                    success.data.ssdhperawatanpemeriksaangigi_32_72_tv;
                forms.ssdhperawatanpemeriksaangigi_31_71_tv =
                    success.data.ssdhperawatanpemeriksaangigi_31_71_tv;
                forms.ssdhperawatanpemeriksaangigi_41_81_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_41_81_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_42_82_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_42_82_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_43_83_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_43_83_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_44_84_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_44_84_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_45_85_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_45_85_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_46_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_46_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_47_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_47_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_48_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_48_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_38_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_38_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_37_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_37_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_36_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_36_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_35_75_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_35_75_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_34_74_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_34_74_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_33_73_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_33_73_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_32_72_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_32_72_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_31_71_diagnosis =
                    success.data.ssdhperawatanpemeriksaangigi_31_71_diagnosis;
                forms.ssdhperawatanpemeriksaangigi_41_81_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_41_81_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_42_82_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_42_82_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_43_83_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_43_83_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_44_84_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_44_84_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_45_85_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_45_85_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_46_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_46_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_47_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_47_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_48_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_48_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_38_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_38_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_37_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_37_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_36_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_36_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_35_75_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_35_75_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_34_74_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_34_74_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_33_73_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_33_73_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_32_72_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_32_72_rencanaperawatan;
                forms.ssdhperawatanpemeriksaangigi_31_71_rencanaperawatan =
                    success.data.ssdhperawatanpemeriksaangigi_31_71_rencanaperawatan;
                forms.sblmperawatanfaktorrisikokaries_sikap =
                    success.data.sblmperawatanfaktorrisikokaries_sikap;
                forms.sblmperawatanfaktorrisikokaries_status =
                    success.data.sblmperawatanfaktorrisikokaries_status;
                forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi;
                forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas;
                forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH;
                forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi;
                forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit;
                forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer;
                forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH =
                    success.data.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_pH;
                forms.sblmperawatanfaktorrisikokaries_plak_pH =
                    success.data.sblmperawatanfaktorrisikokaries_plak_pH;
                forms.sblmperawatanfaktorrisikokaries_plak_aktivitas =
                    success.data.sblmperawatanfaktorrisikokaries_plak_aktivitas;
                forms.sblmperawatanfaktorrisikokaries_fluor =
                    success.data.sblmperawatanfaktorrisikokaries_fluor;
                forms.sblmperawatanfaktorrisikokaries_diet =
                    success.data.sblmperawatanfaktorrisikokaries_diet;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_protesa;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_sikap;
                forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_keterangan =
                    success.data.sblmperawatanfaktorrisikokaries_faktormodifikasi_keterangan;
                forms.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva =
                    success.data.sblmperawatanfaktorrisikokaries_penilaianakhir_saliva;
                forms.sblmperawatanfaktorrisikokaries_penilaianakhir_plak =
                    success.data.sblmperawatanfaktorrisikokaries_penilaianakhir_plak;
                forms.sblmperawatanfaktorrisikokaries_penilaianakhir_diet =
                    success.data.sblmperawatanfaktorrisikokaries_penilaianakhir_diet;
                forms.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor =
                    success.data.sblmperawatanfaktorrisikokaries_penilaianakhir_fluor;
                forms.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                    success.data.sblmperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi;
                forms.ssdhperawatanfaktorrisikokaries_sikap =
                    success.data.ssdhperawatanfaktorrisikokaries_sikap;
                forms.ssdhperawatanfaktorrisikokaries_status =
                    success.data.ssdhperawatanfaktorrisikokaries_status;
                forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_hidrasi;
                forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas;
                forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_pH;
                forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_hidrasi;
                forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit;
                forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer;
                forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH =
                    success.data.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_pH;
                forms.ssdhperawatanfaktorrisikokaries_plak_pH =
                    success.data.ssdhperawatanfaktorrisikokaries_plak_pH;
                forms.ssdhperawatanfaktorrisikokaries_plak_aktivitas =
                    success.data.ssdhperawatanfaktorrisikokaries_plak_aktivitas;
                forms.ssdhperawatanfaktorrisikokaries_fluor =
                    success.data.ssdhperawatanfaktorrisikokaries_fluor;
                forms.ssdhperawatanfaktorrisikokaries_diet =
                    success.data.ssdhperawatanfaktorrisikokaries_diet;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_protesa;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_kariesaktif;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_sikap;
                forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_keterangan =
                    success.data.ssdhperawatanfaktorrisikokaries_faktormodifikasi_keterangan;
                forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva =
                    success.data.ssdhperawatanfaktorrisikokaries_penilaianakhir_saliva;
                forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak =
                    success.data.ssdhperawatanfaktorrisikokaries_penilaianakhir_plak;
                forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet =
                    success.data.ssdhperawatanfaktorrisikokaries_penilaianakhir_diet;
                forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor =
                    success.data.ssdhperawatanfaktorrisikokaries_penilaianakhir_fluor;
                forms.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi =
                    success.data.ssdhperawatanfaktorrisikokaries_penilaianakhir_faktormodifikasi;
                forms.sikatgigi2xsehari = success.data.sikatgigi2xsehari;
                forms.sikatgigi3xsehari = success.data.sikatgigi3xsehari;
                forms.flossingsetiaphari = success.data.flossingsetiaphari;
                forms.sikatinterdental = success.data.sikatinterdental;
                forms.agenantibakteri_obatkumur =
                    success.data.agenantibakteri_obatkumur;
                forms.guladancemilandiantarawaktumakanutama =
                    success.data.guladancemilandiantarawaktumakanutama;
                forms.minumanasamtinggi = success.data.minumanasamtinggi;
                forms.meningkatkanasupanair = success.data.minumanberkafein;
                forms.meningkatkanasupanair =
                    success.data.meningkatkanasupanair;
                forms.obatkumurbakingsoda = success.data.obatkumurbakingsoda;
                forms.konsumsimakananminumanberbahandasarsusu =
                    success.data.konsumsimakananminumanberbahandasarsusu;
                forms.permenkaretxylitolccpacp =
                    success.data.permenkaretxylitolccpacp;
                forms.pastagigi = success.data.pastagigi;
                forms.kumursetiaphari = success.data.kumursetiaphari;
                forms.kumursetiapminggu = success.data.kumursetiapminggu;
                forms.gelsetiaphari = success.data.gelsetiaphari;
                forms.gelsetiapminggu = success.data.gelsetiapminggu;
                forms.perlu = success.data.perlu;
                forms.tidakperlu = success.data.tidakperlu;
                forms.evaluasi_sikatgigi2xsehari =
                    success.data.evaluasi_sikatgigi2xsehari;
                forms.evaluasi_sikatgigi3xsehari =
                    success.data.evaluasi_sikatgigi3xsehari;
                forms.evaluasi_flossingsetiaphari =
                    success.data.evaluasi_flossingsetiaphari;
                forms.evaluasi_sikatinterdental =
                    success.data.evaluasi_sikatinterdental;
                forms.evaluasi_agenantibakteri_obatkumur =
                    success.data.evaluasi_agenantibakteri_obatkumur;
                forms.evaluasi_guladancemilandiantarawaktumakanutama =
                    success.data.evaluasi_guladancemilandiantarawaktumakanutama;
                forms.evaluasi_minumanasamtinggi =
                    success.data.evaluasi_minumanasamtinggi;
                forms.evaluasi_minumanberkafein =
                    success.data.evaluasi_minumanberkafein;
                forms.evaluasi_meningkatkanasupanair =
                    success.data.evaluasi_meningkatkanasupanair;
                forms.evaluasi_obatkumurbakingsoda =
                    success.data.evaluasi_obatkumurbakingsoda;
                forms.evaluasi_konsumsimakananminumanberbahandasarsusu =
                    success.data.evaluasi_konsumsimakananminumanberbahandasarsusu;
                forms.evaluasi_permenkaretxylitolccpacp =
                    success.data.evaluasi_permenkaretxylitolccpacp;
                forms.evaluasi_pastagigi = success.data.evaluasi_pastagigi;
                forms.evaluasi_kumursetiaphari =
                    success.data.evaluasi_kumursetiaphari;
                forms.evaluasi_kumursetiapminggu =
                    success.data.evaluasi_kumursetiapminggu;
                forms.evaluasi_gelsetiaphari =
                    success.data.evaluasi_gelsetiaphari;
                forms.evaluasi_gelsetiapminggu =
                    success.data.evaluasi_gelsetiapminggu;
                forms.evaluasi_perlu = success.data.evaluasi_perlu;
                forms.evaluasi_tidakperlu = success.data.evaluasi_tidakperlu;
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
    await getByID(useRouter().currentRoute.value.query.noreg, "141300001");
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
                                    forms.blmperawatanpemeriksaangigi_18_tv
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
                                    forms.blmperawatanpemeriksaangigi_17_tv
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
                                    forms.blmperawatanpemeriksaangigi_16_tv
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
                        v-model="
                            forms.sblmperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas
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
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit
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
                            forms.sblmperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer
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
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva
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
                            forms.sblmperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering
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
                            forms.ssdhperawatanfaktorrisikokaries_saliva_tanpastimulasi_viskositas
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
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kecepatanaliranper5menit
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
                            forms.ssdhperawatanfaktorrisikokaries_saliva_denganstimulasi_kapasitasbuffer
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
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_obatpeningkataliransaliva
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
                            forms.ssdhperawatanfaktorrisikokaries_faktormodifikasi_penyakitpenyebabmulutkering
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
