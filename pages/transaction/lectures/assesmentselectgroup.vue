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
                                        <div class="pb-4">Nama Mahasiswa/NIM : </div>
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
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Semester / Tahun :  </div>
                                    </v-col>
                                    <v-col cols="12" lg="3">
                                        <div class="pb-4">Semester 1 / 2024</div>
                                    </v-col>
                                </v-row> 
                            </v-form>
            
                </v-card>
            </v-col>
        </v-row>
          <v-row>
            <v-col cols="12" md="12">
                <v-data-table
                        :search="search"
                        :headers="headers"
                        :items="desserts"
                        sort-by="calories"
                        class="elevation-1"
                        >
                        <template v-slot:top>
                            <v-toolbar flat>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-format-float-right</v-icon>
                                </v-btn>
                                </template>
                                <v-card>
                                <v-card-text>
                                    <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Dessert name"
                                        ></v-text-field>
                                        </v-col>
                                         
                                    </v-row>
                                    </v-container>
                                </v-card-text>
                    
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                                    <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                <v-card-title class="headline"
                                    >Are you sure you want to delete this item?</v-card-title
                                >
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete"
                                    >Cancel</v-btn
                                    >
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                                    >OK</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small color="success" class="mr-2" @click="editItem(item)"
                            >mdi-pencil</v-icon
                            >
                        
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize"> Reset </v-btn>
                        </template>
                        </v-data-table>
            </v-col>

          </v-row>
      </v-container> 
    </v-col>
  </v-row>
</template>

<script>
import PageHeader from '@/components/Header/PageHeader.vue'
 
export default {
  name: 'FormsPage',

  components: {
    PageHeader
  },
   data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'no'
        },
        { text: 'Nama', value: 'nama' }, 
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
      }
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
            no: '1',
            nama: 'Tumpatan Komposit Klas I' 
          },
          {
            no: '2',
            nama: 'Tumpatan Komposit Klas II' 
          },
          {
            no: '3',
            nama: 'Tumpatan Komposit Klas III' 
          },
          {
            no: '4',
            nama: 'Tumpatan Komposit Klas IV' 
          },
          {
            no: '5',
            nama: 'Tumpatan GIC Klas V' 
          },
          {
            no: '6',
            nama: 'Rekapitulasi Nilai Akhir Konservasi Gigi' 
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