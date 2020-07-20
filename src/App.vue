<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center mt-3">
        <p class="text-md-h5">Payroll System</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn text>Setting</v-btn>
    </v-app-bar>

    <v-content>
      <!-- menu -->

      <div class="d-flex float-left mt-3 ml-5">
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
            >
              Employee
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in employee"
              :key="i"
              router :to="{path:`/${item.title}`}"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
              to="/dtr"
            >
              DTR
            </v-btn>
          </template>

          <!-- <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list> -->
        </v-menu>

        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
              to="/payroll"
            >
              Payroll Manager
            </v-btn>
          </template>

          <!-- <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list> -->
        </v-menu>
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
            >
              Loan
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in loans"
              :key="i"
              router :to="{path:`/${item.title}`}"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
              to="/cashAdvance"
            >
              Cash Advance
            </v-btn>
          </template>
        </v-menu>
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs" 
              v-on="on"
              class="mr-1"
            >
              Reports 
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in reports"
              :key="i"
              :to="{path:`/${item.title}`}"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-1"
            >
              Config   
              <!-- Department Position Team Leader  -->
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(config, i) in configs"
              :key="i"
              router :to="{path:`/${config.title}`}"
            >
              <v-list-item-title>{{ config.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      
      <router-view class="float-left"></router-view>
      
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {},

  data: () => ({
     items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
  }),

  created(){
    this.$store.dispatch('loadEmployeeInformation')
    this.$store.dispatch('loadEmployeeDetails')
    this.$store.dispatch('loadDtrs')
    this.$store.dispatch('loadPayroll')
    this.$store.dispatch('loadSssLoan')
    this.$store.dispatch('loadCashAdvance')
    this.$store.dispatch('loadDepartments')
    this.$store.dispatch('loadPosition')
    this.$store.dispatch('loadTeamLeader')
  },

  computed:{
    configs(){
      return this.$store.state.config
    },
    employee(){
      return this.$store.state.employeeMenu
    },
    loans(){
      return this.$store.state.loanMenu
    },
    reports(){
      return this.$store.state.reportMenu
    }
  }
};
</script>
