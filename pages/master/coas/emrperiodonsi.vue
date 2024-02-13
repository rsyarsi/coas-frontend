<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "emrperiodonsi",
});

</script>


<template>
  <v-form v-model="valid">
    <v-container>
      <h1 align="center">REKAM MEDIK<br/>PERIODONSI</h1>
      <hr/>
      <br/>
      <v-row>
              <v-col cols="12" md="2">
              <h4><br/>Nama Mahasiswa</h4>
              </v-col>
              <v-col cols="12" md="1">
              <h4><br/>:</h4>
              </v-col>
              <v-col cols="12" md="3">
              <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
              <h4><br/>NPM</h4>
              </v-col>
              <v-col cols="12" md="1">
              <h4><br/>:</h4>
              </v-col>
              <v-col cols="12" md="3">
              <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
              <h4><br/>Tahun Masuk Klinik</h4>
              </v-col>
              <v-col cols="12" md="1">
              <h4><br/>:</h4>
              </v-col>
              <v-col cols="12" md="3">
              <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
              </v-col>
      </v-row>
      <br/>
      <hr/>

      <br/><br/>
      <h4>I. PATIENT IDENTITY / <small><i>IDENTITAS PASIEN</i></small></h4>
      <hr><br/>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="NO. REKAM MEDIK :" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
        <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="NAMA :" hide-details required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="UMUR :" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
        <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="JENIS KELAMIN :" hide-details required></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="ALAMAT :" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
        <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="NO. TELP. :" hide-details required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="PEMERIKSA :" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="OPERATOR 1 :" hide-details required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="OPERATOR 2 :" hide-details required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="OPERATOR 3 :" hide-details required></v-text-field>
        </v-col>
      </v-row>
      <br/>
      <br/>

      <h4>
        1. Ditulis lengkap dan jelas menggunakan bolpen bukan pensil, tidak boleh di tip-ex
        <br/>2. Setiap rencana perawatan wajib diketahui dan ditanda tangani oleh dosen pembimbing klinik
        <br/>3. Apabila lembar pemeriksaan ini hilang, wajib mengulang semua requirement yang telah dikerjakan
        <br/>4. Lembar pemeriksaan apabila difotokopi karena dikerjakan bersama, harus diverifikasi oleh dosen
        pengawas klinik sesuai dengan status aslinya
        <br/>5. Dikumpulkan saat evaluasi selesai, bersama dengan buku nilai
        <br/>*(coret salah satu)
      </h4>

      <br/>
      <hr>
      <br/>

      <v-row>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Nama :"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Tanggal :"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="No Rekam Medis :"></v-text-field>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Alamat :"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Umur :"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
      <v-select
      label="Jenis Kelamin :"
      :items="['L', 'P']"
      ></v-select>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="12">
      <v-text-field placeholder="mm" label="Konsul dari :"></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
      <v-text-field placeholder="mm" label="Keluhan utama :"></v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea label="Anamnesis :"></v-textarea>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
      <v-select
      label="Gusi mudah berdarah saat sikat gigi :"
      :items="['Yes', 'No', 'Lain - Lain']"
      ></v-select>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Ket :"></v-text-field>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
      <v-select
      label="Penyakit Sistemik :"
      :items="['Ada', 'Tidak']"
      ></v-select>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Sebutkan bila ada :"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Obat yang diminum :"></v-text-field>
      </v-col>
      </v-row>

      <v-row>
      <v-col cols="12" md="4">
      <v-select
      label="Diabetes Melitus :"
      :items="['Ada', 'Tidak']"
      ></v-select>
      </v-col>
      <v-col cols="12" md="4">
      <v-text-field placeholder="mm" label="Bila Ada kadar Gula Darah :"></v-text-field>
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
