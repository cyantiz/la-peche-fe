<script setup lang="ts">
import { PhPaperPlaneRight } from 'phosphor-vue'

const emits = defineEmits(['submit-message'])

const SendMsg = (event: any) => {
    const msg = event.target?.elements.msg.value as string
    if (!msg) return
    emits('submit-message', msg)
    // clear input
    event.target.reset()
}
</script>

<template>
    <form
        class="mt-10 flex gap-2 text-xs transition-all md:text-sm"
        autocomplete="off"
        @submit.prevent="SendMsg"
    >
        <input
            type="text"
            name="msg"
            placeholder="Enter your message"
            class="flex-1 rounded-full border-0 bg-[#F0F2F5] px-4 py-2 outline-none"
        />
        <button
            type="submit"
            class="text-theme hover: flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent hover:bg-black hover:bg-opacity-5"
        >
            <PhPaperPlaneRight weight="fill" :size="20" />
        </button>
    </form>
</template>

<style lang="less" scoped></style>
