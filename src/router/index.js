import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Department from '../views/Department.vue'
import Employee from '../views/Employee.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import Payroll from '../views/Payroll.vue'
import Dtr from '../views/Dtr.vue'
import SSSloan from '../views/SSSloan.vue'
import NewSSSLoan from '../views/NewSSSLoan.vue'
import CashAdvance from '../views/CashAdvance.vue'
import NewCashAdvance from '../views/NewCashAdvance.vue'
import Position from '../views/Position.vue'
import TeamLeader from '../views/TeamLeader.vue'
import PayrollReport from '../views/PayrollReport.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/department',
    name: 'Dapartment',
    component: Department
  },
  {
    path: '/employee Information',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/employee Details',
    name: 'EmployeeDetails',
    component: EmployeeDetails
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: Payroll
  },
  {
    path: '/dtr',
    name: 'Dtr',
    component: Dtr
  },
  {
    path: '/SSS Loan',
    name: 'SSSloan',
    component: SSSloan
  },
  {
    path: '/newSSSLoan',
    name: 'NewSSSLoan',
    component: NewSSSLoan
  },
  {
    path: '/cashAdvance',
    name: 'CashAdvance',
    component: CashAdvance
  },
  {
    path: '/newCashAdvance',
    name: 'NewCashAdvance',
    component: NewCashAdvance
  },
  {
    path: '/position',
    name: 'Position',
    component: Position
  },
  {
    path: '/team Leader',
    name: 'TeamLeader',
    component: TeamLeader
  },
  {
    path: '/payroll Report',
    name: 'PayrollReport',
    component: PayrollReport
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
