<script setup>
import {useRouter} from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "emrortodonsi",
});
  
const router = useRouter ();

const USER = ref (null);

const tab  = ref(null);
const showSnackbar = ref(false)

const sb = reactive (
{
    snackbar: false,
    text: "",
    color:"blue-grey",
    rounded:"pill"
});

const forms = reactive (
{
    noregister:router.currentRoute.value.query.noreg,
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

    await setItem ("/v1/emr/ortodonsi/create/medicalwaktuperawatan", "",
    formTarget,
    async (success) =>
    {
        if (success.code == 200){
            sb.snackbar = true
            sb.text = success.message
            sb.color = "green"

            var statusRoute = router.currentRoute.value.query;

            if (userData.role == "mahasiswa") {

                await updateStatusToWrite (statusRoute);

                alert (success.message);
            }

        }else{
            sb.snackbar = true
            sb.text = success.message
            sb.color = "red"
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
      forms.tanggal=success.Visit_Date;
      forms.namapasien=success.PatientName;
      forms.jeniskelamin=success.Gander;
      forms.alamat=success.Address;
      forms.telepon=success.MobilePhone;
      forms.noregister=success.NoRegistrasi
      forms.noepisode= success.NoEpisode;
      forms.pembimbing= success.NamaDokter;
      forms.umur= success.Usia;
      forms.pekerjaan= success.pekerjaan;
      forms.suku = success.Etnis;
    },
    error => {});
};

const getByID = async (noreg) =>
{
    const

    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),
    { getItem,setItem } = useItem (tokenData),
    formTarget = {nim: router.currentRoute.value.query.nim ?? userData.username,"noregister" : noreg};

    await setItem ("/v1/emr/ortodonsi/viewemrbyRegOperator", "",
    formTarget,
    success =>
    {
      if (success.code == 200){
        if (success.data.noepisode == null){
            forms.id = success.data.id
            forms.nim = userData.username
            forms.operator = userData.name
            getAnItem ( noreg );
            return false;
        }
          for (const [key, value] of Object.entries(success.data)) {
              forms[`${key}`] = value
          }
      }
      
    },
    error => {
      console.log(error)
    });
};

const setUploadFile = async (event, filetype, fileurl, fileid, deskripsi) =>
{
    const formData = new FormData ();

    formData.append ("id", fileid);
    formData.append (deskripsi, deskripsi);
    formData.append ("select_file", event.target.files[0]);

    const

    { token: tokenData, } = await useAuth (),
    { data, error, } = await useCall (fileurl, "post", "multipart/form-data", formData, tokenData);
    
    forms[`${filetype}`] = data.data.data.select_file;
};

onMounted (async () =>
{
    const

    { token: tokenData, getUser, } = await useAuth (), userData = await getUser (tokenData);

    USER.value = userData;

    await getByID (router.currentRoute.value.query.noreg);
});

</script>


<template v-slot:form="{ forms, }">

      <v-tabs
            v-model="tab"
            bg-color="red-darken-4"
            align-tabs="left"
            >
            <v-tab :value="1">IDENTITAS & WAKTU PERAWATAN</v-tab>
            <v-tab :value="2">PEMERIKSAAN KLINIS</v-tab>
            <v-tab :value="3">ANALISIS FOTO MUKA & MODEL STUDI</v-tab>
            <v-tab :value="4">ANALISIS RADIOGRAFI & DIAGNOSIS</v-tab>      
            <v-tab :value="5">ANALISIS ETIOLOGI MALOKLUSI & PROSEDUR PERAWATAN</v-tab>
            <v-tab :value="6">GAMBAR/DESAIN ALAT & PROGNOSIS</v-tab>

            </v-tabs>

      <v-container>

        
        
        <v-window v-model="tab">
                <v-window-item :value="1" >
                <v-container fluid>
        <h4>1. IDENTITAS</h4>
        <hr>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.id"
              label="ID"
              required
              type="hidden"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.operator"
              label="Operator"
              required
              hide-details
              readonly
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.nim"
              label="NIM"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
          
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pembimbing"
              label="Pembimbing"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.tanggal"
              label="Tanggal"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.namapasien"
              label="Nama Pasien"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.suku"
              label="Suku"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.umur"
              label="Umur"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.jeniskelamin"
              label="Jenis kelamin"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.alamat"
              label="Alamat"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.telepon"
              label="Telepon"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pekerjaan"
              label="Pekerjaan"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.rujukandari"
              label="Rujukan dari"
              hide-details
              required
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.namaayah"
              label="Nama ayah"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="forms.sukuayah"
              label="Suku"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="forms.umurayah"
              label="Umur"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.namaibu"
              label="Nama ibu"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="forms.sukuibu"
              label="Suku"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="forms.umuribu"
              label="Umur"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pekerjaanorangtua"
              label="Pekerjaan orang tua"
              hide-details
              required
            ></v-text-field>
          </v-col>

        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.alamatorangtua"
              label="Alamat orang tua"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <br/>
        <h4>2. WAKTU PERAWATAN</h4>
        <hr>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.noregister"
              label="No Registrasi"
              required
              hide-details
              readonly
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.noepisode"
              label="No Episode"
              hide-details
              required
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pendaftaran"
              label="Pendaftaran"
              required
              hide-details
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pencetakan"
              label="Pencetakan"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.pemasanganalat"
              label="Pemasangan alat"
              required
              hide-details
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="forms.waktuperawatan_retainer"
              :counter="10"
              label="Retainer"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
                </v-container>
                </v-window-item>

                <v-window-item :value="2" >
                <v-container fluid>
        <br/>
        <h4>3. PEMERIKSAAN KLINIS</h4>
        <hr>
        <br/>
        <h4>A. Pemeriksaan subyektif</h4>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
          <v-textarea v-model="forms.keluhanutama" label="Keluhan utama"></v-textarea>
          </v-col>
        </v-row>
        
        <h4>Riwayat kesehatan :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.kelainanendoktrin" label="Kelainan endoktrin"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.penyakitpadamasaanak" label="Penyakit pada masa anak"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.alergi" label="Alergi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.kelainansaluranpernapasan" label="Kelainan saluran pernapasan"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.tindakanoperasi" label="Tindakan operasi"></v-text-field>
          </v-col>
        </v-row>
        
        <h4>Riwayat pertumbhuan dan perkembangan gigi-geligi :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.gigidesidui" label="Gigi desidui"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.gigibercampur" label="Gigi bercampur"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.gigipermanen" label="Gigi permanen"></v-text-field>
          </v-col>
        </v-row>

        <h4>Kebiasaan jelek yang berkaitan dengan keluhan pasien :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.durasi" label="Durasi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.frekuensi" label="Frekuensi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.intensitas" label="Intensitas"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.kebiasaanjelekketerangan" label="Keterangan"></v-text-field>
          </v-col>
        </v-row>

        <v-select
        v-model="forms.riwayatkeluarga" label="Riwayat keluarga yang berkaitan dengan keluhan pasien"
        :items="['ada', 'tidak ada']"
        ></v-select>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.ayah" label="Ayah"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.ibu" label="Ibu"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.saudara" label="Saudara"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="forms.riwayatkeluargaketerangan" label="Keterangan"></v-text-field>
          </v-col>
        </v-row>
        
        <h4>B. Pemeriksaan obyektif</h4>
        <hr>
        <h4>1. UMUM</h4>
        <v-select
        v-model="forms.jasmani" label="Jasmani"
        :items="['baik', 'sedang','jelek']"
        ></v-select>
        <v-select
        v-model="forms.mental" label="Mental"
        :items="['baik', 'sedang','jelek']"
        ></v-select>

        <v-row>
        <h4>Status gizi</h4>
        </v-row>

        <v-row>
        <v-col cols="2" md="2">
            <v-text-field placeholder="m" v-model="forms.tinggibadan" label="Tinggi badan (TB)"></v-text-field>
        </v-col>
        <v-col cols="2" md="2">
            <v-text-field placeholder="kg" v-model="forms.beratbadan" label="Berat badan (BB)"></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
            <v-text-field v-model="forms.indeksmassatubuh" label="Indeks massa tubuh"></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
            <v-select
        v-model="forms.statusgizi" label="Status gizi"
        :items="['kurang', 'normal','lebih']"
        ></v-select>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" md="12">
            <v-text-field v-model="forms.kategori" label="Kategori"></v-text-field>
        </v-col>
        </v-row>

        <h4>2. LOKAL</h4>
        <h4>a. Ekstra oral</h4>
        <h4>Kepala</h4>
        <v-row>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" v-model="forms.lebarkepala" label="Lebar kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" v-model="forms.panjangkepala" label="Panjang kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field v-model="forms.indekskepala" label="Indeks kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field v-model="forms.bentukkepala" label="Bentuk kepala"></v-text-field>
        </v-col>
        </v-row>

        <h4>Muka</h4>
        <v-row>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" v-model="forms.panjangmuka" label="Panjang muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" v-model="forms.lebarmuka" label="Lebar muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field v-model="forms.indeksmuka" label="Indeks muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field v-model="forms.bentukmuka" label="Bentuk muka"></v-text-field>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="6" md="6">
        <v-select
        v-model="forms.bentuk" label="Bentuk"
        :items="['Simetris', 'asimetris']"
        ></v-select>
        </v-col>
        <v-col cols="6" md="6">
        <v-select
        v-model="forms.profilmuka" label="Profil muka"
        :items="['lurus', 'cekung','cembung']"
        ></v-select>
        </v-col>
        </v-row>

        <h4>Fungsional</h4>
            <v-row>
            <v-col cols="6" md="6">
            <v-select
            v-model="forms.senditemporomandibulat_tmj" label="Sendi temporomandibula (TMJ)"
            :items="['normal', 'abnormal']"
            ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.tmj_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-select
                v-model="forms.bibirposisiistirahat" label="Bibir posisi istirahat"
                :items="['normal', 'tertutup']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.tunusototmastikasi" label="Tunus otot mastikasi"
                :items="['normal', 'hipertonus','hipotonus']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.tunusototmastikasi_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.tunusototbibir" label="Tunus otot bibir"
                :items="['normal', 'hipertonus','hipotonus']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.tunusototbibir_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.freewayspace" label="Free way space"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.pathofclosure" label="Path of closure"></v-text-field>
            </v-col>
        </v-row>
        
        <h4><label>b. Intra oral</label></h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.higienemulutohi" label="Higiene mulut: OHI"
                :items="['baik', 'sedang','jelek']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.polaatrisi" label="Pola atrisi"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.regio" label="Regio"></v-text-field>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.lingua" label="Lingua"
                :items="['besar', 'sedang','kecil']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.intraoral_lainlain" label="Lain-lain"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.palatumvertikal" label="Palatum Vertikal"
                :items="['tinggi', 'sedang','rendah']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.palatumlateral" label="Palatum Lateral"
                :items="['sempit', 'sedang','lebar']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.gingiva" label="Gingiva"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.gingiva_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.mukosa" label="Mukosa"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field v-model="forms.mukosa_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.frenlabiisuperior" label="Fren. labii superior"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.frenlabiiinferior" label="Fren. labii inferior"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.frenlingualis" label="Fren. lingualis"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.ketr" label="Ketr"
                :items="['Rendah', 'tinggi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.tonsila" label="Tonsila"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="9" md="9">
                <v-text-field v-model="forms.fonetik" label="Fonetik"></v-text-field>
            </v-col>
        </v-row>

        <h4><label>Pemeriksaan gigi-gigi</label></h4>
        <v-col cols="12" md="12">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload Pemeriksaan gigi-gigi"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'image_pemeriksaangigi', '/v1/emr/ortodonsi/create/uploadpemeriksaangigi', forms.id, '-')"
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
      </v-col>

      <v-col cols="12" md="12">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.image_pemeriksaangigi"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>


        <br/>
        <!-- tabel gigi -->
        <!-- <v-row>
            <v-col cols="12" md="12">
            <label>Keterangan</label>
            </v-col>
        </v-row> -->
                </v-container>
                </v-window-item>
        
        <v-window-item :value="3" >
                <v-container fluid>
        <br/>
        <h4>4. ANALISIS FOTO MUKA</h4>
        <hr>
        <br/>

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak depan tak terlihat gigi"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakdepantakterlihatgigi', '/v1/emr/ortodonsi/analisafoto/uploadtampakdepan', forms.id, 'fotomuka_bentukmuka')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak depan senyum terlihat gigi"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakdepansenyumterlihatgigi', '/v1/emr/ortodonsi/analisafoto/uploadfotosenyum', forms.id, '-')"
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakdepantakterlihatgigi"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakdepansenyumterlihatgigi"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>


        </v-row>
        <v-row>

          
      <!-- <v-col cols="6" md="6">
          <v-text-field v-model="forms.tampakdepantakterlihatgigi" label="File URL" :readonly ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
          <v-text-field v-model="forms.tampakdepansenyumterlihatgigi" label="File URL" :readonly></v-text-field>
            </v-col> -->
            
            <v-col cols="12" md="12">
                <v-select
                v-model="forms.fotomuka_bentukmuka" label="Bentuk muka"
                :items="['simetri', 'asimetri','lebar','sedang','sempit']"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-select
                v-model="forms.fotomuka_profilmuka" label="Profil muka"
                :items="['lurus', 'cembung','cekung']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak samping"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampaksamping', '/v1/emr/ortodonsi/analisafoto/uploadfotosamping', forms.id, 'fotomuka_profilmuka')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak miring"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakmiring', '/v1/emr/ortodonsi/analisafoto/uploadfotomiring', forms.id, '-')"
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampaksamping"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakmiring"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <!-- <v-row>
          <v-col cols="6" md="6">
          <v-textarea v-model="forms.tampaksamping" label="Tampak samping"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
          <v-textarea v-model="forms.tampakmiring" label="Tampak miring"></v-textarea>
            </v-col>
        </v-row> -->
        
        <br/>
        <h4>FOTO GIGI-GELIGI</h4>
        <hr>
        <br/>

        <v-row>
            <v-col cols="4" md="4">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak samping kanan"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampaksampingkanan', '/v1/emr/ortodonsi/geligeli/uploadtampaksampingkanan', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="4" md="4">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak depan"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakdepan', '/v1/emr/ortodonsi/geligeli/uploadtampakdepangeli', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="4" md="4">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto tampak samping kiri"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampaksampingkiri', '/v1/emr/ortodonsi/geligeli/uploadtampaksampingkiri', forms.id, '-')"
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
      </v-col>
        </v-row>


        <v-row>
            <v-col cols="4" md="4">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col  cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampaksampingkanan"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="4" md="4">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakdepan"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="4" md="4">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampaksampingkiri"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <!-- <v-row>
            <v-col cols="4" md="4">
                <v-textarea v-model="forms.tampaksampingkanan" label="Tampak samping kanan"></v-textarea>
            </v-col>
            <v-col cols="4" md="4">
                <v-textarea v-model="forms.tampakdepan" label="Tampak depan"></v-textarea>
            </v-col>
            <v-col cols="4" md="4">
                <v-textarea v-model="forms.tampaksampingkiri" label="Tampak samping kiri"></v-textarea>
            </v-col>
        </v-row> -->

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto oklusal atas"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakoklusalatas', '/v1/emr/ortodonsi/geligeli/uploadtampakoklusalatas', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto okslusal bawah"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'tampakoklusalbawah', '/v1/emr/ortodonsi/geligeli/uploadtampakoklusalbawah', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakoklusalatas"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.tampakoklusalbawah"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <!-- <v-row>
            <v-col cols="6" md="6">
                <v-textarea v-model="forms.tampakoklusalatas" label="Tampak oklusal atas"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                <v-textarea v-model="forms.tampakoklusalbawah" label="Tampak oklusal bawah"></v-textarea>
            </v-col>
        </v-row> -->

        <br>
        <h4>5. ANALISIS MODEL STUDI</h4>
        <hr>
        <h4>Bentuk lengkung gigi</h4>
        <br>
        <v-row>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.bentuklengkunggigi_ra" label="RA"
                :items="['setengan elips', 'setengah lingkaran','trapezoid','parabola','U form','V form', 'simetris','asimetris']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.bentuklengkunggigi_rb" label="RB"
                :items="['setengan elips', 'setengah lingkaran','trapezoid','parabola','U form','V form', 'simetris','asimetris']"
                ></v-select>
            </v-col>
        </v-row>

        <h4>Malposisi gigi individual</h4>
        <v-table density="compact" class="border">
            <thead>
            <tr>
                <th class="text-center">
                </th>
                <th colspan="2" class="text-center">
                Rahang atas
                </th>
                <th colspan="2" class="text-center">
                Rahang bawah
                </th>
            </tr>
            <tr>
                <th class="text-center">
                Gigi
                </th>
                <th class="text-center">
                Kanan
                </th>
                <th class="text-center">
                Kiri
                </th>
                <th class="text-center">
                Kanan
                </th>
                <th class="text-center">
                Kiri
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-center">1</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan1"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri1"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan1"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri1"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">2</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan2"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri2"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan2"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri2"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">3</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan3"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri3"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan3"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri3"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">4</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan4"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri4"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan4"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri4"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">5</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan5"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri5"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan5"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri5"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">6</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan6"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri6"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan6"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri6"></v-text-field></td>
            </tr>
            <tr>
                <td class="text-center">7</td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kanan7"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangatas_kiri7"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kanan7"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.malposisigigiindividual_rahangbawah_kiri7"></v-text-field></td>
            </tr>
            </tbody>
        </v-table>
        
        <h4>Relasi gigi-gigi pada oklusi sentrik</h4>

        <h4>Anterior</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field placeholder="mm" v-model="forms.overjet" label="Overjet"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field placeholder="mm" v-model="forms.overbite" label="Overbite"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.palatalbite" label="Palatal bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.deepbite" label="Deep bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.anterior_openbite" label="Open bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.edgetobite" label="Edge to bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
        </v-row>

        <h4>Posterior</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.anterior_crossbite" label="Cross bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.posterior_openbite" label="Open bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.scissorbite" label="Scissor bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.cusptocuspbite" label="Cusp to cusp bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.relasimolarpertamakanan" label="Relasi molar pertama kanan"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.relasimolarpertamakiri" label="Relasi molar pertama kiri"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.relasikaninuskanan" label="Relasi kaninus kanan"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.relasikaninuskiri" label="Relasi kaninus kiri"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-select
                v-model="forms.garistengahrahangbawahterhadaprahangatas" label="Garis tengah rahang bawah terhadap rahang atas"
                :items="['Segaris', 'tak segaris']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
           
            <v-col cols="5" md="5">
                <v-select
                v-model="forms.garisinterinsisivisentralterhadapgaristengahrahangra" label="Garis inter insisivi sentral terhadap garis tengah rahang RA"
                :items="['Segaris', 'tak segaris. Bergeser ke kanan','kiri']"
                ></v-select>
            </v-col>
            <v-col cols="1" md="1">
            <v-text-field v-model="forms.garisinterinsisivisentralterhadapgaristengahrahangra_mm" label="mm"></v-text-field>
            </v-col>
            <v-col cols="5" md="5">
                <v-select
                v-model="forms.garisinterinsisivisentralterhadapgaristengahrahangrb" label="Garis inter insisivi sentral terhadap garis tengah rahang RB"
                :items="['Segaris', 'tak segaris. Bergeser ke kanan','kiri']"
                ></v-select>
            </v-col>
            <v-col cols="1" md="1">
            <v-text-field v-model="forms.garisinterinsisivisentralterhadapgaristengahrahangrb_mm" label="mm"></v-text-field>
            </v-col>
        </v-row>

        <h4>Lebar mesio distal gigi-gigi(mm)</h4>
        <v-table density="compact" class="border">
            <thead>
               
            <tr>
                <th class="text-center">
                
                </th>
                <th colspan="3" class="text-center">
                Rahang atas
                </th>
                <th colspan="3" class="text-center">
                Rahang bawah
                </th>
            </tr>
            <tr>
                <th class="text-center">
                Gigi
                </th>
                <th class="text-center">
                Kanan
                </th>
                <th class="text-center">
                Kiri
                </th>
                <th class="text-center">
                Normal
                </th>
                <th class="text-center">
                Kanan
                </th>
                <th class="text-center">
                Kiri
                </th>
                <th class="text-center">
                Normal
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-center">1</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan1"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri1"></v-text-field></td>
                <td class="text-center">7.40-9.75</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan1"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri1"></v-text-field></td>
                <td class="text-center">4.97-6.60</td>
            </tr>
            <tr>
                <td class="text-center">2</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan2"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri2"></v-text-field></td>
                <td class="text-center">6.05-8.10</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan2"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri2"></v-text-field></td>
                <td class="text-center">5.45-6.85</td>
            </tr>
            <tr>
                <td class="text-center">3</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan3"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri3"></v-text-field></td>
                <td class="text-center">7.05-9.32</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan3"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri3"></v-text-field></td>
                <td class="text-center">6.15-8.15</td>
            </tr>
            <tr>
                <td class="text-center">4</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan4"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri4"></v-text-field></td>
                <td class="text-center">6.75-9.00</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan4"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri4"></v-text-field></td>
                <td class="text-center">6.35-8.75</td>
            </tr>
            <tr>
                <td class="text-center">5</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan5"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri5"></v-text-field></td>
                <td class="text-center">6.00-8.10</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan5"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri5"></v-text-field></td>
                <td class="text-center">6.80-9.55</td>
            </tr>
            <tr>
                <td class="text-center">6</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan6"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri6"></v-text-field></td>
                <td class="text-center">9.95-12.10</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan6"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri6"></v-text-field></td>
                <td class="text-center">10.62-13.05</td>
            </tr>
            <tr>
                <td class="text-center">7</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kanan7"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangatas_kiri7"></v-text-field></td>
                <td class="text-center">8.75-10.87</td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kanan7"></v-text-field></td>
                <td class="text-center"><v-text-field v-model="forms.lebarmesiodistalgigi_rahangbawah_kiri7"></v-text-field></td>
                <td class="text-center">8.90-11.37</td>
            </tr>
            </tbody>
        </v-table>

        <br>

        <v-row>
      <v-col cols="12" md="12">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto oklusal gigi dari model studi"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'skemafotooklusalgigidarimodelstudi', '/v1/emr/ortodonsi/okulasigigi/uploadmodelstudi', forms.id, '-')"
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
        
      </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" md="12">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.skemafotooklusalgigidarimodelstudi"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>


        <!-- <v-row>
            <v-col cols="12" md="12">
          <v-textarea v-model="forms.skemafotooklusalgigidarimodelstudi" label="Skema/foto oklusal gigi dari model studi"></v-textarea>
            </v-col>
        </v-row> -->

        <h4>Perhitungan</h4>
        <h4>Metode Pont</h4>

        <v-row>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jumlahmesiodistal" label="Jumlah mesiodistal 21|12"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jarakp1p2pengukuran" label="Jarak P1 - P2 pengukuran"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jarakp1p2perhitungan" label="Jarak P1 - P2 perhitungan: jumlah I x 100 / 80"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.diskrepansip1p2_mm" label="Diskrepansi"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.diskrepansip1p2" label="Diskrepansi"
                :items="['normal', 'kontraksi','distraksi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.jarakm1m1pengukuran" label="Jarak M1 - M1 pengukuran"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.jarakm1m1perhitungan" label="Jumlah I x 100 / 60"></v-text-field>
            </v-col>
           
        </v-row>

        <v-row>
          <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.diskrepansim1m2_mm" label="Diskrepansi (mm)"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                v-model="forms.diskrepansim1m2" label="Diskrepansi"
                :items="['normal', 'kontraksi','distraksi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-text-field v-model="forms.diskrepansi_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>
        
        <h4>Metode Pont</h4>
        <v-row>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jumlahlebarmesiodistalgigidarim1m1" label="Jumlah lebar mesiodistal gigi dari M1 - M1"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jarakp1p1tonjol" label="Jarak P1 - P1 (tonjol)"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="%" v-model="forms.indeksp" label="Indeks P: Jarak P1-P1 x 100% / md M1-M1"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" md="4">
                <v-select
                v-model="forms.lengkunggigiuntukmenampunggigigigi" label="Lengkung gigi untuk menampung gigi-gigi"
                :items="['cukup', 'kurang','lebih']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" v-model="forms.jarakinterfossacaninus" label="Jarak inter fossa caninus"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="%" v-model="forms.indeksfc" label="Indeks FC: Jarak FC x 100% / md M1-M1"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" md="4">
                <v-select
                v-model="forms.lengkungbasaluntukmenampunggigigigi" label="Lengkung basal untuk menampung gigi-gigi"
                :items="['cukup', 'kurang','lebih']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-select
                v-model="forms.inklinasigigigigiregioposterior" label="Inklinasi gigi-gigi regio posterior"
                :items="['normal', 'divergen','konvargen']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field v-model="forms.metodehowes_keterangan" label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-text-field v-model="forms.aldmetode" label="ALD metode"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.overjetawal" label="Overjet awal"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.overjetakhir" label="Overjet akhir"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.rahangatasdiskrepansi" label="Rahang atas: Diskrepansi"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" v-model="forms.rahangbawahdiskrepansi" label="Rahang bawah: Diskrepansi"></v-text-field>
            </v-col>
        </v-row>
        
      </v-container>
                </v-window-item>
        
                <v-window-item :value="4" >
                <v-container fluid>
        <h4>6. ANALISIS RADIOGRAFI</h4>

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto sefalometri"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'fotosefalometri', '/v1/emr/ortodonsi/analisaradiografi/uploadsefalometri', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto panoramik"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'fotopanoramik', '/v1/emr/ortodonsi/analisaradiografi/uploadpanoramik', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.fotosefalometri"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.fotopanoramik"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <!-- <v-row>
            <v-col cols="6" md="6">
                 <v-textarea v-model="forms.fotosefalometri" label="Foto sefalometri"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                 <v-textarea v-model="forms.fotopanoramik" label="Foto panoramik"></v-textarea>
            </v-col>
        </v-row> -->

        
        <h4>7. DIAGNOSIS</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.maloklusiangleklas" label="Maloklusi Angle Klas"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.hubunganskeletal" label="Hubungan Skeletal"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.malrelasi" label="Malrelasi"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.malposisi" label="Malposisi"></v-text-field>
            </v-col>
        </v-row>

        <h5>Kasus maloklusi menyakut masalah</h5>
        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.estetik" label="Estetik"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.dental" label="Dental"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.skeletal" label="Skeletal"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-checkbox v-model="forms.fungsipenguyahanal" label="Fungsi penguyahanal"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.crowding" label="Crowding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.spacing" label="Spacing"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.protrusif" label="Protrusif"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-checkbox v-model="forms.retrusif" label="Retrusif"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.malposisiindividual" label="Malposisi individual"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.maloklusi_crossbite" label="Crossbite"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox v-model="forms.maloklusi_lainlain" label="Lain-lain"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.maloklusi_lainlainketerangan" label=""></v-text-field>
            </v-col>
        </v-row>

        <h5>Solusi masalah</h5>
        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.rapencabutan" label="RA Pencabutan"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.raekspansi" label="RA Ekspansi"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.ragrinding" label="RA Grinding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.raplataktif" label="RA Plat aktif"></v-checkbox>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.rbpencabutan" label="RB Pencabutan"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.rbekspansi" label="RB Ekspansi"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.rbgrinding" label="RB Grinding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox v-model="forms.rbplataktif" label="RB Plat aktif"></v-checkbox>
            </v-col>
        </v-row>

        
      </v-container>
                </v-window-item>

                
                <v-window-item :value="5" >
                <v-container fluid>
        <h4>8. ANALISIS ETIOLOGI MALOKLUSI</h4>

        <v-row>
            <v-col cols="12" md="12">
                <v-textarea v-model="forms.analisisetiologimaloklusi" label="ANALISIS ETIOLOGI MALOKLUSI"></v-textarea>
            </v-col>
        </v-row>

        <h4>9. PROSEDUR PERAWATAN</h4>
        <h4>Rencana perawatan</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.pasiendirujukkebagian" label="1. Pasien dirujuk ke bagian"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.pencarianruanguntuk" label="2. Pencarian ruang untuk"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.koreksimalposisigigiindividual" label="Koreksi malposisi gigi individual"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field v-model="forms.retensi" label="Retensi"></v-text-field>
            </v-col>
        </v-row>

        <h4>Jalannya perawatan</h4>

        <v-row>
      <v-col cols="12" md="12">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto pencarian ruang"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'pencarianruang', '/v1/emr/ortodonsi/jalanperawatan/uploadpencarianruang', forms.id, '-')"
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
        
      </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" md="12">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.pencarianruang"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>


        <!-- <v-row>
            <v-col cols="12" md="12">
                <v-text-field v-model="forms.pencarianruang" label="1. Pencarian ruang"></v-text-field>
            </v-col>
        </v-row> -->

        <h4>2. Koreksi malposisi gigi individual</h4>

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto rahang atas"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'koreksimalposisigigiindividual_rahangatas', '/v1/emr/ortodonsi/jalanperawatan/uploadrahangatas', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto rahang bawah"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'koreksimalposisigigiindividual_rahangbawah', '/v1/emr/ortodonsi/jalanperawatan/uploadrahangbawah', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.koreksimalposisigigiindividual_rahangatas"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.koreksimalposisigigiindividual_rahangbawah"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <v-row>
            <!-- <v-col cols="6" md="6">
                <v-textarea v-model="forms.koreksimalposisigigiindividual_rahangatas" label="Rahang atas"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                <v-textarea v-model="forms.koreksimalposisigigiindividual_rahangbawah" label="Rahang bawah"></v-textarea>
            </v-col> -->
            <v-col cols="12" md="12">
                <v-text-field v-model="forms.intruksipadapasien" label="Intruksi Pada Pasien"></v-text-field>
            </v-col>
        </v-row>

        

        <h4>4. Retainer</h4>

        <v-row>
      <v-col cols="12" md="12">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto retainer"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'retainer', '/v1/emr/ortodonsi/retainer/uploadretainer', forms.id, '-')"
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
        
      </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" md="12">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.retainer"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>

        <!-- <v-row>
            <v-col cols="12" md="12">
                <v-textarea v-model="forms.retainer" label="Retainer"></v-textarea>
            </v-col>
        </v-row> -->

        
      </v-container>
                </v-window-item>

                <v-window-item :value="6" >
                <v-container fluid>
        <h4>11. GAMBAR / DESAIN ALAT</h4>
        <h5>Plat aktif</h5>

        <v-row>
            <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto rahang atas"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'gambarplataktif_rahangatas', '/v1/emr/ortodonsi/desainalat/uploadplakatrahangatas', forms.id, '-')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="6" md="6">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" text="Upload foto rahang bawah"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Upload File">

              <v-file-input
              @change="setUploadFile ($event, 'gambarplataktif_rahangbawah', '/v1/emr/ortodonsi/desainalat/uploadplakatrahangbawah', forms.id, '')"
              show-size
              counter
              label="File input"
              ></v-file-input>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
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
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.gambarplataktif_rahangatas"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>

      <v-col cols="6" md="6">
        <v-container
    class="fill-height"
    fluid
    style="min-height: 434px">
          <v-fade-transition mode="out-in">
            <v-row>
              <v-col cols="10">
                <v-card>
                  <v-img
                    :src="forms.gambarplataktif_rahangbawah"
                    height="300"
                    class="bg-grey-lighten-2"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-fade-transition>
        </v-container>
      </v-col>
        </v-row>


        <v-row>
            <!-- <v-col cols="3" md="3">
                <v-textarea v-model="forms.gambarplataktif_rahangatas" label="Rahang atas"></v-textarea>
            </v-col>
            <v-col cols="3" md="3">
                <v-textarea v-model="forms.gambarplataktif_rahangbawah" label="Rahang bawah"></v-textarea>
            </v-col> -->
            <v-col cols="12" md="12">
                <v-textarea v-model="forms.keterangangambar" label="Keterangan gambar"></v-textarea>
            </v-col>
        </v-row>

        <h4>12. PROGNOSIS</h4>
        <v-row>
            <v-col cols="3" md="3">
            <v-select
                v-model="forms.prognosis" label="Prognosis"
                :items="['Baik', 'sedang','buruk']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.prognosis_a" label="a."
                :items="['Motivasi baik', 'sedang','kurang']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.prognosis_b" label="b."
                :items="['OH baik', 'sedang','buruk']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                v-model="forms.prognosis_c" label="c."
                :items="['Umur muda', 'dewasa muda']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
            <v-select
                v-model="forms.indikasiperawatan" label="Indikasi perawatan"
                :items="['kuratif', 'preventif','interseptif']"
                ></v-select>
            </v-col>
        </v-row>
      </v-container>
                </v-window-item>
            </v-window>

            <v-card-actions v-if="USER">
            <v-spacer></v-spacer>
            <v-btn  v-if="USER.role == 'mahasiswa'" @click="setItems" color="primary" variant="outlined">{{
                $t("action.button.save")
            }}</v-btn>
                                </v-card-actions>


      </v-container>

    <v-snackbar v-model="sb.snackbar" :color="sb.color">
      {{ sb.text }}
      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <v-btn @click="showSnackbar = true"> Open Snackbar </v-btn>
    <Snackbar :options="{ showSnackbar: showSnackbar }" @close="showSnackbar = false">
      Warning
    </Snackbar> -->

  </template>