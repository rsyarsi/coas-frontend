<script setup>
import { useRouter } from "vue-router";

definePageMeta({
    layout: "dashboard",
    title: "Penilaian",
});

const COMPONENT_TITLE =
    "Rekapitulasi Ortodonsi";

const COMPONENT_HEADER = [
    {
        key: "nim",
        title: "NIM",
        sortable: false,
    },
    {
        key: "name",
        title: "Nama Mahasiswa",
        sortable: false,
    },
    {
        key: "kelompok",
        title: "Kelompok",
        sortable: false,
    },
    {
        key: "anamnesis",
        title: "anamnesis",
        sortable: false,
    },
    {
        key: "foto_oi",
        title: "foto_oi",
        sortable: false,
    },
    {
        key: "cetak_rahang",
        title: "cetak_rahang",
        sortable: false,
    },
    {
        key: "modelstudi_one",
        title: "modelstudi_one",
        sortable: false,
    },
    {
        key: "analisissefalometri",
        title: "analisissefalometri",
        sortable: false,
    },
    {
        key: "fotografi_oral",
        title: "fotografi_oral",
        sortable: false,
    },
    {
        key: "rencana_perawatan",
        title: "rencana_perawatan",
        sortable: false,
    },
    {
        key: "insersi_alat",
        title: "insersi_alat",
        sortable: false,
    },
    {
        key: "aktivasi_alat",
        title: "aktivasi_alat",
        sortable: false,
    },
    {
        key: "kontrol",
        title: "kontrol",
        sortable: false,
    },
    {
        key: "model_studi_2",
        title: "model_studi_2",
        sortable: false,
    },
    {
        key: "penilaian_hasil_perawatan",
        title: "penilaian_hasil_perawatan",
        sortable: false,
    },
    {
        key: "laporan_khusus",
        title: "laporan_khusus",
        sortable: false,
    },
    {
        key: "totalakhir",
        title: "Total",
        sortable: false,
    },
    {
        key: "grade",
        title: "Grade",
        sortable: false,
    },
    {
        key: "keterangan_grade",
        title: "Keterangan",
        sortable: false,
    },
];

const COMPONENT_FORMS = {
    id: "",
    idhdr: "",
    dateupdate: "",
    assesmentgroupid: "",
    iddetail: "",
    assesmenttype: "4",
    kode_sub_name: "",
    assesmentskala: "",
    dateupdatedetail: "",
    assesmentdescription: "",
    assementvalue: "0",
    kodesub: "",
    index_sub: "",
    konditevalue: "0",
    assementscore: "0",
    active: "",
    assesmentskalavaluestart: "0",
    assesmentskalavalueend: "0",
    grandotal: "0",
    yearid: useRouter().currentRoute.value.query.yearid,
    semesterid: useRouter().currentRoute.value.query.semesterid,
};

const COMPONENT_APIS = {
    getAllItems: "/v1/transaction/recapitulation/ortodonti/viewall",
    // getHeader: "/v1/transaction/assesment/viewtrsassesmentheaderbyid",
    // getDetailPenilaian:
    //     "/v1/transaction/assesment/viewtrsassesmentdetalbyidandtype",
    // getItem: "/v1/emr/periodonti/soap/showbyid",
    // createItem: "/v1/emr/periodonti/soap/create",
    // updateItem: "/v1/transaction/assesment/updatedetailsbyitem",
    // deleteItem: "/v1/emr/periodonti/soap/delete",
};

const COMPONENT_IDEMR = useRouter().currentRoute.value.query.uuid;

</script>

<template v-slot:form="{ forms }">
    <v-container>
        <h4>Form Rekapitulasi Penilaian</h4>
        <br />

        <br />
        <RekapitulasiComponent
            :title="COMPONENT_TITLE"
            :header="COMPONENT_HEADER"
            :forms="COMPONENT_FORMS"
            :apis="COMPONENT_APIS"
            :idemr="COMPONENT_IDEMR">
            <template v-slot:form="{ forms }">
                <v-form>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="forms.assesmentdescription"
                                variant="outlined"
                                readonly
                                label="Deskripsi Penilaian"></v-textarea>
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
        </RekapitulasiComponent>
    </v-container>
</template>
