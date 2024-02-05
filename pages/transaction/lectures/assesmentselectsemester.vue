<template>
    <v-row>
      <v-col class="text-center">
        <PageHeader title="FORM PENILAIAN DOSEN PEMBIMBING" />
        <v-container fluid>
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="px-4 py-4">
                    
                        <h3 class="title-page">
                            Data Detail Pasien
                        </h3>  
                            <v-form class="my-6">
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <p>No. Medrec : </p>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">00-00-01 </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Poliklinik :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Orthodonty  </div>
                                    </v-col>
                                </v-row> 
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <div class="pb-4">No. Episode/Registrasi : </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">0000-000922-001 / RJUM020224-0001</div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Dokter DPJP :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">dr. AAAAA </div>
                                    </v-col>
                                </v-row> 
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <div class="pb-4">Nama Pasien :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Pasien Test 1</div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Tgl Kunjungan :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">06-02-2024 09:00:02  </div>
                                    </v-col>
                                </v-row> 
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <div class="pb-4">Jenis Kelamin :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Laki-Laki</div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Nama Mahasiswa/NIM  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Mahasiswa A / 0928837743434 </div>
                                    </v-col>
                                </v-row> 
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <div class="pb-4">Tgl Lahir :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">01-01-2020</div>
                                    </v-col>
                                     
                                </v-row> 
                            </v-form>
            
                </v-card>
            </v-col>
        </v-row>
          <v-row>
            <v-col cols="12" md="12">
                <v-card class="px-4 py-4"> 
                    <h3 class="title-page">
                        Silahkan Pilih Semester dan Tahun
                    </h3>  
                    <v-form class="my-6">
                                <v-row>
                                    <v-col cols="12" lg="2">
                                        <p>Tahun : </p>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <v-select
                                            v-model="select"
                                            :items="itemTahun"
                                            :error-messages="selectErrors"
                                            label="Tahun"
                                            required
                                            @change="$v.select.$touch()"
                                            @blur="$v.select.$touch()"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Semester :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <v-select
                                            v-model="select"
                                            :items="itemSemester"
                                            :error-messages="selectErrors"
                                            label="Semester"
                                            required
                                            @change="$v.select.$touch()"
                                            @blur="$v.select.$touch()"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" lg="3"> 
                                        <v-btn tile color="primary" class="mr-4" @click="submit">
                                            submit
                                        </v-btn> 
                                    </v-col>
                                </v-row>  
                            </v-form>
                </v-card>
            </v-col>

          </v-row>
      </v-container> 
    </v-col>
  </v-row>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'FormsPage',

  components: {
    PageHeader
  },
  validations: {
     
    select: { required }
    
  },
   data: () => ({
    itemTahun: ['2020', '2021', '2022', '2023','2024'],
    itemSemester: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'],
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Tgl Kunjungan', value: 'tglkunjungan' },
        { text: 'No. MR', value: 'nomr' },
        { text: 'No. Episode', value: 'noepisode' },
        { text: 'No. Registrasi', value: 'noregistrasi' },
        { text: 'Nama Pasien', value: 'namapasien' },
        { text: 'Poliklinik', value: 'poliklinik' },
        { text: 'Nama Mahasiswa', value: 'mahasiswa' }, 
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),
  
    computed: {
        formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        
         
         
    },
  
    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      }
    },
  
    created() {
      this.initialize()
    },
  
    methods: {
      initialize() {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A1'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A2'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A3'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A4'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A5'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A6'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A7'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A8'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A9'
          },
          {
            name: 'Frozen Yogurt',
            tglkunjungan: '07-02-2024',
            nomr: '00-00-01',
            noepisode: 'E0000-01',
            noregistrasi: 'RJUM06022024-0001',
            namapasien: 'TEST 1',
            poliklinik: 'Orthodonty',
            mahasiswa: 'Mahasiswa A10'
          }
        ]
      },
  
      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  
      deleteItem(item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  
      deleteItemConfirm() {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },
  
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }

  

   
}
</script>