<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="datas"
    sort-by="id"
    class="elevation-3"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-bold">Master Data / Spesialis</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          single-line
          hide-details
          dense
          outlined
        ></v-text-field>
            <v-btn
              icon
              color="primary"
              class="mb-2"
            >
              <v-icon>mdi-file-import</v-icon>
            </v-btn>
            <v-btn
              icon
              color="primary"
              class="mb-2"
            >
              <v-icon>mdi-file-export</v-icon>
            </v-btn>
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
                  <v-col>
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.spesialis"
                      label="Nama"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="editedItem.grup_spesialis"
                      :items="['Gigi', 'Bedah']"
                      label="Grup"
                    ></v-select>
                  </v-col>
                  </v-row>
                  <v-row>
                  <v-col>
                    <v-radio-group label="Status?" v-model="editedItem.status">
                      <v-radio name="active" label="Tidak Aktif" :value="0"></v-radio>
                      <v-radio name="active" label="Aktif" :value="1"></v-radio>                
                  </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Simpan </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="justify-center"
              >Yakin ingin menghapus data?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
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
    <template v-slot:item.status="{ value }">
        {{ value ? 'Aktif' : 'Tidak Aktif' }}
    </template>  
    <template v-slot:item.actions="{ item }">
      <v-icon small color="success" class="mr-2" @click="editItem(item)"
        >mdi-pencil</v-icon
      >
      <v-icon small color="error" class="mr-2" @click="deleteItem(item)"
        >mdi-delete</v-icon
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'ID', value: 'id', sortable: true },
      { text: 'Nama', value: 'spesialis', sortable: true },
      { text: 'Grup', value: 'grup_spesialis', sortable: true },
      { text: 'Status', value: 'status', sortable: true },
      { text: 'Aksi', value: 'actions', sortable: false }
    ],
    datas: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      spesialis: "",
      grup_spesialis: "",
      status: 0,
    },
    defaultItem: {
      id: '',
      spesialis: "",
      grup_spesialis: "",
      status: 0,
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
      this.datas = [
        {
          id: '3453534',
          spesialis: "Orthodonsia",
          grup_spesialis: "Gigi",
          status: 1,
        },
        {
          id: '2342345234',
          spesialis: "Pedodontia",
          grup_spesialis: "Bedah",
          status: 0,
        },
        {
          id: '2342342',
          spesialis: "Konservasi",
          grup_spesialis: "Gigi",
          status: 1,
        },
        {
          id: '2356161',
          spesialis: "Periodonsia",
          grup_spesialis: "Bedah",
          status: 1,
        },
        {
          id: '457223',
          spesialis: "Prosthodonsia",
          grup_spesialis: "Gigi",
          status: 0,
        },
        {
          id: '34513',
          spesialis: "Prosthodonsia",
          grup_spesialis: "Gigi",
          status: 0,
        },
        {
          id: '34161364',
          spesialis: "Periodonsia",
          grup_spesialis: "Gigi",
          status: 0,
        },
        {
          id: '3146124',
          spesialis: "Prosthodonsia",
          grup_spesialis: "Bedah",
          status: 1,
        },
        {
          id: '1235412',
          spesialis: "Pedodontia",
          grup_spesialis: "Bedah",
          status: 1,
        },
        {
          id: '1235125',
          spesialis: "Pedodontia",
          grup_spesialis: "Gigi",
          status: 1,
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.datas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.datas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.datas.splice(this.editedIndex, 1)
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
        Object.assign(this.datas[this.editedIndex], this.editedItem)
      } else {
        this.datas.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
