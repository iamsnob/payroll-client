<template>
  <div class="px-10" style="width:100vw">
      <br>
      <v-card>
        <v-card-title>
        Employee Details
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" xs="6">
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        </v-col>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="empoloyeeDetails"
        :search="search"
        >
            <template #item.deductions="{ item }">
                <Deductions :deductions="item.deductions" />
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    text
                    >
                    <v-icon small>
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn 
                    x-small 
                    text 
                    @click="deleteItem(item)">
                        <v-icon small>
                            mdi-delete
                        </v-icon>
                </v-btn>
                            
                </template>          
        </v-data-table>
  </v-card>
  </div>
</template>

<script>
import Deductions from '../components/Deductions'
export default {
    components:{
        Deductions
    },
    data:()=>({
        search: '',
        headers: [
          {
            text: 'Employee Name',
            align: 'start',
            value: 'name.name',
          },
          { text: 'Position', value: 'position' },
          { text: 'Department', value: 'department' },
          { text: 'Type', value: 'emptype' },
          { text: 'Employed Date', value: 'employed_date' },
          { text: 'Team', value: 'team_leader' },
          { text: 'Salary', value: 'salary' },
          { text: 'Daily Rate', value: 'daily_rate' },
          { text: 'Deductions', value: 'deductions' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
    }),

    computed:{
         empoloyeeDetails(){
            return this.$store.state.empoloyeeDetails
            },
    }
}
</script>

<style>

</style>