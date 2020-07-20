<template>
  <div class="px-10" style="width:100vw">
      <div class="float-right">
           <v-btn
                color="primary"
                dark
                router to="/newSSSLoan"
                >
                New SSS Loan
            </v-btn>
      </div><br><br>
      <v-card>
        <v-card-title>
        SSS Loan
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
        :items="sssLoan"
        :search="search"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    text
                    @click="deleteItem(item)">
                    Update
                </v-btn>    
                </template>          
        </v-data-table>
  </v-card>
  <v-dialog v-model="dtrDialog" persistent max-width="600px">
                
                <v-card>
                    <v-card-title>
                        <span class="headline">Employee DTR</span>
                    </v-card-title>
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
                                            label="Start Date"
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
                                            label="End Date"
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
                                        label="Days" 
                                        v-model="dtr.no_of_days"
                                        hint="Number of days Present"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="Regular Holiday" 
                                        v-model="dtr.reg_holiday"
                                        hint="Number of Regular Holiday of employee will be paid"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="Special Holiday"
                                        v-model="dtr.spc_holiday"
                                        hint="Number of Special Holiday of employee will be paid"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="Overtime"
                                    v-model="dtr.ot"
                                    hint="No. of O.T in hr. ex. 2.5 in hour"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="Late"
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
                        <v-btn color="blue darken-1" text @click="dtrSave">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
  </div>
</template>

<script>
export default {
    data:()=>({
        search: '',
        sssLoanDialog:false,
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
            value: 'empD_id.name.name',
          },
          { text: 'Start Date', value: 'start_date' },
          { text: 'End Date', value: 'end_date' },
          { text: 'Amount', value: 'amount' },
          { text: 'M-Amortization', value: 'amortization' },
          { text: 'Payable For', value: 'payable_months' },
          { text: 'Payments No.', value: 'months' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        dtr:{},
        loan:{}
    }),

    computed:{
         sssLoan(){
            return this.$store.state.sssLoan
            },
    },
    methods:{
        dialogAct(){
            this.dtrDialog = true
            
                   
        },
        async dtrSave(){
            const dtrCheck = this.$store.state.dtrs.filter(el=>el.empD_id._id == this.dtr.empD_id && el.end_date == this.dtr.end_date)
            if(dtrCheck.length){
                alert(`this Employee has already dtr created, kindly check on payroll manager from ${this.dtr.start_date} - ${this.dtr.end_date}`)
            }else{
                const  res = await this.$store.dispatch('newDtr',this.dtr)
                if(res){
                    alert("Data has been added, please check payroll manager page!")
                    this.dtrDialog = false
                }
            }
            
        }
    }
}
</script>

<style>

</style>