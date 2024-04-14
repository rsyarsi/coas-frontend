<script setup>
 
import {useRouter} from "vue-router";

definePageMeta({
    layout: "dashboard",
    title: "emrperiodonsi",
});

const router = useRouter ();

const tab  = ref(null);
const tab2  = ref(null);
const tab3  = ref(null);
const ListComponent = ref(null);

const forms = reactive({
    id: "",     
    nama_mahasiswa: "",
    npm: "",
    tahun_klinik: "",
    opsi_imagemahasiswa: "",
    noregister:  router.currentRoute.value.query.noreg,
    noepisode: "",
    no_rekammedik: "",
    kasus_pasien: "",
    tanggal_pemeriksaan: "",
    pendidikan_pasien: "",
    nama_pasien: "",
    umur_pasien: "",
    jenis_kelamin_pasien: "",
    alamat: "",
    no_telephone_pasien: "",
    pemeriksa: "",
    operator1: "",
    operator2: "",
    operator3: "",
    operator4: "",

});

const setItems = async (target) =>
{
    const

    { token: tokenData, getUser, } = await useAuth (),
    userData = await getUser(tokenData),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (forms)) {
        formTarget[form] = forms[form];
    }

    await setItem ("/v1/emr/periodonti/create/medicaldentalhistory", "",
    formTarget,
    async (success) =>
    {
        if (success.code == 200){
            var statusRoute = router.currentRoute.value.query;
            statusRoute.id_emr = statusRoute.id_emr ?? success.data.id;

            if (userData.role == "mahasiswa") {

                await updateStatusToWrite (statusRoute);

                alert (success.message);
            }

        }else{
            alert(success.message);
        }
    },
    error => {
      alert(error.data.message)
    });
};
const getAnItem = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem,setItem } = useItem (tokenData);

    await getItem ("/v1/transaction/patient/detailbyNoregistrasi", 
    target,
    success =>
    {

      forms.tanggal_pemeriksaan=success.Visit_Date;
      forms.nama_pasien=success.PatientName;
      forms.no_rekammedik=success.NoMR;
      forms.alamat=success.Address;
      forms.no_telephone_pasien=success.MobilePhone;
      forms.noregister=success.NoRegistrasi
      forms.noepisode= success.NoEpisode;
      forms.jenis_kelamin_pasien = success.Gander;
      forms.konsuldari = success.NamaDokter;
      forms.umur_pasien = success.Usia;
      forms.pendidikan_pasien = success.Education;
      ListComponent.value.getItems('');
    },
    error => {});
};
const getByID = async (noreg) =>
{
    const

    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),
    { getItem,setItem } = useItem (tokenData),
    formTarget = {"nim" : userData.username,"noregister" : noreg};

    await setItem ("/v1/emr/periodonti/viewemrbyRegOperator", "",
    formTarget,
    success =>
    {
      if (success.code == 200){
        if (success.data.noepisode == null){
            forms.id = success.data.id
            forms.npm = userData.username
            forms.nama_mahasiswa = userData.name
            getDataCoas (userData.username)
            getAnItem ( noreg );
            return false;
        }
        for (const [key, value] of Object.entries(success.data)) {
              forms[`${key}`] = value
          }
          if (success.data.merokok_tahun_awal != null){
            forms.merokok_tahun_awal = useDateTime (success.data.merokok_tahun_awal).ins.format ('YYYY-MM-DD');
          }
          if (success.data.merokok_tahun_akhir != null){
          forms.merokok_tahun_akhir = useDateTime (success.data.merokok_tahun_akhir).ins.format ('YYYY-MM-DD');
          }
          if (success.data.p1_tanggal != null){
          forms.p1_tanggal = useDateTime (success.data.p1_tanggal).ins.format ('YYYY-MM-DD');
          }
          
        ListComponent.value.getItems('');
        
      }
    },
    error => {
      console.log(error)
    });
};

const getDataCoas = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem,setItem } = useItem (tokenData);

    await getItem ("/v1/masterdata/students/view/nim", target,
    success =>
    {
        
        forms.tahun_klinik = success.datein
    },
    error => {
      console.log(error)
    });
};

