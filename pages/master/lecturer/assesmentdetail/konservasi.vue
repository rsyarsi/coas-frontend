<script setup>
import {useRouter} from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Penilaian Detail",
});


const forms2 = reactive({
    
    active: "",
    assesmentgroupid: "",
    assementgroupname: "",
    studentid: "",
    studentname: "",
    nim: "",
    lectureid:"",
    lecturename:"",    
    yearid:"",
    yearname:"",
    semesterid:"",
    semestername:"",
    specialistid:"",
    specialistname:"",
    totalbobot:"",
    grandotal:"",
    kodesub: "",
    index_sub: "",
    assesmenttype:""
});

const ListComponent = ref(null);

const getAnItem2 = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItemPostMethod, } = useItem (tokenData),
    formTarget = {
        "id" : target,
    };

    await getItemPostMethod (COMPONENT_APIS.getHeader, "-",formTarget,
    success =>
    {
        forms2.studentname=success.data.studentname;        
        forms2.nim=success.data.nim;
        forms2.lecturename=success.data.lecturename;
        forms2.semestername=success.data.semestername;
        forms2.yearname=success.data.yearname;
        forms2.specialistname=success.data.specialistname;
        forms2.assementgroupname=success.data.assementgroupname;
        forms2.totalbobot=success.data.totalbobot;
        forms2.grandotal=success.data.grandotal;
        forms2.assesmenttype = success.data.assesmenttype;
        forms2.kodesub = success.data.kodesub;
        forms2.index_sub = success.data.index_sub;
        COMPONENT_FORMS.lock=success.data.lock;
        COMPONENT_FORMS.semesterid=success.data.semesterid;
        COMPONENT_FORMS.yearid=success.data.yearid;
        COMPONENT_FORMS.studentid=success.data.studentid;
        COMPONENT_FORMS.lectureid=success.data.lectureid;
        COMPONENT_FORMS.specialistid=success.data.specialistid;

    },
    error => {});
};

const COMPONENT_TITLE = 'Berilah nilai pada kolom yang sesuai dengan penilaian Anda';

const COMPONENT_HEADER =
[
    {
        key: "assesmentnumbers",
        title: "No.",
        sortable: false,
    },
    {
        key: "kode_sub_name",
        title: "Sub Name",
        sortable: false,
    },
    {
        key: "assesmentdescription",
        title: "Aktifitas",
        sortable: false,
    },
    {
        key: "assesmentskalavalue",
        title: "Skala",
        sortable: false,
    },
    {
        key: "assementvalue",
        title: "Nilai",
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
    id : "",
    idhdr : useRouter().currentRoute.value.query.uuid,
    dateupdate : "",
    assesmentgroupid : "",
    iddetail : "",
    assesmenttype : "4",    
    kode_sub_name : "", 
    assesmentskala : "",
    dateupdatedetail : "", 
    assesmentdescription: "",
    assementvalue: "0",
    kodesub : "",
    index_sub : "",
    konditevalue: "0",
    assementscore: "0",
    active : "",
    assesmentskalavaluestart : "0",
    assesmentskalavalueend : "0",
    grandotal : "0",
    lock : "0",
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/transaction/assesment/detail",
    getHeader: "/v1/transaction/assesment/viewtrsassesmentheaderbyid",
    getDetailPenilaian: "/v1/transaction/assesment/viewtrsassesmentdetalbyidandtype",
    getItem: "/v1/emr/periodonti/soap/showbyid",
    createItem: "/v1/emr/periodonti/soap/create",
    updateItem: "/v1/transaction/assesment/updatedetailsbyitem",
    setFinish: "/v1/transaction/recapitulation/generate",
};

const COMPONENT_IDEMR = useRouter().currentRoute.value.query.uuid;

const getByID = async (noreg,nim) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem,setItem } = useItem (tokenData),
    formTarget = {
      "nim" : nim,
      "noregister" : noreg
    };

    await setItem ("/v1/emr/periodonti/viewemrbyRegOperator", "",
    formTarget,
    success =>
    {
      if (success.code == 200){
        if (success.data.noepisode == null){
            forms.id = success.data.id
            getAnItem ( noreg );
            return false;
        }
        for (const [key, value] of Object.entries(success.data)) {
              forms[`${key}`] = value
          }
        ListComponent.value.getItems();
        
      }
    },
    error => {
      console.log(error)
    });
};
onMounted (async () =>
{
    //await getByID (useRouter().currentRoute.value.query.uuid);
    //forms.id = useRouter().currentRoute.value.query.uuid;
    await getAnItem2(useRouter().currentRoute.value.query.uuid)

});
</script>

