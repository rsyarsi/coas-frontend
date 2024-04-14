<script setup>

import { useRouter, } from "vue-router";

definePageMeta (
{
    layout: "dashboard",
    title: "Assessment",
});

const router = useRouter ();

const tableComponent = ref (null);

const COMPONENT_BADGE = ref ([ "Master", "Dosen", "Penilaian Mahasiswa/i", ]);

const COMPONENT_HEADER = reactive (
[
    {
        key: "id",
        title: "ID",
        sortable: true,
        align: " d-none",
    },
    {
        key: "nomr",
        title: "Nomor MR",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "patientname",
        title: "Nama Pasien",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noregistrasi",
        title: "Nomor Registrasi",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "noepisode",
        title: "Nomor Episode",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namaunit",
        title: "Poliklinik",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namadokter",
        title: "Dokter",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "namajaminan",
        title: "Jaminan",
        sortable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "visit_date",
        title: "Kunjungan",
        sortable: true,
        searchable: false,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "status_penilaian",
        value: item => ! item.id_emr || ! item.status_penilaian ? "OPEN" : item.status_penilaian,
        title: "Status Penilaian",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "status_emr",
        value: item => ! item.id_emr || ! item.status_emr ? "OPEN" : item.status_emr,
        title: "Status EMR",
        sortable: false,
        searchable: true,
        align: "start",
        headerProps: { class: "font-weight-bold", },
    },
    {
        key: "actions",
        title: "Aksi",
        sortable: false,
        align: "center",
        headerProps: { class: "font-weight-bold", },
    },
]);

const COMPONENT_APIS = reactive (
{
    getAllItems: true,
    getItem: true,
    getItemIcon: "mdi-eye",
    updateItem: true,
    updateItemIcon: "mdi-checkbox-marked-circle",
    fnUpdateItemIconIsDisabled: (item) =>
    {
        if (! item.status_penilaian || item.status_penilaian == "OPEN" || item.status_penilaian == "FINISH") {

            return true;
        }

        return false;
    },
    otherItem: true,
    otherItemIcon: "mdi-account-box-edit-outline",
});

const

form_yearid = ref (null),
form_semesterid = ref (null),
form_specialistid = ref (null),
form_studentid = ref (null),
form_assesmentgroupid = ref (null),

groups_year = ref ([]),
groups_semester = ref ([]),
groups_specialist = ref ([]),
groups_student = ref ([]),
groups_assesmentgroup = ref ([]),

getStudentbySpecialist = async (target) =>
{
    form_studentid.value = null;
    form_assesmentgroupid.value = null;

    const { token: tokenData, } = await useAuth (),

    datas_student = await useCall ("/v1/masterdata/students/view/idspecialist/" + target, "get", "application/json", {}, tokenData);

    groups_student.value = datas_student.data.data.data;
},

getGroupAssessmentbySpecialist = async (target) =>
{
    const { token: tokenData, } = await useAuth (),

    datas_assesmentgroup = await useCall ("/v1/masterdata/assesmentgroups/view/idspecialist/" + target, "get", "application/json", {}, tokenData);

    groups_assesmentgroup.value = datas_assesmentgroup.data.data.data;
};

const

DATETIME_FROM = ref (null),
DATETIME_TO = ref (null);

const unit = (idunit) =>
{
    if (idunit == 46) {

        return "emrortodonsi";

    } else if (idunit == 58) {

        return "emrpedodonsi";

    } else if (idunit == 59) {

        return "emrperiodonsi";

    } else if (idunit == 60) {

        return "prostodonsia";

    } else if (idunit == 137) {

        return "konservasi";

    } else if (idunit == 10) {

        return "radiologi";
    }
};

const

format_datetime_start = (value) =>
{
    return useDateTime (value).ins.format ('YYYY-MM-DD') + " " + "00:00:00";
},

format_datetime_to = (value) =>
{
    return useDateTime (value).ins.format ('YYYY-MM-DD') + " " + "23:59:59";
};

