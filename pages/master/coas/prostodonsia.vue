<script setup>
definePageMeta({
    layout: "dashboard",
    title: "prostodonsia",
});

var forms = reactive({
    id: "",
    noregister: useRouter().currentRoute.value.query.noreg,
    noepisode: "",
    nomorrekammedik: "",
    tanggal: "",
    namapasien: "",
    pekerjaan: "",
    jeniskelamin: "",
    alamatpasien: "",
    namaoperator: "",
    nomortelpon: "",
    npm: "",
    // keluhanutama: "",
    // riwayatgeligi: "",
    // pengalamandengangigitiruan: "",
    // estetis: "",
    // fungsibicara: "",
    // penguyahan: "",
    // pembiayaan: "",
    // lainlain: "",
    // wajah: "",
    // profilmuka: "",
    // pupil: "",
    // tragus: "",
    // hidung: "",
    // pernafasanmelaluihidung: "",
    // bibiratas: "",
    // bibiratas_b: "",
    // bibirbawah: "",
    // bibirbawah_b: "",
    // submandibulariskanan: "",
    // submandibulariskanan_b: "",
    // submandibulariskiri: "",
    // submandibulariskiri_b: "",
    // sublingualis: "",
    // sublingualis_b: "",
    // sisikiri: "",
    // sisikirisejak: "",
    // sisikanan: "",
    // sisikanansejak: "",
    // membukamulut: "",
    // membukamulut_b: "",
    // kelainanlain: "",
    // higienemulut: "",
    // salivakuantitas: "",
    // salivakonsisten: "",
    // lidahukuran: "",
    // lidahposisiwright: "",
    // lidahmobilitas: "",
    // refleksmuntah: "",
    // mukosamulut: "",
    // mukosamulutberupa: "",
    // gigitan: "",
    // gigitanbilaada: "",
    // gigitanterbuka: "",
    // gigitanterbukaregion: "",
    // gigitansilang: "",
    // gigitansilangregion: "",
    // hubunganrahang: "",
    // pemeriksaanrontgendental: "",
    // elemengigi: "",
    // pemeriksaanrontgenpanoramik: "",
    // pemeriksaanrontgentmj: "",
    // frakturgigi: "",
    // frakturarah: "",
    // frakturbesar: "",
    // intraorallainlain: "",
    // perbandinganmahkotadanakargigi: "",
    // interprestasifotorontgen: "",
    // intraoralkebiasaanburuk: "",
    // intraoralkebiasaanburukberupa: "",
    // pemeriksaanodontogram_11_51: "",
    // pemeriksaanodontogram_12_52: "",
    // pemeriksaanodontogram_13_53: "",
    // pemeriksaanodontogram_14_54: "",
    // pemeriksaanodontogram_15_55: "",
    // pemeriksaanodontogram_16: "",
    // pemeriksaanodontogram_17: "",
    // pemeriksaanodontogram_18: "",
    // pemeriksaanodontogram_61_21: "",
    // pemeriksaanodontogram_62_22: "",
    // pemeriksaanodontogram_63_23: "",
    // pemeriksaanodontogram_64_24: "",
    // pemeriksaanodontogram_65_25: "",
    // pemeriksaanodontogram_26: "",
    // pemeriksaanodontogram_27: "",
    // pemeriksaanodontogram_28: "",
    // pemeriksaanodontogram_48: "",
    // pemeriksaanodontogram_47: "",
    // pemeriksaanodontogram_46: "",
    // pemeriksaanodontogram_45_85: "",
    // pemeriksaanodontogram_44_84: "",
    // pemeriksaanodontogram_43_83: "",
    // pemeriksaanodontogram_42_82: "",
    // pemeriksaanodontogram_41_81: "",
    // pemeriksaanodontogram_38: "",
    // pemeriksaanodontogram_37: "",
    // pemeriksaanodontogram_36: "",
    // pemeriksaanodontogram_75_35: "",
    // pemeriksaanodontogram_74_34: "",
    // pemeriksaanodontogram_73_33: "",
    // pemeriksaanodontogram_72_32: "",
    // pemeriksaanodontogram_71_31: "",
    // rahangataspostkiri: "",
    // rahangataspostkanan: "",
    // rahangatasanterior: "",
    // rahangbawahpostkiri: "",
    // rahangbawahpostkanan: "",
    // rahangbawahanterior: "",
    // rahangatasbentukpostkiri: "",
    // rahangatasbentukpostkanan: "",
    // rahangatasbentukanterior: "",
    // rahangatasketinggianpostkiri: "",
    // rahangatasketinggianpostkanan: "",
    // rahangatasketinggiananterior: "",
    // rahangatastahananjaringanpostkiri: "",
    // rahangatastahananjaringanpostkanan: "",
    // rahangatastahananjaringananterior: "",
    // rahangatasbentukpermukaanpostkiri: "",
    // rahangatasbentukpermukaanpostkanan: "",
    // rahangatasbentukpermukaananterior: "",
    // rahangbawahbentukpostkiri: "",
    // rahangbawahbentukpostkanan: "",
    // rahangbawahbentukanterior: "",
    // rahangbawahketinggianpostkiri: "",
    // rahangbawahketinggianpostkanan: "",
    // rahangbawahketinggiananterior: "",
    // rahangbawahtahananjaringanpostkiri: "",
    // rahangbawahtahananjaringanpostkanan: "",
    // rahangbawahtahananjaringananterior: "",
    // rahangbawahbentukpermukaanpostkiri: "",
    // rahangbawahbentukpermukaanpostkanan: "",
    // rahangbawahbentukpermukaananterior: "",
    // anterior: "",
    // prosteriorkiri: "",
    // prosteriorkanan: "",
    // labialissuperior: "",
    // labialisinferior: "",
    // bukalisrahangataskiri: "",
    // bukalisrahangataskanan: "",
    // bukalisrahangbawahkiri: "",
    // bukalisrahangbawahkanan: "",
    // lingualis: "",
    // palatum: "",
    // kedalaman: "",
    // toruspalatinus: "",
    // palatummolle: "",
    // tuberorositasalveolariskiri: "",
    // tuberorositasalveolariskanan: "",
    // ruangretromilahioidkiri: "",
    // ruangretromilahioidkanan: "",
    // bentuklengkungrahangatas: "",
    // bentuklengkungrahangbawah: "",
    // perlekatandasarmulut: "",
    // pemeriksaanlain_lainlain: "",
    // sikapmental: "",
    // diagnosa: "",
    // rahangatas: "",
    // rahangataselemen: "",
    // rahangbawah: "",
    // rahangbawahelemen: "",
    // gigitiruancekat: "",
    // gigitiruancekatelemen: "",
    // perawatanperiodontal: "",
    // perawatanbedah: "",
    // perawatanbedah_ada: "",
    // perawatanbedahelemen: "",
    // perawatanbedahlainlain: "",
    // konservasigigi: "",
    // konservasigigielemen: "",
    // rekonturing: "",
    // adapembuatanmahkota: "",
    // pengasahangigimiring: "",
    // pengasahangigiextruded: "",
    // rekonturinglainlain: "",
    // macamcetakan_ra: "",
    // acamcetakan_rb: "",
    // warnagigi: "",
    // klasifikasidaerahtidakbergigirahangatas: "",
    // klasifikasidaerahtidakbergigirahangbawah: "",
    // gigipenyangga: "",
    // direk: "",
    // indirek: "",
    // platdasar: "",
    // anasirgigi: "",
    // prognosis: "",
    // prognosisalasan: "",
    // reliningregio: "",
    // reliningregiotanggal: "",
    // reparasiregio: "",
    // reparasiregiotanggal: "",
    // perawatanulangsebab: "",
    // perawatanulanglainlain: "",
    // perawatanulanglainlaintanggal: "",
    // perawatanulangketerangan: "",
});

