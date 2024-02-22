<script setup>
 
import {useRouter} from "vue-router";

definePageMeta({
    layout: "dashboard",
    title: "emrperiodonsi",
});
 
const tab  = ref(null);
const tab2  = ref(null);
const tab3  = ref(null);
const ListComponent = ref(null);

const forms = reactive({
    id: "",     
    nama_mahasiswa: "",
    npm: "141300001",
    tahun_klinik: "",
    opsi_imagemahasiswa: "",
    noregister:  useRouter().currentRoute.value.query.noreg,
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
    konsuldari: "",
    keluhanutama: "",
    anamnesis: "",
    gusi_mudah_berdarah: "",
    gusi_mudah_berdarah_lainlain: "",
    penyakit_sistemik: "",
    penyakit_sistemik_bilaada: "",
    penyakit_sistemik_obat: "",
    diabetes_melitus: "",
    diabetes_melituskadargula: "",
    merokok: "",
    merokok_perhari: "",
    merokok_tahun_awal: "-01-01",
    merokok_tahun_akhir: "-01-01",
    gigi_pernah_tanggal_dalam_keadaan_baik: "",
    keadaan_umum: "",
    tekanan_darah: "",
    extra_oral: "",
    intra_oral: "",
    oral_hygiene_bop: "",
    oral_hygiene_ci: "",
    oral_hygiene_pi: "",
    oral_hygiene_ohis: "",
    kesimpulan_ohis: "",
    rakn_keaadan_gingiva: "",
    rakn_karang_gigi: "",
    rakn_oklusi: "",
    rakn_artikulasi: "",
    rakn_abrasi_atrisi_abfraksi: "",
    ram_keaadan_gingiva: "",
    ram_karang_gigi: "",
    ram_oklusi: "",
    ram_artikulasi: "",
    ram_abrasi_atrisi_abfraksi: "",
    rakr_keaadan_gingiva: "",
    rakr_karang_gigi: "",
    rakr_oklusi: "",
    rakr_artikulasi: "",
    rakr_abrasi_atrisi_abfraksi: "",
    rbkn_keaadan_gingiva: "",
    rbkn_karang_gigi: "",
    rbkn_oklusi: "",
    rbkn_artikulasi: "",
    rbkn_abrasi_atrisi_abfraksi: "",
    rbm_keaadan_gingiva: "",
    rbm_karang_gigi: "",
    rbm_oklusi: "",
    rbm_artikulasi: "",
    rbm_abrasi_atrisi_abfraksi: "",
    rbkr_keaadan_gingiva: "",
    rbkr_karang_gigi: "",
    rbkr_oklusi: "",
    rbkr_artikulasi: "",
    rbkr_abrasi_atrisi_abfraksi: "",
    rakn_6_v: "",
    rakn_6_g: "",
    rakn_6_pm: "",
    rakn_6_pb: "",
    rakn_6_pd: "",
    rakn_6_o: "",
    rakn_6_r: "",
    rakn_6_la: "",
    rakn_6_mp: "",
    rakn_6_bop: "",
    rakn_6_tk: "",
    rakn_6_fi: "",
    rakn_6_k: "",
    rakn_6_t: "",
    rakn_7_v: "",
    rakn_7_g: "",
    rakn_7_pm: "",
    rakn_7_pb: "",
    rakn_7_pd: "",
    rakn_7_o: "",
    rakn_7_r: "",
    rakn_7_la: "",
    rakn_7_mp: "",
    rakn_7_bop: "",
    rakn_7_tk: "",
    rakn_7_fi: "",
    rakn_7_k: "",
    rakn_7_t: "",
    rakn_8_v: "",
    rakn_8_g: "",
    rakn_8_pm: "",
    rakn_8_pb: "",
    rakn_8_pd: "",
    rakn_8_o: "",
    rakn_8_r: "",
    rakn_8_la: "",
    rakn_8_mp: "",
    rakn_8_bop: "",
    rakn_8_tk: "",
    rakn_8_fi: "",
    rakn_8_k: "",
    rakn_8_t: "",
    rakr_1_v: "",
    rakr_1_g: "",
    rakr_1_pm: "",
    rakr_1_pb: "",
    rakr_1_pd: "",
    rakr_1_o: "",
    rakr_1_r: "",
    rakr_1_la: "",
    rakr_1_mp: "",
    rakr_1_bop: "",
    rakr_1_tk: "",
    rakr_1_fi: "",
    rakr_1_k: "",
    rakr_1_t: "",
    rakr_2_v: "",
    rakr_2_g: "",
    rakr_2_pm: "",
    rakr_2_pb: "",
    rakr_2_pd: "",
    rakr_2_o: "",
    rakr_2_r: "",
    rakr_2_la: "",
    rakr_2_mp: "",
    rakr_2_bop: "",
    rakr_2_tk: "",
    rakr_2_fi: "",
    rakr_2_k: "",
    rakr_2_t: "",
    rakr_3_v: "",
    rakr_3_g: "",
    rakr_3_pm: "",
    rakr_3_pb: "",
    rakr_3_pd: "",
    rakr_3_o: "",
    rakr_3_r: "",
    rakr_3_la: "",
    rakr_3_mp: "",
    rakr_3_bop: "",
    rakr_3_tk: "",
    rakr_3_fi: "",
    rakr_3_k: "",
    rakr_3_t: "",
    rakr_4_v: "",
    rakr_4_g: "",
    rakr_4_pm: "",
    rakr_4_pb: "",
    rakr_4_pd: "",
    rakr_4_o: "",
    rakr_4_r: "",
    rakr_4_la: "",
    rakr_4_mp: "",
    rakr_4_bop: "",
    rakr_4_tk: "",
    rakr_4_fi: "",
    rakr_4_k: "",
    rakr_4_t: "",
    rakr_5_v: "",
    rakr_5_g: "",
    rakr_5_pm: "",
    rakr_5_pb: "",
    rakr_5_pd: "",
    rakr_5_o: "",
    rakr_5_r: "",
    rakr_5_la: "",
    rakr_5_mp: "",
    rakr_5_bop: "",
    rakr_5_tk: "",
    rakr_5_fi: "",
    rakr_5_k: "",
    rakr_5_t: "",
    rakr_6_v: "",
    rakr_6_g: "",
    rakr_6_pm: "",
    rakr_6_pb: "",
    rakr_6_pd: "",
    rakr_6_o: "",
    rakr_6_r: "",
    rakr_6_la: "",
    rakr_6_mp: "",
    rakr_6_bop: "",
    rakr_6_tk: "",
    rakr_6_fi: "",
    rakr_6_k: "",
    rakr_6_t: "",
    rakr_7_v: "",
    rakr_7_g: "",
    rakr_7_pm: "",
    rakr_7_pb: "",
    rakr_7_pd: "",
    rakr_7_o: "",
    rakr_7_r: "",
    rakr_7_la: "",
    rakr_7_mp: "",
    rakr_7_bop: "",
    rakr_7_tk: "",
    rakr_7_fi: "",
    rakr_7_k: "",
    rakr_7_t: "",
    rakr_8_v: "",
    rakr_8_g: "",
    rakr_8_pm: "",
    rakr_8_pb: "",
    rakr_8_pd: "",
    rakr_8_o: "",
    rakr_8_r: "",
    rakr_8_la: "",
    rakr_8_mp: "",
    rakr_8_bop: "",
    rakr_8_tk: "",
    rakr_8_fi: "",
    rakr_8_k: "",
    rakr_8_t: "",
    rbkn_1_v: "",
    rbkn_1_g: "",
    rbkn_1_pm: "",
    rbkn_1_pb: "",
    rbkn_1_pd: "",
    rbkn_1_o: "",
    rbkn_1_r: "",
    rbkn_1_la: "",
    rbkn_1_mp: "",
    rbkn_1_bop: "",
    rbkn_1_tk: "",
    rbkn_1_fi: "",
    rbkn_1_k: "",
    rbkn_1_t: "",
    rbkn_2_v: "",
    rbkn_2_g: "",
    rbkn_2_pm: "",
    rbkn_2_pb: "",
    rbkn_2_pd: "",
    rbkn_2_o: "",
    rbkn_2_r: "",
    rbkn_2_la: "",
    rbkn_2_mp: "",
    rbkn_2_bop: "",
    rbkn_2_tk: "",
    rbkn_2_fi: "",
    rbkn_2_k: "",
    rbkn_2_t: "",
    rbkn_3_v: "",
    rbkn_3_g: "",
    rbkn_3_pm: "",
    rbkn_3_pb: "",
    rbkn_3_pd: "",
    rbkn_3_o: "",
    rbkn_3_r: "",
    rbkn_3_la: "",
    rbkn_3_mp: "",
    rbkn_3_bop: "",
    rbkn_3_tk: "",
    rbkn_3_fi: "",
    rbkn_3_k: "",
    rbkn_3_t: "",
    rbkn_4_v: "",
    rbkn_4_g: "",
    rbkn_4_pm: "",
    rbkn_4_pb: "",
    rbkn_4_pd: "",
    rbkn_4_o: "",
    rbkn_4_r: "",
    rbkn_4_la: "",
    rbkn_4_mp: "",
    rbkn_4_bop: "",
    rbkn_4_tk: "",
    rbkn_4_fi: "",
    rbkn_4_k: "",
    rbkn_4_t: "",
    rbkn_5_v: "",
    rbkn_5_g: "",
    rbkn_5_pm: "",
    rbkn_5_pb: "",
    rbkn_5_pd: "",
    rbkn_5_o: "",
    rbkn_5_r: "",
    rbkn_5_la: "",
    rbkn_5_mp: "",
    rbkn_5_bop: "",
    rbkn_5_tk: "",
    rbkn_5_fi: "",
    rbkn_5_k: "",
    rbkn_5_t: "",
    rbkn_6_v: "",
    rbkn_6_g: "",
    rbkn_6_pm: "",
    rbkn_6_pb: "",
    rbkn_6_pd: "",
    rbkn_6_o: "",
    rbkn_6_r: "",
    rbkn_6_la: "",
    rbkn_6_mp: "",
    rbkn_6_bop: "",
    rbkn_6_tk: "",
    rbkn_6_fi: "",
    rbkn_6_k: "",
    rbkn_6_t: "",
    rbkn_7_v: "",
    rbkn_7_g: "",
    rbkn_7_pm: "",
    rbkn_7_pb: "",
    rbkn_7_pd: "",
    rbkn_7_o: "",
    rbkn_7_r: "",
    rbkn_7_la: "",
    rbkn_7_mp: "",
    rbkn_7_bop: "",
    rbkn_7_tk: "",
    rbkn_7_fi: "",
    rbkn_7_k: "",
    rbkn_7_t: "",
    rbkn_8_v: "",
    rbkn_8_g: "",
    rbkn_8_pm: "",
    rbkn_8_pb: "",
    rbkn_8_pd: "",
    rbkn_8_o: "",
    rbkn_8_r: "",
    rbkn_8_la: "",
    rbkn_8_mp: "",
    rbkn_8_bop: "",
    rbkn_8_tk: "",
    rbkn_8_fi: "",
    rbkn_8_k: "",
    rbkn_8_t: "",
    rbkr_1_v: "",
    rbkr_1_g: "",
    rbkr_1_pm: "",
    rbkr_1_pb: "",
    rbkr_1_pd: "",
    rbkr_1_o: "",
    rbkr_1_r: "",
    rbkr_1_la: "",
    rbkr_1_mp: "",
    rbkr_1_bop: "",
    rbkr_1_tk: "",
    rbkr_1_fi: "",
    rbkr_1_k: "",
    rbkr_1_t: "",
    rbkr_2_v: "",
    rbkr_2_g: "",
    rbkr_2_pm: "",
    rbkr_2_pb: "",
    rbkr_2_pd: "",
    rbkr_2_o: "",
    rbkr_2_r: "",
    rbkr_2_la: "",
    rbkr_2_mp: "",
    rbkr_2_bop: "",
    rbkr_2_tk: "",
    rbkr_2_fi: "",
    rbkr_2_k: "",
    rbkr_2_t: "",
    rbkr_3_v: "",
    rbkr_3_g: "",
    rbkr_3_pm: "",
    rbkr_3_pb: "",
    rbkr_3_pd: "",
    rbkr_3_o: "",
    rbkr_3_r: "",
    rbkr_3_la: "",
    rbkr_3_mp: "",
    rbkr_3_bop: "",
    rbkr_3_tk: "",
    rbkr_3_fi: "",
    rbkr_3_k: "",
    rbkr_3_t: "",
    rbkr_4_v: "",
    rbkr_4_g: "",
    rbkr_4_pm: "",
    rbkr_4_pb: "",
    rbkr_4_pd: "",
    rbkr_4_o: "",
    rbkr_4_r: "",
    rbkr_4_la: "",
    rbkr_4_mp: "",
    rbkr_4_bop: "",
    rbkr_4_tk: "",
    rbkr_4_fi: "",
    rbkr_4_k: "",
    rbkr_4_t: "",
    rbkr_5_v: "",
    rbkr_5_g: "",
    rbkr_5_pm: "",
    rbkr_5_pb: "",
    rbkr_5_pd: "",
    rbkr_5_o: "",
    rbkr_5_r: "",
    rbkr_5_la: "",
    rbkr_5_mp: "",
    rbkr_5_bop: "",
    rbkr_5_tk: "",
    rbkr_5_fi: "",
    rbkr_5_k: "",
    rbkr_5_t: "",
    rbkr_6_v: "",
    rbkr_6_g: "",
    rbkr_6_pm: "",
    rbkr_6_pb: "",
    rbkr_6_pd: "",
    rbkr_6_o: "",
    rbkr_6_r: "",
    rbkr_6_la: "",
    rbkr_6_mp: "",
    rbkr_6_bop: "",
    rbkr_6_tk: "",
    rbkr_6_fi: "",
    rbkr_6_k: "",
    rbkr_6_t: "",
    rbkr_7_v: "",
    rbkr_7_g: "",
    rbkr_7_pm: "",
    rbkr_7_pb: "",
    rbkr_7_pd: "",
    rbkr_7_o: "",
    rbkr_7_r: "",
    rbkr_7_la: "",
    rbkr_7_mp: "",
    rbkr_7_bop: "",
    rbkr_7_tk: "",
    rbkr_7_fi: "",
    rbkr_7_k: "",
    rbkr_7_t: "",
    rbkr_8_v: "",
    rbkr_8_g: "",
    rbkr_8_pm: "",
    rbkr_8_pb: "",
    rbkr_8_pd: "",
    rbkr_8_o: "",
    rbkr_8_r: "",
    rbkr_8_la: "",
    rbkr_8_mp: "",
    rbkr_8_bop: "",
    rbkr_8_tk: "",
    rbkr_8_fi: "",
    rbkr_8_k: "",
    rbkr_8_t: "",
    diagnosis_klinik: "",
    gambaran_radiografis: "",
    indikasi: "",
    terapi: "",
    keterangan: "",
    prognosis_umum: "",
    prognosis_lokal: "",
    p1_tanggal: "",
    p1_indeksplak_ra_el16_b: "",
    p1_indeksplak_ra_el16_l: "",
    p1_indeksplak_rb_el36_b: "",
    p1_indeksplak_rb_el36_l: "",
    p1_bop_ra_el16_b: "",
    p1_bop_ra_el16_l: "",
    p1_bop_rb_el36_b: "",
    p1_bop_rb_el36_l: "",
    p1_indeksplak_ra_el12_b: "",
    p1_indeksplak_ra_el12_l: "",
    p1_indeksplak_rb_el34_b: "",
    p1_indeksplak_rb_el34_l: "",
    p1_bop_ra_el12_b: "",
    p1_bop_ra_el12_l: "",
    p1_bop_rb_el34_b: "",
    p1_bop_rb_el34_l: "",
     p1_indeksplak_ra_el11_b: "",
     p1_indeksplak_ra_el11_l: "",
     p1_indeksplak_rb_el32_b: "",
     p1_indeksplak_rb_el32_l: "",
     p1_bop_ra_el11_b: "",
     p1_bop_ra_el11_l: "",
     p1_bop_rb_el32_b: "",
     p1_bop_rb_el32_l: "",
    p1_indeksplak_ra_el21_b: "",
    p1_indeksplak_ra_el21_l: "",
    p1_indeksplak_rb_el31_b: "",
    p1_indeksplak_rb_el31_l: "",
    p1_bop_ra_el21_b: "",
    p1_bop_ra_el21_l: "",
    p1_bop_rb_el31_b: "",
    p1_bop_rb_el31_l: "",
    p1_indeksplak_ra_el22_b: "",
    p1_indeksplak_ra_el22_l: "",
    p1_indeksplak_rb_el41_b: "",
    p1_indeksplak_rb_el41_l: "",
    p1_bop_ra_el22_b: "",
    p1_bop_ra_el22_l: "",
    p1_bop_rb_el41_b: "",
    p1_bop_rb_el41_l: "",
    p1_indeksplak_ra_el24_b: "",
    p1_indeksplak_ra_el24_l: "",
    p1_indeksplak_rb_el42_b: "",
    p1_indeksplak_rb_el42_l: "",
    p1_bop_ra_el24_b: "",
    p1_bop_ra_el24_l: "",
    p1_bop_rb_el42_b: "",
    p1_bop_rb_el42_l: "",
    p1_indeksplak_ra_el26_b: "",
    p1_indeksplak_ra_el26_l: "",
    p1_indeksplak_rb_el46_b: "",
    p1_indeksplak_rb_el46_l: "",
    p1_bop_ra_el26_b: "",
    p1_bop_ra_el26_l: "",
    p1_bop_rb_el46_b: "",
    p1_bop_rb_el46_l: "",
    p1_indekskalkulus_rb_el36_b: "",
    p1_indekskalkulus_rb_el34_b: "",
    p1_indekskalkulus_rb_el32_b: "",
    p1_indekskalkulus_rb_el31_b: "",
    p1_indekskalkulus_rb_el41_b: "",
    p1_indekskalkulus_rb_el42_b: "",
    p1_indekskalkulus_rb_el46_b: "",
    p1_indekskalkulus_rb_el36_l: "",
    p1_indekskalkulus_rb_el34_l: "",
    p1_indekskalkulus_rb_el32_l: "",
    p1_indekskalkulus_rb_el31_l: "",
    p1_indekskalkulus_rb_el41_l: "",
    p1_indekskalkulus_rb_el42_l: "",
    p1_indekskalkulus_rb_el46_l: "",
    p2_tanggal: "",
    p2_indeksplak_ra_el16_b: "",
    p2_indeksplak_ra_el12_b: "",
    p2_indeksplak_ra_el11_b: "",
    p2_indeksplak_ra_el21_b: "",
    p2_indeksplak_ra_el22_b: "",
    p2_indeksplak_ra_el24_b: "",
    p2_indeksplak_ra_el26_b: "",
    p2_indeksplak_ra_el16_l: "",
    p2_indeksplak_ra_el12_l: "",
    p2_indeksplak_ra_el11_l: "",
    p2_indeksplak_ra_el21_l: "",
    p2_indeksplak_ra_el22_l: "",
    p2_indeksplak_ra_el24_l: "",
    p2_indeksplak_ra_el26_l: "",
    p2_indeksplak_rb_el36_b: "",
    p2_indeksplak_rb_el34_b: "",
    p2_indeksplak_rb_el32_b: "",
    p2_indeksplak_rb_el31_b: "",
    p2_indeksplak_rb_el41_b: "",
    p2_indeksplak_rb_el42_b: "",
    p2_indeksplak_rb_el46_b: "",
    p2_indeksplak_rb_el36_l: "",
    p2_indeksplak_rb_el34_l: "",
    p2_indeksplak_rb_el32_l: "",
    p2_indeksplak_rb_el31_l: "",
    p2_indeksplak_rb_el41_l: "",
    p2_indeksplak_rb_el42_l: "",
    p2_indeksplak_rb_el46_l: "",
    p2_bop_ra_el16_b: "",
    p2_bop_ra_el12_b: "",
    p2_bop_ra_el11_b: "",
    p2_bop_ra_el21_b: "",
    p2_bop_ra_el22_b: "",
    p2_bop_ra_el24_b: "",
    p2_bop_ra_el26_b: "",
    p2_bop_ra_el16_l: "",
    p2_bop_ra_el12_l: "",
    p2_bop_ra_el11_l: "",
    p2_bop_ra_el21_l: "",
    p2_bop_ra_el22_l: "",
    p2_bop_ra_el24_l: "",
    p2_bop_ra_el26_l: "",
    p2_bop_rb_el36_b: "",
    p2_bop_rb_el34_b: "",
    p2_bop_rb_el32_b: "",
    p2_bop_rb_el31_b: "",
    p2_bop_rb_el41_b: "",
    p2_bop_rb_el42_b: "",
    p2_bop_rb_el46_b: "",
    p2_bop_rb_el36_l: "",
    p2_bop_rb_el34_l: "",
    p2_bop_rb_el32_l: "",
    p2_bop_rb_el31_l: "",
    p2_bop_rb_el41_l: "",
    p2_bop_rb_el42_l: "",
    p2_bop_rb_el46_l: "",
    p2_indekskalkulus_ra_el16_b: "",
    p2_indekskalkulus_ra_el26_b: "",
    p2_indekskalkulus_ra_el16_l: "",
    p2_indekskalkulus_ra_el26_l: "",
    p2_indekskalkulus_rb_el36_b: "",
    p2_indekskalkulus_rb_el34_b: "",
    p2_indekskalkulus_rb_el32_b: "",
    p2_indekskalkulus_rb_el31_b: "",
    p2_indekskalkulus_rb_el41_b: "",
    p2_indekskalkulus_rb_el42_b: "",
    p2_indekskalkulus_rb_el46_b: "",
    p2_indekskalkulus_rb_el36_l: "",
    p2_indekskalkulus_rb_el34_l: "",
    p2_indekskalkulus_rb_el32_l: "",
    p2_indekskalkulus_rb_el31_l: "",
    p2_indekskalkulus_rb_el41_l: "",
    p2_indekskalkulus_rb_el42_l: "",
    p2_indekskalkulus_rb_el46_l: "",
    p3_tanggal: "",
    p3_indeksplak_ra_el16_b: "",
    p3_indeksplak_ra_el12_b: "",
    p3_indeksplak_ra_el11_b: "",
    p3_indeksplak_ra_el21_b: "",
    p3_indeksplak_ra_el22_b: "",
    p3_indeksplak_ra_el24_b: "",
    p3_indeksplak_ra_el26_b: "",
    p3_indeksplak_ra_el16_l: "",
    p3_indeksplak_ra_el12_l: "",
    p3_indeksplak_ra_el11_l: "",
    p3_indeksplak_ra_el21_l: "",
    p3_indeksplak_ra_el22_l: "",
    p3_indeksplak_ra_el24_l: "",
    p3_indeksplak_ra_el26_l: "",
    p3_indeksplak_rb_el36_b: "",
    p3_indeksplak_rb_el34_b: "",
    p3_indeksplak_rb_el32_b: "",
    p3_indeksplak_rb_el31_b: "",
    p3_indeksplak_rb_el41_b: "",
    p3_indeksplak_rb_el42_b: "",
    p3_indeksplak_rb_el46_b: "",
    p3_indeksplak_rb_el36_l: "",
    p3_indeksplak_rb_el34_l: "",
    p3_indeksplak_rb_el32_l: "",
    p3_indeksplak_rb_el31_l: "",
    p3_indeksplak_rb_el41_l: "",
    p3_indeksplak_rb_el42_l: "",
    p3_indeksplak_rb_el46_l: "",
    p3_bop_ra_el16_b: "",
    p3_bop_ra_el12_b: "",
    p3_bop_ra_el11_b: "",
    p3_bop_ra_el21_b: "",
    p3_bop_ra_el22_b: "",
    p3_bop_ra_el24_b: "",
    p3_bop_ra_el26_b: "",
    p3_bop_ra_el16_l: "",
    p3_bop_ra_el12_l: "",
    p3_bop_ra_el11_l: "",
    p3_bop_ra_el21_l: "",
    p3_bop_ra_el22_l: "",
    p3_bop_ra_el24_l: "",
    p3_bop_ra_el26_l: "",
    p3_bop_rb_el36_b: "",
    p3_bop_rb_el34_b: "",
    p3_bop_rb_el32_b: "",
    p3_bop_rb_el31_b: "",
    p3_bop_rb_el41_b: "",
    p3_bop_rb_el42_b: "",
    p3_bop_rb_el46_b: "",
    p3_bop_rb_el36_l: "",
    p3_bop_rb_el34_l: "",
    p3_bop_rb_el32_l: "",
    p3_bop_rb_el31_l: "",
    p3_bop_rb_el41_l: "",
    p3_bop_rb_el42_l: "",
    p3_bop_rb_el46_l: "",
    p3_indekskalkulus_ra_el16_b: "",
    p3_indekskalkulus_ra_el26_b: "",
    p3_indekskalkulus_ra_el16_l: "",
    p3_indekskalkulus_ra_el26_l: "",
    p3_indekskalkulus_rb_el36_b: "",
    p3_indekskalkulus_rb_el34_b: "",
    p3_indekskalkulus_rb_el32_b: "",
    p3_indekskalkulus_rb_el31_b: "",
    p3_indekskalkulus_rb_el41_b: "",
    p3_indekskalkulus_rb_el42_b: "",
    p3_indekskalkulus_rb_el46_b: "",
    p3_indekskalkulus_rb_el36_l: "",
    p3_indekskalkulus_rb_el34_l: "",
    p3_indekskalkulus_rb_el32_l: "",
    p3_indekskalkulus_rb_el31_l: "",
    p3_indekskalkulus_rb_el41_l: "",
    p3_indekskalkulus_rb_el42_l: "",
    p3_indekskalkulus_rb_el46_l: "",
    foto_klinis_oklusi_arah_kiri: "",
    foto_klinis_oklusi_arah_kanan: "",
    foto_klinis_oklusi_arah_anterior: "",
    foto_klinis_oklusal_rahang_atas: "",
    foto_klinis_oklusal_rahang_bawah: "",
    foto_klinis_before: "",
    foto_klinis_after: "",
    foto_ronsen_panoramik: "",
    terapi_s: "",
    terapi_o: "",
    terapi_a: "",
    terapi_p: "",
    terapi_ohis: "",
    terapi_bop: "",
    terapi_pm18: "",
    terapi_pm17: "",
    terapi_pm16: "",
    terapi_pm15: "",
    terapi_pm14: "",
    terapi_pm13: "",
    terapi_pm12: "",
    terapi_pm11: "",
    terapi_pm21: "",
    terapi_pm22: "",
    terapi_pm23: "",
    terapi_pm24: "",
    terapi_pm25: "",
    terapi_pm26: "",
    terapi_pm27: "",
    terapi_pm28: "",
    terapi_pm38: "",
    terapi_pm37: "",
    terapi_pm36: "",
    terapi_pm35: "",
    terapi_pm34: "",
    terapi_pm33: "",
    terapi_pm32: "",
    terapi_pm31: "",
    terapi_pm41: "",
    terapi_pm42: "",
    terapi_pm43: "",
    terapi_pm44: "",
    terapi_pm45: "",
    terapi_pm46: "",
    terapi_pm47: "",
    terapi_pm48: "",
    terapi_pb18: "",
    terapi_pb17: "",
    terapi_pb16: "",
    terapi_pb15: "",
    terapi_pb14: "",
    terapi_pb13: "",
    terapi_pb12: "",
    terapi_pb11: "",
    terapi_pb21: "",
    terapi_pb22: "",
    terapi_pb23: "",
    terapi_pb24: "",
    terapi_pb25: "",
    terapi_pb26: "",
    terapi_pb27: "",
    terapi_pb28: "",
    terapi_pb38: "",
    terapi_pb37: "",
    terapi_pb36: "",
    terapi_pb35: "",
    terapi_pb34: "",
    terapi_pb33: "",
    terapi_pb32: "",
    terapi_pb31: "",
    terapi_pb41: "",
    terapi_pb42: "",
    terapi_pb43: "",
    terapi_pb44: "",
    terapi_pb45: "",
    terapi_pb46: "",
    terapi_pb47: "",
    terapi_pb48: "",
    terapi_pd18: "",
    terapi_pd17: "",
    terapi_pd16: "",
    terapi_pd15: "",
    terapi_pd14: "",
    terapi_pd13: "",
    terapi_pd12: "",
    terapi_pd11: "",
    terapi_pd21: "",
    terapi_pd22: "",
    terapi_pd23: "",
    terapi_pd24: "",
    terapi_pd25: "",
    terapi_pd26: "",
    terapi_pd27: "",
    terapi_pd28: "",
    terapi_pd38: "",
    terapi_pd37: "",
    terapi_pd36: "",
    terapi_pd35: "",
    terapi_pd34: "",
    terapi_pd33: "",
    terapi_pd32: "",
    terapi_pd31: "",
    terapi_pd41: "",
    terapi_pd42: "",
    terapi_pd43: "",
    terapi_pd44: "",
    terapi_pd45: "",
    terapi_pd46: "",
    terapi_pd47: "",
    terapi_pd48: "",
    terapi_pl18: "",
    terapi_pl17: "",
    terapi_pl16: "",
    terapi_pl15: "",
    terapi_pl14: "",
    terapi_pl13: "",
    terapi_pl12: "",
    terapi_pl11: "",
    terapi_pl21: "",
    terapi_pl22: "",
    terapi_pl23: "",
    terapi_pl24: "",
    terapi_pl25: "",
    terapi_pl26: "",
    terapi_pl27: "",
    terapi_pl28: "",
    terapi_pl38: "",
    terapi_pl37: "",
    terapi_pl36: "",
    terapi_pl35: "",
    terapi_pl34: "",
    terapi_pl33: "",
    terapi_pl32: "",
    terapi_pl31: "",
    terapi_pl41: "",
    terapi_pl42: "",
    terapi_pl43: "",
    terapi_pl44: "",
    terapi_pl45: "",
    terapi_pl46: "",
    terapi_pl47: "",
    terapi_pl48: "",

});