const image = reactive ({

  uploadfotoklinisokulasidarikiri: [],  
  uploadfotoklinisokulasidarikanan: [],  
  uploadfotoklinisokulasidarianterior: [],
  uploadfotoklinisokulasirahangatas: [],  
  uploadfotoklinisokulasirahangbawah: [],

  uploadfotoklinisbefore: [],
  uploadfotoklinisafter: [],  
  uploadfotoklinisrontgenpanoramik: [],

});
const setUploadFile = async (event, filetype, fileurl, fileid, deskripsi) =>
{
    const formData = new FormData ();

    formData.append ("id", fileid);
    formData.append ("idfotoklinisintraoral", deskripsi);
    formData.append ("select_file", event.target.files[0]);
    

    const

    { token: tokenData, } = await useAuth (),
    { data, error, } = await useCall (fileurl, "post", "multipart/form-data", formData, tokenData);
 
    if (filetype == "uploadfotoklinisokulasidarikiri") image.uploadfotoklinisokulasidarikiri.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisokulasidarikanan") image.uploadfotoklinisokulasidarikanan.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisokulasidarianterior") image.uploadfotoklinisokulasidarianterior.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisokulasirahangatas") image.uploadfotoklinisokulasirahangatas.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisokulasirahangbawah") image.uploadfotoklinisokulasirahangbawah.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisbefore") image.uploadfotoklinisbefore.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisafter") image.uploadfotoklinisafter.push(data.data.data.select_file); 
    if (filetype == "uploadfotoklinisrontgenpanoramik") image.uploadfotoklinisrontgenpanoramik.push(data.data.data.select_file); 
};

const COMPONENT_TITLE = 'TERAPI S.O.A.P';

