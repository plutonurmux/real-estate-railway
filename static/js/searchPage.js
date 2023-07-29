


const app = Vue.createApp({
    data() {
      return {
        liked_house_data : test_data,

        has_next : test_pag.hasNext,
        has_prev : test_pag.hasPrevious,
        page_num : test_pag.pageNumber,
        user_auth : test_pag.userAuth,
        csrf_token : csrfVal,

        //> Search Bar Parameters
        loc_params : test_pag.location,
        cat_params : test_pag.type,
        trans_params : test_pag.transaction,
        order_params : test_pag.order,

        showLoginCard: false,
      }
    },
    methods: {
      // Methods Goes Here
      openLoginCard(){
        this.showLoginCard = true
      }
      ,
      close_overlay(){
        this.showLoginCard = false
      }
    }
    ,
    mounted(){
      // console.log(this.cat_params)
    }

})





