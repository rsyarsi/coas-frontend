<template>
    <v-row>
      <v-col class="text-center">
        <PageHeader title="FORM PENILAIAN DOSEN PEMBIMBING" />
        <v-container fluid>
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
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.tglkunjungan"
                                            label="Calories"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.nomr"
                                            label="Fat (g)"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.noepisode"
                                            label="Carbs (g)"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.noregistrasi"
                                            label="Protein (g)"
                                        ></v-text-field>
                                        </v-col> 
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.namapasien"
                                            label="Protein (g)"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.poliklinik"
                                            label="Protein (g)"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.mahasiswa"
                                            label="Protein (g)"
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