const getItems = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItemPostMethod, } = useItem (tokenData),

    limitBy = () => "limit=" + tableComponent.value.datatableBody.itemPerPage + "&",
    orderBy = () =>
    {
        let by = toRaw (target.sortBy) ?? [];

        if (by.length) {

            let { order, key, } = by[0];

            if (order == "asc") {

                return "order=" + key + "&";

            } else if (order == "desc") {

                return "order=-" + key + "&";
            }

        } else {

            return "";
        }
    },
    filterBy = () =>
    {
        if (tableComponent.value.datatableBody.searchables.length && tableComponent.value.datatableBody.searchBy && target.search) {

            return "filter[" + tableComponent.value.datatableBody.searchBy + "]=" + target.search + "&";

        } else {

            return "";
        }
    };

    let url = "/v1/transaction/patient/view/bystudent", to = (! String (url).includes ("?") ? url + "?" : url + "&"),
        form =
        {
            "specialistid": form_specialistid.value,
            "studentid": form_studentid.value,
        };

    if (DATETIME_FROM.value && DATETIME_TO) {

        form.from = format_datetime_start (DATETIME_FROM.value ?? new Date);
        form.to = format_datetime_to (DATETIME_TO.value ?? new Date);
    }

    await getItemPostMethod (to
    + orderBy ()
    + filterBy ()
    + limitBy ()
    + "current_page=" + (typeof target === "object" ? target.page : target),
    "",
    form,
    (success, total, per_page, next_page_url, prev_page_url, first_page_url, last_page_url) =>
    {
        tableComponent.value.datatableBody.items = success;
        tableComponent.value.datatableBody.itemsLength = total;
        tableComponent.value.datatableBody.itemPerPage = per_page;
        tableComponent.value.datatableBody.itemNextPageUrl = next_page_url;
        tableComponent.value.datatableBody.itemPreviousPageUrl = prev_page_url;
        tableComponent.value.datatableBody.isLoaded = true;
    },
    error => {});
};

const fnApiGetItem = (async (item) =>
{
    const { noregistrasi, idunit, } = item,

    routeTo = router.resolve ({ path: "/master/coas/" + unit (idunit), query: { noreg: noregistrasi, }, });

    await window.open (routeTo.href, "_blank");
});

const fnUpdateItem = (async (item) =>
{
    await updateStatusToFinish (item);
});

const fnOtherItem = (async (item) =>
{
    const

    { token: tokenData, getUser, } = await useAuth (),
    userData = await getUser (tokenData),
    { getItem, setItem, } = useItem (tokenData),
    formTarget =
    {
        lectureid: null,
        studentid: form_studentid.value,
        assesmentgroupid: form_assesmentgroupid.value,
        yearid: form_yearid.value,
        semesterid: form_semesterid.value,
        specialistid: form_specialistid.value,
        grandotal: "0",
        transactiondate: (new Date()).toISOString().split('T')[0],
        active: "1"
    };

    await getItem ("/v1/masterdata/lectures/view/nim",
    userData.username,
    (success) =>
    {
        formTarget.lectureid = success.id;
    },
    error => {});

    await setItem ("v1/transaction/assesment/create", "",
    formTarget,
    async (success) =>
    {
        let

        { noregistrasi, id_emr, } = item,
        { id: uuid, idspecialistsimrs: idunit, assesmenttype, } = success.data.header;

        var path = "";

        if (idunit == 46) {

            if (assesmenttype == "6") path = "ortodonsi/control";
            else if (assesmenttype == "6") path = "ortodonsi/assesment";
            else path = "ortodonsi"

        } else if (idunit == 58) {

            path = "pedodonsi";

        } else if (idunit == 59) {

            path = "periodonsi";

        } else if (idunit == 60) {

            path = "prostodonsia";

        } else if (idunit == 137) {

            path = "konservasi";

        } else if (idunit == 10) {

            path = "radiologi";
        }

        const routeTo = router.resolve ({ path: "/master/lecturer/assesmentdetail/" + path, query: { uuid, noreg: noregistrasi, idunit, id_emr, }, });

        await updateStatusToWrite ({ ...item, idunit, id_emr, });

        item.status_penilaian = "WRITE";

        alert (success.message); 
        window.open (routeTo.href, "_blank");
    },
    error => {});
});

