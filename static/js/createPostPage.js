const app = Vue.createApp({
    data() {
      return {
        componentShow : {
          "showFirst" : true,
          "showSecond" : false,
          "showThird" : false,
          "showFourth" : false,
        },
        "house_cat" : "",
      }
    },
    methods: {
      updateHouseCategory(house_cat){
        this.house_cat = house_cat  
        console.log(this.house_cat)
      }
      ,
      updateTitle(new_title){
        const testt = this.$refs.formStep3
        testt.titleAd = new_title
      }
      ,
      moveToNextStep(hide,show){
        this.componentShow[hide] = false
        this.componentShow[show] = true
      },
      moveToBackStep(hide,show){
        this.componentShow[hide] = false
        this.componentShow[show] = true
      }
    },
    mounted(){
      // window.stop()
    }
})



