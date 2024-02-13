<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "prostodonsia",
});

</script>

<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="Nomor Rekam Medik"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Tanggal"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
        </v-container>
        <v-container>
            <h4>IDENTITAS</h4>
            <br />
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="Nama Pasien"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Pekerjaan"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="Jenis Kelamin"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Alamat Pasien"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="Nama Operator"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Nomor Telpon"
                        hide-details
                        required
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
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
                        label="Keluhan Utama"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="Riwayat Geligi"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="Pengalaman Dengan Gigi Tiruan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="- Estetis"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="- Fungsi Bicara"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="- Penguyahan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="Pembiayaan"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
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
                        label=""
                        :items="['Tebal', 'Tipis*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="b. Profil Muka"
                        :items="['Lurus', 'Cembung', 'Cekung *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="4">
                    <v-select
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
                        label=""
                        :items="['Tebal', 'Tipis*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="Submandibularis Kanan"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        label="Submandibularis Kanan"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        label="Sublingualis"
                        :items="['Sakit', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        label=""
                        :items="['Teraba', 'Tidak*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="Sisi Kiri"
                        :items="['bunyi', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col rows="1" cols="3">
                    <v-textarea
                        label="sejak"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Sisi Kanan"
                        :items="['bunyi', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col rows="1" cols="3">
                    <v-textarea
                        label="sejak"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4"> </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        label="Membuka Mulut"
                        :items="['Deviasi', 'Tidak Deviasi *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="2">
                    <v-select
                        label=""
                        :items="['Ke Kiri', 'Ke Kanan*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="e. Hidung"
                        :items="['Simetris', 'Asimetris *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="6">
                    <v-textarea
                        label="j. Kelainan lain"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="1"> </v-col>

                <v-col cols="10" md="3">
                    <v-select
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
                        label="1) Higiene mulut"
                        :items="['Baik', 'Sedang', 'Buruk *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="2) Saliva: -Kuantitas"
                        :items="['Sedikit', 'Normal', 'Banyak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="4">
                    <v-select
                        label="Saliva: -Konsisten"
                        :items="['Encer', 'Normal', 'Kental *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="3) Lidah: -Ukuran"
                        :items="['Kecil', 'Normal', 'Besar *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        label="Lidah: -Posisi Wright"
                        :items="['Kelas I', 'Kelas II', 'Kelas III *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Lidah: -Mobilitas"
                        :items="['Normal', 'Aktif *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="4) Refleks Muntah"
                        :items="['Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="5) Mukosa Mulut"
                        :items="['Sehat', 'Ada Kelainan *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        label="Berupa"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="6) Gigitan"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        label="Bila Ada"
                        :items="['Stabil', 'Tidak Stabil*']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Gigitan Terbuka"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        label="Region"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Gigitan Silang"
                        :items="['Ada', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        label="Region"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="Hubungan Rahang"
                        :items="['Ortognati', 'Retrognati', 'Prognati *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="7) Pemeriksaan Rontgen : -Dental"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>

                <v-col cols="10" md="3">
                    <v-textarea
                        label="Elemen gigi"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Pemeriksaan Rontgen : -Panoramik"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Pemeriksaan Rontgen : -TMJ"
                        :items="['Perlu', 'Tidak *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-textarea
                        label="8) Fraktur : -Gigi"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>

                <v-col cols="10" md="3">
                    <v-select
                        label="Fraktur : -Arah"
                        :items="['Horisontal', 'Diagonal', 'Vertical *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
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
                        label="9) Lain-lain "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="10) Perbandingan Mahkota & akar gigi "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="-Interprestasi Foto Rontgen "
                        variant="outlined"
                        rows="2"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="11) Kebiasaan Buruk "
                        :items="['Ada', 'Tidak Ada*']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
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
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[61]21</td>
                    </tr>
                    <tr>
                        <td class="text-center">12[52]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[62]22</td>
                    </tr>
                    <tr>
                        <td class="text-center">13[53]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[63]23</td>
                    </tr>
                    <tr>
                        <td class="text-center">14[54]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[64]24</td>
                    </tr>
                    <tr>
                        <td class="text-center">15[55]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[65]25</td>
                    </tr>
                    <tr>
                        <td class="text-center">16</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">26</td>
                    </tr>
                    <tr>
                        <td class="text-center">17</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">27</td>
                    </tr>
                    <tr>
                        <td class="text-center">18</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">28</td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gigi.jpeg"></v-img>
            <br />
            <v-table density="compact" class="border">
                <tbody>
                    <tr>
                        <td class="text-center">48</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">38</td>
                    </tr>
                    <tr>
                        <td class="text-center">47</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">37</td>
                    </tr>
                    <tr>
                        <td class="text-center">46</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">36</td>
                    </tr>
                    <tr>
                        <td class="text-center">45[85]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[75]35</td>
                    </tr>
                    <tr>
                        <td class="text-center">44[84]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[74]34</td>
                    </tr>
                    <tr>
                        <td class="text-center">43[83]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[73]33</td>
                    </tr>
                    <tr>
                        <td class="text-center">42[82]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">[72]32</td>
                    </tr>
                    <tr>
                        <td class="text-center">41[81]</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
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
                        label="Rahang Atas : -Post Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Rahang Atas : -Post Kanan"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Rahang Atas : -Anterior"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Rahang Bawah : -Post Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Rahang Bawah : -Post Kanan"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
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
                        label="Bentuk : -Post Kiri"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk : -Post Kanan"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk : -Anterior"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Post Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Post Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Anterior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Post Kiri"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Post Kanan"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Anterior"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk Permukaan : -Post Kiri"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk Permukaan : -Post Kanan"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
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
                        label="Bentuk : -Post Kiri"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk : -Post Kanan"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk : -Anterior"
                        :items="['Segi 4', 'Oval', 'Segi 3 *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Post Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Post Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Ketinggian : -Anterior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Post Kiri"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Post Kanan"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Tahanan Jaringan : -Anterior"
                        :items="['Flby', 'Tinggi', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk Permukaan : -Post Kiri"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Bentuk Permukaan : -Post Kanan"
                        :items="['Rata', 'Tidak Rata *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
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
                        label="Anterior"
                        :items="['Prognati', 'Normal', 'Retrognati*']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Prosterior :-Kiri"
                        :items="['Normal', 'Crossbite', 'Scissors Bite *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
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
                        label="-Labialis Superior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Labialis Inferior"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Bukalis Rahang Atas Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Bukalis Rahang Atas Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Bukalis Rahang Bawah Kiri"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Bukalis Rahang Bawah Kanan"
                        :items="['Tinggi', 'Sedang', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="Palatum"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="3">
                    <v-select
                        label="Kedalaman"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="Torus Palatinus"
                        :items="['Besar', 'Kecil', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="-Kiri"
                        :items="['Besar', 'Kecil *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="-Kiri"
                        :items="['Dalam', 'Sedang', 'Dangkal *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
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
                        label="-Rahang Atas"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-select
                        label="-Rahang Bawah"
                        :items="['Persegi', 'Oval', 'Segitiga *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="8. Perlekatan Dasar Mulut"
                        :items="['Tinggi', 'Normal', 'Rendah *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="3">
                    <v-textarea
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
                        label="Rahang Atas"
                        :items="['Sebagian', 'Penuh *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Elemen"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="Rahang Bawah"
                        :items="['Sebagian', 'Penuh *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
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
                        label="1) Perawatan Periodontal"
                        :items="['Ada', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="2) Perawatan Bedah"
                        :items="['Ada', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="Ada"
                        :items="['Pencabutan Gigi']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Elemen"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="-Lain-lain"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="3) Konservasi Gigi"
                        :items="['Ada', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Ada, Pada Elemen"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="4) Rekonturing"
                        :items="['Ada', 'Tidak Ada *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Ada -Pembuatan Mahkota"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="-Pengasahan Gigi Miring"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="-Pengasahan Gigi Extruded"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
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
                        label="Rahang Atas :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
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
                        label="a. Direk :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        label="b. Indirek :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        label="3) Plat Dasar :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        label="4) Anasir Gigi :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <h5>Keterangan :</h5>

                <v-col cols="10" md="3"> </v-col>
                <v-col cols="10" md="4">
                    <v-img
                        :width="200"
                        length="10"
                        aspect-ratio="16/9"
                        cover
                        src="/img/gigiutuh.jpeg"></v-img>
                </v-col>
            </v-row>

            <h4>F. PROGNOSIS</h4>
            <br />
            <v-row>
                <v-col cols="10" md="4">
                    <v-select
                        label="PROGNOSIS"
                        :items="['Baik', 'Sedang', 'Buruk *']"
                        variant="outlined"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea label="Alasan" variant="outlined"></v-textarea>
                </v-col>
            </v-row>
            <h4>G. PERAWATAN ULANG</h4>
            <br />
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="1. Relining : Regio :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="2. Reparasi : Regio :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="6">
                    <v-textarea
                        label="Sebab :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="3. Lain-lain :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
                <v-col cols="10" md="4">
                    <v-textarea
                        label="Tanggal :"
                        variant="outlined"
                        rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col rows="2" cols="10">
                    <v-textarea
                        label="Keterangan :"
                        variant="outlined"></v-textarea>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
export default {
    data: () => ({
        valid: false,
        firstname: "",
        lastname: "",
        nameRules: [
            (value) => {
                if (value) return true;

                return "Name is required.";
            },
            (value) => {
                if (value?.length <= 10) return true;

                return "Name must be less than 10 characters.";
            },
        ],
        email: "",
        emailRules: [
            (value) => {
                if (value) return true;

                return "E-mail is requred.";
            },
            (value) => {
                if (/.+@.+\..+/.test(value)) return true;

                return "E-mail must be valid.";
            },
        ],
    }),
};
</script>
