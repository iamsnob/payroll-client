<template>
  <div class="px-10" style="width:100vw">
      <div class="float-right">
           <v-dialog v-model="employeeDialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    New Employee
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Employee Profile</span>
                    </v-card-title>
                    <v-form
                        ref="form"
                        v-model="employeeValid"
                    >
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="*Full Name" 
                                        required 
                                        v-model="employeeProfile.name"
                                        :rules="fieldRules"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="SSS No." v-model="employeeProfile.sss_no"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="PhilHealth" v-model="employeeProfile.philhealth_no"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="Tin  No."
                                    persistent-hint
                                   v-model="employeeProfile.tin_no"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="HDMF  No."
                                    persistent-hint
                                    v-model="employeeProfile.hdmf"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*Mobile No."
                                    :mask="mask"
                                    :rules="fieldRules"
                                    persistent-hint
                                    v-model="employeeProfile.contact_no"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
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
                                            v-model="employeeProfile.bday"
                                            label="*Birth Date"
                                            :rules="fieldRules"
                                            type='text'
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="employeeProfile.bday" @input="menu = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="*Parents Name" 
                                        required 
                                        :rules="fieldRules"
                                        v-model="employeeProfile.guardian"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                    label="Parents Mobile/Contact"
                                    :mask="mask"
                                    hint="0919******9"
                                    required
                                    v-model="employeeProfile.guardian_no"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    label="*Present Address" 
                                    required
                                    :rules="fieldRules"
                                    v-model="employeeProfile.address.current_add"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                    label="*Provincial Address" 
                                    :rules="fieldRules"
                                    required
                                    v-model="employeeProfile.address.provincial_add"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="employeeDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="empProfileSave" :disabled="!employeeValid">Save</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
      </div><br><br>
      <v-card>
        <v-card-title>
        Employee Information
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
        :items="empoloyeeInfo"
        :search="search"
        @click:row="employeeProfileClick"
        >
            <template v-slot:item.actions="{ item }">
                <!-- <v-btn
                    x-small
                    text
                    :to="{path:'/EditDetails',query:{id:item._id}}">
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
                </v-btn> -->
                <td @click.stop>
                <v-btn
                    small
                    text
                    @click="dialogAct(item)"
                    >
                    Create Details
                 </v-btn>
                </td>

                
                            
                </template>          
        </v-data-table>
  </v-card>

        <v-dialog v-model="employeeDetaialsDialog" persistent max-width="600px">
                
                <v-card>
                    <v-card-title>
                        <span class="headline">Employee Details</span>
                    </v-card-title>
                    <v-form
                        ref="form"
                        v-model="employeeDetailstValid"
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
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*SSS Benefits" 
                                        v-model="employeeDetails.deductions.sss"
                                        :rules="numberRules"
                                        hint="Amount to be deduct"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        label="*PhilHealth Benefits" 
                                        v-model="employeeDetails.deductions.philhealth"
                                        :rules="numberRules"
                                        hint="Amount to be deduct"
                                        ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="*Tax"
                                        v-model="employeeDetails.deductions.tax"
                                        :rules="numberRules"
                                        hint="Amount to be deduct/ if none 0 is accepted"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*HDMF  Benefits"
                                    v-model="employeeDetails.deductions.hdmf"
                                    :rules="numberRules"
                                    hint="Amount to be deduct"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*Monthly Rate"
                                    persistent-hint
                                    v-model="employeeDetails.salary"
                                    :rules="numberRules"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                    label="*Daily Rate"
                                    persistent-hint
                                    v-model="employeeDetails.daily_rate"
                                    :rules="numberRules"
                                    ></v-text-field>
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
                                            v-model="employeeDetails.employed_date"
                                            label="*Employment Date"
                                            :rules="fieldRules"
                                            type='text'
                                            readonly
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="employeeDetails.employed_date" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                    :items="['Regular','Contractual','Project Based']"
                                    label="*Employee Type"
                                    :rules="fieldRules"
                                    required
                                    v-model="employeeDetails.emptype"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                    :items="Position"
                                    label="*Position"
                                    :rules="fieldRules"
                                    required
                                    v-model="employeeDetails.position"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                    :items="Department"
                                    label="Department"
                                    required
                                    v-model="employeeDetails.department"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                    :items="Team"
                                    label="Team"
                                    required
                                    v-model="employeeDetails.team_leader"
                                    ></v-select>
                                </v-col>
                                
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="employeeDetaialsDialog=false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="empDetailsSave" :disabled="!employeeDetailstValid">Save</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>

            <v-dialog v-model="employeeProfileDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Employee Profile</span>
                    </v-card-title>
                    <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                        <tbody>
                            <tr>
                            <th class="text-left">Name</th>
                            <td>{{employeeProfileDialogDetails.name}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Birthday</th>
                            <td>{{employeeProfileDialogDetails.bday}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">SSS No.</th>
                            <td>{{employeeProfileDialogDetails.sss_no}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Philhealth No.</th>
                            <td>{{employeeProfileDialogDetails.philhealth_no}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Tin No.</th>
                            <td>{{employeeProfileDialogDetails.tin_no}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">HDMF No.</th>
                            <td>{{employeeProfileDialogDetails.hdmf}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Contact No.</th>
                            <td>{{employeeProfileDialogDetails.contact_no}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Parent</th>
                            <td>{{employeeProfileDialogDetails.guardian}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Parent Contact No.</th>
                            <td>{{employeeProfileDialogDetails.guardian_no}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Present Address</th>
                            <td>{{employeeProfileDialogDetails.address.current_add}}</td>
                            </tr>
                            <tr>
                            <th class="text-left">Prpvincial Address</th>
                            <td>{{employeeProfileDialogDetails.address.provincial_add}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="employeeProfileDialog=false">Close</v-btn>
                    </v-card-actions>
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
        employeeDialog: false,
        employeeDetaialsDialog: false,
        employeeProfileDialog:false,
        employeeProfileDialogDetails:'',
        employee:{
            name:'',
            id:''
        },
        menu: false,
        menu2: false,
        search: '', 
        headers: [
          {
            text: 'Employee Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Birth Day', value: 'bday' },
          { text: 'SSS No.', value: 'sss_no' },
          { text: 'Philhealth No.', value: 'philhealth_no' },
          { text: 'Tin No.', value: 'tin_no' },
          { text: 'HDMF No.', value: 'hdmf' },
          { text: 'Contact No.', value: 'contact_no' },
          { text: 'Guardian', value: 'guardian' },
          { text: 'Guardian Contact', value: 'guardian_no' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        employeeProfile:{
            address:{},
            bday: new Date().toISOString().substr(0, 10),
        },
        employeeDetails:{
            deductions:{}
        },
        employeeValid: true,
        employeeDetailstValid: true,
        numberRules: [
        v => !!v || 'This field is required',
        v => /^\d+(\.\d)?\d*$/.test(v) || 'This field accept only numbers',
        ],
        fieldRules: [v => !!v || 'This field is required'],
        mask:'####-###-####',
        snackbar: false,
        text: '',
        timeout: 5000,
    }),

    computed:{
        empoloyeeInfo(){
            return this.$store.getters.empoloyeeInfo
            },
        Position(){
            return this.$store.state.position.map(el=>el.name)
            },
        Department(){
            return this.$store.state.department.map(el=>el.name)
            },
        Team(){
            return this.$store.state.teamLeader.map(el=>el.name)
            },
    },
    methods:{
        async empProfileSave(){
             const  res = await this.$store.dispatch('newEmployeeInformation',this.employeeProfile)
             if(res){
                this.snackbar = true
                this.text ="Data has been added!"
                this.employeeDialog = false
             }
        },
        dialogAct(item){
            const empID =  this.$store.state.empoloyeeDetails.filter(el=>el.name._id==item._id)
            if(empID.length){
                this.snackbar = true
                this.text = 'This Employee has already details..'
            }else{
                this.employeeDetaialsDialog = true
                this.employee.name = item.name
                this.employee.id = item._id 
            }  
        },
        async empDetailsSave(){
            this.employeeDetails.name = this.employee.id
            const  res = await this.$store.dispatch('newEmployeeDetails',this.employeeDetails)
             if(res){
                this.snackbar = true
                this.text ="Employee Details has been added, Kindly Check on Employee Details Page"
                this.employeeDetaialsDialog = false
             }
            
        },
        employeeProfileClick(item){
            this.employeeProfileDialog = true
            this.employeeProfileDialogDetails = item
        }

        
    }
}
</script>

<style>

</style>