<template>
  <div class="px-10" style="width:100vw">
      <br>
      <v-card>
        <v-card-title>
        Employee 
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
            <template #item.name="{ item }">
                <Empname :Ename="item.name" />
            </template>
            <template #item.deductions="{ item }">
                <Deductions :deductions="item.deductions" />
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    text
                    @click="dialogAct(item)">
                    Create DTR
                </v-btn>    
                </template>          
        </v-data-table>
  </v-card>
  <v-dialog v-model="dtrDialog" persistent max-width="600px">
                
                <v-card>
                    <v-card-title>
                        <span class="headline">Employee DTR</span>
                    </v-card-title>
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="dtr.start_date"
                                            label="*Start Date"
                                            :rules="fieldRules"
                                            type='text'
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dtr.start_date" @input="menu = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="dtr.end_date"
                                            label="*End Date"
                                            :rules="fieldRules"
                                            type='text'
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="dtr.end_date" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*Days" 
                                        :rules="numberRules"
                                        v-model="dtr.no_of_days"
                                        hint="Number of days Present"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*Regular Holiday" 
                                        :rules="numberRules"
                                        v-model="dtr.reg_holiday"
                                        hint="Number of Regular Holiday of employee will be paid"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="*Special Holiday"
                                        :rules="numberRules"
                                        v-model="dtr.spc_holiday"
                                        hint="Number of Special Holiday of employee will be paid"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*Overtime"
                                    :rules="numberRules"
                                    v-model="dtr.ot"
                                    hint="No. of O.T in hr. ex. 2.5 in hour"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*Late"
                                    :rules="numberRules"
                                    hint="No. of Late in minute, 1hr =  60min"
                                    v-model="dtr.late"
                                    ></v-text-field>
                                </v-col>
                                
                                
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dtrDialog=false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dtrSave" :disabled="!valid">Save</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>

            <!-- snackbar -->
            <div class="text-center">
                <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                >
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
                </v-snackbar>
            </div>
  </div>
</template>

<script>
import Empname from '../components/Empname'
import Deductions from '../components/Deductions'
export default {
    components:{
        Empname,
        Deductions
    },
    data:()=>({
        search: '',
        dtrDialog:false,
        menu: false,
        menu2: false,
        employee:{
            name:'',
            id:''
        },
        headers: [
          {
            text: 'Employee Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Position', value: 'position' },
          { text: 'Department', value: 'department' },
          { text: 'Team', value: 'team_leader' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        dtr:{},
        valid: true,
        numberRules: [
        v => !!v || 'This field is required',
        v => /^\d+(\.\d)?\d*$/.test(v) || 'This field accept only numbers',
        ],
        fieldRules: [v => !!v || 'This field is required'],
        snackbar: false,
        text: '',
        timeout: 5000,
    }),

    computed:{
         empoloyeeDetails(){
            return this.$store.state.empoloyeeDetails
            },
    },
    methods:{
        dialogAct(item){
            this.dtrDialog = true
            this.employee.name = item.name.name
            this.dtr.empD_id = item._id 
                   
        },
        async dtrSave(){
            const dtrCheck = this.$store.state.dtrs.filter(el=>el.empD_id._id == this.dtr.empD_id && el.end_date == this.dtr.end_date)
            if(dtrCheck.length){
                this.snackbar = true
                this.text = `This Employee has already dtr created, kindly check on payroll manager from ${this.dtr.start_date} - ${this.dtr.end_date}`
            }else{
                const  res = await this.$store.dispatch('newDtr',this.dtr)
                if(res){
                    this.snackbar = true
                    this.text ="Data has been added, please check payroll manager page!"
                    this.dtrDialog = false
                }
            }
            
        }
    }
}
</script>

<style>

</style>