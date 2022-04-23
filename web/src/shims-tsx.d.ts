import Vue, { VNode } from "vue"
import { MyConsole } from "./types/myconsole.type"
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  declare let myconsole: MyConsole
}
