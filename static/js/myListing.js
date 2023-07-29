const app = Vue.createApp({
    data() {
      return {
        // Data Goes Here
        item_list : test_data,
        pagination_data : test_pag,
        showDeleteCard : false,
        deletePostId : 0
      }
    },
    methods: {
      // Methods Goes Here
      toggleOverlay(id){
        this.deletePostId = id
        return this.showDeleteCard = !this.showDeleteCard
      }
    }
    ,
    mounted(){
      var inputHidden = document.getElementById("yvalueInput")
      window.addEventListener("scroll", function(event) {
        var yValue = this.scrollY
        return inputHidden.value = yValue
      }, false);
    }
})
  