const COMPONENT_HEADER =
[
    {
        key: "datesoap",
        title: "Tgl",
        sortable: false,
    },
    {
        key: "terapi_s",
        title: "Subject",
        sortable: false,
    },
    {
        key: "terapi_o",
        title: "Object",
        sortable: false,
    },
    {
        key: "terapi_a",
        title: "Assesement",
        sortable: false,
    },
    {
        key: "terapi_p",
        title: "Plan",
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

const COMPONENT_FORMS =
{
    terapi_s: "",
    terapi_o: "",
    terapi_a: "",
    terapi_p: "",
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/emr/periodonti/soap/showall",
    getItem: "/v1/emr/periodonti/soap/showbyid",
    createItem: "/v1/emr/periodonti/soap/create",
    updateItem: "/v1/emr/periodonti/soap/update",
    deleteItem: "/v1/emr/periodonti/soap/delete",
};


onMounted (async () =>
{
    await getByID (router.currentRoute.value.query.noreg);
    //await getAnItem ( router.currentRoute.value.query.noreg );
    image.uploadfotoklinisokulasidarikiri.push(forms.foto_klinis_oklusi_arah_kiri);
    image.uploadfotoklinisokulasidarikanan.push(forms.foto_klinis_oklusi_arah_kanan);
    image.uploadfotoklinisokulasidarianterior.push(forms.foto_klinis_oklusi_arah_anterior);
    image.uploadfotoklinisokulasirahangatas.push(forms.foto_klinis_oklusal_rahang_atas);
    image.uploadfotoklinisokulasirahangbawah.push(forms.foto_klinis_oklusal_rahang_bawah);
    image.uploadfotoklinisbefore.push(forms.foto_klinis_before);
    image.uploadfotoklinisafter.push(forms.foto_klinis_after);
    image.uploadfotoklinisrontgenpanoramik.push(forms.foto_ronsen_panoramik);
    
});
</script>

<template v-slot:form="{ forms }">
    <v-form >
        <v-container>
            <v-card>
            <v-tabs
            v-model="tab"
            bg-color="indigo-darken-2"
            align-tabs="center"
            >
            <v-tab :value="1">PEMERIKSAAN PERIODONTOLOGI</v-tab>
            <v-tab :value="2">PEMERIKSAAN PLAK INDEKS</v-tab>
            <v-tab :value="3">FOTO KLINIS INTRA ORAL</v-tab>
            <v-tab :value="4">FOTO RONSEN PANORAMIK/PERIAPIKAL</v-tab>      
            <v-tab :value="5">TERAPI</v-tab>

            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :value="1" >
                <v-container fluid>
                    <v-tabs
                        v-model="tab2"
                        color="deep-purple-accent-4"
                        align-tabs="center"
                        >
                        <v-tab :value="1">Data Pasien & Assesment</v-tab>
                        <v-tab :value="2">STATUS PRAESENS KUNJUNGAN</v-tab>
                        <v-tab :value="3">STATUS LOKALIS</v-tab>
                        <v-tab :value="4">Assesment Lanjutan</v-tab>       
                        </v-tabs>
                        <v-window v-model="tab2">
                            <v-window-item :value="1" >
                                <v-container fluid>
                                    <br /><br />
                                            <h4>
                                            DATA MAHASISWA
                                            </h4>
                                            <hr />
                                            <br />
                                            <v-row>
                                                <v-col cols="12" md="2">
                                                    <h4><br />Nama Mahasiswa</h4>
                                                </v-col>
                                                <v-col cols="12" md="1">
                                                    <h4><br />:</h4>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field
                                                        v-model="forms.id"
                                                        hide-details
                                                        required
                                                        type="hidden"
                                                        variant="filled"></v-text-field>
                                                    <v-text-field
                                                        v-model="forms.nama_mahasiswa"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="2">
                                                    <h4><br />NPM</h4>
                                                </v-col>
                                                <v-col cols="12" md="1">
                                                    <h4><br />:</h4>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field
                                                        v-model="forms.npm"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="2">
                                                    <h4><br />Tahun Masuk Klinik</h4>
                                                </v-col>
                                                <v-col cols="12" md="1">
                                                    <h4><br />:</h4>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-text-field
                                                        v-model="forms.tahun_klinik"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <br /><br />
                                            <h4>
                                                I. PATIENT IDENTITY / <small><i>IDENTITAS PASIEN</i></small>
                                            </h4>
                                            <hr />
                                            <br />
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.noregister"
                                                        label="NO. REGISTER :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.noepisode"
                                                        label="NO. EPISODE :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly
                                                        ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.no_rekammedik"
                                                        label="NO. REKAM MEDIK :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.nama_pasien"
                                                        label="NAMA :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.umur_pasien"
                                                        label="UMUR :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.jenis_kelamin_pasien"
                                                        label="JENIS KELAMIN :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.alamat"
                                                        label="ALAMAT :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.no_telephone_pasien"
                                                        label="NO. TELEPHONE :"
                                                        hide-details
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.pemeriksa"
                                                        label="PEMERIKSA :"
                                                        hide-details
                                                        required
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.operator1"
                                                        label="OPERATOR 1 :"
                                                        hide-details
                                                        required
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.operator2"
                                                        label="OPERATOR 2 :"
                                                        hide-details
                                                        required
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="forms.operator3"
                                                        label="OPERATOR 3 :"
                                                        hide-details
                                                        required
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <br />
                                            <br />

                                            <h4>
                                                1. Ditulis lengkap dan jelas menggunakan bolpen bukan pensil,
                                                tidak boleh di tip-ex
                                                <br />2. Setiap rencana perawatan wajib diketahui dan ditanda
                                                tangani oleh dosen pembimbing klinik <br />3. Apabila lembar
                                                pemeriksaan ini hilang, wajib mengulang semua requirement yang
                                                telah dikerjakan <br />4. Lembar pemeriksaan apabila difotokopi
                                                karena dikerjakan bersama, harus diverifikasi oleh dosen
                                                pengawas klinik sesuai dengan status aslinya <br />5.
                                                Dikumpulkan saat evaluasi selesai, bersama dengan buku nilai
                                                <br />*(coret salah satu)
                                            </h4>

                                            <br />
                                            <hr />
                                            <br />

                                            

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.nama_pasien"
                                                        label="Nama :"
                                                        required
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.tanggal_pemeriksaan"
                                                        label="Tanggal :"
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.no_rekammedik"
                                                        label="No Rekam Medis :"
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                            </v-row>
                                            

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.alamat"
                                                        label="Alamat :"
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.umur_pasien"
                                                        label="Umur :"
                                                        variant="filled"
                                                        readonly></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                        v-model="forms.jenis_kelamin_pasien"
                                                        :items="['L', 'P']"
                                                        variant="filled"
                                                        readonly></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-text-field
                                                        v-model="forms.konsuldari"
                                                        label="Konsul dari :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-text-field
                                                        v-model="forms.keluhanutama"
                                                        label="Keluhan utama :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="12">
                                                    <v-textarea
                                                        v-model="forms.anamnesis"
                                                        label="Anamnesis :"
                                                        variant="filled"></v-textarea>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                        v-model="forms.gusi_mudah_berdarah"
                                                        label="Gusi mudah berdarah saat sikat gigi :"
                                                        :items="['Yes', 'No', 'Lain - Lain']"
                                                        variant="filled"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.gusi_mudah_berdarah_lainlain"
                                                        label="Ket :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                        v-model="forms.penyakit_sistemik"
                                                        label="Penyakit Sistemik :"
                                                        :items="['Ada', 'Tidak']"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.penyakit_sistemik_bilaada"
                                                        label="Sebutkan bila ada :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.penyakit_sistemik_obat"
                                                        label="Obat yang diminum :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                        v-model="forms.diabetes_melitus"
                                                        label="Diabetes Melitus :"
                                                        :items="['Ada', 'Tidak']"
                                                        variant="filled"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="forms.diabetes_melituskadargula"
                                                        label="Bila Ada kadar Gula Darah :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                        v-model="forms.merokok"
                                                        label="Merokok :"
                                                        :items="['Ya, Aktif', 'Pernah', 'Tidak Pernah']"
                                                        variant="filled"></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        placeholder="ketik disini"
                                                        v-model="forms.merokok_perhari"
                                                        label="Bila ya/pernah merokok, berapa batang : ___ / hari"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        placeholder="ketik disini"
                                                        v-model="forms.merokok_tahun_awal"
                                                        type="date"
                                                        label="Sejak Tahun :"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        placeholder="ketik disini"
                                                        v-model="forms.merokok_tahun_akhir"
                                                        label="Hingga Tahun :"
                                                        type="date"
                                                        variant="filled"></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <v-select
                                                        v-model="forms.gigi_pernah_tanggal_dalam_keadaan_baik"
                                                        label="Apakah ada gigi yang pernah tanggal dalam keadaan gigi masih baik (tidak berlubang) :"
                                                        :items="['Ya', 'Tidak']"
                                                        variant="filled"></v-select>
                                                </v-col>
                                            </v-row>
                                            <br />

                                </v-container>
                            </v-window-item>
                        </v-window>
                        <v-window v-model="tab2">
                            <v-window-item :value="2" >
                                <v-container fluid>
                                    <h4>STATUS PRAESENS KUNJUNGAN 1</h4>
            <hr />
            <br />
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.keadaan_umum"
                        label="Keadaan Umum :"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.tekanan_darah"
                        label="Tekanan Darah : ______ mm/Hg"
                        variant="filled"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.extra_oral"
                        label="Extra – Oral  :"
                        variant="filled"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.intra_oral"
                        label="Intra – Oral :"
                        variant="filled"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.oral_hygiene_bop"
                        label="Oral – Hygiene BOP :"
                        variant="filled"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.oral_hygiene_ci"
                        label="Oral – Hygiene PI :"
                        variant="filled"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.oral_hygiene_pi"
                        label="Oral – Hygiene CI :"
                        variant="filled"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        placeholder="ketik disini"
                        v-model="forms.oral_hygiene_ohis"
                        label="Oral – Hygiene OHIS :"
                        variant="filled"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="12">
                    <v-select
                        v-model="forms.kesimpulan_ohis"
                        label="Kesimpulan OHIS :"
                        :items="['Baik', 'Sedang', 'Buruk']"
                        variant="filled"></v-select>
                </v-col>
            </v-row>
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-left" width="70px"></th>
                        <th colspan="1" class="text-left" width="200px">
                            Keadaan Gingiva (isi bila tdp hiperemi, oedem, bop)
                        </th>
                        <th colspan="1" class="text-left" width="200px">
                            Karang Gigi (isi dengan +, ++, +++)
                        </th>
                        <th colspan="1" class="text-left" width="200px">
                            Oklusi
                        </th>
                        <th colspan="1" class="text-left" width="200px">
                            Artikulasi
                        </th>
                        <th colspan="1" class="text-left" width="200px">
                            Abrasi/ Atrisi/ Abfraksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">Ra. Kn</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rakn_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rakn_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Ra. m</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.ram_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.ram_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.ram_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.ram_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.ram_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Ra. Kr</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rakr_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rakr_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Rb. Kn</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbkn_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbkn_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Rb. m</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbm_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbm_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbm_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbm_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbm_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">Rb. Kr</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbkr_keaadan_gingiva
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_karang_gigi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_oklusi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_artikulasi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.rbkr_abrasi_atrisi_abfraksi
                                "></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <br />

                                </v-container>
                            </v-window-item>
                        </v-window>
                        <v-window v-model="tab2">
                            <v-window-item :value="3" >
                                <v-container fluid>
                                    <h4>STATUS LOKALIS</h4>
            <hr />
            <br />
            <h4>KETERANGAN</h4>
            <h5>
                V: Vital &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp G: Goyang
            </h5>
            <h5>
                Pm: Poket mesial &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Pb:
                Poket bukal
            </h5>
            <h5>
                Pd: Poket distal &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                Pp: Poket palata
            </h5>
            <h5>
                O: Oklusi &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                &nbsp &nbsp &nbsp &nbsp &nbsp R: Resesi
            </h5>
            <h5>LA: Hilang perlekatan &nbsp &nbsp &nbsp Mp: Malposisi</h5>
            <h5>Bleedingon Probing +/- &nbsp &nbsp Tk: Titik kontak</h5>
            <h5>Fi: Impaksi makanan &nbsp &nbsp &nbsp &nbsp K: Karang gigi</h5>
            <h5>T: Trauma</h5>

            <br />
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th colspan="16" class="text-center" width="1px">
                            <h2>RAHANG ATAS</h2>
                        </th>
                    </tr>
                    <tr>
                        <th class="text-left" width="1px"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left" width="100px">V</th>
                        <th colspan="1" class="text-left" width="100px">G</th>
                        <th colspan="1" class="text-left" width="100px">Pm</th>
                        <th colspan="1" class="text-left" width="100px">Pb</th>
                        <th colspan="1" class="text-left" width="100px">Pd</th>
                        <th colspan="1" class="text-left" width="100px">Pp</th>
                        <th colspan="1" class="text-left" width="100px">O</th>
                        <th colspan="1" class="text-left" width="100px">
                            R. | LA
                        </th>
                        <th colspan="1" class="text-left" width="100px">Mp</th>
                        <th colspan="1" class="text-left" width="100px">BoP</th>
                        <th colspan="1" class="text-left" width="100px">Tk</th>
                        <th colspan="1" class="text-left" width="100px">Fi</th>
                        <th colspan="1" class="text-left" width="100px">K</th>
                        <th colspan="1" class="text-left" width="100px">T</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="19" class="text-left" width="1">
                            <h2>
                                K A N A N &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                &nbsp &nbsp &nbsp &nbsp K I R I
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">8</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_8_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">7</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_7_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">6</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_6_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">5</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_5_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">4</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_4_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">3</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_3_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">2</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_2_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">1</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakn_1_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left">1</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_1_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">2</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_2_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">3</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_3_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">4</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_4_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">5</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_5_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">6</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_6_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">7</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_7_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">8</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rakr_8_t"></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <br />
            <br />
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th colspan="16" class="text-center" width="1px">
                            <h2>RAHANG BAWAH</h2>
                        </th>
                    </tr>
                    <tr>
                        <th class="text-left" width="1px"></th>
                        <th colspan="1" class="text-left"></th>
                        <th colspan="1" class="text-left" width="100px">V</th>
                        <th colspan="1" class="text-left" width="100px">G</th>
                        <th colspan="1" class="text-left" width="100px">Pm</th>
                        <th colspan="1" class="text-left" width="100px">Pb</th>
                        <th colspan="1" class="text-left" width="100px">Pd</th>
                        <th colspan="1" class="text-left" width="100px">Pp</th>
                        <th colspan="1" class="text-left" width="100px">O</th>
                        <th colspan="1" class="text-left" width="100px">
                            R. | LA
                        </th>
                        <th colspan="1" class="text-left" width="100px">Mp</th>
                        <th colspan="1" class="text-left" width="100px">BoP</th>
                        <th colspan="1" class="text-left" width="100px">Tk</th>
                        <th colspan="1" class="text-left" width="100px">Fi</th>
                        <th colspan="1" class="text-left" width="100px">K</th>
                        <th colspan="1" class="text-left" width="100px">T</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="19" class="text-left" width="1">
                            <h2>
                                K A N A N &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                &nbsp &nbsp &nbsp &nbsp K I R I
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">8</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_8_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">7</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_7_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">6</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_6_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">5</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_5_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">4</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_4_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">3</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_3_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">2</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_2_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">1</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkn_1_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                        <td class="text-left"></td>
                    </tr>
                    <tr>
                        <td class="text-left">1</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_1_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">2</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_2_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">3</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_3_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">4</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_4_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">5</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_5_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">6</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_6_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">7</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_7_t"></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">8</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_v"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_g"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_pm"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_pb"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_pd"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_pp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_o"></v-text-field>
                        </td>
                        <td class="text-left">X | X</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_mp"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_bop"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_tk"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_fi"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_k"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.rbkr_8_t"></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br /> 

                                </v-container>
                            </v-window-item>
                        </v-window>
                        <v-window v-model="tab2">
                            <v-window-item :value="4" >
                                <v-container fluid>
                                    <v-row>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.diagnosis_klinik"
                                                    label="DIAGNOSIS KLINIK :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.gambaran_radiografis"
                                                    label="Gambaran Radiografis :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.indikasi"
                                                    label="INDIKASI :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.terapi"
                                                    label="TERAPI :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.keterangan"
                                                    label="KETERANGAN :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.prognosis_umum"
                                                    label="PROGNOSIS UMUM :"></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-textarea
                                                    v-model="forms.prognosis_lokal"
                                                    label="PROGNOSIS LOKAL :"></v-textarea>
                                            </v-col>
                                        </v-row>
                                        <hr />

                                        <br />
                                        <br />
                                        <br />

                                </v-container>
                            </v-window-item>
                        </v-window>
                </v-container>
                </v-window-item>
            </v-window>
            <v-window v-model="tab">
                <v-window-item :value="2" >
                <v-container fluid>
                    <h4 align="center">
                LEMBAR PEMERIKSAAN PLAK INDEKS PRODI KEDOKTERAN GIGI YARSI
            </h4>
            <hr />
            <br />
            <v-row>
                <v-col cols="12" md="2">
                    <h4><br />Nama Pasien</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.nama_pasien"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <h4><br />Jenis Kelamin</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.jenis_kelamin_pasien"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <h4><br />Alamat</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.alamat"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <h4><br />Umur</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.umur_pasien"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                    <h4><br />No. Rekam Medis</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.no_rekammedik"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <h4><br />PENDIDIKAN</h4>
                </v-col>
                <v-col cols="12" md="1">
                    <h4><br />:</h4>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field
                        background="transparent"
                        v-model="forms.pendidikan_pasien"
                        hide-details
                        readonly
                        required></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
            <br />
            <h4>Keterangan :</h4>
            <br />
            <v-row>
                <v-col cols="12" md="4"
                    ><h5>Indeks Plak, tepi gingiva</h5></v-col
                >
                <v-col cols="12" md="4"><h5>Indeks Kalkulus</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>BOP (Bleeding on Probing )</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>(Sillness & Loe 1964)</h5></v-col>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>
                        Papilla Bleeding Index (Saxer & Mühlemann 1975)
                    </h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>0 = Tidak ada plak</h5></v-col>
                <v-col cols="12" md="4"><h5>0 = Tidak ada kalkulus</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>0 = Tidak ada perdarahan</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"
                    ><h5>
                        1 = Terdapat plak pada probe (tidak terlihat mata)
                    </h5></v-col
                >
                <v-col cols="12" md="4"
                    ><h5>1 = Kalkulus Supragingiva</h5></v-col
                >
                <v-col cols="12" md="4"
                    ><h5>1= Perdarahan berupa titik</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>2 = Plak terlihat mata</h5></v-col>
                <v-col cols="12" md="4"><h5>2 = Kalkulus Subgingiva</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>2 = Perdarahan berupa garis</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>3 = Jumlah plak banyak</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>3 = Kalkulus supragingiva dan subgingiva</h5></v-col
                >
                <v-col cols="12" md="4"
                    ><h5>3 = Perdarahan berupa segitiga</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"><h5>4 = Perdarahan menyebar</h5></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12"
                    ><h5>
                        Probing dapat menyababkan bleeding pada gingiva
                        terinflamasi. BOP terjadi 30-60 detik setelah probing.
                        Tidak adanya BOP artinya periodontal stabil pada tempat
                        tersebut.
                    </h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>OHIS: Indeks Plak + Indeks Kalkulus</h5></v-col
                >
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>EL = Elemen</h5></v-col>
                <v-col cols="12" md="4"><h5>Skor =</h5></v-col>
                <v-col cols="12" md="4"><h5>0,0 - 1,2 : Baik</h5></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>B = Bukal</h5></v-col>
                <v-col cols="12" md="4"
                    ><h5>
                        Jumlah nilai indeks/Jumlah permukaan gigi yang diperiksa
                    </h5></v-col
                >
                <v-col cols="12" md="4"><h5>1,3 - 3,0 : Sedang</h5></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4"><h5>L = Lingua</h5></v-col>
                <v-col cols="12" md="4"><h5>-</h5></v-col>
                <v-col cols="12" md="4"><h5>3,1 - 6,0 : Buruk</h5></v-col>
            </v-row>
            <br />
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th colspan="8" class="text-left">Pemeriksaan 1 :</th>
                        <!-- <th colspan="6" class="text-left">
                            <v-text-field v-model="forms.p1_pemeriksaan"></v-text-field>
                        </th> -->
                        <th colspan="1" class="text-left"></th>

                        <th colspan="2" class="text-left">Tanggal :</th>
                        <th colspan="6" class="text-left">
                            <br />
                            <v-text-field v-model="forms.p1_tanggal" type="date"></v-text-field>
                        </th>
                        <th colspan="1" class="text-left"></th>
                    </tr>
                    <tr>
                        <th colspan="6" class="text-left">INDEKS PLAK</th>
                        <th colspan="6" class="text-left">B O P</th>
                        <th colspan="6" class="text-left">INDEKS KALKULUS</th>
                    </tr>
                    <tr>
                        <th colspan="3" class="text-left">RA</th>
                        <th colspan="3" class="text-left">RB</th>
                        <th colspan="3" class="text-left">RA</th>
                        <th colspan="3" class="text-left">RB</th>
                        <th colspan="3" class="text-left">RA</th>
                        <th colspan="3" class="text-left">RB</th>
                    </tr>
                    <tr>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                        <th colspan="1" class="text-left">EL</th>
                        <th colspan="1" class="text-left">B</th>
                        <th colspan="1" class="text-left">L</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left">16</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el16_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el16_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el36_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el36_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">16</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el16_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el16_l"></v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el36_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el36_l"></v-text-field>
                        </td>
                        <td class="text-left">16</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_ra_el16_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_ra_el16_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el36_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el36_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">12</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el12_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el12_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el34_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el34_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">12</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el12_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el12_l"></v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el34_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el34_l"></v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el34_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el34_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">11</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el11_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el11_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el32_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el32_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">11</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el11_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el11_l"></v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el32_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el32_l"></v-text-field>
                        </td>
                        <td class="text-left">-</td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el32_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el32_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">21</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el21_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el21_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el31_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el31_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">21</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el21_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el21_l"></v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el31_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el31_l"></v-text-field>
                        </td>
                        <td class="text-left">-</td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el31_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el31_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">22</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el22_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el22_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">41</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el41_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el41_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">22</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el22_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el22_l"></v-text-field>
                        </td>
                        <td class="text-left">41</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el41_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el41_l"></v-text-field>
                        </td>
                        <td class="text-left">-</td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">41</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el41_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el41_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">24</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el24_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el24_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">42</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el42_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el42_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">24</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el24_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el24_l"></v-text-field>
                        </td>
                        <td class="text-left">42</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el42_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el42_l"></v-text-field>
                        </td>
                        <td class="text-left">-</td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">42</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el42_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el42_l
                                "></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left">26</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el26_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_ra_el26_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">46</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el46_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indeksplak_rb_el46_l
                                "></v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el26_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_ra_el26_l"></v-text-field>
                        </td>
                        <td class="text-left">46</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el46_b"></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="forms.p1_bop_rb_el46_l"></v-text-field>
                        </td>
                        <td class="text-left">-</td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">
                            <v-text-field readonly></v-text-field>
                        </td>
                        <td class="text-left">46</td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el46_b
                                "></v-text-field>
                        </td>
                        <td class="text-left">
                            <br /><v-text-field
                                v-model="
                                    forms.p1_indekskalkulus_rb_el46_l
                                "></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br /><br /><br />
                </v-container>
                </v-window-item>
            </v-window>
            <v-window v-model="tab">
                <v-window-item :value="3" >
                <v-container fluid>
                    <v-tabs
                                v-model="tab3"
                                color="deep-purple-accent-4"
                                align-tabs="center"
                                >
                                <v-tab :value="1">Okulasi dari arah Kiri</v-tab>
                                <v-tab :value="2">Okulasi dari arah Kanan</v-tab>
                                <v-tab :value="3">Okulasi dari arah Anterior</v-tab>     
                                <v-tab :value="4">Okulasi dari rahang atas</v-tab>
                                <v-tab :value="5">Okulasi dari rahang bawah</v-tab>
                                <v-tab :value="6">Before</v-tab>
                                <v-tab :value="7">After</v-tab>

                                </v-tabs>
                                <v-window v-model="tab3">
                                <v-window-item
                                :value="1"
                                >
                                    <v-container fluid>
                                    <v-row  :value="1">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisokulasidarikiri" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisokulasidarikiri', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '1')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_kiri" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="2"
                                >
                                    <v-container fluid>
                                    <v-row  :value="2">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisokulasidarikanan" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 2"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisokulasidarikanan', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '2')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_kanan" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="3"
                                >
                                    <v-container fluid>
                                    <v-row  :value="3">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisokulasidarianterior" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 3"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisokulasidarianterior', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '3')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_anterior" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="4"
                                >
                                    <v-container fluid>
                                    <v-row  :value="4">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisokulasirahangatas" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 4"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisokulasirahangatas', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '4')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusal_rahang_atas" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="5"
                                >
                                    <v-container fluid>
                                    <v-row  :value="5">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisokulasirahangbawah" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 5"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisokulasirahangbawah', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '5')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusal_rahang_bawah" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="6"
                                >
                                    <v-container fluid>
                                    <v-row  :value="6">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisbefore" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 6"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisbefore', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '6')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_before" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                <v-window-item
                                :value="7"
                                >
                                    <v-container fluid>
                                    <v-row  :value="7">

                                                        <v-col v-for="(item, index) in image.uploadfotoklinisafter" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto 7"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisafter', '/v1/emr/periodonti/fotoklinisintraoral/upload', forms.id, '7')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_after" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                                                    
                                    </v-row>
                                    </v-container>
                                </v-window-item>
                                </v-window>
                </v-container>
                </v-window-item>
            </v-window>

            <v-window v-model="tab">
                <v-window-item :value="4" >
                    <v-container fluid>
                        <v-col v-for="(item, index) in image.uploadfotoklinisrontgenpanoramik" :key="index"  cols="12" md="12">
                                                            <v-dialog width="500">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn v-bind="props" text="Upload foto"> </v-btn>
                                                        </template>

                                                        <template v-slot:default="{ isActive }">
                                                            <v-card title="Upload File">

                                                            <v-file-input
                                                            @change="setUploadFile ($event, 'uploadfotoklinisrontgenpanoramik', '/v1/emr/periodonti/uploadfotopanoramik', forms.id, '-')"
                                                            show-size
                                                            counter
                                                            label="File input"
                                                            ></v-file-input>

                                                            <v-card-actions >
                                                                <v-spacer></v-spacer>

                                                                <v-btn
                                                                text="Close Dialog"
                                                                @click="isActive.value = false"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                        </v-dialog> 
                                                            
                                                                    <v-img
                                                                        :src="item"
                                                                        :lazy="item"
                                                                        aspect-ratio="1"
                                                                    ></v-img>
                                                        
                                                            <v-text-field v-model="forms.foto_ronsen_panoramik" label="File URL" readonly ></v-text-field>
                                                        </v-col>
                    </v-container>
                </v-window-item>
            </v-window>
            <v-window v-model="tab">
                <v-window-item :value="5" >
                    <v-container fluid>
                      <!--add table-->
                        <EmrComponent ref="ListComponent" :title="COMPONENT_TITLE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS" :idemr="forms.id">
                          <template v-slot:form="{ forms, }">
                              <v-form>
                                  <v-textarea v-model="forms.terapi_s" label="Subject"></v-textarea>
                                  <v-textarea v-model="forms.terapi_o" label="Object"></v-textarea>
                                  <v-textarea v-model="forms.terapi_a" label="Assesment"></v-textarea>
                                  <v-textarea v-model="forms.terapi_p" label="Plan"></v-textarea>
                              </v-form>
                          </template>
                          <template v-slot:item="{ item, }">
                              <v-form color="success">
                                  <v-container>
                                      <v-row>
                                          <v-row>
                                              <v-col>
                                                  <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id" readonly></v-text-field></v-row>
                                                  <v-row><v-textarea label="Subject" variant="underlined" :model-value="item.terapi_s" readonly></v-textarea></v-row>
                                                  <v-row><v-textarea label="Object" variant="underlined" :model-value="item.terapi_o" readonly></v-textarea></v-row>
                                                  <v-row><v-textarea label="Assesment" variant="underlined" :model-value="item.terapi_a" readonly></v-textarea></v-row>
                                                  <v-row><v-textarea label="Plan" variant="underlined" :model-value="item.terapi_p" readonly></v-textarea></v-row>
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
