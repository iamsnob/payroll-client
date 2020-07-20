<template>
  <div class="px-10" style="width:100vw">
      <br>
      <v-card>
        <v-card-title>
        Payroll Manager
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
        :items="payrolls"
        :search="search"
        @click:row="dtrDetails"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    text
                    @click="dtrDetails(item)">
                    <v-icon small>
                        mdi-pencil
                    </v-icon>
                </v-btn>            
                </template>          
        </v-data-table>
  </v-card>
  <v-dialog v-model="dtrDialog" persistent max-width="600px">
    <v-card>
        <v-card-title>
          <span class="headline">Employee DTR Details</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <th class="text-left">Name</th>
                  <td>{{dtrDialogDetails.dtr.empD_id.name.name}}</td>
                </tr>
                <tr>
                  <th class="text-left">Start Date</th>
                  <td>{{dtrDialogDetails.dtr.start_date}}</td>
                </tr>
                <tr>
                  <th class="text-left">End Date</th>
                  <td>{{dtrDialogDetails.dtr.end_date}}</td>
                </tr>
                <tr>
                  <th class="text-left">No. of Days(Present)</th>
                  <td>{{dtrDialogDetails.dtr.no_of_days}} days</td>
                </tr>
                <tr>
                  <th class="text-left">Regular Holiday</th>
                  <td>{{dtrDialogDetails.dtr.reg_holiday}}</td>
                </tr>
                <tr>
                  <th class="text-left">Special Holiday</th>
                  <td>{{dtrDialogDetails.dtr.spc_holiday}}</td>
                </tr>
                <tr>
                  <th class="text-left">Over Time(hr)</th>
                  <td>{{dtrDialogDetails.dtr.ot}} hr</td>
                </tr>
                <tr>
                  <th class="text-left">Late(min)</th>
                  <td>{{dtrDialogDetails.dtr.late}} min.</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dtrDialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  </div>
</template>

<script>
export default {
    data:()=>({
        search: '',
        dtrDialog:false,
        dtrDialogDetails:'',
        headers: [
          {
            text: 'Name',
            align: 'start',
            value: 'dtr.empD_id.name.name',
          },
          { text: 'Start Date', value: 'dtr.start_date' },
          { text: 'End Date', value: 'dtr.end_date' },
          { text: 'Present', value: 'dtr.no_of_days' },
          { text: 'Basic', value: 'basicRate' },
          { text: 'Overtime', value: 'overTime' },
          { text: 'Reg.Hol', value: 'regHoliday' },
          { text: 'Spc.Hol', value: 'spcHoliday' },
          { text: 'SSS Loan', value: 'sssLoan' },
          { text: 'Cash Adv', value: 'cashAdvance' },
          { text: 'Late', value: 'late' },
          { text: 'SSS', value: 'dtr.empD_id.deductions.sss' },
          { text: 'PhilHealth', value: 'dtr.empD_id.deductions.philhealth' },
          { text: 'HDMF', value: 'dtr.empD_id.deductions.hdmf' },
          { text: 'Tax', value: 'dtr.empD_id.deductions.tax' },
          { text: 'Gross', value: 'grossIncome' },
          { text: 'Deductions', value: 'totalDeductions' },
          { text: 'Net Pay', value: 'netPay' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
    }),

    computed:{
         payrolls(){
            return this.$store.state.payrolls
            },
    },
    methods:{
      dtrDetails(item){
            this.dtrDialog=true
            this.dtrDialogDetails = item
          }
    }
}
</script>

<style>

</style>