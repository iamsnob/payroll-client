<template>
  <div class="px-10" style="width:100vw">
    <br>
    <v-card>
        <v-form
            ref="form"
            v-model="valid"
        >
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6" sm="3">
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
                                            label="*Start Date"
                                            type='text'
                                            :rules="fieldRules"
                                            v-model="s_date"
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="s_date"  @input="menu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" sm="3">
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
                                        label="*End Date"
                                        type='text'
                                        :rules="fieldRules"
                                        v-model="e_date"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="e_date" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                        </v-col> 
                        <v-col cols="12" sm="6" md="4">
                            <v-btn  class="mr-2" @click="checkdates" :disabled="!valid">Check</v-btn>
                            <v-btn color="primary" dark @click="CSV" >Download</v-btn>
                        </v-col>    
                    </v-row>
                </v-container>
            </v-card-text>
        </v-form>
    </v-card>

      <v-card>
        <v-card-title>
        Payroll Report 
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="payrolls"
        >      
        </v-data-table>
  </v-card>
  
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
const { Parser } = require('json2csv')
export default {
    data:()=>({
        dtrDialog:false,
        dtrDialogDetails:'',
        valid:true,
        menu:false,
        menu2:false,
        s_date:'',
        e_date:'',
        payrollReport:[],
        headers: [
          {
            text: 'Name',
            align: 'start',
            value: 'Name',
          },
          { text: 'Start Date', value: 'Start Date' },
          { text: 'End Date', value: 'End Date' },
          { text: 'Present', value: 'Present' },
          { text: 'Basic', value: 'Basic' },
          { text: 'Overtime', value: 'Overtime' },
          { text: 'Reg.Hol', value: 'Reg.Hol' },
          { text: 'Spc.Hol', value: 'Spc.Hol' },
          { text: 'SSS Loan', value: 'SSS Loan' },
          { text: 'Cash Adv', value: 'Cash Adv' },
          { text: 'Late', value: 'Late' },
          { text: 'SSS', value: 'SSS' },
          { text: 'PhilHealth', value: 'PhilHealth' },
          { text: 'HDMF', value: 'HDMF' },
          { text: 'Tax', value: 'Tax' },
          { text: 'Gross', value: 'Gross' },
          { text: 'Deductions', value: 'Deductions' },
          { text: 'Net Pay', value: 'Net Pay' },
        ],
        fieldRules: [v => !!v || 'This field is required'],
        snackbar: false,
        text: '',
        timeout: 5000,
    }),

    computed:{
         payrolls(){
            return this.payrollReport
            },
    },
    methods:{
        checkdates(){
            const payrollData = this.$store.state.payrolls.filter(el=>el.dtr.start_date == this.s_date && el.dtr.end_date == this.e_date )
            if(payrollData.length){
                payrollData.forEach(el => {
                    this.payrollReport.push({
                        "Name": el.dtr.empD_id.name.name,
                        "Start Date" :el.dtr.start_date,
                        "End Date" :el.dtr.end_date,
                        "Present": el.dtr.no_of_days,
                        "Basic": el.basicRate,
                        "Overtime": el.overTime,
                        "Reg.Hol":el.regHoliday,
                        "Spc.Hol": el.spcHoliday,
                        "SSS Loan" : el.sssLoan,
                        "Cash Adv": el.cashAdvance,
                        "Late": el.late,
                        "SSS": el.dtr.empD_id.deductions.sss,
                        "PhilHealth": el.dtr.empD_id.deductions.philhealth,
                        "HDMF": el.dtr.empD_id.deductions.hdmf,
                        "Tax": el.dtr.empD_id.deductions.tax,
                        "Gross": el.grossIncome,
                        "Deductions": el.totalDeductions,
                        "Net Pay": el.netPay,
                    })
                });
                this.valid = false
            }else(
                this.valid = true
            )
        },
        downLoad(data){
            const blob = new Blob([data],{type:'text/csv'}) 
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.setAttribute('hidden','')
            a.setAttribute('href',url)
            a.setAttribute('download','payroll.csv')
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        },
        CSV(){
            if(this.payrollReport.length){
                const json2csvParser = new Parser()
                const csv = json2csvParser.parse(this.payrollReport)
                this.downLoad(csv)
            }else{
                this.snackbar = true
                this.text = "Payroll Report Must have data"
            }
        }
    }
}
</script>

<style>

</style>