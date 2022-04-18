<style lang="scss">
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .steps {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .steps.active {
    display: flex;
  }
}

.loading-screen.dark {
  background-color: #17181c;
}
</style>

<script>
import Vue from "vue"
import chunk from "lodash/chunk"

export default Vue.extend({
  name: "LoadingScreen",
  props: {
    active: {
      type: Number,
      default: 1
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  render(createElement) {
    if (!this.$slots.default) {
      return null
    }

    const renderAncestor = (elements) =>
      createElement(
        "div",
        { attrs: { class: `loading-screen ${this.darkMode ? "dark" : ""}` } },
        elements.map((element, index) => {
          return createElement("div", { attrs: { class: "steps step-" + (index + 1) + (index + 1 === this.active ? " active" : "") } }, [element])
        })
      )
    return chunk(this.$slots.default, this.$slots.default.length).map((group) => {
      return renderAncestor(group)
    })
  }
})
</script>
