<template>
  <div class="px-10" style="width:100vw">
      <br>
      <v-card>
        <v-card-title>
        Employee SSS Loan
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
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    text
                    @click="dialogAct(item)">
                    Create Loan
                </v-btn>    
                </template>          
        </v-data-table>
  </v-card>
  <v-dialog v-model="sssLoanDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">SSS Loan</span>
                    </v-card-title>
                    <v-form
                        ref="form"
                        v-model="valid"
                    >
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="*Full Name" 
                                        required 
                                        v-model="employee.name"
                                        disabled
                                        ></v-text-field>
                                </v-col>
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
                                            v-model="loan.start_date"
                                            label="*Start Date"
                                            type='text'
                                            :rules="fieldRules"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="loan.start_date" @input="menu = false"></v-date-picker>
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
                                            v-model="loan.end_date"
                                            label="*End Date"
                                            type='text'
                                            :rules="fieldRules"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="loan.end_date" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*Amount" 
                                        v-model="loan.amount"
                                        :rules="numberRules"
                                        hint=""
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*Monthly Amortization" 
                                        v-model="loan.amortization"
                                        :rules="numberRules"
                                        hint="Note: Monthly Amortization will be paid a half of amount indicated"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="*Payabe For "
                                        v-model="loan.payable_months"
                                        :rules="numberRules"
                                        hint="Number of payment to be paid For"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="sssLoanDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="loanSave" :disabled="!valid">Save</v-btn>
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
export default {
    data:()=>({
        search: '',
        sssLoanDialog:false,
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
            value: 'name.name',
          },
          { text: 'Position', value: 'position' },
          { text: 'Department', value: 'department' },
          { text: 'Team', value: 'team_leader' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        loan:{},
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
            this.sssLoanDialog = true
            this.employee.name = item.name.name
            this.loan.empD_id = item._id 
        },
        async loanSave(){
            const LoanCheck = this.$store.state.sssLoan.filter(el=>el.empD_id._id == this.loan.empD_id && el.status == "On going payment")
            if(LoanCheck.length){
                this.snackbar = true
                this.text = `This Employee has a on going loan payment from date ${this.loan.start_date} - ${this.loan.end_date} amouting Php${LoanCheck[0].amount} with ${LoanCheck[0].months} payments`
            }else{
                const  res = await this.$store.dispatch('newSSSloan',this.loan)
                if(res){
                    this.snackbar = true
                    this.text = "Data has been added, SSS Loan Page!"
                    this.sssLoanDialog = false
                } 
            }
            
        }
        
    }
}
</script>

<style>

</style>