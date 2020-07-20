import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empoloyeeInfo:[],
    empoloyeeDetails:[],
    dtrs:[],
    payrolls:[],
    sssLoan:[],
    cashAdvance:[],
    department:[],
    position:[],
    teamLeader:[],
    config:[
      { title: 'Department' },
      { title: 'Position' },
      { title: 'Team Leader' },
      ],
    employeeMenu:[
      { title: 'Employee Information' },
      { title: 'Employee Details' },
      ],
      loanMenu:[
        { title: 'SSS Loan' },
        { title: 'PagIbig Loan' },
        { title: 'Car Loan' },
      ],
      reportMenu:[
        { title: 'Payroll Report' },
        { title: 'DTR Report' },
        { title: 'Employee Report' },
      ]
  },
  getters:{
    empoloyeeInfo:state=>state.empoloyeeInfo.reverse(),
  },
  mutations: {
    //-- employee information --//
    LOAD_EMPLOYEE_INFORMATION(state,data){
      state.empoloyeeInfo = data
    },
    NEW_EMPINFORMATION(state,data){
      state.empoloyeeInfo = [...state.empoloyeeInfo,data]
    },

    //-- employee details --//
    LOAD_EMPLOYEE_DETAILS(state,data){
      state.empoloyeeDetails = data
    },
    NEW_EMPLOYEEDETAILS(state,data){
      state.empoloyeeDetails = [...state.empoloyeeDetails,data]
    },

    //-- dtrs --//
    LOAD_DTRS(state,data){
      state.dtrs = data
    },
    NEW_DTR(state,data){
      state.dtrs = [...state.dtrs,data]
    },

    //-- payroll --//
    LOAD_PAYROLL(state,data){
      state.payrolls = data
    },
    

    //-- SSS Loan--//
    LOAD_SSS_LOAN(state,data){
      state.sssLoan = data
    },
    NEW_SSS_LOAN(state,data){
      state.sssLoan = [...state.sssLoan,data]
    },

    //-- Cash Advance --//
    LOAD_CASH_ADVANCE(state,data){
      state.cashAdvance = data
    },
    NEW_CASH_ADVANCE(state,data){
      state.cashAdvance = [...state.cashAdvance,data]
    },

    //-- Departments --//
    LOAD_DEPARTMENTS(state,data){
      state.department = data
    },
    NEW_DEPARTMENTS(state,data){
      state.department = [...state.department,data]
    },

    //-- Postion --//
    LOAD_POSITION(state,data){
      state.position = data
    },
    NEW_POSITION(state,data){
      state.position = [...state.position,data]
    },

    //-- Team Leader--//
    LOAD_TEAM_LEADER(state,data){
      state.teamLeader = data
    },
    NEW_TEAM_LEADER(state,data){
      state.teamLeader = [...state.teamLeader,data]
    }
  },
  actions: {
    //--- Employee Information ---//
    async loadEmployeeInformation({commit}){
      try {
        const response = await Api().get('employee');
        const data = response.data
        commit('LOAD_EMPLOYEE_INFORMATION',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newEmployeeInformation({commit},value){
      try {
        const response = await Api().post('employee',value);
          if(response.status == 200){
            commit('NEW_EMPINFORMATION',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)

      } 
    },

    //--- Employee Details ---//
    async loadEmployeeDetails({commit}){
      try {
        const response = await Api().get('employeeDetail');
        const data = response.data
        commit('LOAD_EMPLOYEE_DETAILS',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newEmployeeDetails({commit},value){
      try {
        const response = await Api().post('employeeDetail',value);
          if(response.status == 200){
            commit('NEW_EMPLOYEEDETAILS',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)

      } 
    },

    //--- DTRS ---//
    async loadDtrs({commit}){
      try {
        const response = await Api().get('dtr');
        const data = response.data
        commit('LOAD_DTRS',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newDtr({dispatch,commit},value){
      try {
        const response = await Api().post('dtr',value);
          if(response.status == 200){
            commit('NEW_DTR',response.data);
            dispatch('loadPayroll')
            dispatch('loadCashAdvance')
            dispatch('loadSssLoan')
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },

    //--- Payroll ---//
    async loadPayroll({commit}){
      try {
        const response = await Api().get('payroll');
        const data = response.data
        commit('LOAD_PAYROLL',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },

    //--- SSS Loan ---//
    async loadSssLoan({commit}){
      try {
        const response = await Api().get('sssLoan');
        const data = response.data
        commit('LOAD_SSS_LOAN',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newSSSloan({commit},value){
      try {
        const response = await Api().post('sssLoan',value);
          if(response.status == 200){
            commit('NEW_SSS_LOAN',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },


    //--- Cash Advance ---//
    async loadCashAdvance({commit}){
      try {
        const response = await Api().get('cashAdvance');
        const data = response.data
        commit('LOAD_CASH_ADVANCE',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newCashAdvance({commit},value){
      try {
        const response = await Api().post('cashAdvance',value);
          if(response.status == 200){
            commit('NEW_CASH_ADVANCE',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },

    //--- Departments ---//
    async loadDepartments({commit}){
      try {
        const response = await Api().get('department');
        const data = response.data
        commit('LOAD_DEPARTMENTS',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newDepartment({commit},value){
      try {
        const response = await Api().post('department',value);
          if(response.status == 200){
            commit('NEW_DEPARTMENTS',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },

    //--- Position ---//
    async loadPosition({commit}){
      try {
        const response = await Api().get('position');
        const data = response.data
        commit('LOAD_POSITION',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newPosition({commit},value){
      try {
        const response = await Api().post('position',value);
          if(response.status == 200){
            commit('NEW_POSITION',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },

    //--- Team Leader ---//
    async loadTeamLeader({commit}){
      try {
        const response = await Api().get('teamLeader');
        const data = response.data
        commit('LOAD_TEAM_LEADER',data);
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async newTeamLeader({commit},value){
      try {
        const response = await Api().post('teamLeader',value);
          if(response.status == 200){
            commit('NEW_TEAM_LEADER',response.data);
            return response.data;
          }
      } catch (error) {
        console.log(error.response.data)
      } 
    },


  },
  modules: {
  }
})
