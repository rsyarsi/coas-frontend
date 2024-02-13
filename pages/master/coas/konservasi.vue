<script setup>

definePageMeta (
{
    layout: "dashboard",
    title: "Konservasi",
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
                        label="NIM"
                        required
                        hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <br />
            <hr />
            <br />
            <h1 class="font-weight-bold text-center text-basil">
                PEMERIKSAAN KASUS RESTORASI
            </h1>
            <h2>Sebelum Perawatan</h2>
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">18</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">21</td>
                        <td class="text-left">61</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">17</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">22</td>
                        <td class="text-left">62</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">16</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">23</td>
                        <td class="text-left">63</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">15</td>
                        <td colspan="1" class="text-left">55</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">24</td>
                        <td class="text-left">64</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">14</td>
                        <td colspan="1" class="text-left">54</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">25</td>
                        <td class="text-left">65</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">13</td>
                        <td colspan="1" class="text-left">53</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">12</td>
                        <td colspan="1" class="text-left">52</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">27</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">11</td>
                        <td colspan="1" class="text-left">51</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">28</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gambar.jpeg"></v-img>
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">41</td>
                        <td colspan="1" class="text-left">81</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">38</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">42</td>
                        <td colspan="1" class="text-left">82</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">37</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">43</td>
                        <td colspan="1" class="text-left">83</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">44</td>
                        <td colspan="1" class="text-left">84</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">35</td>
                        <td class="text-left">75</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">45</td>
                        <td colspan="1" class="text-left">85</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">74</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">46</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">33</td>
                        <td class="text-left">73</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">47</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">72</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">48</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">71</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <h5>
                KETERANGAN: Coret yang tidak perlu, TV= Tes Vitalitas : +/-,
                Diagnosis : Kelainan jaringan pulpa dan periapeks, Kelainan
                jaringan keras D1-D6(site, size)/KS/Lesi non karies Rencana
                Perawatan Non Invasif/Invasif (Restorasi/PSA disertai Restorasi
                Paska PSA)
            </h5>
            <hr />
            <br />
            <h2>Sesudah Perawatan</h2>
            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">18</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">21</td>
                        <td class="text-left">61</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">17</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">22</td>
                        <td class="text-left">62</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">16</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">23</td>
                        <td class="text-left">63</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">15</td>
                        <td colspan="1" class="text-left">55</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">24</td>
                        <td class="text-left">64</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">14</td>
                        <td colspan="1" class="text-left">54</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">25</td>
                        <td class="text-left">65</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">13</td>
                        <td colspan="1" class="text-left">53</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">26</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">12</td>
                        <td colspan="1" class="text-left">52</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">27</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">11</td>
                        <td colspan="1" class="text-left">51</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">28</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <v-img
                :width="1500"
                aspect-ratio="16/9"
                cover
                src="/img/gambar.jpeg"></v-img>
            <br />

            <v-table density="compact" class="border">
                <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th colspan="10" class="text-center">
                            PEMERIKSAAN GIGI DAN RENCANA PERAWATAN INVASIF
                        </th>
                    </tr>
                    <tr>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                        <th class="text-center">Elemen</th>
                        <th class="text-center"></th>
                        <th class="text-center">TV</th>
                        <th class="text-center">DIAGNOSA</th>
                        <th class="text-center">RENCANA PERAWATAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="1" class="text-left">41</td>
                        <td colspan="1" class="text-left">81</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">38</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">42</td>
                        <td colspan="1" class="text-left">82</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">37</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">43</td>
                        <td colspan="1" class="text-left">83</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">36</td>
                        <td class="text-left"><v-text-field></v-text-field></td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">44</td>
                        <td colspan="1" class="text-left">84</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">35</td>
                        <td class="text-left">75</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">45</td>
                        <td colspan="1" class="text-left">85</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">34</td>
                        <td class="text-left">74</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">46</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">33</td>
                        <td class="text-left">73</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">47</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">32</td>
                        <td class="text-left">72</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="1" class="text-left">48</td>
                        <td colspan="1" class="text-left">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-left">31</td>
                        <td class="text-left">71</td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                        <td class="text-center">
                            <v-text-field></v-text-field>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <br />
            <h5>KETERANGAN: lengkapi gambar kavitas yang telah dirawat.</h5>
        </v-container>
    </v-form>
</template>
