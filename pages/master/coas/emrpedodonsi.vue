<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "emrpedodonsi",
});

</script>


<template>
    <v-form v-model="valid">
      <v-container>
        <h1 align="center">REKAM MEDIK<br/>PEDODONSI</h1>
        <hr/>
        <br/>
        <v-row>
                <v-col cols="12" md="2">
                <h4><br/>No. RM</h4>
                </v-col>
                <v-col cols="12" md="1">
                <h4><br/>:</h4>
                </v-col>
                <v-col cols="12" md="3">
                <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                <h4><br/>Tanggal</h4>
                </v-col>
                <v-col cols="12" md="1">
                <h4><br/>:</h4>
                </v-col>
                <v-col cols="12" md="3">
                <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
                </v-col>

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
                <h4><br/>Nama Supervisor</h4>
                </v-col>
                <v-col cols="12" md="1">
                <h4><br/>:</h4>
                </v-col>
                <v-col cols="12" md="3">
                <v-text-field background="transparent" v-model="lastname":rules="nameRules":counter="10" hide-details required></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                <h4><br/>Tanda Tangan</h4>
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
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="1. CHILD'S FULL NAME / Nama Lengkap Anak :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="2. GENDER / Jenis Kelamin :" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="3. AGE / Usia :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="4. SCHOOL LEVEL / Kelas :" hide-details required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="5. DATE OF BIRTH / Tanggal Lahir :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="6. PARENT'S NAME / Nama Orang Tua :" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="7. ADDRESS / Alamat :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="8. TELEPHONE / Telepon :" hide-details required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="9. OCUUPATION / Pekerjaan :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="10. CHILD's PHYCISIAN / PEDIATRICIAN / Dokter / Dokter Anak :" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="11. ADDRESS / Alamat :" hide-details required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="12. TELEPHONE / Telepon :" hide-details required></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">  
            <v-textarea label="13. ANAMNESIS / Chief Complain (s) / Keluhan Utama :"></v-textarea>
          </v-col>
        </v-row>

        <br/>
        <h4>II. MEDICAL AND DENTAL HISTORY / <small><i>RIWAYAT KESEHATAN UMUM DAN GIGI</i></small></h4>
        <hr><br/>

        <v-select
        label="1. Any problem with physical growth / Apakah ada gangguan pertumbuhan fisik ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="2. Any history of congenital heart disease / Apakah ada riwayat penyakit jantung bawaan ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="3. Does your child bruise easily or bised for a prolonged periode of after being cut / Apakah anak anda mudah berdarah atau lama waktu berdarah jika luka ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="4. Any history of anemia / Apakah pernah menderita anemia ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="5. Any history of hepatitis or jaundice / Apakah pernah menderita hepatitis ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="6. Is your child's allergic to any medication / Apakah anak anda alergi pada obat tertentu ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select label="7. Is your child currently taking any medicine / Apakah saat ini anda sedang minum obat ?" :items="['Yes', 'No']"
        ></v-select>
        <v-row>
        <v-col cols="12" md="12">
        <v-text-field placeholder="mm" label="7a. If yes, medication / Jika ya, sebutkan nama obatnya"></v-text-field>
        </v-col>
        </v-row>
        <br/>

        <v-select
        label="8. Has your child been hospitalized / Apakah anak anda pernah masuk rumah sakit ?"
        :items="['Yes', 'No']"
        ></v-select>
        <v-row>
        <v-col cols="12" md="12">
        <v-text-field placeholder="mm" label="8a. Reason / Alasan"></v-text-field>
        </v-col>
        </v-row>
        <br/>

        <v-select
        label="9. Does your child have a tooth ache / Apakah anak anda sedang sakit gigi ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="10. Has your child ever had a tooth ache / Pernahkah anak anda sedang sakit gigi ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="11. It this your child ever had an unfavorable dental experience / Apakah ini kunjungan pertama ke dokter gigi ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="12. Has Your child ever had an unfavorable dentral experience / Apakah anak anda punya pengalaman yang kurang menyenangkan dengan dokter gigi ?"
        :items="['Yes', 'No']"
        ></v-select>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field placeholder="mm" label="12a. If yes, when / Bila ya, kapan"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field placeholder="mm" label=", where / dimana"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
          <v-text-field placeholder="mm" label="12b. Reason(s) / Mengapa"></v-text-field>
          </v-col>
        </v-row>
        <br/>

        <v-select
        label="13. Does ( has ) your child having oral sucking habit beyond 1 year of age / Apakah anak anda punya kebiasaan buruk setelah usia 1 tahun ?"
        :items="['Finger sucking / Isap jari', 'Lip biting / Gigit bibir', 'Tongue thrust / mendorongkan lidah']"
        ></v-select>

        <v-select
        label="14. Does ( has ) your child have ( had ) difficulty openings his / her jaw / Apakah anak anda sedang / pernah mengalangi kesulitan membuka mulut ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="15. Does ( has ) your child have ( had ) popping or clicking noise or pain during eating or yawning / Apakah pada saat membuka mulut terasa sakit atau terdengar suara klik , popping pada sendi rahangnya ?"
        :items="['Yes', 'No']"
        ></v-select>


        <v-select
        label="16. How often does your child brush / Berapa kalo menyikat gigi ?"
        :items="['Yes', 'No']"
        ></v-select>
        <v-row>
          <v-col cols="12" md="12">
          <v-text-field placeholder="mm" label="16a. ____ time(s) / kali"></v-text-field>
          </v-col>
        </v-row>
        <br/>

        <v-select
        label="17. Does your child use a fluoride pasta / Apakah menggunakan pasta mengandung fluor ?"
        :items="['Yes', 'No']"
        ></v-select>

        <v-select
        label="18. Has your child ever had fluoride treatment / Pernahkah diberikan fluor ?"
        :items="['Yes', 'No']"
        ></v-select>

        <br/>
        <h4>III. PATIENT BEHAVIOUR RATINGS / <small><i>PERINGKAT PRILAKU PASIEN</i></small></h4>
        <hr><br/>

        <v-table density="compact" class="border">
            <thead>
            <tr>
                <th class="text-left">
                Rating No
                </th>
                <th colspan="1" class="text-left">
                Frankl scale
                </th>
                <th colspan="1" class="text-left">
                Before treatment / Sebelum perawatan
                </th>
                <th colspan="1" class="text-left">
                During treatment / Selama perawatan
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-left">1</td>
                <td class="text-left">Definitely negative , refusal of treatment , crying forcefully , fearful , extreme negativism / Sangat negative , penolakan perawatan , menangis meronta - ronta ketakutan , negatif ekstrim</td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left">2</td>
                <td class="text-left">Negative , reluctant , uncooperative , limited negativism , withdrawn / Negatif , keberatan , tidak koopratif , negatif terbatas</td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left">3</td>
                <td class="text-left">Positive , accept treatment but may be cautious or reserve , follows directions / Positif , menerima perawatan dengan waspada , mengikuti instruksi</td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left">4</td>
                <td class="text-left">Definitely positive , good rapport , interested in dental procedure , laugh and enjoy / Sangat positif , hubungan yang simpatik , tertarik dengan prosedur dental</td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            </tbody>
        </v-table>


        <br/>
        <br/>
        <h4>IV. PLAQUE SCORE / <small><i>NILAI PLAK</i></small></h4>
        <hr><br/>
        <v-table density="compact" class="border">
            <thead>
            <tr>
                <th class="text-left">
                </th>
                <th colspan="1" class="text-left">
                18
                </th>
                <th colspan="1" class="text-left">
                17
                </th>
                <th colspan="1" class="text-left">
                16
                </th>
                <th colspan="1" class="text-left">
                15
                </th>
                <th colspan="1" class="text-left">
                14
                </th>
                <th colspan="1" class="text-left">
                13
                </th>
                <th colspan="1" class="text-left">
                12
                </th>
                <th colspan="1" class="text-left">
                11
                </th>
                <th colspan="1" class="text-left">
                21
                </th>
                <th colspan="1" class="text-left">
                22
                </th>
                <th colspan="1" class="text-left">
                23
                </th>
                <th colspan="1" class="text-left">
                24
                </th>
                <th colspan="1" class="text-left">
                25
                </th>
                <th colspan="1" class="text-left">
                26
                </th>
                <th colspan="1" class="text-left">
                27
                </th>
                <th colspan="1" class="text-left">
                28
                </th>
            </tr>
            <tr>
                <th class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                55
                </th>
                <th colspan="1" class="text-left">
                54
                </th>
                <th colspan="1" class="text-left">
                53
                </th>
                <th colspan="1" class="text-left">
                52
                </th>
                <th colspan="1" class="text-left">
                51
                </th>
                <th colspan="1" class="text-left">
                61
                </th>
                <th colspan="1" class="text-left">
                62
                </th>
                <th colspan="1" class="text-left">
                63
                </th>
                <th colspan="1" class="text-left">
                64
                </th>
                <th colspan="1" class="text-left">
                65
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-left">Buccal Palatal</td>
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
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left">Buccal Palatal</td>
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
                <td class="text-left"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                85
                </th>
                <th colspan="1" class="text-left">
                84
                </th>
                <th colspan="1" class="text-left">
                83
                </th>
                <th colspan="1" class="text-left">
                82
                </th>
                <th colspan="1" class="text-left">
                81
                </th>
                <th colspan="1" class="text-left">
                71
                </th>
                <th colspan="1" class="text-left">
                72
                </th>
                <th colspan="1" class="text-left">
                73
                </th>
                <th colspan="1" class="text-left">
                74
                </th>
                <th colspan="1" class="text-left">
                75
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
                <th colspan="1" class="text-left">
                </th>
            </tr>
            <tr>
                <th class="text-left">
                </th>
                <th colspan="1" class="text-left">
                48
                </th>
                <th colspan="1" class="text-left">
                47
                </th>
                <th colspan="1" class="text-left">
                46
                </th>
                <th colspan="1" class="text-left">
                45
                </th>
                <th colspan="1" class="text-left">
                44
                </th>
                <th colspan="1" class="text-left">
                43
                </th>
                <th colspan="1" class="text-left">
                42
                </th>
                <th colspan="1" class="text-left">
                41
                </th>
                <th colspan="1" class="text-left">
                31
                </th>
                <th colspan="1" class="text-left">
                32
                </th>
                <th colspan="1" class="text-left">
                33
                </th>
                <th colspan="1" class="text-left">
                34
                </th>
                <th colspan="1" class="text-left">
                35
                </th>
                <th colspan="1" class="text-left">
                36
                </th>
                <th colspan="1" class="text-left">
                37
                </th>
                <th colspan="1" class="text-left">
                38
                </th>
            </tr>
            </tfoot>
        </v-table>

        <br/>
        <v-row>
          <v-col cols="12" md="12">
          <v-text-field v-model="firstname" :rules="nameRules":counter="10" label="Score / Nilai :" hide-details required></v-text-field>
          </v-col>
        </v-row>
        <br/>

        <br/>
        <h4>V. EXTRA ORAL EXAMINATION / <small><i>PEMERIKSAAN EXTRA ORAL</i></small></h4>
        <hr><br/>
        <h4>1. Facial form / Bentuk wajah</h4>
        <br/>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field placeholder="mm" label="a. Bilateral Symmetry / simetri bilateral ________"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field placeholder="mm" label="Asymmetri / Asimetri ________"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field placeholder="mm" label="b. Profile / profil : straight / lurus ________"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field placeholder="mm" label="convex / cembung ________"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
          <v-text-field placeholder="mm" label="concave / cekung ________"></v-text-field>
          </v-col>
        </v-row>

        <br/>
        <h4>2. Lips seal / Katup bibir</h4>
        <br/>
        <v-select
        label="Positive or Negative"
        :items="['Positive', 'Negative']"
        ></v-select>

        <br/>
        <h4>3. TMJ</h4>
        <br/>
        <v-row>
        <v-col cols="12" md="4"><v-select
        label="a. Clicking / Bunyi klik :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        <v-col cols="12" md="4"><v-select
        label="Left / Kiri :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        <v-col cols="12" md="4"><v-select
        label="Right / Kanan :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        </v-row>
        <v-row>
        <v-col cols="12" md="4"><v-select
        label="b. Pain / Nyeri :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        <v-col cols="12" md="4"><v-select
        label="Left / Kiri :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        <v-col cols="12" md="4"><v-select
        label="Right / Kanan :"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        </v-row>

        <br/>
        <h4>4. Body posture/ postur tubuh</h4>
        <br/>
        <v-row>
        <v-col cols="12" md="12"><v-select
        label="Select Postur"
        :items="['Stright / Tegap', 'Kiphosis / Kifosis', 'Scoliosis/Skoliosis', 'Lordosis / Lordosis']"
        ></v-select></v-col>
        </v-row>
        

        <br/>
        <h4>VI. INTRA ORAL EXAMINATION / <small><i>PEMERIKSAAN INTRA ORAL</i></small></h4>
        <hr><br/>
        <h4>1. Stage of detention / Tahapan geligi</h4>
        <br/>
        <v-row>
        <v-col cols="12" md="12"><v-select
        label="Select Stage"
        :items="['Primary / Sulung', 'Mixed / Campuran', 'Early/Awal', 'Late / Lanjut', 'Permanent / Tetap']"
        ></v-select></v-col>
        </v-row>

        <h4>2. Soft tissue status / Status jaringan lunak :</h4>
        <br/>
        <v-text-field placeholder="mm" label="a. Gingivitis : region ________"></v-text-field>
        <v-text-field placeholder="mm" label="b. Stomatitis : region ________"></v-text-field>
        <v-text-field placeholder="mm" label="c. Gum Boil / fistulate : region ________"></v-text-field>

        <br/>
        <h4>3. Dental anomaly / Anomal gigi</h4>
        <br/>
        <v-row>
        <v-col cols="12" md="12"><v-select
        label="YES OR NO"
        :items="['Yes', 'No']"
        ></v-select></v-col>
        </v-row>

        <br/>
        <h4>4. Premature loss / Gigi tanggal dini</h4>
        <br/>
        <v-text-field placeholder="mm" label="?__________"></v-text-field>

        <br/>
        <h4>5. Over retained primary tooth / Persintensi gigi sulung</h4>
        <br/>
        <v-text-field placeholder="mm" label="?__________"></v-text-field>


        <br/>
        <br/>
        <h4>ODONTOGRAM / <small><i>ODONTOGRAM</i></small></h4><br/>
        <v-img :width="1000" aspect-ratio="16/9" cover src="/img/gigi.png"></v-img>
        <h4>Palatal</h4>
        <br/>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field placeholder="mm" label="d:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="e:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="f:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="def:"></v-text-field>
          </v-col>
        </v-row>
        <h4>Lingual</h4>
        <br/>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field placeholder="mm" label="d:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="e:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="f:"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
          <v-text-field placeholder="mm" label="def:"></v-text-field>
          </v-col>
        </v-row>

        <h4>Surface are to be noted using the following capital letters / bidang orientasi notasi dengan huruf-huruf besar berikut</h4>
        <br/>

        <h4>M = Mesial</h4>
        <h4>D = Distal</h4>
        <h4>V = Lingual</h4>
        <h4>O = Occlusal</h4>
        <br/>

        <h4>Material (FILLING) / bahan (penambahan)</h4>
        <h4>Use the following colors / Gunakan warna-warni berikut</h4>
        <h4>Black / Hitam = Amalgam / amalgam, in,lay, uplay, stainless steel crown</h4>
        <h4>Red / Merah = Gold / Emas</h4>
        <h4>Green / Hijau = Tooth collor material / bahan tambal sesuai warna gigi</h4>
        <br>

        <h4>Missing teeth / gigi tanggal = place large cros over the tooth / silang pada posisi gigi tanggal (X)</h4>
        <h4>Cavity / Kavitas = Outline cavity is black / jejaki kavitas dengan garis hitam (O)</h4>
        <h4>Restoration / Tambal = Block out restorationusing the aforementioned color coding / tambahan diberi warna penuh dengan kode di atas (.)</h4>
        <h4>Fracture / Patah = Fracture of tooth material denoted by "=/" symbol over effected tooth / patahan material ggig ditunjukkan dengan tanda "=/" pada gig yang bersangkutan</h4>
        <h4>Crown / Mahkota = color tooth with appropriate color / beri warna yang sesuai dengan bahan tambal</h4>
        <h4>Space closed/ Penutupan ruang = Use arrow / gunakan tanda -><- </h4>
        <h4>Space opened/ perenggangan = Use arrow / gunakan tanda <- -> </h4>
        <h4>Tooth Rotate/ Gigi Terputar = Use of a curve arrow under tooth / gunakan tanda panah lekung di bawah gigi tsb 0 </h4>
        <h4>Retained root/ Sisa Akar = RR / tandai dengan RR </h4>
        <h4>Non Vital / gigi mati = NV / tandai dengan NV</h4>
        <h4>Unerupted tooth / gigi tidak tumbuh = use capital letters "UE" / tandai dengan hurud besar "UE"</h4>
        <h4>Partial Eruption  / gig tumbuh sebagian = use capital letters "PE" / tandai dengan huruf besar "PE"</h4>

        <br/>
        <br/>
        <h4>VII. ORAL FINDING DIAGNOSIS & TREATMENT PLAN / <small><i>DIAGNOSA & RENCANA PERAWATAN</i></small></h4>
        <hr><br/>
        <v-table density="compact" class="border">
            <thead>
            <tr>
                <th class="text-center">
                ORAL FINDING / TEMUKAN
                </th>
                <th colspan="1" class="text-center">
                DIAGNOSIS / DIagnosis
                </th>
                <th colspan="1" class="text-center">
                TREATMENT PLANING / Rencana Perawatan
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            </tbody>
        </v-table>

        <br/>
        <br/>
        <h4>VIII. TREATMENT / <small><i>PERAWATAN</i></small></h4>
        <hr><br/>
        <v-table density="compact" class="border">
            <thead>
            <tr>
                <th class="text-left">
                Date / Tanggal
                </th>
                <th colspan="1" class="text-left">
                Item / Uraian
                </th>
                <th colspan="1" class="text-left">
                Superviso Signature / Tandatangan Supervisi
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            <tr>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
            </tr>
            </tbody>
        </v-table>

        

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
