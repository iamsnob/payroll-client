<template>
  <div class="px-10" style="width:50vw">
      <br><br>
    <v-form
            ref="form"
            v-model="valid"
    >
      <v-row class="d-flex align-center">
          <v-col cols="12" sm="6">
            <v-text-field
              label="New Position"
              outlined
              :rules="nameRules"
              :counter="50"
              v-model="position.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn color="primary"  class="mb-5" @click="save" :disabled="!valid">Save</v-btn>
          </v-col>
      </v-row>
    </v-form> 
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in positions" :key="item.name">
            <td>{{ item.name }}</td>
            <td><v-btn x-small >Edit</v-btn></td>
          </tr>
        </tbody>
      </template>
  </v-simple-table>
  </div>
</template>

<script>
export default {
  data:()=>({
    position:{},
    valid: true,
    nameRules: [
        v => !!v || 'Position is required',
        v => (v && v.length <= 50) || 'Position name must be less than 50 characters',
      ],
  }),
  computed:{
    positions(){
      return this.$store.state.position
    }
  },
  methods:{
    async save(){
      const  res = await this.$store.dispatch('newPosition',this.position)
      if(res){
        this.position.name = ''
      }
    }
  }
}
</script>

<style>

</style>