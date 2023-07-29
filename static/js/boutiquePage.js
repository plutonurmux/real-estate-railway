const app = Vue.createApp({
    data() {
      return {
        listing_data : dataListing,
        listing_count : data_count,
        boutique_name : JSON.parse(data_name),
        pagination_data : paginationData,
        boutique_id : data_pk,
        showOverlay : false,
        overLayData : null
      }
    },
    methods: {
        // Methods Goes Here
        toggleOverlay(){
            this.showOverlay = !this.showOverlay
        },
        updateOverLayData(data){
            this.overLayData = data
        }
    }
})