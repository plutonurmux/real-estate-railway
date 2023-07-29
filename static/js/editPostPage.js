

const app = Vue.createApp({
    data() {
      return {
        "house_id" : test_data.id,
        componentShow : {
          "showFirst" : true,
          "showSecond" : false,
          "showThird" : false,
          "showFourth" : false,
        },
        "otherDuplexOptions" : false        
      }
    },
    methods: {
      updateTitle(new_title){
        const testt = this.$refs.formStep3
        testt.titleAd = new_title
      }
      ,
      moveToNextStep(hide,show){
        var that = this
        that.hideAppartementDuplex
        this.componentShow[hide] = false
        this.componentShow[show] = true
      },
      moveToBackStep(hide,show){
        var that = this
        that.hideAppartementDuplex
        this.componentShow[hide] = false
        this.componentShow[show] = true
      }
    },
    computed : {
      hideAppartementDuplex(){
        var house_categogry = this.$refs.firstStepForm.hs_cat;
        if (house_categogry == "House"){
          this.otherDuplexOptions = false
        }
        else if (house_categogry == "Villa"){
          this.otherDuplexOptions = false
        }
        else{
          this.otherDuplexOptions = true
        }
        console.log(this.otherDuplexOptions)
      }
    }
    ,
    mounted(){
      var that = this
    }
})