const setItems = async (target) =>
{
    const

    { token: tokenData, } = await useAuth (),
    { getItem, setItem, } = useItem (tokenData),
    formTarget = {};

    for (let form of Object.keys (forms)) {
        formTarget[form] = forms[form];
    }

    await setItem ("/v1/emr/periodonti/create/medicaldentalhistory", "",
    formTarget,
    (success) =>
    {
        if (success.code == 200){
            alert(success.message);
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
      // console.log(success.);

      // for (let form of Object.keys (forms)) {
      //     forms[form] = success[form];
      //   }
    },
    error => {});
};
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
        forms.id=success.data.id;        
        forms.foto_klinis_oklusi_arah_kiri=success.data.foto_klinis_oklusi_arah_kiri;
        forms.foto_klinis_oklusi_arah_kanan=success.data.foto_klinis_oklusi_arah_kanan; 
        forms.foto_klinis_oklusi_arah_anterior=success.data.foto_klinis_oklusi_arah_anterior;   
        forms.foto_klinis_oklusal_rahang_atas=success.data.foto_klinis_oklusal_rahang_atas;  
        forms.foto_klinis_oklusal_rahang_bawah=success.data.foto_klinis_oklusal_rahang_bawah;   
        forms.foto_klinis_before=success.data.foto_klinis_before; 
        forms.foto_klinis_after=success.data.foto_klinis_after;
        forms.foto_ronsen_panoramik=success.data.foto_ronsen_panoramik;
        forms.nama_mahasiswa = success.data.nama_mahasiswa;
        forms.npm = success.data.npm;
        forms.tahun_klinik = success.data.tahun_klinik;
        forms.opsi_imagemahasiswa = success.data.opsi_imagemahasiswa;
        forms.noregister = success.data.noregister;
        forms.noepisode = success.data.noepisode;
        forms.no_rekammedik = success.data.no_rekammedik;
        forms.kasus_pasien = success.data.kasus_pasien;
        forms.tanggal_pemeriksaan = success.data.tanggal_pemeriksaan;
        forms.pendidikan_pasien = success.data.pendidikan_pasien;
        forms.nama_pasien = success.data.nama_pasien;
        forms.umur_pasien = success.data.umur_pasien;
        forms.jenis_kelamin_pasien = success.data.jenis_kelamin_pasien;
        forms.alamat = success.data.alamat;
        forms.no_telephone_pasien = success.data.no_telephone_pasien;
        forms.pemeriksa = success.data.pemeriksa;
        forms.operator1 = success.data.operator1;
        forms.operator2 = success.data.operator2;
        forms.operator3 = success.data.operator3;
        forms.operator4 = success.data.operator4;
        forms.konsuldari = success.data.konsuldari;
        forms.keluhanutama = success.data.keluhanutama;
        forms.anamnesis = success.data.anamnesis;
        forms.gusi_mudah_berdarah = success.data.gusi_mudah_berdarah;
        forms.gusi_mudah_berdarah_lainlain = success.data.gusi_mudah_berdarah_lainlain;
        forms.penyakit_sistemik = success.data.penyakit_sistemik;
        forms.penyakit_sistemik_bilaada = success.data.penyakit_sistemik_bilaada;
        forms.penyakit_sistemik_obat = success.data.penyakit_sistemik_obat;
        forms.diabetes_melitus = success.data.diabetes_melitus;
        forms.diabetes_melituskadargula = success.data.diabetes_melituskadargula;
        forms.merokok = success.data.merokok;
        forms.merokok_perhari = success.data.merokok_perhari;
        forms.merokok_tahun_awal = success.data.merokok_tahun_awal;
        forms.merokok_tahun_akhir = success.data.merokok_tahun_akhir;
        forms.gigi_pernah_tanggal_dalam_keadaan_baik = success.data.gigi_pernah_tanggal_dalam_keadaan_baik;
        forms.keadaan_umum = success.data.keadaan_umum;
        forms.tekanan_darah = success.data.tekanan_darah;
        forms.extra_oral = success.data.extra_oral;
        forms.intra_oral = success.data.intra_oral;
        forms.oral_hygiene_bop = success.data.oral_hygiene_bop;
        forms.oral_hygiene_ci = success.data.oral_hygiene_ci;
        forms.oral_hygiene_pi = success.data.oral_hygiene_pi;
        forms.oral_hygiene_ohis = success.data.oral_hygiene_ohis;
        forms.kesimpulan_ohis = success.data.kesimpulan_ohis;
        forms.rakn_keaadan_gingiva = success.data.rakn_keaadan_gingiva;
        forms.rakn_karang_gigi = success.data.rakn_karang_gigi;
        forms.rakn_oklusi = success.data.rakn_oklusi;
        forms.rakn_artikulasi = success.data.rakn_artikulasi;
        forms.rakn_abrasi_atrisi_abfraksi = success.data.rakn_abrasi_atrisi_abfraksi;
        forms.ram_keaadan_gingiva = success.data.ram_keaadan_gingiva;
        forms.ram_karang_gigi = success.data.ram_karang_gigi;
        forms.ram_oklusi = success.data.ram_oklusi;
        forms.ram_artikulasi = success.data.ram_artikulasi;
        forms.ram_abrasi_atrisi_abfraksi = success.data.ram_abrasi_atrisi_abfraksi;
        forms.rakr_keaadan_gingiva = success.data.rakr_keaadan_gingiva;
        forms.rakr_karang_gigi = success.data.rakr_karang_gigi;
        forms.rakr_oklusi = success.data.rakr_oklusi;
        forms.rakr_artikulasi = success.data.rakr_artikulasi;
        forms.rakr_abrasi_atrisi_abfraksi = success.data.rakr_abrasi_atrisi_abfraksi;
        forms.rbkn_keaadan_gingiva = success.data.rbkn_keaadan_gingiva;
        forms.rbkn_karang_gigi = success.data.rbkn_karang_gigi;
        forms.rbkn_oklusi = success.data.rbkn_oklusi;
        forms.rbkn_artikulasi = success.data.rbkn_artikulasi;
        forms.rbkn_abrasi_atrisi_abfraksi = success.data.rbkn_abrasi_atrisi_abfraksi;
        forms.rbm_keaadan_gingiva = success.data.rbm_keaadan_gingiva;
        forms.rbm_karang_gigi = success.data.rbm_karang_gigi;
        forms.rbm_oklusi = success.data.rbm_oklusi;
        forms.rbm_artikulasi = success.data.rbm_artikulasi;
        forms.rbm_abrasi_atrisi_abfraksi = success.data.rbm_abrasi_atrisi_abfraksi;
        forms.rbkr_keaadan_gingiva = success.data.rbkr_keaadan_gingiva;
        forms.rbkr_karang_gigi = success.data.rbkr_karang_gigi;
        forms.rbkr_oklusi = success.data.rbkr_oklusi;
        forms.rbkr_artikulasi = success.data.rbkr_artikulasi;
        forms.rbkr_abrasi_atrisi_abfraksi = success.data.rbkr_abrasi_atrisi_abfraksi;
        forms.rakn_6_v = success.data.rakn_6_v;
        forms.rakn_6_g = success.data.rakn_6_g;
        forms.rakn_6_pm = success.data.rakn_6_pm;
        forms.rakn_6_pb = success.data.rakn_6_pb;
        forms.rakn_6_pd = success.data.rakn_6_pd;
        forms.rakn_6_o = success.data.rakn_6_o;
        forms.rakn_6_r = success.data.rakn_6_r;
        forms.rakn_6_la = success.data.rakn_6_la;
        forms.rakn_6_mp = success.data.rakn_6_mp;
        forms.rakn_6_bop = success.data.rakn_6_bop;
        forms.rakn_6_tk = success.data.rakn_6_tk;
        forms.rakn_6_fi = success.data.rakn_6_fi;
        forms.rakn_6_k = success.data.rakn_6_k;
        forms.rakn_6_t = success.data.rakn_6_t;
        forms.rakn_7_v = success.data.rakn_7_v;
        forms.rakn_7_g = success.data.rakn_7_g;
        forms.rakn_7_pm = success.data.rakn_7_pm;
        forms.rakn_7_pb = success.data.rakn_7_pb;
        forms.rakn_7_pd = success.data.rakn_7_pd;
        forms.rakn_7_o = success.data.rakn_7_o;
        forms.rakn_7_r = success.data.rakn_7_r;
        forms.rakn_7_la = success.data.rakn_7_la;
        forms.rakn_7_mp = success.data.rakn_7_mp;
        forms.rakn_7_bop = success.data.rakn_7_bop;
        forms.rakn_7_tk = success.data.rakn_7_tk;
        forms.rakn_7_fi = success.data.rakn_7_fi;
        forms.rakn_7_k = success.data.rakn_7_k;
        forms.rakn_7_t = success.data.rakn_7_t;
        forms.rakn_8_v = success.data.rakn_8_v;
        forms.rakn_8_g = success.data.rakn_8_g;
        forms.rakn_8_pm = success.data.rakn_8_pm;
        forms.rakn_8_pb = success.data.rakn_8_pb;
        forms.rakn_8_pd = success.data.rakn_8_pd;
        forms.rakn_8_o = success.data.rakn_8_o;
        forms.rakn_8_r = success.data.rakn_8_r;
        forms.rakn_8_la = success.data.rakn_8_la;
        forms.rakn_8_mp = success.data.rakn_8_mp;
        forms.rakn_8_bop = success.data.rakn_8_bop;
        forms.rakn_8_tk = success.data.rakn_8_tk;
        forms.rakn_8_fi = success.data.rakn_8_fi;
        forms.rakn_8_k = success.data.rakn_8_k;
        forms.rakn_8_t = success.data.rakn_8_t;
        forms.rakr_1_v = success.data.rakr_1_v;
        forms.rakr_1_g = success.data.rakr_1_g;
        forms.rakr_1_pm = success.data.rakr_1_pm;
        forms.rakr_1_pb = success.data.rakr_1_pb;
        forms.rakr_1_pd = success.data.rakr_1_pd;
        forms.rakr_1_o = success.data.rakr_1_o;
        forms.rakr_1_r = success.data.rakr_1_r;
        forms.rakr_1_la = success.data.rakr_1_la;
        forms.rakr_1_mp = success.data.rakr_1_mp;
        forms.rakr_1_bop = success.data.rakr_1_bop;
        forms.rakr_1_tk = success.data.rakr_1_tk;
        forms.rakr_1_fi = success.data.rakr_1_fi;
        forms.rakr_1_k = success.data.rakr_1_k;
        forms.rakr_1_t = success.data.rakr_1_t;
        forms.rakr_2_v = success.data.rakr_2_v;
        forms.rakr_2_g = success.data.rakr_2_g;
        forms.rakr_2_pm = success.data.rakr_2_pm;
        forms.rakr_2_pb = success.data.rakr_2_pb;
        forms.rakr_2_pd = success.data.rakr_2_pd;
        forms.rakr_2_o = success.data.rakr_2_o;
        forms.rakr_2_r = success.data.rakr_2_r;
        forms.rakr_2_la = success.data.rakr_2_la;
        forms.rakr_2_mp = success.data.rakr_2_mp;
        forms.rakr_2_bop = success.data.rakr_2_bop;
        forms.rakr_2_tk = success.data.rakr_2_tk;
        forms.rakr_2_fi = success.data.rakr_2_fi;
        forms.rakr_2_k = success.data.rakr_2_k;
        forms.rakr_2_t = success.data.rakr_2_t;
        forms.rakr_3_v = success.data.rakr_3_v;
        forms.rakr_3_g = success.data.rakr_3_g;
        forms.rakr_3_pm = success.data.rakr_3_pm;
        forms.rakr_3_pb = success.data.rakr_3_pb;
        forms.rakr_3_pd = success.data.rakr_3_pd;
        forms.rakr_3_o = success.data.rakr_3_o;
        forms.rakr_3_r = success.data.rakr_3_r;
        forms.rakr_3_la = success.data.rakr_3_la;
        forms.rakr_3_mp = success.data.rakr_3_mp;
        forms.rakr_3_bop = success.data.rakr_3_bop;
        forms.rakr_3_tk = success.data.rakr_3_tk;
        forms.rakr_3_fi = success.data.rakr_3_fi;
        forms.rakr_3_k = success.data.rakr_3_k;
        forms.rakr_3_t = success.data.rakr_3_t;
        forms.rakr_4_v = success.data.rakr_4_v;
        forms.rakr_4_g = success.data.rakr_4_g;
        forms.rakr_4_pm = success.data.rakr_4_pm;
        forms.rakr_4_pb = success.data.rakr_4_pb;
        forms.rakr_4_pd = success.data.rakr_4_pd;
        forms.rakr_4_o = success.data.rakr_4_o;
        forms.rakr_4_r = success.data.rakr_4_r;
        forms.rakr_4_la = success.data.rakr_4_la;
        forms.rakr_4_mp = success.data.rakr_4_mp;
        forms.rakr_4_bop = success.data.rakr_4_bop;
        forms.rakr_4_tk = success.data.rakr_4_tk;
        forms.rakr_4_fi = success.data.rakr_4_fi;
        forms.rakr_4_k = success.data.rakr_4_k;
        forms.rakr_4_t = success.data.rakr_4_t;
        forms.rakr_5_v = success.data.rakr_5_v;
        forms.rakr_5_g = success.data.rakr_5_g;
        forms.rakr_5_pm = success.data.rakr_5_pm;
        forms.rakr_5_pb = success.data.rakr_5_pb;
        forms.rakr_5_pd = success.data.rakr_5_pd;
        forms.rakr_5_o = success.data.rakr_5_o;
        forms.rakr_5_r = success.data.rakr_5_r;
        forms.rakr_5_la = success.data.rakr_5_la;
        forms.rakr_5_mp = success.data.rakr_5_mp;
        forms.rakr_5_bop = success.data.rakr_5_bop;
        forms.rakr_5_tk = success.data.rakr_5_tk;
        forms.rakr_5_fi = success.data.rakr_5_fi;
        forms.rakr_5_k = success.data.rakr_5_k;
        forms.rakr_5_t = success.data.rakr_5_t;
        forms.rakr_6_v = success.data.rakr_6_v;
        forms.rakr_6_g = success.data.rakr_6_g;
        forms.rakr_6_pm = success.data.rakr_6_pm;
        forms.rakr_6_pb = success.data.rakr_6_pb;
        forms.rakr_6_pd = success.data.rakr_6_pd;
        forms.rakr_6_o = success.data.rakr_6_o;
        forms.rakr_6_r = success.data.rakr_6_r;
        forms.rakr_6_la = success.data.rakr_6_la;
        forms.rakr_6_mp = success.data.rakr_6_mp;
        forms.rakr_6_bop = success.data.rakr_6_bop;
        forms.rakr_6_tk = success.data.rakr_6_tk;
        forms.rakr_6_fi = success.data.rakr_6_fi;
        forms.rakr_6_k = success.data.rakr_6_k;
        forms.rakr_6_t = success.data.rakr_6_t;
        forms.rakr_7_v = success.data.rakr_7_v;
        forms.rakr_7_g = success.data.rakr_7_g;
        forms.rakr_7_pm = success.data.rakr_7_pm;
        forms.rakr_7_pb = success.data.rakr_7_pb;
        forms.rakr_7_pd = success.data.rakr_7_pd;
        forms.rakr_7_o = success.data.rakr_7_o;
        forms.rakr_7_r = success.data.rakr_7_r;
        forms.rakr_7_la = success.data.rakr_7_la;
        forms.rakr_7_mp = success.data.rakr_7_mp;
        forms.rakr_7_bop = success.data.rakr_7_bop;
        forms.rakr_7_tk = success.data.rakr_7_tk;
        forms.rakr_7_fi = success.data.rakr_7_fi;
        forms.rakr_7_k = success.data.rakr_7_k;
        forms.rakr_7_t = success.data.rakr_7_t;
        forms.rakr_8_v = success.data.rakr_8_v;
        forms.rakr_8_g = success.data.rakr_8_g;
        forms.rakr_8_pm = success.data.rakr_8_pm;
        forms.rakr_8_pb = success.data.rakr_8_pb;
        forms.rakr_8_pd = success.data.rakr_8_pd;
        forms.rakr_8_o = success.data.rakr_8_o;
        forms.rakr_8_r = success.data.rakr_8_r;
        forms.rakr_8_la = success.data.rakr_8_la;
        forms.rakr_8_mp = success.data.rakr_8_mp;
        forms.rakr_8_bop = success.data.rakr_8_bop;
        forms.rakr_8_tk = success.data.rakr_8_tk;
        forms.rakr_8_fi = success.data.rakr_8_fi;
        forms.rakr_8_k = success.data.rakr_8_k;
        forms.rakr_8_t = success.data.rakr_8_t;
        forms.rbkn_1_v = success.data.rbkn_1_v;
        forms.rbkn_1_g = success.data.rbkn_1_g;
        forms.rbkn_1_pm = success.data.rbkn_1_pm;
        forms.rbkn_1_pb = success.data.rbkn_1_pb;
        forms.rbkn_1_pd = success.data.rbkn_1_pd;
        forms.rbkn_1_o = success.data.rbkn_1_o;
        forms.rbkn_1_r = success.data.rbkn_1_r;
        forms.rbkn_1_la = success.data.rbkn_1_la;
        forms.rbkn_1_mp = success.data.rbkn_1_mp;
        forms.rbkn_1_bop = success.data.rbkn_1_bop;
        forms.rbkn_1_tk = success.data.rbkn_1_tk;
        forms.rbkn_1_fi = success.data.rbkn_1_fi;
        forms.rbkn_1_k = success.data.rbkn_1_k;
        forms.rbkn_1_t = success.data.rbkn_1_t;
        forms.rbkn_2_v = success.data.rbkn_2_v;
        forms.rbkn_2_g = success.data.rbkn_2_g;
        forms.rbkn_2_pm = success.data.rbkn_2_pm;
        forms.rbkn_2_pb = success.data.rbkn_2_pb;
        forms.rbkn_2_pd = success.data.rbkn_2_pd;
        forms.rbkn_2_o = success.data.rbkn_2_o;
        forms.rbkn_2_r = success.data.rbkn_2_r;
        forms.rbkn_2_la = success.data.rbkn_2_la;
        forms.rbkn_2_mp = success.data.rbkn_2_mp;
        forms.rbkn_2_bop = success.data.rbkn_2_bop;
        forms.rbkn_2_tk = success.data.rbkn_2_tk;
        forms.rbkn_2_fi = success.data.rbkn_2_fi;
        forms.rbkn_2_k = success.data.rbkn_2_k;
        forms.rbkn_2_t = success.data.rbkn_2_t;
        forms.rbkn_3_v = success.data.rbkn_3_v;
        forms.rbkn_3_g = success.data.rbkn_3_g;
        forms.rbkn_3_pm = success.data.rbkn_3_pm;
        forms.rbkn_3_pb = success.data.rbkn_3_pb;
        forms.rbkn_3_pd = success.data.rbkn_3_pd;
        forms.rbkn_3_o = success.data.rbkn_3_o;
        forms.rbkn_3_r = success.data.rbkn_3_r;
        forms.rbkn_3_la = success.data.rbkn_3_la;
        forms.rbkn_3_mp = success.data.rbkn_3_mp;
        forms.rbkn_3_bop = success.data.rbkn_3_bop;
        forms.rbkn_3_tk = success.data.rbkn_3_tk;
        forms.rbkn_3_fi = success.data.rbkn_3_fi;
        forms.rbkn_3_k = success.data.rbkn_3_k;
        forms.rbkn_3_t = success.data.rbkn_3_t;
        forms.rbkn_4_v = success.data.rbkn_4_v;
        forms.rbkn_4_g = success.data.rbkn_4_g;
        forms.rbkn_4_pm = success.data.rbkn_4_pm;
        forms.rbkn_4_pb = success.data.rbkn_4_pb;
        forms.rbkn_4_pd = success.data.rbkn_4_pd;
        forms.rbkn_4_o = success.data.rbkn_4_o;
        forms.rbkn_4_r = success.data.rbkn_4_r;
        forms.rbkn_4_la = success.data.rbkn_4_la;
        forms.rbkn_4_mp = success.data.rbkn_4_mp;
        forms.rbkn_4_bop = success.data.rbkn_4_bop;
        forms.rbkn_4_tk = success.data.rbkn_4_tk;
        forms.rbkn_4_fi = success.data.rbkn_4_fi;
        forms.rbkn_4_k = success.data.rbkn_4_k;
        forms.rbkn_4_t = success.data.rbkn_4_t;
        forms.rbkn_5_v = success.data.rbkn_5_v;
        forms.rbkn_5_g = success.data.rbkn_5_g;
        forms.rbkn_5_pm = success.data.rbkn_5_pm;
        forms.rbkn_5_pb = success.data.rbkn_5_pb;
        forms.rbkn_5_pd = success.data.rbkn_5_pd;
        forms.rbkn_5_o = success.data.rbkn_5_o;
        forms.rbkn_5_r = success.data.rbkn_5_r;
        forms.rbkn_5_la = success.data.rbkn_5_la;
        forms.rbkn_5_mp = success.data.rbkn_5_mp;
        forms.rbkn_5_bop = success.data.rbkn_5_bop;
        forms.rbkn_5_tk = success.data.rbkn_5_tk;
        forms.rbkn_5_fi = success.data.rbkn_5_fi;
        forms.rbkn_5_k = success.data.rbkn_5_k;
        forms.rbkn_5_t = success.data.rbkn_5_t;
        forms.rbkn_6_v = success.data.rbkn_6_v;
        forms.rbkn_6_g = success.data.rbkn_6_g;
        forms.rbkn_6_pm = success.data.rbkn_6_pm;
        forms.rbkn_6_pb = success.data.rbkn_6_pb;
        forms.rbkn_6_pd = success.data.rbkn_6_pd;
        forms.rbkn_6_o = success.data.rbkn_6_o;
        forms.rbkn_6_r = success.data.rbkn_6_r;
        forms.rbkn_6_la = success.data.rbkn_6_la;
        forms.rbkn_6_mp = success.data.rbkn_6_mp;
        forms.rbkn_6_bop = success.data.rbkn_6_bop;
        forms.rbkn_6_tk = success.data.rbkn_6_tk;
        forms.rbkn_6_fi = success.data.rbkn_6_fi;
        forms.rbkn_6_k = success.data.rbkn_6_k;
        forms.rbkn_6_t = success.data.rbkn_6_t;
        forms.rbkn_7_v = success.data.rbkn_7_v;
        forms.rbkn_7_g = success.data.rbkn_7_g;
        forms.rbkn_7_pm = success.data.rbkn_7_pm;
        forms.rbkn_7_pb = success.data.rbkn_7_pb;
        forms.rbkn_7_pd = success.data.rbkn_7_pd;
        forms.rbkn_7_o = success.data.rbkn_7_o;
        forms.rbkn_7_r = success.data.rbkn_7_r;
        forms.rbkn_7_la = success.data.rbkn_7_la;
        forms.rbkn_7_mp = success.data.rbkn_7_mp;
        forms.rbkn_7_bop = success.data.rbkn_7_bop;
        forms.rbkn_7_tk = success.data.rbkn_7_tk;
        forms.rbkn_7_fi = success.data.rbkn_7_fi;
        forms.rbkn_7_k = success.data.rbkn_7_k;
        forms.rbkn_7_t = success.data.rbkn_7_t;
        forms.rbkn_8_v = success.data.rbkn_8_v;
        forms.rbkn_8_g = success.data.rbkn_8_g;
        forms.rbkn_8_pm = success.data.rbkn_8_pm;
        forms.rbkn_8_pb = success.data.rbkn_8_pb;
        forms.rbkn_8_pd = success.data.rbkn_8_pd;
        forms.rbkn_8_o = success.data.rbkn_8_o;
        forms.rbkn_8_r = success.data.rbkn_8_r;
        forms.rbkn_8_la = success.data.rbkn_8_la;
        forms.rbkn_8_mp = success.data.rbkn_8_mp;
        forms.rbkn_8_bop = success.data.rbkn_8_bop;
        forms.rbkn_8_tk = success.data.rbkn_8_tk;
        forms.rbkn_8_fi = success.data.rbkn_8_fi;
        forms.rbkn_8_k = success.data.rbkn_8_k;
        forms.rbkn_8_t = success.data.rbkn_8_t;
        forms.rbkr_1_v = success.data.rbkr_1_v;
        forms.rbkr_1_g = success.data.rbkr_1_g;
        forms.rbkr_1_pm = success.data.rbkr_1_pm;
        forms.rbkr_1_pb = success.data.rbkr_1_pb;
        forms.rbkr_1_pd = success.data.rbkr_1_pd;
        forms.rbkr_1_o = success.data.rbkr_1_o;
        forms.rbkr_1_r = success.data.rbkr_1_r;
        forms.rbkr_1_la = success.data.rbkr_1_la;
        forms.rbkr_1_mp = success.data.rbkr_1_mp;
        forms.rbkr_1_bop = success.data.rbkr_1_bop;
        forms.rbkr_1_tk = success.data.rbkr_1_tk;
        forms.rbkr_1_fi = success.data.rbkr_1_fi;
        forms.rbkr_1_k = success.data.rbkr_1_k;
        forms.rbkr_1_t = success.data.rbkr_1_t;
        forms.rbkr_2_v = success.data.rbkr_2_v;
        forms.rbkr_2_g = success.data.rbkr_2_g;
        forms.rbkr_2_pm = success.data.rbkr_2_pm;
        forms.rbkr_2_pb = success.data.rbkr_2_pb;
        forms.rbkr_2_pd = success.data.rbkr_2_pd;
        forms.rbkr_2_o = success.data.rbkr_2_o;
        forms.rbkr_2_r = success.data.rbkr_2_r;
        forms.rbkr_2_la = success.data.rbkr_2_la;
        forms.rbkr_2_mp = success.data.rbkr_2_mp;
        forms.rbkr_2_bop = success.data.rbkr_2_bop;
        forms.rbkr_2_tk = success.data.rbkr_2_tk;
        forms.rbkr_2_fi = success.data.rbkr_2_fi;
        forms.rbkr_2_k = success.data.rbkr_2_k;
        forms.rbkr_2_t = success.data.rbkr_2_t;
        forms.rbkr_3_v = success.data.rbkr_3_v;
        forms.rbkr_3_g = success.data.rbkr_3_g;
        forms.rbkr_3_pm = success.data.rbkr_3_pm;
        forms.rbkr_3_pb = success.data.rbkr_3_pb;
        forms.rbkr_3_pd = success.data.rbkr_3_pd;
        forms.rbkr_3_o = success.data.rbkr_3_o;
        forms.rbkr_3_r = success.data.rbkr_3_r;
        forms.rbkr_3_la = success.data.rbkr_3_la;
        forms.rbkr_3_mp = success.data.rbkr_3_mp;
        forms.rbkr_3_bop = success.data.rbkr_3_bop;
        forms.rbkr_3_tk = success.data.rbkr_3_tk;
        forms.rbkr_3_fi = success.data.rbkr_3_fi;
        forms.rbkr_3_k = success.data.rbkr_3_k;
        forms.rbkr_3_t = success.data.rbkr_3_t;
        forms.rbkr_4_v = success.data.rbkr_4_v;
        forms.rbkr_4_g = success.data.rbkr_4_g;
        forms.rbkr_4_pm = success.data.rbkr_4_pm;
        forms.rbkr_4_pb = success.data.rbkr_4_pb;
        forms.rbkr_4_pd = success.data.rbkr_4_pd;
        forms.rbkr_4_o = success.data.rbkr_4_o;
        forms.rbkr_4_r = success.data.rbkr_4_r;
        forms.rbkr_4_la = success.data.rbkr_4_la;
        forms.rbkr_4_mp = success.data.rbkr_4_mp;
        forms.rbkr_4_bop = success.data.rbkr_4_bop;
        forms.rbkr_4_tk = success.data.rbkr_4_tk;
        forms.rbkr_4_fi = success.data.rbkr_4_fi;
        forms.rbkr_4_k = success.data.rbkr_4_k;
        forms.rbkr_4_t = success.data.rbkr_4_t;
        forms.rbkr_5_v = success.data.rbkr_5_v;
        forms.rbkr_5_g = success.data.rbkr_5_g;
        forms.rbkr_5_pm = success.data.rbkr_5_pm;
        forms.rbkr_5_pb = success.data.rbkr_5_pb;
        forms.rbkr_5_pd = success.data.rbkr_5_pd;
        forms.rbkr_5_o = success.data.rbkr_5_o;
        forms.rbkr_5_r = success.data.rbkr_5_r;
        forms.rbkr_5_la = success.data.rbkr_5_la;
        forms.rbkr_5_mp = success.data.rbkr_5_mp;
        forms.rbkr_5_bop = success.data.rbkr_5_bop;
        forms.rbkr_5_tk = success.data.rbkr_5_tk;
        forms.rbkr_5_fi = success.data.rbkr_5_fi;
        forms.rbkr_5_k = success.data.rbkr_5_k;
        forms.rbkr_5_t = success.data.rbkr_5_t;
        forms.rbkr_6_v = success.data.rbkr_6_v;
        forms.rbkr_6_g = success.data.rbkr_6_g;
        forms.rbkr_6_pm = success.data.rbkr_6_pm;
        forms.rbkr_6_pb = success.data.rbkr_6_pb;
        forms.rbkr_6_pd = success.data.rbkr_6_pd;
        forms.rbkr_6_o = success.data.rbkr_6_o;
        forms.rbkr_6_r = success.data.rbkr_6_r;
        forms.rbkr_6_la = success.data.rbkr_6_la;
        forms.rbkr_6_mp = success.data.rbkr_6_mp;
        forms.rbkr_6_bop = success.data.rbkr_6_bop;
        forms.rbkr_6_tk = success.data.rbkr_6_tk;
        forms.rbkr_6_fi = success.data.rbkr_6_fi;
        forms.rbkr_6_k = success.data.rbkr_6_k;
        forms.rbkr_6_t = success.data.rbkr_6_t;
        forms.rbkr_7_v = success.data.rbkr_7_v;
        forms.rbkr_7_g = success.data.rbkr_7_g;
        forms.rbkr_7_pm = success.data.rbkr_7_pm;
        forms.rbkr_7_pb = success.data.rbkr_7_pb;
        forms.rbkr_7_pd = success.data.rbkr_7_pd;
        forms.rbkr_7_o = success.data.rbkr_7_o;
        forms.rbkr_7_r = success.data.rbkr_7_r;
        forms.rbkr_7_la = success.data.rbkr_7_la;
        forms.rbkr_7_mp = success.data.rbkr_7_mp;
        forms.rbkr_7_bop = success.data.rbkr_7_bop;
        forms.rbkr_7_tk = success.data.rbkr_7_tk;
        forms.rbkr_7_fi = success.data.rbkr_7_fi;
        forms.rbkr_7_k = success.data.rbkr_7_k;
        forms.rbkr_7_t = success.data.rbkr_7_t;
        forms.rbkr_8_v = success.data.rbkr_8_v;
        forms.rbkr_8_g = success.data.rbkr_8_g;
        forms.rbkr_8_pm = success.data.rbkr_8_pm;
        forms.rbkr_8_pb = success.data.rbkr_8_pb;
        forms.rbkr_8_pd = success.data.rbkr_8_pd;
        forms.rbkr_8_o = success.data.rbkr_8_o;
        forms.rbkr_8_r = success.data.rbkr_8_r;
        forms.rbkr_8_la = success.data.rbkr_8_la;
        forms.rbkr_8_mp = success.data.rbkr_8_mp;
        forms.rbkr_8_bop = success.data.rbkr_8_bop;
        forms.rbkr_8_tk = success.data.rbkr_8_tk;
        forms.rbkr_8_fi = success.data.rbkr_8_fi;
        forms.rbkr_8_k = success.data.rbkr_8_k;
        forms.rbkr_8_t = success.data.rbkr_8_t;
        forms.diagnosis_klinik = success.data.diagnosis_klinik;
        forms.gambaran_radiografis = success.data.gambaran_radiografis;
        forms.indikasi = success.data.indikasi;
        forms.terapi = success.data.terapi;
        forms.keterangan = success.data.keterangan;
        forms.prognosis_umum = success.data.prognosis_umum;
        forms.prognosis_lokal = success.data.prognosis_lokal;
        forms.p1_tanggal = success.data.p1_tanggal;
        forms.p1_indeksplak_ra_el16_b = success.data.p1_indeksplak_ra_el16_b;
        forms.p1_indeksplak_ra_el16_l = success.data.p1_indeksplak_ra_el16_l;
        forms.p1_indeksplak_rb_el36_b = success.data.p1_indeksplak_rb_el36_b;
        forms.p1_indeksplak_rb_el36_l = success.data.p1_indeksplak_rb_el36_l;
        forms.p1_bop_ra_el16_b = success.data.p1_bop_ra_el16_b;
        forms.p1_bop_ra_el16_l = success.data.p1_bop_ra_el16_l;
        forms.p1_bop_rb_el36_b = success.data.p1_bop_rb_el36_b;
        forms.p1_bop_rb_el36_l = success.data.p1_bop_rb_el36_l;
        forms.p1_indeksplak_ra_el12_b = success.data.p1_indeksplak_ra_el12_b;
        forms.p1_indeksplak_ra_el12_l = success.data.p1_indeksplak_ra_el12_l;
        forms.p1_indeksplak_rb_el34_b = success.data.p1_indeksplak_rb_el34_b;
        forms.p1_indeksplak_rb_el34_l = success.data.p1_indeksplak_rb_el34_l;
        forms.p1_bop_ra_el12_b = success.data.p1_bop_ra_el12_b;
        forms.p1_bop_ra_el12_l = success.data.p1_bop_ra_el12_l;
        forms.p1_bop_rb_el34_b = success.data.p1_bop_rb_el34_b;
        forms.p1_bop_rb_el34_l = success.data.p1_bop_rb_el34_l;
        forms.p1_indeksplak_ra_el11_b = success.data. p1_indeksplak_ra_el11_b;
        forms.p1_indeksplak_ra_el11_l = success.data. p1_indeksplak_ra_el11_l;
        forms.p1_indeksplak_rb_el32_b = success.data. p1_indeksplak_rb_el32_b;
        forms.p1_indeksplak_rb_el32_l = success.data. p1_indeksplak_rb_el32_l;
        forms.p1_bop_ra_el11_b = success.data. p1_bop_ra_el11_b;
        forms.p1_bop_ra_el11_l = success.data. p1_bop_ra_el11_l;
        forms.p1_bop_rb_el32_b = success.data. p1_bop_rb_el32_b;
        forms.p1_bop_rb_el32_l = success.data. p1_bop_rb_el32_l;
        forms.p1_indeksplak_ra_el21_b = success.data.p1_indeksplak_ra_el21_b;
        forms.p1_indeksplak_ra_el21_l = success.data.p1_indeksplak_ra_el21_l;
        forms.p1_indeksplak_rb_el31_b = success.data.p1_indeksplak_rb_el31_b;
        forms.p1_indeksplak_rb_el31_l = success.data.p1_indeksplak_rb_el31_l;
        forms.p1_bop_ra_el21_b = success.data.p1_bop_ra_el21_b;
        forms.p1_bop_ra_el21_l = success.data.p1_bop_ra_el21_l;
        forms.p1_bop_rb_el31_b = success.data.p1_bop_rb_el31_b;
        forms.p1_bop_rb_el31_l = success.data.p1_bop_rb_el31_l;
        forms.p1_indeksplak_ra_el22_b = success.data.p1_indeksplak_ra_el22_b;
        forms.p1_indeksplak_ra_el22_l = success.data.p1_indeksplak_ra_el22_l;
        forms.p1_indeksplak_rb_el41_b = success.data.p1_indeksplak_rb_el41_b;
        forms.p1_indeksplak_rb_el41_l = success.data.p1_indeksplak_rb_el41_l;
        forms.p1_bop_ra_el22_b = success.data.p1_bop_ra_el22_b;
        forms.p1_bop_ra_el22_l = success.data.p1_bop_ra_el22_l;
        forms.p1_bop_rb_el41_b = success.data.p1_bop_rb_el41_b;
        forms.p1_bop_rb_el41_l = success.data.p1_bop_rb_el41_l;
        forms.p1_indeksplak_ra_el24_b = success.data.p1_indeksplak_ra_el24_b;
        forms.p1_indeksplak_ra_el24_l = success.data.p1_indeksplak_ra_el24_l;
        forms.p1_indeksplak_rb_el42_b = success.data.p1_indeksplak_rb_el42_b;
        forms.p1_indeksplak_rb_el42_l = success.data.p1_indeksplak_rb_el42_l;
        forms.p1_bop_ra_el24_b = success.data.p1_bop_ra_el24_b;
        forms.p1_bop_ra_el24_l = success.data.p1_bop_ra_el24_l;
        forms.p1_bop_rb_el42_b = success.data.p1_bop_rb_el42_b;
        forms.p1_bop_rb_el42_l = success.data.p1_bop_rb_el42_l;
        forms.p1_indeksplak_ra_el26_b = success.data.p1_indeksplak_ra_el26_b;
        forms.p1_indeksplak_ra_el26_l = success.data.p1_indeksplak_ra_el26_l;
        forms.p1_indeksplak_rb_el46_b = success.data.p1_indeksplak_rb_el46_b;
        forms.p1_indeksplak_rb_el46_l = success.data.p1_indeksplak_rb_el46_l;
        forms.p1_bop_ra_el26_b = success.data.p1_bop_ra_el26_b;
        forms.p1_bop_ra_el26_l = success.data.p1_bop_ra_el26_l;
        forms.p1_bop_rb_el46_b = success.data.p1_bop_rb_el46_b;
        forms.p1_bop_rb_el46_l = success.data.p1_bop_rb_el46_l;
        forms.p1_indekskalkulus_rb_el36_b = success.data.p1_indekskalkulus_rb_el36_b;
        forms.p1_indekskalkulus_rb_el34_b = success.data.p1_indekskalkulus_rb_el34_b;
        forms.p1_indekskalkulus_rb_el32_b = success.data.p1_indekskalkulus_rb_el32_b;
        forms.p1_indekskalkulus_rb_el31_b = success.data.p1_indekskalkulus_rb_el31_b;
        forms.p1_indekskalkulus_rb_el41_b = success.data.p1_indekskalkulus_rb_el41_b;
        forms.p1_indekskalkulus_rb_el42_b = success.data.p1_indekskalkulus_rb_el42_b;
        forms.p1_indekskalkulus_rb_el46_b = success.data.p1_indekskalkulus_rb_el46_b;
        forms.p1_indekskalkulus_rb_el36_l = success.data.p1_indekskalkulus_rb_el36_l;
        forms.p1_indekskalkulus_rb_el34_l = success.data.p1_indekskalkulus_rb_el34_l;
        forms.p1_indekskalkulus_rb_el32_l = success.data.p1_indekskalkulus_rb_el32_l;
        forms.p1_indekskalkulus_rb_el31_l = success.data.p1_indekskalkulus_rb_el31_l;
        forms.p1_indekskalkulus_rb_el41_l = success.data.p1_indekskalkulus_rb_el41_l;
        forms.p1_indekskalkulus_rb_el42_l = success.data.p1_indekskalkulus_rb_el42_l;
        forms.p1_indekskalkulus_rb_el46_l = success.data.p1_indekskalkulus_rb_el46_l;
        forms.p2_tanggal = success.data.p2_tanggal;
        forms.p2_indeksplak_ra_el16_b = success.data.p2_indeksplak_ra_el16_b;
        forms.p2_indeksplak_ra_el12_b = success.data.p2_indeksplak_ra_el12_b;
        forms.p2_indeksplak_ra_el11_b = success.data.p2_indeksplak_ra_el11_b;
        forms.p2_indeksplak_ra_el21_b = success.data.p2_indeksplak_ra_el21_b;
        forms.p2_indeksplak_ra_el22_b = success.data.p2_indeksplak_ra_el22_b;
        forms.p2_indeksplak_ra_el24_b = success.data.p2_indeksplak_ra_el24_b;
        forms.p2_indeksplak_ra_el26_b = success.data.p2_indeksplak_ra_el26_b;
        forms.p2_indeksplak_ra_el16_l = success.data.p2_indeksplak_ra_el16_l;
        forms.p2_indeksplak_ra_el12_l = success.data.p2_indeksplak_ra_el12_l;
        forms.p2_indeksplak_ra_el11_l = success.data.p2_indeksplak_ra_el11_l;
        forms.p2_indeksplak_ra_el21_l = success.data.p2_indeksplak_ra_el21_l;
        forms.p2_indeksplak_ra_el22_l = success.data.p2_indeksplak_ra_el22_l;
        forms.p2_indeksplak_ra_el24_l = success.data.p2_indeksplak_ra_el24_l;
        forms.p2_indeksplak_ra_el26_l = success.data.p2_indeksplak_ra_el26_l;
        forms.p2_indeksplak_rb_el36_b = success.data.p2_indeksplak_rb_el36_b;
        forms.p2_indeksplak_rb_el34_b = success.data.p2_indeksplak_rb_el34_b;
        forms.p2_indeksplak_rb_el32_b = success.data.p2_indeksplak_rb_el32_b;
        forms.p2_indeksplak_rb_el31_b = success.data.p2_indeksplak_rb_el31_b;
        forms.p2_indeksplak_rb_el41_b = success.data.p2_indeksplak_rb_el41_b;
        forms.p2_indeksplak_rb_el42_b = success.data.p2_indeksplak_rb_el42_b;
        forms.p2_indeksplak_rb_el46_b = success.data.p2_indeksplak_rb_el46_b;
        forms.p2_indeksplak_rb_el36_l = success.data.p2_indeksplak_rb_el36_l;
        forms.p2_indeksplak_rb_el34_l = success.data.p2_indeksplak_rb_el34_l;
        forms.p2_indeksplak_rb_el32_l = success.data.p2_indeksplak_rb_el32_l;
        forms.p2_indeksplak_rb_el31_l = success.data.p2_indeksplak_rb_el31_l;
        forms.p2_indeksplak_rb_el41_l = success.data.p2_indeksplak_rb_el41_l;
        forms.p2_indeksplak_rb_el42_l = success.data.p2_indeksplak_rb_el42_l;
        forms.p2_indeksplak_rb_el46_l = success.data.p2_indeksplak_rb_el46_l;
        forms.p2_bop_ra_el16_b = success.data.p2_bop_ra_el16_b;
        forms.p2_bop_ra_el12_b = success.data.p2_bop_ra_el12_b;
        forms.p2_bop_ra_el11_b = success.data.p2_bop_ra_el11_b;
        forms.p2_bop_ra_el21_b = success.data.p2_bop_ra_el21_b;
        forms.p2_bop_ra_el22_b = success.data.p2_bop_ra_el22_b;
        forms.p2_bop_ra_el24_b = success.data.p2_bop_ra_el24_b;
        forms.p2_bop_ra_el26_b = success.data.p2_bop_ra_el26_b;
        forms.p2_bop_ra_el16_l = success.data.p2_bop_ra_el16_l;
        forms.p2_bop_ra_el12_l = success.data.p2_bop_ra_el12_l;
        forms.p2_bop_ra_el11_l = success.data.p2_bop_ra_el11_l;
        forms.p2_bop_ra_el21_l = success.data.p2_bop_ra_el21_l;
        forms.p2_bop_ra_el22_l = success.data.p2_bop_ra_el22_l;
        forms.p2_bop_ra_el24_l = success.data.p2_bop_ra_el24_l;
        forms.p2_bop_ra_el26_l = success.data.p2_bop_ra_el26_l;
        forms.p2_bop_rb_el36_b = success.data.p2_bop_rb_el36_b;
        forms.p2_bop_rb_el34_b = success.data.p2_bop_rb_el34_b;
        forms.p2_bop_rb_el32_b = success.data.p2_bop_rb_el32_b;
        forms.p2_bop_rb_el31_b = success.data.p2_bop_rb_el31_b;
        forms.p2_bop_rb_el41_b = success.data.p2_bop_rb_el41_b;
        forms.p2_bop_rb_el42_b = success.data.p2_bop_rb_el42_b;
        forms.p2_bop_rb_el46_b = success.data.p2_bop_rb_el46_b;
        forms.p2_bop_rb_el36_l = success.data.p2_bop_rb_el36_l;
        forms.p2_bop_rb_el34_l = success.data.p2_bop_rb_el34_l;
        forms.p2_bop_rb_el32_l = success.data.p2_bop_rb_el32_l;
        forms.p2_bop_rb_el31_l = success.data.p2_bop_rb_el31_l;
        forms.p2_bop_rb_el41_l = success.data.p2_bop_rb_el41_l;
        forms.p2_bop_rb_el42_l = success.data.p2_bop_rb_el42_l;
        forms.p2_bop_rb_el46_l = success.data.p2_bop_rb_el46_l;
        forms.p2_indekskalkulus_ra_el16_b = success.data.p2_indekskalkulus_ra_el16_b;
        forms.p2_indekskalkulus_ra_el26_b = success.data.p2_indekskalkulus_ra_el26_b;
        forms.p2_indekskalkulus_ra_el16_l = success.data.p2_indekskalkulus_ra_el16_l;
        forms.p2_indekskalkulus_ra_el26_l = success.data.p2_indekskalkulus_ra_el26_l;
        forms.p2_indekskalkulus_rb_el36_b = success.data.p2_indekskalkulus_rb_el36_b;
        forms.p2_indekskalkulus_rb_el34_b = success.data.p2_indekskalkulus_rb_el34_b;
        forms.p2_indekskalkulus_rb_el32_b = success.data.p2_indekskalkulus_rb_el32_b;
        forms.p2_indekskalkulus_rb_el31_b = success.data.p2_indekskalkulus_rb_el31_b;
        forms.p2_indekskalkulus_rb_el41_b = success.data.p2_indekskalkulus_rb_el41_b;
        forms.p2_indekskalkulus_rb_el42_b = success.data.p2_indekskalkulus_rb_el42_b;
        forms.p2_indekskalkulus_rb_el46_b = success.data.p2_indekskalkulus_rb_el46_b;
        forms.p2_indekskalkulus_rb_el36_l = success.data.p2_indekskalkulus_rb_el36_l;
        forms.p2_indekskalkulus_rb_el34_l = success.data.p2_indekskalkulus_rb_el34_l;
        forms.p2_indekskalkulus_rb_el32_l = success.data.p2_indekskalkulus_rb_el32_l;
        forms.p2_indekskalkulus_rb_el31_l = success.data.p2_indekskalkulus_rb_el31_l;
        forms.p2_indekskalkulus_rb_el41_l = success.data.p2_indekskalkulus_rb_el41_l;
        forms.p2_indekskalkulus_rb_el42_l = success.data.p2_indekskalkulus_rb_el42_l;
        forms.p2_indekskalkulus_rb_el46_l = success.data.p2_indekskalkulus_rb_el46_l;
        forms.p3_tanggal = success.data.p3_tanggal;
        forms.p3_indeksplak_ra_el16_b = success.data.p3_indeksplak_ra_el16_b;
        forms.p3_indeksplak_ra_el12_b = success.data.p3_indeksplak_ra_el12_b;
        forms.p3_indeksplak_ra_el11_b = success.data.p3_indeksplak_ra_el11_b;
        forms.p3_indeksplak_ra_el21_b = success.data.p3_indeksplak_ra_el21_b;
        forms.p3_indeksplak_ra_el22_b = success.data.p3_indeksplak_ra_el22_b;
        forms.p3_indeksplak_ra_el24_b = success.data.p3_indeksplak_ra_el24_b;
        forms.p3_indeksplak_ra_el26_b = success.data.p3_indeksplak_ra_el26_b;
        forms.p3_indeksplak_ra_el16_l = success.data.p3_indeksplak_ra_el16_l;
        forms.p3_indeksplak_ra_el12_l = success.data.p3_indeksplak_ra_el12_l;
        forms.p3_indeksplak_ra_el11_l = success.data.p3_indeksplak_ra_el11_l;
        forms.p3_indeksplak_ra_el21_l = success.data.p3_indeksplak_ra_el21_l;
        forms.p3_indeksplak_ra_el22_l = success.data.p3_indeksplak_ra_el22_l;
        forms.p3_indeksplak_ra_el24_l = success.data.p3_indeksplak_ra_el24_l;
        forms.p3_indeksplak_ra_el26_l = success.data.p3_indeksplak_ra_el26_l;
        forms.p3_indeksplak_rb_el36_b = success.data.p3_indeksplak_rb_el36_b;
        forms.p3_indeksplak_rb_el34_b = success.data.p3_indeksplak_rb_el34_b;
        forms.p3_indeksplak_rb_el32_b = success.data.p3_indeksplak_rb_el32_b;
        forms.p3_indeksplak_rb_el31_b = success.data.p3_indeksplak_rb_el31_b;
        forms.p3_indeksplak_rb_el41_b = success.data.p3_indeksplak_rb_el41_b;
        forms.p3_indeksplak_rb_el42_b = success.data.p3_indeksplak_rb_el42_b;
        forms.p3_indeksplak_rb_el46_b = success.data.p3_indeksplak_rb_el46_b;
        forms.p3_indeksplak_rb_el36_l = success.data.p3_indeksplak_rb_el36_l;
        forms.p3_indeksplak_rb_el34_l = success.data.p3_indeksplak_rb_el34_l;
        forms.p3_indeksplak_rb_el32_l = success.data.p3_indeksplak_rb_el32_l;
        forms.p3_indeksplak_rb_el31_l = success.data.p3_indeksplak_rb_el31_l;
        forms.p3_indeksplak_rb_el41_l = success.data.p3_indeksplak_rb_el41_l;
        forms.p3_indeksplak_rb_el42_l = success.data.p3_indeksplak_rb_el42_l;
        forms.p3_indeksplak_rb_el46_l = success.data.p3_indeksplak_rb_el46_l;
        forms.p3_bop_ra_el16_b = success.data.p3_bop_ra_el16_b;
        forms.p3_bop_ra_el12_b = success.data.p3_bop_ra_el12_b;
        forms.p3_bop_ra_el11_b = success.data.p3_bop_ra_el11_b;
        forms.p3_bop_ra_el21_b = success.data.p3_bop_ra_el21_b;
        forms.p3_bop_ra_el22_b = success.data.p3_bop_ra_el22_b;
        forms.p3_bop_ra_el24_b = success.data.p3_bop_ra_el24_b;
        forms.p3_bop_ra_el26_b = success.data.p3_bop_ra_el26_b;
        forms.p3_bop_ra_el16_l = success.data.p3_bop_ra_el16_l;
        forms.p3_bop_ra_el12_l = success.data.p3_bop_ra_el12_l;
        forms.p3_bop_ra_el11_l = success.data.p3_bop_ra_el11_l;
        forms.p3_bop_ra_el21_l = success.data.p3_bop_ra_el21_l;
        forms.p3_bop_ra_el22_l = success.data.p3_bop_ra_el22_l;
        forms.p3_bop_ra_el24_l = success.data.p3_bop_ra_el24_l;
        forms.p3_bop_ra_el26_l = success.data.p3_bop_ra_el26_l;
        forms.p3_bop_rb_el36_b = success.data.p3_bop_rb_el36_b;
        forms.p3_bop_rb_el34_b = success.data.p3_bop_rb_el34_b;
        forms.p3_bop_rb_el32_b = success.data.p3_bop_rb_el32_b;
        forms.p3_bop_rb_el31_b = success.data.p3_bop_rb_el31_b;
        forms.p3_bop_rb_el41_b = success.data.p3_bop_rb_el41_b;
        forms.p3_bop_rb_el42_b = success.data.p3_bop_rb_el42_b;
        forms.p3_bop_rb_el46_b = success.data.p3_bop_rb_el46_b;
        forms.p3_bop_rb_el36_l = success.data.p3_bop_rb_el36_l;
        forms.p3_bop_rb_el34_l = success.data.p3_bop_rb_el34_l;
        forms.p3_bop_rb_el32_l = success.data.p3_bop_rb_el32_l;
        forms.p3_bop_rb_el31_l = success.data.p3_bop_rb_el31_l;
        forms.p3_bop_rb_el41_l = success.data.p3_bop_rb_el41_l;
        forms.p3_bop_rb_el42_l = success.data.p3_bop_rb_el42_l;
        forms.p3_bop_rb_el46_l = success.data.p3_bop_rb_el46_l;
        forms.p3_indekskalkulus_ra_el16_b = success.data.p3_indekskalkulus_ra_el16_b;
        forms.p3_indekskalkulus_ra_el26_b = success.data.p3_indekskalkulus_ra_el26_b;
        forms.p3_indekskalkulus_ra_el16_l = success.data.p3_indekskalkulus_ra_el16_l;
        forms.p3_indekskalkulus_ra_el26_l = success.data.p3_indekskalkulus_ra_el26_l;
        forms.p3_indekskalkulus_rb_el36_b = success.data.p3_indekskalkulus_rb_el36_b;
        forms.p3_indekskalkulus_rb_el34_b = success.data.p3_indekskalkulus_rb_el34_b;
        forms.p3_indekskalkulus_rb_el32_b = success.data.p3_indekskalkulus_rb_el32_b;
        forms.p3_indekskalkulus_rb_el31_b = success.data.p3_indekskalkulus_rb_el31_b;
        forms.p3_indekskalkulus_rb_el41_b = success.data.p3_indekskalkulus_rb_el41_b;
        forms.p3_indekskalkulus_rb_el42_b = success.data.p3_indekskalkulus_rb_el42_b;
        forms.p3_indekskalkulus_rb_el46_b = success.data.p3_indekskalkulus_rb_el46_b;
        forms.p3_indekskalkulus_rb_el36_l = success.data.p3_indekskalkulus_rb_el36_l;
        forms.p3_indekskalkulus_rb_el34_l = success.data.p3_indekskalkulus_rb_el34_l;
        forms.p3_indekskalkulus_rb_el32_l = success.data.p3_indekskalkulus_rb_el32_l;
        forms.p3_indekskalkulus_rb_el31_l = success.data.p3_indekskalkulus_rb_el31_l;
        forms.p3_indekskalkulus_rb_el41_l = success.data.p3_indekskalkulus_rb_el41_l;
        forms.p3_indekskalkulus_rb_el42_l = success.data.p3_indekskalkulus_rb_el42_l;
        forms.p3_indekskalkulus_rb_el46_l = success.data.p3_indekskalkulus_rb_el46_l;
        forms.foto_klinis_oklusi_arah_kiri = success.data.foto_klinis_oklusi_arah_kiri;
        forms.foto_klinis_oklusi_arah_kanan = success.data.foto_klinis_oklusi_arah_kanan;
        forms.foto_klinis_oklusi_arah_anterior = success.data.foto_klinis_oklusi_arah_anterior;
        forms.foto_klinis_oklusal_rahang_atas = success.data.foto_klinis_oklusal_rahang_atas;
        forms.foto_klinis_oklusal_rahang_bawah = success.data.foto_klinis_oklusal_rahang_bawah;
        forms.foto_klinis_before = success.data.foto_klinis_before;
        forms.foto_klinis_after = success.data.foto_klinis_after;
        forms.foto_ronsen_panoramik = success.data.foto_ronsen_panoramik;
        forms.terapi_s = success.data.terapi_s;
        forms.terapi_o = success.data.terapi_o;
        forms.terapi_a = success.data.terapi_a;
        forms.terapi_p = success.data.terapi_p;
        forms.terapi_ohis = success.data.terapi_ohis;
        forms.terapi_bop = success.data.terapi_bop;
        forms.terapi_pm18 = success.data.terapi_pm18;
        forms.terapi_pm17 = success.data.terapi_pm17;
        forms.terapi_pm16 = success.data.terapi_pm16;
        forms.terapi_pm15 = success.data.terapi_pm15;
        forms.terapi_pm14 = success.data.terapi_pm14;
        forms.terapi_pm13 = success.data.terapi_pm13;
        forms.terapi_pm12 = success.data.terapi_pm12;
        forms.terapi_pm11 = success.data.terapi_pm11;
        forms.terapi_pm21 = success.data.terapi_pm21;
        forms.terapi_pm22 = success.data.terapi_pm22;
        forms.terapi_pm23 = success.data.terapi_pm23;
        forms.terapi_pm24 = success.data.terapi_pm24;
        forms.terapi_pm25 = success.data.terapi_pm25;
        forms.terapi_pm26 = success.data.terapi_pm26;
        forms.terapi_pm27 = success.data.terapi_pm27;
        forms.terapi_pm28 = success.data.terapi_pm28;
        forms.terapi_pm38 = success.data.terapi_pm38;
        forms.terapi_pm37 = success.data.terapi_pm37;
        forms.terapi_pm36 = success.data.terapi_pm36;
        forms.terapi_pm35 = success.data.terapi_pm35;
        forms.terapi_pm34 = success.data.terapi_pm34;
        forms.terapi_pm33 = success.data.terapi_pm33;
        forms.terapi_pm32 = success.data.terapi_pm32;
        forms.terapi_pm31 = success.data.terapi_pm31;
        forms.terapi_pm41 = success.data.terapi_pm41;
        forms.terapi_pm42 = success.data.terapi_pm42;
        forms.terapi_pm43 = success.data.terapi_pm43;
        forms.terapi_pm44 = success.data.terapi_pm44;
        forms.terapi_pm45 = success.data.terapi_pm45;
        forms.terapi_pm46 = success.data.terapi_pm46;
        forms.terapi_pm47 = success.data.terapi_pm47;
        forms.terapi_pm48 = success.data.terapi_pm48;
        forms.terapi_pb18 = success.data.terapi_pb18;
        forms.terapi_pb17 = success.data.terapi_pb17;
        forms.terapi_pb16 = success.data.terapi_pb16;
        forms.terapi_pb15 = success.data.terapi_pb15;
        forms.terapi_pb14 = success.data.terapi_pb14;
        forms.terapi_pb13 = success.data.terapi_pb13;
        forms.terapi_pb12 = success.data.terapi_pb12;
        forms.terapi_pb11 = success.data.terapi_pb11;
        forms.terapi_pb21 = success.data.terapi_pb21;
        forms.terapi_pb22 = success.data.terapi_pb22;
        forms.terapi_pb23 = success.data.terapi_pb23;
        forms.terapi_pb24 = success.data.terapi_pb24;
        forms.terapi_pb25 = success.data.terapi_pb25;
        forms.terapi_pb26 = success.data.terapi_pb26;
        forms.terapi_pb27 = success.data.terapi_pb27;
        forms.terapi_pb28 = success.data.terapi_pb28;
        forms.terapi_pb38 = success.data.terapi_pb38;
        forms.terapi_pb37 = success.data.terapi_pb37;
        forms.terapi_pb36 = success.data.terapi_pb36;
        forms.terapi_pb35 = success.data.terapi_pb35;
        forms.terapi_pb34 = success.data.terapi_pb34;
        forms.terapi_pb33 = success.data.terapi_pb33;
        forms.terapi_pb32 = success.data.terapi_pb32;
        forms.terapi_pb31 = success.data.terapi_pb31;
        forms.terapi_pb41 = success.data.terapi_pb41;
        forms.terapi_pb42 = success.data.terapi_pb42;
        forms.terapi_pb43 = success.data.terapi_pb43;
        forms.terapi_pb44 = success.data.terapi_pb44;
        forms.terapi_pb45 = success.data.terapi_pb45;
        forms.terapi_pb46 = success.data.terapi_pb46;
        forms.terapi_pb47 = success.data.terapi_pb47;
        forms.terapi_pb48 = success.data.terapi_pb48;
        forms.terapi_pd18 = success.data.terapi_pd18;
        forms.terapi_pd17 = success.data.terapi_pd17;
        forms.terapi_pd16 = success.data.terapi_pd16;
        forms.terapi_pd15 = success.data.terapi_pd15;
        forms.terapi_pd14 = success.data.terapi_pd14;
        forms.terapi_pd13 = success.data.terapi_pd13;
        forms.terapi_pd12 = success.data.terapi_pd12;
        forms.terapi_pd11 = success.data.terapi_pd11;
        forms.terapi_pd21 = success.data.terapi_pd21;
        forms.terapi_pd22 = success.data.terapi_pd22;
        forms.terapi_pd23 = success.data.terapi_pd23;
        forms.terapi_pd24 = success.data.terapi_pd24;
        forms.terapi_pd25 = success.data.terapi_pd25;
        forms.terapi_pd26 = success.data.terapi_pd26;
        forms.terapi_pd27 = success.data.terapi_pd27;
        forms.terapi_pd28 = success.data.terapi_pd28;
        forms.terapi_pd38 = success.data.terapi_pd38;
        forms.terapi_pd37 = success.data.terapi_pd37;
        forms.terapi_pd36 = success.data.terapi_pd36;
        forms.terapi_pd35 = success.data.terapi_pd35;
        forms.terapi_pd34 = success.data.terapi_pd34;
        forms.terapi_pd33 = success.data.terapi_pd33;
        forms.terapi_pd32 = success.data.terapi_pd32;
        forms.terapi_pd31 = success.data.terapi_pd31;
        forms.terapi_pd41 = success.data.terapi_pd41;
        forms.terapi_pd42 = success.data.terapi_pd42;
        forms.terapi_pd43 = success.data.terapi_pd43;
        forms.terapi_pd44 = success.data.terapi_pd44;
        forms.terapi_pd45 = success.data.terapi_pd45;
        forms.terapi_pd46 = success.data.terapi_pd46;
        forms.terapi_pd47 = success.data.terapi_pd47;
        forms.terapi_pd48 = success.data.terapi_pd48;
        forms.terapi_pl18 = success.data.terapi_pl18;
        forms.terapi_pl17 = success.data.terapi_pl17;
        forms.terapi_pl16 = success.data.terapi_pl16;
        forms.terapi_pl15 = success.data.terapi_pl15;
        forms.terapi_pl14 = success.data.terapi_pl14;
        forms.terapi_pl13 = success.data.terapi_pl13;
        forms.terapi_pl12 = success.data.terapi_pl12;
        forms.terapi_pl11 = success.data.terapi_pl11;
        forms.terapi_pl21 = success.data.terapi_pl21;
        forms.terapi_pl22 = success.data.terapi_pl22;
        forms.terapi_pl23 = success.data.terapi_pl23;
        forms.terapi_pl24 = success.data.terapi_pl24;
        forms.terapi_pl25 = success.data.terapi_pl25;
        forms.terapi_pl26 = success.data.terapi_pl26;
        forms.terapi_pl27 = success.data.terapi_pl27;
        forms.terapi_pl28 = success.data.terapi_pl28;
        forms.terapi_pl38 = success.data.terapi_pl38;
        forms.terapi_pl37 = success.data.terapi_pl37;
        forms.terapi_pl36 = success.data.terapi_pl36;
        forms.terapi_pl35 = success.data.terapi_pl35;
        forms.terapi_pl34 = success.data.terapi_pl34;
        forms.terapi_pl33 = success.data.terapi_pl33;
        forms.terapi_pl32 = success.data.terapi_pl32;
        forms.terapi_pl31 = success.data.terapi_pl31;
        forms.terapi_pl41 = success.data.terapi_pl41;
        forms.terapi_pl42 = success.data.terapi_pl42;
        forms.terapi_pl43 = success.data.terapi_pl43;
        forms.terapi_pl44 = success.data.terapi_pl44;
        forms.terapi_pl45 = success.data.terapi_pl45;
        forms.terapi_pl46 = success.data.terapi_pl46;
        forms.terapi_pl47 = success.data.terapi_pl47;
        forms.terapi_pl48 = success.data.terapi_pl48;
        ListComponent.value.getItems();
        
      }
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