<template v-slot:form="{ forms, }">
    <v-container>
         <h4>Form Penilaian Mahasiswa ortodonsi</h4> 
        <br> 
        <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Nama Mahasiswa"
                        readonly
                        v-model="forms2.studentname"
                        hide-details
                        variant="outlined"></v-text-field>

                        <!-- <v-text-field 
                        label="Nama Mahasiswa"
                        readonly
                        v-model="forms2.assesmenttype"
                        hide-details
                        variant="outlined"></v-text-field> -->
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="NIM Mahasiswa"
                        readonly
                        v-model="forms2.nim"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Dosen Pembimbing"
                        readonly
                        v-model="forms2.lecturename"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        label="Tahun"
                        readonly
                        v-model="forms2.yearname"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        label="Semester"
                        readonly
                        v-model="forms2.semestername"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
               
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Spesialisasi"
                        readonly
                        v-model="forms2.specialistname"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Group"
                        readonly
                        v-model="forms2.assementgroupname"
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br>
        <AssesmentComponent ref="ListComponent" :title="COMPONENT_TITLE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS" :idemr="COMPONENT_IDEMR">
                          <template v-slot:form="{ forms, }">
                            <v-form>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-textarea v-model="forms.assesmentdescription" variant="outlined" readonly label="Deskripsi Penilaian"></v-textarea> 
                                </v-col> 
                            </v-row>
                            <!-- <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field 
                                    label="Assesmenttype"
                                    readonly 
                                    v-model="forms.assesmenttype"
                                    hide-details
                                    variant="outlined"></v-text-field>
                                </v-col> 
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field 
                                    label="Kode Sub"
                                    readonly 
                                    v-model="forms.kodesub"
                                    hide-details
                                    variant="outlined"></v-text-field>
                                </v-col> 
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field 
                                    label="Index Sub"
                                    readonly 
                                    v-model="forms.index_sub"
                                    hide-details
                                    variant="outlined"></v-text-field>
                                </v-col> 
                            </v-row> -->
                            <v-row>
                              <v-col cols="12" md="6"> 
                                    <v-text-field 
                                        label="Skala Awal"
                                        readonly
                                        v-model="forms.assesmentskalavaluestart"
                                        hide-details
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
 

                                    <v-text-field 
                                        label="Skala Akhir"
                                        readonly
                                        v-model="forms.assesmentskalavalueend"
                                        hide-details
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                        label="Nilai" 
                                        v-model="forms.assementvalue"
                                        hide-details
                                        variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                                   
                                  <!-- <v-textarea v-model="forms.assementvalue" label="Object"></v-textarea>
                                  <v-textarea v-model="forms.assementscore" label="Assesment"></v-textarea>
                                  <v-textarea v-model="forms.terapi_p" label="Plan"></v-textarea> -->
                              </v-form>
                          </template>
                      </AssesmentComponent>
                    <v-row  class="mt-2"> 
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Total Bobot"
                                readonly
                                v-model="forms2.totalbobot"
                                hide-details
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                label="Total Penilaian"
                                readonly
                                v-model="COMPONENT_FORMS.grandotal"
                                hide-details
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
    </v-container>

</template>