const setItems = async (target) => {
    const { token: tokenData } = await useAuth(),
        { getItem, setItem } = useItem(tokenData),
        formTarget = {};

    for (let form of Object.keys(forms)) {
        formTarget[form] = forms[form];
    }

    await setItem(
        "/v1/emr/prostodonti/create/medicaldentalhistory",
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
        "/v1/emr/prostodonti/viewemrbyRegOperator",
        "",
        formTarget,
        (success) => {
            if (success.code == 200) {
                forms.id = success.data.id;
                forms.tanggal = success.data.visit_date;
                forms.namapasien = success.data.patientname;
                forms.jeniskelamin = success.data.gander;
                forms.alamat = success.data.address;
                forms.telepon = success.data.mobilephone;
                forms.noregister = success.data.noregister;
                forms.noepisode = success.data.noepisode;
                forms.keluhanutama = success.data.keluhanutama;
                forms.riwayatgeligi = success.data.riwayatgeligi;
                forms.pengalamandengangigitiruan =
                    success.data.pengalamandengangigitiruan;
                forms.estetis = success.data.estetis;
                forms.fungsibicara = success.data.fungsibicara;
                forms.penguyahan = success.data.penguyahan;
                forms.pembiayaan = success.data.pembiayaan;
                forms.lainlain = success.data.lainlain;
                forms.wajah = success.data.wajah;
                forms.profilmuka = success.data.profilmuka;
                forms.pupil = success.data.pupil;
                forms.tragus = success.data.tragus;
                forms.hidung = success.data.hidung;
                forms.pernafasanmelaluihidung =
                    success.data.pernafasanmelaluihidung;
                forms.bibiratas = success.data.bibiratas;
                forms.bibiratas_b = success.data.bibiratas_b;
                forms.bibirbawah = success.data.bibirbawah;
                forms.bibirbawah_b = success.data.bibirbawah_b;
                forms.submandibulariskanan = success.data.submandibulariskanan;
                forms.submandibulariskanan_b =
                    success.data.submandibulariskanan_b;
                forms.submandibulariskiri = success.data.submandibulariskiri;
                forms.submandibulariskiri_b =
                    success.data.submandibulariskiri_b;
                forms.sublingualis = success.data.sublingualis;
                forms.sublingualis_b = success.data.sublingualis_b;
                forms.sisikiri = success.data.sisikiri;
                forms.sisikirisejak = success.data.sisikirisejak;
                forms.sisikanan = success.data.sisikanan;
                forms.sisikanansejak = success.data.sisikanansejak;
                forms.membukamulut = success.data.membukamulut;
                forms.membukamulut_b = success.data.membukamulut_b;
                forms.kelainanlain = success.data.kelainanlain;
                forms.higienemulut = success.data.higienemulut;
                forms.salivakuantitas = success.data.salivakuantitas;
                forms.salivakonsisten = success.data.salivakonsisten;
                forms.lidahukuran = success.data.lidahukuran;
                forms.lidahposisiwright = success.data.lidahposisiwright;
                forms.lidahmobilitas = success.data.lidahmobilitas;
                forms.refleksmuntah = success.data.refleksmuntah;
                forms.mukosamulut = success.data.mukosamulut;
                forms.mukosamulutberupa = success.data.mukosamulutberupa;
                forms.gigitan = success.data.gigitan;
                forms.gigitanbilaada = success.data.gigitanbilaada;
                forms.gigitanterbuka = success.data.gigitanterbuka;
                forms.gigitanterbukaregion = success.data.gigitanterbukaregion;
                forms.gigitansilang = success.data.gigitansilang;
                forms.gigitansilangregion = success.data.gigitansilangregion;
                forms.hubunganrahang = success.data.hubunganrahang;
                forms.pemeriksaanrontgendental =
                    success.data.pemeriksaanrontgendental;
                forms.elemengigi = success.data.elemengigi;
                forms.pemeriksaanrontgenpanoramik =
                    success.data.pemeriksaanrontgenpanoramik;
                forms.pemeriksaanrontgentmj =
                    success.data.pemeriksaanrontgentmj;
                forms.frakturgigi = success.data.frakturgigi;
                forms.frakturarah = success.data.frakturarah;
                forms.frakturbesar = success.data.frakturbesar;
                forms.intraorallainlain = success.data.intraorallainlain;
                forms.perbandinganmahkotadanakargigi =
                    success.data.perbandinganmahkotadanakargigi;
                forms.interprestasifotorontgen =
                    success.data.interprestasifotorontgen;
                forms.intraoralkebiasaanburuk =
                    success.data.intraoralkebiasaanburuk;
                forms.intraoralkebiasaanburukberupa =
                    success.data.intraoralkebiasaanburukberupa;
                forms.pemeriksaanodontogram_11_51 =
                    success.data.pemeriksaanodontogram_11_51;
                forms.pemeriksaanodontogram_12_52 =
                    success.data.pemeriksaanodontogram_12_52;
                forms.pemeriksaanodontogram_13_53 =
                    success.data.pemeriksaanodontogram_13_53;
                forms.pemeriksaanodontogram_14_54 =
                    success.data.pemeriksaanodontogram_14_54;
                forms.pemeriksaanodontogram_15_55 =
                    success.data.pemeriksaanodontogram_15_55;
                forms.pemeriksaanodontogram_16 =
                    success.data.pemeriksaanodontogram_16;
                forms.pemeriksaanodontogram_17 =
                    success.data.pemeriksaanodontogram_17;
                forms.pemeriksaanodontogram_18 =
                    success.data.pemeriksaanodontogram_18;
                forms.pemeriksaanodontogram_61_21 =
                    success.data.pemeriksaanodontogram_61_21;
                forms.pemeriksaanodontogram_62_22 =
                    success.data.pemeriksaanodontogram_62_22;
                forms.pemeriksaanodontogram_63_23 =
                    success.data.pemeriksaanodontogram_63_23;
                forms.pemeriksaanodontogram_64_24 =
                    success.data.pemeriksaanodontogram_64_24;
                forms.pemeriksaanodontogram_65_25 =
                    success.data.pemeriksaanodontogram_65_25;
                forms.pemeriksaanodontogram_26 =
                    success.data.pemeriksaanodontogram_26;
                forms.pemeriksaanodontogram_27 =
                    success.data.pemeriksaanodontogram_27;
                forms.pemeriksaanodontogram_28 =
                    success.data.pemeriksaanodontogram_28;
                forms.pemeriksaanodontogram_48 =
                    success.data.pemeriksaanodontogram_48;
                forms.pemeriksaanodontogram_47 =
                    success.data.pemeriksaanodontogram_47;
                forms.pemeriksaanodontogram_46 =
                    success.data.pemeriksaanodontogram_46;
                forms.pemeriksaanodontogram_45_85 =
                    success.data.pemeriksaanodontogram_45_85;
                forms.pemeriksaanodontogram_44_84 =
                    success.data.pemeriksaanodontogram_44_84;
                forms.pemeriksaanodontogram_43_83 =
                    success.data.pemeriksaanodontogram_43_83;
                forms.pemeriksaanodontogram_42_82 =
                    success.data.pemeriksaanodontogram_42_82;
                forms.pemeriksaanodontogram_41_81 =
                    success.data.pemeriksaanodontogram_41_81;
                forms.pemeriksaanodontogram_38 =
                    success.data.pemeriksaanodontogram_38;
                forms.pemeriksaanodontogram_37 =
                    success.data.pemeriksaanodontogram_37;
                forms.pemeriksaanodontogram_36 =
                    success.data.pemeriksaanodontogram_36;
                forms.pemeriksaanodontogram_75_35 =
                    success.data.pemeriksaanodontogram_75_35;
                forms.pemeriksaanodontogram_74_34 =
                    success.data.pemeriksaanodontogram_74_34;
                forms.pemeriksaanodontogram_73_33 =
                    success.data.pemeriksaanodontogram_73_33;
                forms.pemeriksaanodontogram_72_32 =
                    success.data.pemeriksaanodontogram_72_32;
                forms.pemeriksaanodontogram_71_31 =
                    success.data.pemeriksaanodontogram_71_31;
                forms.rahangataspostkiri = success.data.rahangataspostkiri;
                forms.rahangataspostkanan = success.data.rahangataspostkanan;
                forms.rahangatasanterior = success.data.rahangatasanterior;
                forms.rahangbawahpostkiri = success.data.rahangbawahpostkiri;
                forms.rahangbawahpostkanan = success.data.rahangbawahpostkanan;
                forms.rahangbawahanterior = success.data.rahangbawahanterior;
                forms.rahangatasbentukpostkiri =
                    success.data.rahangatasbentukpostkiri;
                forms.rahangatasbentukpostkanan =
                    success.data.rahangatasbentukpostkanan;
                forms.rahangatasbentukanterior =
                    success.data.rahangatasbentukanterior;
                forms.rahangatasketinggianpostkiri =
                    success.data.rahangatasketinggianpostkiri;
                forms.rahangatasketinggianpostkanan =
                    success.data.rahangatasketinggianpostkanan;
                forms.rahangatasketinggiananterior =
                    success.data.rahangatasketinggiananterior;
                forms.rahangatastahananjaringanpostkiri =
                    success.data.rahangatastahananjaringanpostkiri;
                forms.rahangatastahananjaringanpostkanan =
                    success.data.rahangatastahananjaringanpostkanan;
                forms.rahangatastahananjaringananterior =
                    success.data.rahangatastahananjaringananterior;
                forms.rahangatasbentukpermukaanpostkiri =
                    success.data.rahangatasbentukpermukaanpostkiri;
                forms.rahangatasbentukpermukaanpostkanan =
                    success.data.rahangatasbentukpermukaanpostkanan;
                forms.rahangatasbentukpermukaananterior =
                    success.data.rahangatasbentukpermukaananterior;
                forms.rahangbawahbentukpostkiri =
                    success.data.rahangbawahbentukpostkiri;
                forms.rahangbawahbentukpostkanan =
                    success.data.rahangbawahbentukpostkanan;
                forms.rahangbawahbentukanterior =
                    success.data.rahangbawahbentukanterior;
                forms.rahangbawahketinggianpostkiri =
                    success.data.rahangbawahketinggianpostkiri;
                forms.rahangbawahketinggianpostkanan =
                    success.data.rahangbawahketinggianpostkanan;
                forms.rahangbawahketinggiananterior =
                    success.data.rahangbawahketinggiananterior;
                forms.rahangbawahtahananjaringanpostkiri =
                    success.data.rahangbawahtahananjaringanpostkiri;
                forms.rahangbawahtahananjaringanpostkanan =
                    success.data.rahangbawahtahananjaringanpostkanan;
                forms.rahangbawahtahananjaringananterior =
                    success.data.rahangbawahtahananjaringananterior;
                forms.rahangbawahbentukpermukaanpostkiri =
                    success.data.rahangbawahbentukpermukaanpostkiri;
                forms.rahangbawahbentukpermukaanpostkanan =
                    success.data.rahangbawahbentukpermukaanpostkanan;
                forms.rahangbawahbentukpermukaananterior =
                    success.data.rahangbawahbentukpermukaananterior;
                forms.anterior = success.data.anterior;
                forms.prosteriorkiri = success.data.prosteriorkiri;
                forms.prosteriorkanan = success.data.prosteriorkanan;
                forms.labialissuperior = success.data.labialissuperior;
                forms.labialisinferior = success.data.labialisinferior;
                forms.bukalisrahangataskiri =
                    success.data.bukalisrahangataskiri;
                forms.bukalisrahangataskanan =
                    success.data.bukalisrahangataskanan;
                forms.bukalisrahangbawahkiri =
                    success.data.bukalisrahangbawahkiri;
                forms.bukalisrahangbawahkanan =
                    success.data.bukalisrahangbawahkanan;
                forms.lingualis = success.data.lingualis;
                forms.palatum = success.data.palatum;
                forms.kedalaman = success.data.kedalaman;
                forms.toruspalatinus = success.data.toruspalatinus;
                forms.palatummolle = success.data.palatummolle;
                forms.tuberorositasalveolariskiri =
                    success.data.tuberorositasalveolariskiri;
                forms.tuberorositasalveolariskanan =
                    success.data.tuberorositasalveolariskanan;
                forms.ruangretromilahioidkiri =
                    success.data.ruangretromilahioidkiri;
                forms.ruangretromilahioidkanan =
                    success.data.ruangretromilahioidkanan;
                forms.bentuklengkungrahangatas =
                    success.data.bentuklengkungrahangatas;
                forms.bentuklengkungrahangbawah =
                    success.data.bentuklengkungrahangbawah;
                forms.perlekatandasarmulut = success.data.perlekatandasarmulut;
                forms.pemeriksaanlain_lainlain =
                    success.data.pemeriksaanlain_lainlain;
                forms.sikapmental = success.data.sikapmental;
                forms.diagnosa = success.data.diagnosa;
                forms.rahangatas = success.data.rahangatas;
                forms.rahangataselemen = success.data.rahangataselemen;
                forms.rahangbawah = success.data.rahangbawah;
                forms.rahangbawahelemen = success.data.rahangbawahelemen;
                forms.gigitiruancekat = success.data.gigitiruancekat;
                forms.gigitiruancekatelemen =
                    success.data.gigitiruancekatelemen;
                forms.perawatanperiodontal = success.data.perawatanperiodontal;
                forms.perawatanbedah = success.data.perawatanbedah;
                forms.perawatanbedah_ada = success.data.perawatanbedah_ada;
                forms.perawatanbedahelemen = success.data.perawatanbedahelemen;
                forms.perawatanbedahlainlain =
                    success.data.perawatanbedahlainlain;
                forms.konservasigigi = success.data.konservasigigi;
                forms.konservasigigielemen = success.data.konservasigigielemen;
                forms.rekonturing = success.data.rekonturing;
                forms.adapembuatanmahkota = success.data.adapembuatanmahkota;
                forms.pengasahangigimiring = success.data.pengasahangigimiring;
                forms.pengasahangigiextruded =
                    success.data.pengasahangigiextruded;
                forms.rekonturinglainlain = success.data.rekonturinglainlain;
                forms.macamcetakan_ra = success.data.macamcetakan_ra;
                forms.acamcetakan_rb = success.data.acamcetakan_rb;
                forms.warnagigi = success.data.warnagigi;
                forms.klasifikasidaerahtidakbergigirahangatas =
                    success.data.klasifikasidaerahtidakbergigirahangatas;
                forms.klasifikasidaerahtidakbergigirahangbawah =
                    success.data.klasifikasidaerahtidakbergigirahangbawah;
                forms.gigipenyangga = success.data.gigipenyangga;
                forms.direk = success.data.direk;
                forms.indirek = success.data.indirek;
                forms.platdasar = success.data.platdasar;
                forms.anasirgigi = success.data.anasirgigi;
                forms.prognosis = success.data.prognosis;
                forms.prognosisalasan = success.data.prognosisalasan;
                forms.reliningregio = success.data.reliningregio;
                forms.reliningregiotanggal = success.data.reliningregiotanggal;
                forms.reparasiregio = success.data.reparasiregio;
                forms.reparasiregiotanggal = success.data.reparasiregiotanggal;
                forms.perawatanulangsebab = success.data.perawatanulangsebab;
                forms.perawatanulanglainlain =
                    success.data.perawatanulanglainlain;
                forms.perawatanulanglainlaintanggal =
                    success.data.perawatanulanglainlaintanggal;
                forms.perawatanulangketerangan =
                    success.data.perawatanulangketerangan;
                if (success.data.noepisode == null) {
                    getAnItem(noreg);
                    return false;
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

const image = reactive({
    designngigitext: [],
});

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
        image.designngigitext.push(data.data.data.select_file);
};

// const getAnItem = async (target) =>
// {
//     const

//     { token: tokenData, } = await useAuth (),
//     { getItem,setItem,getItemPost } = useItem (tokenData);

//     await getItemPost ("/v1/transaction/patient/detailbyNoregistrasi", "",
//     target,
//     success =>
//     {
//       //   var forms = {
//       //   //console.log(success.data[0]);
//       //   tanggal:success.data[0].Visit_Date,
//       //   namapasien:success.data[0].PatientName,
//       //   // suku:success.data[0],
//       //   // umur:success.data[0],
//       //   // jeniskelamin:success.data[0],
//       //   // alamat:success.data[0],
//       //   // telepon:success.data[0],
//       //   // pekerjaan:success.data[0],
//       //   // rujukandari:success.data[0],
//       //   // namaayah:success.data[0],
//       //   // sukuayah:success.data[0],
//       //   // umurayah:success.data[0],
//       //   // namaibu:success.data[0],
//       //   // sukuibu:success.data[0],
//       //   // umuribu:success.data[0],
//       //   // pekerjaanortu:success.data[0],
//       //   // alamatortu:success.data[0],
//       //   noregister:success.data[0].NoRegistrasi,
//       //   noepisode:success.data[0].NoEpisode,
//       // }
//     },
//     error => {});
// };

// onBeforeMount (async () =>
// {
//     clearForms ();
// });

onMounted(async () => {
    await getByID(useRouter().currentRoute.value.query.noreg, "141300001");
    //await getAnItem ( useRouter().currentRoute.value.query.noreg );

    image.designngigitext.push(forms.designngigitext);
});
</script>

<template v-slot:form="{ forms }">
    <v-form v-model="valid">
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
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.noregister"
                        label="Nomor Register"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="forms.noepisode"
                        label="Nomor Episode"
                        required
                        hide-details
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
                        v-model="forms.npm"
                        label="NPM"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
            <br />
            <h4>A. ANAMNESIS</h4>

            <br />
            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.keluhanutama"
                        label="Keluhan Utama"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.riwayatgeligi"
                        label="Riwayat Geligi"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.pengalamandengangigitiruan"
                        label="Pengalaman Dengan Gigi Tiruan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.estetis"
                        label="- Estetis"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.fungsibicara"
                        label="- Fungsi Bicara"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.penguyahan"
                        label="- Penguyahan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.pembiayaan"
                        label="Pembiayaan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.lainlain"
                        label="Lain-lain"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>
            <h4>B. PEMERIKSAAN</h4>
            <br />
            <h5>1. EKSTRA ORAL</h5>
            <br />
            <v-row>
                <v-col cols="10" md="4">
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

                <v-col cols="10" md="4">
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
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.bibiratas_b"
                        label=""
                        :items="['Tebal', 'Tipis*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.profilmuka"
                        label="b. Profil Muka"
                        :items="['Lurus', 'Cembung', 'Cekung *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="4">
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
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.bibirbawah_b"
                        label=""
                        :items="['Tebal', 'Tipis*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.pupil"
                        label=" c. Pupil"
                        :items="['Simetris', 'Asimetris *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <h5>h. Kelenjar Getah Bening :</h5>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.submandibulariskanan"
                        label="Submandibularis Kanan"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.submandibulariskanan_b"
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.submandibulariskiri"
                        label="Submandibularis Kiri"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.submandibulariskiri_b"
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.sublingualis"
                        label="Sublingualis"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.sublingualis_b"
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.tragus"
                        label="d. Tragus"
                        :items="['Simetris', 'Asimetris *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="4">
                    <h5>i. Sendi Rahang :</h5>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.sisikiri"
                        label="Sisi Kiri"
                        :items="['bunyi', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col rows="1" cols="3">
                    <v-textarea
                        v-model="forms.sisikirisejak"
                        label="sejak"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.sisikanan"
                        label="Sisi Kanan"
                        :items="['bunyi', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col rows="1" cols="3">
                    <v-textarea
                        v-model="forms.sisikanansejak"
                        label="sejak"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.membukamulut"
                        label="Membuka Mulut"
                        :items="['Deviasi', 'Tidak Deviasi *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        v-model="forms.membukamulut_b"
                        label=""
                        :items="['Ke Kiri', 'Ke Kanan*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.hidung"
                        label="e. Hidung"
                        :items="['Simetris', 'Asimetris *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.kelainanlain"
                        label="j. Kelainan lain"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="1"> </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.pernafasanmelaluihidung"
                        label="Pernafasan Melalui Hidung"
                        :items="['Lancar', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <br />
            <h5>2. INTRA ORAL</h5>
            <br />
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>a. PEMERIKSAAN UMUM</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.higienemulut"
                        label="1) Higiene mulut"
                        :items="['Baik', 'Sedang', 'Buruk *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.salivakuantitas"
                        label="2) Saliva: -Kuantitas"
                        :items="['Sedikit', 'Normal', 'Banyak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.salivakonsisten"
                        label="Saliva: -Konsisten"
                        :items="['Encer', 'Normal', 'Kental *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.lidahukuran"
                        label="3) Lidah: -Ukuran"
                        :items="['Kecil', 'Normal', 'Besar *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.lidahposisiwright"
                        label="Lidah: -Posisi Wright"
                        :items="['Kelas I', 'Kelas II', 'Kelas III *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.lidahmobilitas"
                        label="Lidah: -Mobilitas"
                        :items="['Normal', 'Aktif *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.refleksmuntah"
                        label="4) Refleks Muntah"
                        :items="['Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.mukosamulut"
                        label="5) Mukosa Mulut"
                        :items="['Sehat', 'Ada Kelainan *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.mukosamulutberupa"
                        label="Berupa"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.gigitan"
                        label="6) Gigitan"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.gigitanbilaada"
                        label="Bila Ada"
                        :items="['Stabil', 'Tidak Stabil*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.gigitanterbuka"
                        label="Gigitan Terbuka"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.gigitanterbukaregion"
                        label="Region"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.gigitansilang"
                        label="Gigitan Silang"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.gigitansilangregion"
                        label="Region"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.hubunganrahang"
                        label="Hubungan Rahang"
                        :items="['Ortognati', 'Retrognati', 'Prognati *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.pemeriksaanrontgendental"
                        label="7) Pemeriksaan Rontgen : -Dental"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.elemengigi"
                        label="Elemen gigi"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.pemeriksaanrontgenpanoramik"
                        label="Pemeriksaan Rontgen : -Panoramik"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.pemeriksaanrontgentmj"
                        label="Pemeriksaan Rontgen : -TMJ"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.frakturgigi"
                        label="8) Fraktur : -Gigi"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.frakturarah"
                        label="Fraktur : -Arah"
                        :items="['Horisontal', 'Diagonal', 'Vertical *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
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
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.intraorallainlain"
                        label="9) Lain-lain "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.perbandinganmahkotadanakargigi"
                        label="10) Perbandingan Mahkota & akar gigi "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.interprestasifotorontgen"
                        label="-Interprestasi Foto Rontgen "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.intraoralkebiasaanburuk"
                        label="11) Kebiasaan Buruk "
                        :items="['Ada', 'Tidak Ada*']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.intraoralkebiasaanburukberupa"
                        label="Berupa"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <br />
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>b. PEMERIKSAAN ODONTOGRAM</h5>
            </v-row>
            <br />
            <v-table density="compact" class="border">
                <tbody>
                    <tr>
                        <td class="text-center">11[51]</td>
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
                        <td class="text-center">[61]21</td>
                    </tr>
                    <tr>
                        <td class="text-center">12[52]</td>
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
                        <td class="text-center">[62]22</td>
                    </tr>
                    <tr>
                        <td class="text-center">13[53]</td>
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
                        <td class="text-center">[63]23</td>
                    </tr>
                    <tr>
                        <td class="text-center">14[54]</td>
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
                        <td class="text-center">[64]24</td>
                    </tr>
                    <tr>
                        <td class="text-center">15[55]</td>
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
                        <td class="text-center">[65]25</td>
                    </tr>
                    <tr>
                        <td class="text-center">16</td>
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
                        <td class="text-center">26</td>
                    </tr>
                    <tr>
                        <td class="text-center">17</td>
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
                        <td class="text-center">27</td>
                    </tr>
                    <tr>
                        <td class="text-center">18</td>
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
                        <td class="text-center">28</td>
                    </tr>
                </tbody>
            </v-table>

            <br />
            <v-table density="compact" class="border">
                <tbody>
                    <tr>
                        <td class="text-center">48</td>
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
                        <td class="text-center">38</td>
                    </tr>
                    <tr>
                        <td class="text-center">47</td>
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
                        <td class="text-center">37</td>
                    </tr>
                    <tr>
                        <td class="text-center">46</td>
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
                        <td class="text-center">36</td>
                    </tr>
                    <tr>
                        <td class="text-center">45[85]</td>
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
                        <td class="text-center">[75]35</td>
                    </tr>
                    <tr>
                        <td class="text-center">44[84]</td>
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
                        <td class="text-center">[74]34</td>
                    </tr>
                    <tr>
                        <td class="text-center">43[83]</td>
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
                        <td class="text-center">[73]33</td>
                    </tr>
                    <tr>
                        <td class="text-center">42[82]</td>
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
                        <td class="text-center">[72]32</td>
                    </tr>
                    <tr>
                        <td class="text-center">41[81]</td>
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
                        <td class="text-center">[71]31</td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>c. PEMERIKSAAN LAIN</h5>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>1. Vestibulum</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangataspostkiri"
                        label="Rahang Atas : -Post Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangataspostkanan"
                        label="Rahang Atas : -Post Kanan"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasanterior"
                        label="Rahang Atas : -Anterior"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahpostkiri"
                        label="Rahang Bawah : -Post Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahpostkanan"
                        label="Rahang Bawah : -Post Kanan"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahanterior"
                        label="Rahang Bawah : -Anterior"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>2. Prosesus Alveolaris / Residual Ridge Regio</h5>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>Rahang Atas :</h5>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukpostkiri"
                        label="Bentuk : -Post Kiri"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukpostkanan"
                        label="Bentuk : -Post Kanan"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukanterior"
                        label="Bentuk : -Anterior"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasketinggianpostkiri"
                        label="Ketinggian : -Post Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasketinggianpostkanan"
                        label="Ketinggian : -Post Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasketinggiananterior"
                        label="Ketinggian : -Anterior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatastahananjaringanpostkiri"
                        label="Tahanan Jaringan : -Post Kiri"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatastahananjaringanpostkanan"
                        label="Tahanan Jaringan : -Post Kanan"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatastahananjaringananterior"
                        label="Tahanan Jaringan : -Anterior"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukpermukaanpostkiri"
                        label="Bentuk Permukaan : -Post Kiri"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukpermukaanpostkanan"
                        label="Bentuk Permukaan : -Post Kanan"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangatasbentukpermukaananterior"
                        label="Bentuk Permukaan : -Anterior"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>Rahang Bawah :</h5>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukpostkiri"
                        label="Bentuk : -Post Kiri"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukpostkanan"
                        label="Bentuk : -Post Kanan"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukanterior"
                        label="Bentuk : -Anterior"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahketinggianpostkiri"
                        label="Ketinggian : -Post Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahketinggianpostkanan"
                        label="Ketinggian : -Post Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahketinggiananterior"
                        label="Ketinggian : -Anterior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahtahananjaringanpostkiri"
                        label="Tahanan Jaringan : -Post Kiri"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahtahananjaringanpostkanan"
                        label="Tahanan Jaringan : -Post Kanan"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahtahananjaringananterior"
                        label="Tahanan Jaringan : -Anterior"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukpermukaanpostkiri"
                        label="Bentuk Permukaan : -Post Kiri"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukpermukaanpostkanan"
                        label="Bentuk Permukaan : -Post Kanan"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.rahangbawahbentukpermukaananterior"
                        label="Bentuk Permukaan : -Anterior"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>Relasi Rahang :</h5>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.anterior"
                        label="Anterior"
                        :items="['Prognati', 'Normal', 'Retrognati*']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.prosteriorkiri"
                        label="Prosterior :-Kiri"
                        :items="['Normal', 'Crossbite', 'Scissors Bite *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.prosteriorkanan"
                        label="Prosterior :-Kanan"
                        :items="['Normal', 'Crossbite', 'Scissors Bite *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>3. Frenulum</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.labialissuperior"
                        label="-Labialis Superior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.labialisinferior"
                        label="-Labialis Inferior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bukalisrahangataskiri"
                        label="-Bukalis Rahang Atas Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bukalisrahangataskanan"
                        label="-Bukalis Rahang Atas Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bukalisrahangbawahkiri"
                        label="-Bukalis Rahang Bawah Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bukalisrahangbawahkanan"
                        label="-Bukalis Rahang Bawah Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.lingualis"
                        label="-Lingualis"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>4. Palatum</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.palatum"
                        label="Palatum"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        v-model="forms.kedalaman"
                        label="Kedalaman"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.toruspalatinus"
                        label="Torus Palatinus"
                        :items="['Besar', 'Kecil', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
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
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>5. Tuberositas Alveolaris</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.tuberorositasalveolariskiri"
                        label="-Kiri"
                        :items="['Besar', 'Kecil *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.tuberorositasalveolariskanan"
                        label="-Kanan"
                        :items="['Besar', 'Kecil *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>6. Ruang Retromilohioid</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.ruangretromilahioidkiri"
                        label="-Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.ruangretromilahioidkanan"
                        label="-Kanan"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2" md="1"> </v-col>
                <h5>7. Bentuk Lekung Rahang</h5>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bentuklengkungrahangatas"
                        label="-Rahang Atas"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.bentuklengkungrahangbawah"
                        label="-Rahang Bawah"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.perlekatandasarmulut"
                        label="8. Perlekatan Dasar Mulut"
                        :items="['Tinggi', 'Normal', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-textarea
                        v-model="forms.pemeriksaanlain_lainlain"
                        label="9. Lain-Lain"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <h4>C. SIKAP MENTAL</h4>
            <br />
            <v-row>
                <v-col cols="10" md="4">
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
                <v-col rows="2" cols="10">
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
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
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
            <hr />
            <h4>Gigi Tiruan Sebagian Lepasan</h4>
            <br />
            <h5>a. PERAWATAN PRA PROSTODONTIK</h5>
            <br />
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.perawatanperiodontal"
                        label="1) Perawatan Periodontal"
                        :items="['Ada', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.konservasigigielemen"
                        label="Ada, Pada Elemen"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="4">
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
                <v-col cols="10" md="6">
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
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.klasifikasidaerahtidakbergigirahangatas"
                        label="Rahang Atas :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.klasifikasidaerahtidakbergigirahangbawah"
                        label="Rahang Bawah :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <h5>Komponen Gigi Tiruan Lepas Sebagian</h5>
            <br />
            <v-row>
                <v-col cols="10" md="6">
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
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.direk"
                        label="a. Direk :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.indirek"
                        label="b. Indirek :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.platdasar"
                        label="3) Plat Dasar :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.anasirgigi"
                        label="4) Anasir Gigi :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.keterangan"
                        label="Keterangan :"
                        variant="outlined"
                        rows="8"></v-textarea
                ></v-col>
                <v-col cols="10" md="4">
                    <v-dialog width="300">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" text="Upload foto gigi utuh">
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
                                        @click="isActive.value = false"></v-btn>
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
                                <v-col
                                    v-for="(
                                        item, index
                                    ) in image.designngigitext"
                                    :key="index"
                                    cols="6">
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
            </v-row>

            <h4>F. PROGNOSIS</h4>
            <br />
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        v-model="forms.prognosis"
                        label="PROGNOSIS"
                        :items="['Baik', 'Sedang', 'Buruk *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col rows="2" cols="10">
                    v-model="forms.prognosisalasan"
                    <v-textarea label="Alasan" variant="outlined"></v-textarea>
                </v-col>
            </v-row>
            <h4>G. PERAWATAN ULANG</h4>
            <br />
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.reliningregio"
                        label="1. Relining : Regio :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.reliningregiotanggal"
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.reparasiregio"
                        label="2. Reparasi : Regio :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.reparasiregiotanggal"
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        v-model="forms.perawatanulangsebab"
                        label="Sebab :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.perawatanulanglainlain"
                        label="3. Lain-lain :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        v-model="forms.perawatanulanglainlaintanggal"
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        v-model="forms.perawatanulangketerangan"
                        label="Keterangan :"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>
        </v-container>

        <v-btn @click="setItems" color="blue" variant="outlined">{{
            $t("action.button.save")
        }}</v-btn>
    </v-form>
</template>
