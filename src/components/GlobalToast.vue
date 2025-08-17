<template>
  <transition name="toast-fade">
    <div v-if="visible" class="global-toast" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "GlobalToast",
  data() {
    return {
      visible: false,
      message: "",
      type: "success", // 'success' | 'error'
      timeoutId: null,
    };
  },
  methods: {
    show(msg, type = "success", duration = 3000) {
      this.message = msg;
      this.type = type;
      this.visible = true;
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.visible = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.global-toast {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  max-width: 90vw;
  padding: 14px 32px;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  text-align: center;
}
.global-toast.success {
  background: #1976d2;
}
.global-toast.error {
  background: #d32f2f;
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>
