<template>
    <div>
        {{EmployeeDetails}}
    </div> 
</template>

<script>
export default {
    props:['EmpId','EmpProp'],

    computed:{
        EmployeeDetails(){
            return this.$store.state.empoloyeeDetails.filter(element=>element.id==this.EmpId)
        }
    }
}
</script>

<style>

</style>