onMounted (async () =>
{
    const { token: tokenData, } = await useAuth (),

    datas_year = await useCall ("/v1/masterdata/years/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_semester = await useCall ("/v1/masterdata/semesters/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_specialist = await useCall ("/v1/masterdata/specialists/viewallwithotpaging", "get", "application/json", {}, tokenData),
    datas_student = await useCall ("/v1/masterdata/students/viewallwithotpaging", "get", "application/json", {}, tokenData);

    groups_year.value = datas_year.data.data.data;
    groups_semester.value = datas_semester.data.data.data;
    groups_specialist.value = datas_specialist.data.data.data;
    groups_student.value = datas_student.data.data.data;
});

</script>

<template>
    <template v-if="true">
        <v-alert type="warning" title="Informasi" class="multi-line" style="white-space: pre-line;" text="
        Silahkan Pilih Tahun, Semester, Spesialisasi, dan Nama Mahasiswa sebelum melakukan Proses entri Penilaian!" closable></v-alert>
        <br>

        <v-layout>
            <v-toolbar color="#BC1010" class="mb-2">
                <v-breadcrumbs :items="COMPONENT_BADGE">
                    <template v-slot:divider>
                        <v-icon icon="mdi-forward"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-toolbar>
        </v-layout>
        <v-layout>
            <v-form class="w-100 ma-2">
                <v-row>
                    <v-col>
                        <v-select v-model="form_yearid" :items="groups_year" item-value="id" item-title="name" label="Tahun" variant="outlined" required></v-select>
                    </v-col>
                    <v-col>
                        <v-select v-model="form_semesterid" :items="groups_semester" item-value="id" item-title="semestername" label="Semester" variant="outlined" required></v-select>
                    </v-col>
                    <v-col>
                        <v-select v-model="form_specialistid" @update:modelValue="getGroupAssessmentbySpecialist (form_specialistid)" :items="groups_specialist" item-value="id" item-title="specialistname" label="Spesialis" variant="outlined" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select v-model="form_studentid" :items="groups_student" item-value="id" item-title="name" label="Mahasiswa/i" variant="outlined" required></v-select>
                    </v-col>
                    <v-col>
                        <v-select v-model="form_assesmentgroupid" :items="groups_assesmentgroup" item-value="id" item-title="assementgroupname" label="Grup Penilaian" variant="outlined" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn @click="getItems ({ page: 1, })" variant="flat" color="primary">Menilai</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-layout>
    </template>
    <TableComponent ref="tableComponent" :header="COMPONENT_HEADER" :apis="COMPONENT_APIS" :fnApiGetAllItems="getItems" :fnApiGetItem="fnApiGetItem" :fnUpdateItem="fnUpdateItem" :fnOtherItem="fnOtherItem">
        <template v-slot:field>
            <v-dialog width="380" :return-value.sync="DATETIME_FROM">
                <template v-slot:activator="{ props: activatorProps, }">
                    <v-btn v-bind="activatorProps" placeholder="DATETIME_FROM" density="compact" variant="outlined" class="ma-1">{{ format_datetime_start (DATETIME_FROM).split (" ")[0] }}</v-btn>
                </template>
                <template v-slot:default="{ isActive, }">
                    <v-card>
                        <v-card-actions class="justify-center">
                            <v-date-picker v-model="DATETIME_FROM" @update:modelValue="DATETIME_FROM.value = format_datetime_start (DATETIME_FROM.value); isActive.value = false" title="Filter Kunjungan Dari" color="primary" show-adjacent-months></v-date-picker>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-dialog width="380" :return-value.sync="DATETIME_TO">
                <template v-slot:activator="{ props: activatorProps, }">
                    <v-btn v-bind="activatorProps" placeholder="DATETIME_TO" density="compact" variant="outlined" class="ma-1">{{ format_datetime_to (DATETIME_TO).split (" ")[0] }}</v-btn>
                </template>
                <template v-slot:default="{ isActive, }">
                    <v-card>
                        <v-card-actions class="justify-center">
                            <v-date-picker v-model="DATETIME_TO" @update:modelValue="DATETIME_TO.value = format_datetime_to (DATETIME_TO.value); isActive.value = false" title="Filter Kunjungan Sampai" color="primary" show-adjacent-months></v-date-picker>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </template>
    </TableComponent>
</template>
