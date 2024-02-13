<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "emrortodonsi",
});

</script>


<template>
    <v-form v-model="valid">
      <v-container>
        <h4>1. IDENTITAS</h4>
        <hr>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="Operator"
              required
              hide-details
            ></v-text-field>
          </v-col>
  
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="NIM"
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
              v-model="email"
              :rules="emailRules"
              label="Pembimbing"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Tanggal"
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
              v-model="email"
              :rules="emailRules"
              label="Nama Pasien"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Suku"
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
              v-model="email"
              :rules="emailRules"
              label="Umur"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Jenis kelamin"
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
              v-model="email"
              :rules="emailRules"
              label="Alamat"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Telepon"
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
              v-model="email"
              :rules="emailRules"
              label="Pekerjaan"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="email"
              :rules="emailRules"
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
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
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
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
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
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
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
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Retainer"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>

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
          <v-textarea label="Keluhan utama"></v-textarea>
          </v-col>
        </v-row>
        
        <h4>Riwayat kesehatan :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Kelainan endoktrin"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Penyakit pada masa anak"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Alergi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Kelainan saluran pernapasan"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Tindakan operasi"></v-text-field>
          </v-col>
        </v-row>
        
        <h4>Riwayat pertumbhuan dan perkembangan gigi-geligi :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Gigi desidui"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Gigi bercampur"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Gigi permanen"></v-text-field>
          </v-col>
        </v-row>

        <h4>Kebiasaan jelek yang berkaitan dengan keluhan pasien :</h4>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Durasi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Frekuensi"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Intensitas"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Keterangan"></v-text-field>
          </v-col>
        </v-row>

        <v-select
        label="Riwayat keluarga yang berkaitan dengan keluhan pasien"
        :items="['ada', 'tidak ada']"
        ></v-select>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Ayah"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Ibu"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Saudara"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field label="Keterangan"></v-text-field>
          </v-col>
        </v-row>
        
        <h4>B. Pemeriksaan obyektif</h4>
        <hr>
        <h4>1. UMUM</h4>
        <v-select
        label="Jasmani"
        :items="['baik', 'sedang','jelek']"
        ></v-select>
        <v-select
        label="Mental"
        :items="['baik', 'sedang','jelek']"
        ></v-select>

        <v-row>
        <h4>Status gizi</h4>
        </v-row>

        <v-row>
        <v-col cols="2" md="2">
            <v-text-field placeholder="m" label="Tinggi badan (TB)"></v-text-field>
        </v-col>
        <v-col cols="2" md="2">
            <v-text-field placeholder="kg" label="Berat badan (BB)"></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
            <v-text-field label="Indeks massa tubuh"></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
            <v-select
        label="Status gizi"
        :items="['kurang', 'normal','lebih']"
        ></v-select>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" md="12">
            <v-text-field label="Kategori"></v-text-field>
        </v-col>
        </v-row>

        <h4>2. LOKAL</h4>
        <h4>a. Ekstra oral</h4>
        <h4>Kepala</h4>
        <v-row>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" label="Lebar kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" label="Panjang kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field label="Indeks kepala"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field label="Bentuk kepala"></v-text-field>
        </v-col>
        </v-row>

        <h4>Muka</h4>
        <v-row>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" label="Panjang muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field placeholder="mm" label="Lebar muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field label="Indeks muka"></v-text-field>
        </v-col>
        <v-col cols="3" md="3">
            <v-text-field label="Bentuk muka"></v-text-field>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="6" md="6">
        <v-select
        label="Bentuk"
        :items="['Simetris', 'asimetris']"
        ></v-select>
        </v-col>
        <v-col cols="6" md="6">
        <v-select
        label="Profil muka"
        :items="['lurus', 'cekung','cembung']"
        ></v-select>
        </v-col>
        </v-row>

        <h4>Fungsional</h4>
            <v-row>
            <v-col cols="6" md="6">
            <v-select
            label="Sendi temporomandibula (TMJ)"
            :items="['normal', 'abnormal']"
            ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-select
                label="Bibir posisi istirahat"
                :items="['normal', 'tertutup']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Tunus otot mastikasi"
                :items="['normal', 'hipertonus','hipotonus']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Tunus otot bibir"
                :items="['normal', 'hipertonus','hipotonus']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Free way space"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Path of closure"></v-text-field>
            </v-col>
        </v-row>
        
        <h4><label>b. Intra oral</label></h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-select
                label="Higiene mulut: OHI"
                :items="['baik', 'sedang','jelek']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Pola atrisi"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Regio"></v-text-field>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Lingua"
                :items="['besar', 'sedang','kecil']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Lain-lain"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Palatum Vertikal"
                :items="['tinggi', 'sedang','rendah']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                label="Palatum Lateral"
                :items="['sempit', 'sedang','lebar']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Gingiva"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="Mukosa"
                :items="['normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                label="Fren. labii superior"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Fren. labii inferior"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Fren. lingualis"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Ketr"
                :items="['Rendah', 'tinggi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                label="Tonsila"
                :items="['Normal', 'abnormal']"
                ></v-select>
            </v-col>
            <v-col cols="9" md="9">
                <v-text-field label="Fonetik"></v-text-field>
            </v-col>
        </v-row>

        <h4><label>Pemeriksaan gigi-gigi</label></h4>
        <br/>
        <!-- tabel gigi -->
        <!-- <v-row>
            <v-col cols="12" md="12">
            <label>Keterangan</label>
            </v-col>
        </v-row> -->
        
        
        <br/>
        <h4>4. ANALISIS FOTO MUKA</h4>
        <hr>
        <br/>

        <v-row>
            <v-col cols="12" md="12">
          <v-textarea label="Tampak depan tak terlihat gigi"></v-textarea>
            </v-col>
            <v-col cols="12" md="12">
                <v-select
                label="Bentuk muka"
                :items="['simetri', 'asimetri','lebar','sedang','sempit']"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
          <v-textarea label="Tampak samping"></v-textarea>
            </v-col>
            <v-col cols="12" md="12">
                <v-select
                label="Profil muka"
                :items="['lurus', 'cembung','cekung']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
          <v-textarea label="Tampak depan senyum terlihat gigi"></v-textarea>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
          <v-textarea label="Tampak miring"></v-textarea>
            </v-col>
        </v-row>
        
        <br/>
        <h4>FOTO GIGI-GELIGI</h4>
        <hr>
        <br/>

        <v-row>
            <v-col cols="4" md="4">
                <v-textarea label="Tampak samping kanan"></v-textarea>
            </v-col>
            <v-col cols="4" md="4">
                <v-textarea label="Tampak depan"></v-textarea>
            </v-col>
            <v-col cols="4" md="4">
                <v-textarea label="Tampak samping kiri"></v-textarea>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-textarea label="Tampak oklusal atas"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                <v-textarea label="Tampak oklusal bawah"></v-textarea>
            </v-col>
        </v-row>

        <br>
        <h4>5. ANALISIS MODEL STUDI</h4>
        <hr>
        <h4>Bentuk lengkung gigi</h4>
        <br>
        <v-row>
            <v-col cols="6" md="6">
                <v-select
                label="RA"
                :items="['setengan elips', 'setengah lingkaran','trapezoid','parabola','U form','V form', 'simetris','asimetris']"
                ></v-select>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                label="RB"
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
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">2</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">3</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">4</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">5</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">6</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            <tr>
                <td class="text-center">7</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
            </tr>
            </tbody>
        </v-table>
        
        <h4>Relasi gigi-gigi pada oklusi sentrik</h4>

        <h4>Anterior</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field placeholder="mm" label="Overjet"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field placeholder="mm" label="Overbite"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Palatal bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Deep bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Open bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Edge to bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
        </v-row>

        <h4>Posterior</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-select
                label="Cross bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Open bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Scissor bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Cusp to cusp bite"
                :items="['ada', 'tidak ada']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                <v-select
                label="Relasi molar pertama kanan"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Relasi molar pertama kiri"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Relasi kaninus kanan"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="Relasi kaninus kanan"
                :items="['Klas I', 'II','III']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-select
                label="Garis tengah rahang bawah terhadap rahang atas"
                :items="['Segaris', 'tak segaris']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
           
            <v-col cols="5" md="5">
                <v-select
                label="Garis inter insisivi sentral terhadap garis tengah rahang RA"
                :items="['Segaris', 'tak segaris. Bergeser ke kanan','kiri']"
                ></v-select>
            </v-col>
            <v-col cols="1" md="1">
            <v-text-field label="mm"></v-text-field>
            </v-col>
            <v-col cols="5" md="5">
                <v-select
                label="Garis inter insisivi sentral terhadap garis tengah rahang RB"
                :items="['Segaris', 'tak segaris. Bergeser ke kanan','kiri']"
                ></v-select>
            </v-col>
            <v-col cols="1" md="1">
            <v-text-field label="mm"></v-text-field>
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
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">7.40-9.75</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">4.97-6.60</td>
            </tr>
            <tr>
                <td class="text-center">2</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.05-8.10</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">5.45-6.85</td>
            </tr>
            <tr>
                <td class="text-center">3</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">7.05-9.32</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.15-8.15</td>
            </tr>
            <tr>
                <td class="text-center">4</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.75-9.00</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.35-8.75</td>
            </tr>
            <tr>
                <td class="text-center">5</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.00-8.10</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">6.80-9.55</td>
            </tr>
            <tr>
                <td class="text-center">6</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">9.95-12.10</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">10.62-13.05</td>
            </tr>
            <tr>
                <td class="text-center">7</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">8.75-10.87</td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td class="text-center">8.90-11.37</td>
            </tr>
            </tbody>
        </v-table>

        <br>
        <v-row>
            <v-col cols="12" md="12">
          <v-textarea label="Skema/foto oklusal gigi dari model studi"></v-textarea>
            </v-col>
        </v-row>

        <h4>Perhitungan</h4>
        <h4>Metode Pont</h4>

        <v-row>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jumlah mesiodistal 21|12"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jarak P1 - P2 pengukuran"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jarak P1 - P2 perhitungan: jumlah I x 100 / 80"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Diskrepansi"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                label="Diskrepansi"
                :items="['normal', 'kontraksi','distraksi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jarak M1 - M1 pengukuran"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jumlah I x 100 / 60"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-select
                label="Diskrepansi"
                :items="['normal', 'kontraksi','distraksi']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>
        
        <h4>Metode Pont</h4>
        <v-row>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jumlah lebar mesiodistal gigi dari M1 - M1"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jarak P1 - P1 (tonjol)"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="%" label="Indeks P: Jarak P1-P1 x 100% / md M1-M1"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" md="4">
                <v-select
                label="Lengkung gigi untuk menampung gigi-gigi"
                :items="['cukup', 'kurang','lebih']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="mm" label="Jarak inter fossa caninus"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field placeholder="%" label="Indeks FC: Jarak FC x 100% / md M1-M1"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4" md="4">
                <v-select
                label="Lengkung basal untuk menampung gigi-gigi"
                :items="['cukup', 'kurang','lebih']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-select
                label="Inklinasi gigi-gigi regio posterior"
                :items="['normal', 'divergen','konvargen']"
                ></v-select>
            </v-col>
            <v-col cols="4" md="4">
                <v-text-field label="Keterangan"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
                <v-text-field label="ALD metode"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Overjet awal"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Overjet akhir"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Rahang atas: Diskrepansi"></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field placeholder="mm" label="Rahang bawah: Diskrepansi"></v-text-field>
            </v-col>
        </v-row>
        
        <h4>6. ANALISIS RADIOGRAFI</h4>

        <v-row>
            <v-col cols="6" md="6">
                 <v-textarea label="Foto sefalometri"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                 <v-textarea label="Foto panoramik"></v-textarea>
            </v-col>
        </v-row>
        
        <h4>7. DIAGNOSIS</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field label="Maloklusi Angle Klas"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Hubungan Skeletal"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Malrelasi"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Malposisi"></v-text-field>
            </v-col>
        </v-row>

        <h5>Kasus maloklusi menyakut masalah</h5>
        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox label="Estetik"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Dental"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Skeletal"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-checkbox label="Fungsi penguyahanal"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="3" md="3">
                  <v-checkbox label="Crowding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Spacing"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Protrusif"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-checkbox label="Retrusif"></v-checkbox>
            </v-col>
        </v-row>
        <v-row>
        <v-col cols="3" md="3">
                  <v-checkbox label="Malposisi individual"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Crossbite"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                 <v-checkbox label="Lain-lain"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label=""></v-text-field>
            </v-col>
        </v-row>

        <h5>Solusi masalah</h5>
        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox label="RA Pencabutan"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RA Ekspansi"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RA Grinding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RA Plat aktif"></v-checkbox>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" md="3">
                  <v-checkbox label="RB Pencabutan"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RB Ekspansi"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RB Grinding"></v-checkbox>
            </v-col>
            <v-col cols="3" md="3">
                  <v-checkbox label="RB Plat aktif"></v-checkbox>
            </v-col>
        </v-row>

        <h4>8. ANALISIS ETIOLOGI MALOKLUSI</h4>

        <v-row>
            <v-col cols="12" md="12">
                <v-textarea label="ANALISIS ETIOLOGI MALOKLUSI"></v-textarea>
            </v-col>
        </v-row>

        <h4>9. PROSEDUR PERAWATAN</h4>
        <h4>Rencana perawatan</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field label="1. Pasien dirujuk ke bagian"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="2. Pencarian ruang untuk"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Koreksi malposisi gigi individual"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Retensi"></v-text-field>
            </v-col>
        </v-row>

        <h4>Jalannya perawatan</h4>
        <v-row>
            <v-col cols="3" md="3">
                <v-text-field label="1. Pencarian ruang"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="2. Pencarian ruang untuk"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Koreksi malposisi gigi individual"></v-text-field>
            </v-col>
            <v-col cols="3" md="3">
                <v-text-field label="Retensi"></v-text-field>
            </v-col>
        </v-row>

        <h4>2. Koreksi malposisi gigi individual</h4>

        <v-row>
            <v-col cols="6" md="6">
                <v-textarea label="Rahang atas"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                <v-textarea label="Rahang bawah"></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
                <v-text-field label="Intruksi Pada Pasien"></v-text-field>
            </v-col>
        </v-row>


        <h4>4. Retainer</h4>
        <v-row>
            <v-col cols="12" md="12">
                <v-textarea label="Retainer"></v-textarea>
            </v-col>
        </v-row>

        <h4>11. GAMBAR / DESAIN ALAT</h4>
        <h5>Plat aktif</h5>
        <v-row>
            <v-col cols="3" md="3">
                <v-textarea label="Rahang atas"></v-textarea>
            </v-col>
            <v-col cols="3" md="3">
                <v-textarea label="Rahang bawah"></v-textarea>
            </v-col>
            <v-col cols="3" md="3">
                <v-textarea label="Keterangan gambar"></v-textarea>
            </v-col>
        </v-row>

        <h4>12. PROGNOSIS</h4>
        <v-row>
            <v-col cols="3" md="3">
            <v-select
                label="Prognosis"
                :items="['Baik', 'sedang','buruk']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="a."
                :items="['Motivasi baik', 'sedang','kurang']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="b."
                :items="['OH baik', 'sedang','buruk']"
                ></v-select>
            </v-col>
            <v-col cols="3" md="3">
                <v-select
                label="c."
                :items="['Umur muda', 'dewasa muda']"
                ></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="12">
            <v-select
                label="Indikasi perawatan"
                :items="['kuratif', 'preventif','interseptif']"
                ></v-select>
            </v-col>
        </v-row>

      </v-container>
    </v-form>
  </template>
<script>
export default {
data: () => ({
    firstName: '',
    lastName: '',
}),
}
</script>

