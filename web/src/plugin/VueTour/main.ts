/* eslint-disable @typescript-eslint/no-unused-vars */
import VTour from "./components/VTour.vue"
import VStep from "./components/VStep.vue"

const VueTour = {
  install(Vue, options) {
    Vue.component(VTour.name, VTour)
    Vue.component(VStep.name, VStep)

    // Object containing Tour objects (see VTour.vue) where the tour name is used as key
    Vue.prototype.$tours = {}
  }
}

export default VueTour

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueTour)
}
