<template>
    <div>
        SSS:{{deductions.sss}}
        PhilHealth:{{deductions.philhealth}} 
        HDMF:{{deductions.hdmf}} 
        TAX:{{deductions.tax}}
    </div>
</template>

<script>
    export default {
        name:"deductions",
        props:['deductions'],

    }
</script>

<style lang="scss" scoped>

</style>