<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

definePageMeta (
{
    layout: "dashboard",
    title: "emrortodonsi",
});

const forms = reactive({
    id: "",     
    assesmentgroupid: "",
    studentid: "",
    lectureid: "",
    yearid: "",
    semesterid: "",
    specialistid: "",
    grandotal: "0",
    transactiondate: (new Date()).toISOString().split('T')[0],
    active: "1"

});

const

groups_year = ref ([]),
groups_semester = ref ([]),
groups_student = ref ([]),
groups_assesmentgroup = ref ([]),
groups_specialist = ref ([]);

const setItems = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (forms)) {
        formTarget[form] = forms[form];
    }

    await setItem ("v1/transaction/assesment/create", "",
    formTarget,
    (success) =>
    {
        if (success.code == 200){
            alert(success.message); 
           goTo(success.data.header.id,success.data.header.idspecialistsimrs,success.data.header.assesmenttype);
        }else{
            alert(success.message);
        }
    },
    error => {});
};
const goTo = async (uuid,idunit,assesmenttype) =>
{
    if (idunit == 46){
        if(assesmenttype == "6"){
            var path = 'ortodonsi/control';
        }else if(assesmenttype == "7"){
            var path = 'ortodonsi/assesment';
        }else{
        var path = 'ortodonsi';
        }
        
    }else if (idunit == 58){
        var path = 'pedodonsi';
    }else if (idunit == 59){
        var path = 'periodonsi';
    }else if (idunit == 60){
        var path = 'prostodonsia';
    }else if (idunit == 137){
        var path = 'konservasi';
    }else{
        var path = '';
    }
    router.push({ path: '/master/lecturer/assesmentdetail/'+path, query: { uuid: uuid } })
};

const getLecturer = async () =>
{
    const
    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),
    { getItem,setItem } = useItem (tokenData);

    await getItem ("/v1/masterdata/lectures/view/nim", userData.username,
    success =>
    {
        forms.lectureid = success.id
    },
    error => {
      console.log(error)
    });
};

const getStudentbySpecialist = async (target) =>
{
    forms.studentid = null
    const
    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),

    response = await useCall ("/v1/masterdata/students/view/idspecialist/" + target, "get", "application/json", {}, tokenData);

    groups_student.value = response.data.data.data
}

const getGroupPenilaianbySpecialist = async (target) =>
{
    forms.assesmentgroupid = null
    const
    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),

    response = await useCall ("/v1/masterdata/assesmentgroups/view/idspecialist/" + target, "get", "application/json", {}, tokenData);

    groups_assesmentgroup.value = response.data.data.data
}

onMounted (async () =>
{
    await getLecturer();
    const { token: tokenData, } = await useAuth (),

    datas_year = await useCall ("/v1/masterdata/years/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_semester = await useCall ("/v1/masterdata/semesters/viewallwithotpaging", "get", "application/json", {}, tokenData),
    //datas_student = await useCall ("/v1/masterdata/students/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_specialist = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData);
    //datas_assesmentgroup = await useCall ("/v1/masterdata/assesmentgroups/viewallwithotpaging", "get", "application/json", {}, tokenData);
 
    groups_year.value = datas_year.data.data.data;  
    groups_semester.value = datas_semester.data.data.data; 
    groups_specialist.value = datas_specialist.data.data.data; 
    //groups_student.value = datas_student.data.data.data; 
    //groups_assesmentgroup.value = datas_assesmentgroup.data.data.data; 

    
});


</script>
<template v-slot:form="{ forms, }">
    <v-container>
         <h4>Form Penilaian Mahasiswa </h4> <br>
         <v-alert
            type="error"
            title="Informasi"
            text="Silahkan Pilih Tahun, Semester, Spesialisasi, dan Nama Mahasiswa sebelum melakukan Proses entri Penilaian."
        ></v-alert> 
        <br>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-select
                            v-model="forms.yearid"  
                            :items="groups_year"
                            item-value="id" item-title="name"
                            label="Tahun"
                            variant="outlined"
                            required
                        ></v-select>

                    </v-col>
                    <v-col cols="12" md="3"> 
                         <v-select
                            v-model="forms.semesterid"  
                            :items="groups_semester"
                            item-value="id" item-title="semestername"
                            label="Semester"
                            variant="outlined"
                            required
                        ></v-select> 
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-select
                            v-model="forms.specialistid"  
                            :items="groups_specialist"
                            item-value="id" item-title="specialistname"
                            label="Spesialis"
                            variant="outlined"
                            required
                            @update:modelValue="getStudentbySpecialist(forms.specialistid);getGroupPenilaianbySpecialist(forms.specialistid)"
                        ></v-select> 
                        
                      
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-select
                            v-model="forms.studentid"
                            :items="groups_student"
                            item-value="id" item-title="name"
                            label="Mahasiswa"
                            variant="outlined"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select
                            v-model="forms.assesmentgroupid"
                            :items="groups_assesmentgroup" 
                            item-value="id" item-title="assementgroupname"
                            label="Group Penilaian"
                            variant="outlined"
                            required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-btn
                        color="success"
                        class="mt-4"
                        block
                        @click="setItems"
                        >
                        BUAT PENILAIAN
                        </v-btn>

                        

                    </v-col>
                </v-row>
</v-container>
</template>