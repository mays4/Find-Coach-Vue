<template>
  <div>
   <section>
    <base-card>
   <h2>Please register  as a coach now!</h2>
     <coach-form @save-data="saveData"></coach-form>
    </base-card>
   </section>
  </div>
</template>

<script>
import coachForm from '../../components/coaches/CoachForm.vue'
export default {
  components:{
   coachForm,
  },
 
  methods:{
    saveData(data){
     this.$store.dispatch('coaches/registerCoach',data)
     this.$router.replace('/coaches');
    }
  }
}
</script>