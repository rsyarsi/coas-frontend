<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="datas"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pencarian"
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
                  <v-col>
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.value"
                      label="Semester"
                    ></v-text-field>
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
      { text: 'Semester', value: 'value', sortable: true },
      { text: 'Status', value: 'status', sortable: true },
      { text: 'Aksi', value: 'actions', sortable: false }
    ],
    datas: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      value: 1,
      status: 0,
    },
    defaultItem: {
      id: '',
      value: 1,
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
          value: 1,
          status: 1,
        },
        {
          id: '2342345234',
          value: 3,
          status: 0,
        },
        {
          id: '2342342',
          value: 4,
          status: 1,
        },
        {
          id: '2356161',
          value: 8,
          status: 1,
        },
        {
          id: '457223',
          value: 1,
          status: 0,
        },
        {
          id: '34513',
          value: 9,
          status: 0,
        },
        {
          id: '34161364',
          value: 14,
          status: 0,
        },
        {
          id: '3146124',
          value: 12,
          status: 1,
        },
        {
          id: '1235412',
          value: 2,
          status: 1,
        },
        {
          id: '1235125',
          value: 5,
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
