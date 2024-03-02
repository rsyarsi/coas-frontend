<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Dashboard",
});


const overlay  = ref(true);

const user = reactive (
{
    idpresence: "",
    idstudent: "",
    name: "",
    email: "",
    role: "",
    avatar: "",
    absentime_in: "",
    absentime_out: "",
});

const setItems = async (target) =>
{
    const
    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {
        "id" : user.idpresence,
        "studentid" : user.idstudent,
        "statusabsensi" : target
    };

    await setItem ("/v1/transaction/patient/absence/create", "",
    formTarget,
    (success) =>
    {
        if (success.code == 200){
            alert(success.message);
            if (success.data.statusabsensi == 'IN'){
                user.idpresence = success.data.id;
                user.absentime_in = success.data.time_in;
            }else{
                user.absentime_out = success.data.time_out;
            }
        }else{
            alert(success.message);
        }
    },
    error => {
      alert(error.data.message)
    });
};

const getPresence = async () =>
{

    const

    { token: tokenData,getUser } = await useAuth (), userData = await getUser(tokenData),
    { getItem,setItem } = useItem (tokenData);

    await getItem ("/v1/masterdata/students/view/nim", userData.username,
    success =>
    {
        user.name = success.name;
        user.idstudent = success.id;
        //getpresence
        const formTarget = {"date" : (new Date()).toISOString().split('T')[0],"studentid" : success.id};
         setItem ("/v1/transaction/patient/absence/findbydate","",formTarget,
            response =>
            {
                if (response.code == 200){
                    user.idpresence = response.data[0].id;
                    user.absentime_in = response.data[0].time_in;
                    user.absentime_out = response.data[0].time_out;
                }
            },
            error => {
            console.log(error)
            });
    },
    error => {
      console.log(error)
    });
};


onBeforeMount (async () =>
{
    await getPresence ()
});

</script>

<template>
    <!-- <v-skeleton-loader type="card"></v-skeleton-loader> -->
        <v-container>
    <v-form>
        <v-text-field
            v-model="user.idstudent"
            hide-details
            required
            readonly
            type="hidden"
            variant="filled"></v-text-field>
            <v-text-field
            v-model="user.idpresence"
            hide-details
            required
            readonly
            type="hidden"
            variant="filled"></v-text-field>

            <h1 class="font-weight-bold text-left text-basil">
                Selamat Datang, {{ user.name }}
            </h1>
            <br/>
            <h3 class="font-weight-bold text-left text-basil">
                Silahkan melakukan presensi
            </h3>
            <v-card-actions>
                <v-btn @click="setItems('IN')" color="blue" variant="elevated"><v-icon start icon="mdi mdi-location-enter"></v-icon> ABSEN IN</v-btn>
                &nbsp&nbsp&nbsp
                <v-row>
                    <v-col>
                        {{ user.absentime_in }}
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-card-actions>
                <v-btn @click="setItems('OUT')" color="red" variant="elevated"><v-icon start icon="mdi mdi-location-exit"></v-icon> ABSEN OUT</v-btn>
                &nbsp&nbsp&nbsp
                <v-row>
                    <v-col>
                        {{ user.absentime_out }}
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-form>
    </v-container>
</template>
