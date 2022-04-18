<template>
  <div v-if="showing" class="swipe-card" v-bind:class="{ animated: animating, current: current }" v-bind:style="{ transform: returnTransformString }">
    <div class="image-icon" v-bind:class="icon.type" v-bind:style="{ opacity: icon.opacity }"></div>
    <p class="name is-size-6">{{ comment }}</p>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue"
import interact from "interactjs"

export default Vue.extend({
  props: {
    current: {
      type: Boolean,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    approved: {
      type: Boolean
    }
  },
  data() {
    return {
      showing: true,
      animating: true, // Controls CSS class with transition declaration
      threshold: window.innerWidth / 3, // Breakpoint distance to approve/reject a card
      maxRotation: 20, // Max rotation value in degrees
      position: {
        x: 0,
        y: 0,
        rotation: 0
      },
      icon: {
        opacity: 0,
        type: null
      }
    }
  },
  computed: {
    returnTransformString: function () {
      if (this.animating === false || this.approved !== null) {
        const x = this.position.x
        const y = this.position.y
        const rotate = this.position.rotation
        return "translate3D(" + x + "px, " + y + "px, 0) rotate(" + rotate + "deg)"
      } else {
        return null
      }
    }
  },
  mounted() {
    const element = this.$el
    const self = this

    interact(element).draggable({
      onstart: function () {
        self.animating = false
      },
      onmove: function (event) {
        const x = (self.position.x || 0) + event.dx
        const y = (self.position.y || 0) + event.dy

        let rotate = self.maxRotation * (x / self.threshold)

        if (rotate > self.maxRotation) {
          rotate = self.maxRotation
        } else if (rotate < -self.maxRotation) {
          rotate = -self.maxRotation
        }

        self.position.x = x
        self.position.y = y
        self.position.rotation = rotate

        if (rotate > 0) {
          self.icon.type = "approve"
        } else if (rotate < 0) {
          self.icon.type = "reject"
        }

        const opacityAmount = Math.abs(rotate) / self.maxRotation

        self.icon.opacity = opacityAmount
        self.$emit("draggedActive", self.icon.type, opacityAmount)
      },
      onend: function (event) {
        self.animating = true

        if (self.position.x > self.threshold) {
          self.$emit("draggedThreshold", true)
          self.icon.opacity = 1
        } else if (self.position.x < -self.threshold) {
          self.$emit("draggedThreshold", false)
          self.icon.opacity = 1
        } else {
          self.position.x = 0
          self.position.y = 0
          self.position.rotation = 0
          self.icon.opacity = 0
        }

        self.$emit("draggedEnded")
      }
    })
  },
  watch: {
    approved: function () {
      if (this.approved !== null) {
        const self = this

        // Remove interact listener to prevent further dragging
        interact(this.$el).unset()
        this.animating = true

        const x = window.innerWidth + window.innerWidth / 2 + this.$el.offsetWidth

        if (this.approved === true) {
          this.position.x = x
          this.position.rotation = this.maxRotation
          this.icon.type = "approve"
        } else if (this.approved === false) {
          this.position.x = -x
          this.position.rotation = -this.maxRotation
          this.icon.type = "reject"
        }

        this.icon.opacity = 1

        setTimeout(function () {
          self.showing = false
        }, 200)
      }
    }
  }
})
</script>