const COMPONENT_IDEMR = forms.id;


onMounted (async () =>
{
    await getByID (useRouter().currentRoute.value.query.noreg,'141300001');
    //await getAnItem ( useRouter().currentRoute.value.query.noreg );
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
                                v-model="forms.rakn_6_mp"></v-text-field>
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
                        <td class="text-left">5x</td>
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
                                v-model="forms.rbkn_6_mp"></v-text-field>
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
                        <th colspan="2" class="text-left">Pemeriksaan 1 :</th>
                        <th colspan="6" class="text-left">
                            <v-text-field v-model="forms.pemeriksaan"></v-text-field>
                        </th>
                        <th colspan="1" class="text-left"></th>

                        <th colspan="2" class="text-left">Tanggal :</th>
                        <th colspan="6" class="text-left">
                            <br />
                            <v-text-field v-model="forms.p1_tanggal"></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_kiri" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_kanan" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusi_arah_anterior" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusal_rahang_atas" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_oklusal_rahang_bawah" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_before" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_klinis_after" label="File URL" :readonly ></v-text-field>
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
                                                        
                                                            <v-text-field v-model="forms.foto_ronsen_panoramik" label="File URL" :readonly ></v-text-field>
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
        <v-btn @click="setItems" color="primary" variant="outlined">{{
                $t("action.button.save")
            }}</v-btn>
    </v-form>
</template>
