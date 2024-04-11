<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Radiologi",
});

const COMPONENT_BADGE = [ "Radiologi", "/", ];

const COMPONENT_HEADER =
[

    {
        key: "patientname",
        title: "nama pasien",
        sortable: false,
    },
    {
        key: "noepisode",
        title: "no episode",
        sortable: false,
    },
    {
        key: "noregistrasi",
        title: "no registrasi",
        sortable: false,
    },
    {
        key: "nomr",
        title: "no mr",
        sortable: false,
    },
    {
        key: "visit_date",
        title: "tgl kunjungan",
        sortable: false,
    },
    {
        key: "namaunit",
        title: "poliklinik",
        sortable: false,
    },
    {
        key: "namadokter",
        title: "dokter",
        sortable: false,
    },
    {
        key: "namajaminan",
        title: "jaminan",
        sortable: false,
    },
    {
        key: "status_emr",
        title: "EMR",
        sortable: false,
    },
    {
        key: "status_penilaian",
        title: "penilaian",
        sortable: false,
    },
    {
        key: "jenis_radiologi",
        title: "Jenis Radiologi",
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
    name: "",
    active: 1,
};

const COMPONENT_APIS =
{
    getAllItems: "/v1/masterdata/universities/viewall",
    getItem: "/v1/masterdata/universities/view/id",
    createItem: "/v1/masterdata/universities/create",
    updateItem: "/v1/masterdata/universities/update",
};

</script>

<template>
    <ItemComponent :badge="COMPONENT_BADGE" :header="COMPONENT_HEADER" :forms="COMPONENT_FORMS" :apis="COMPONENT_APIS">
        <template v-slot:form="{ forms, }">
            <v-form>
                <v-text-field v-model="forms.patientname" label="Nama"></v-text-field>
                <v-text-field v-model="forms.nomr" label="No. MR"></v-text-field>
                <v-text-field v-model="forms.visit_date" label="Tanggal Pasien"></v-text-field>
                <!-- <v-text-field v-model="forms.tglpotret" label="Tanggal Potret"></v-text-field> -->
                <v-text-field v-model="forms.date_of_birth" label="Usia"></v-text-field>
                <v-text-field v-model="forms.address" label="Alamat"></v-text-field>
                <v-select v-model="forms.jenis_radiologi" label="Jenis Radiologi" :items="['Oklusi','Panoramik','Periapikal']"></v-select>
                <v-radio-group v-model="forms.active">
                    <template v-slot:label>
                        <div><strong>{{ $t ("action.state") }}</strong></div>
                    </template>
                    <v-radio label="Aktif" :value="1"></v-radio>
                    <v-radio label="Tidak Aktif" :value="0"></v-radio>
                </v-radio-group>
            </v-form>
        </template>
        <template v-slot:item="{ item, }">
            <v-form color="success">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row><v-text-field color="success" label="ID" variant="underlined" :model-value="item.id"></v-text-field></v-row>
                            <v-row><v-text-field label="Nama" variant="underlined" :model-value="item.name"></v-text-field></v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row>
                                <v-text-field label="Status" variant="underlined" :model-value="item.active ? 'Aktif' : 'Tidak Aktif'">
                                    <template v-slot:prepend>
                                        <v-icon :color="item.active ? 'primary' : 'warning'">{{ item.active ? 'mdi-checkbox-marked-circle' : 'mdi-close-circle' }}</v-icon>
                                    </template>
                                </v-text-field>
                            </v-row>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col>
                            <v-row v-if="item.updated_at"><v-text-field label="Pembaharuan" variant="underlined" :model-value="useDateTime (item.updated_at).ins.fromNow ()"></v-text-field></v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </ItemComponent>
</template>
