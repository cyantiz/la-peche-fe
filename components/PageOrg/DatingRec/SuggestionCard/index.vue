<script setup lang="ts">
import { CSSProperties } from 'vue'
import { VNodeRef } from 'vue'

defineEmits(['showDetailBtnClick'])

const props = withDefaults(
    defineProps<{
        infoWithImages: IUserInformationWithImages
        shadow?: boolean
        index: number
    }>(),
    {
        shadow: true,
    }
)

const age = computed(() => {
    return (
        useNow().value.getFullYear() - (props.infoWithImages.yearOfBirth ?? 0)
    )
})

const cardRef = ref<VNodeRef | null>(null)

const style = reactive<CSSProperties>({
    transform: '',
    transition: '',
})

interface CardProperties {
    startPoint: { x: number; y: number } | null
    offsetX: number
    offsetY: number
}

const properties = reactive<CardProperties>({
    startPoint: { x: 0, y: 0 },
    offsetX: 0,
    offsetY: 0,
})

const handleCardTouchStart = (e: TouchEvent) => {
    const touch = e.changedTouches[0]
    if (!touch) return
    const { clientX, clientY } = touch
    properties.startPoint = { x: clientX, y: clientY }
    document.addEventListener('touchmove', handleTouchMove)
    style.transition = 'transform 0s'
}

const handleTouchMove = (e: TouchEvent) => {
    if (!properties.startPoint) return
    const touch = e.changedTouches[0]
    if (!touch) return
    const { clientX, clientY } = touch
    handleMove(clientX, clientY)
}

const handleTouchEnd = () => {
    // dismiss card
    if (Math.abs(properties.offsetX) > cardRef.value.clientWidth * 0.7) {
        dismiss(properties.offsetX > 0 ? 1 : -1)
        return
    }

    properties.startPoint = null
    document.removeEventListener('touchmove', handleTouchMove)
    style.transform = ''
}

const handleCardMouseDown = (e: MouseEvent) => {
    const { clientX, clientY } = e
    properties.startPoint = { x: clientX, y: clientY }
    document.addEventListener('mousemove', handleMouseMove)
    style.transition = 'transform 0s'
}

const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    console.log('mouse move')
    const { clientX, clientY } = e
    console.log('client x y', { clientX, clientY })
    handleMove(clientX, clientY)
}

const handleMouseUp = () => {
    // dismiss card
    if (Math.abs(properties.offsetX) > cardRef.value.clientWidth * 0.7) {
        dismiss(properties.offsetX > 0 ? 1 : -1)
        return
    }
    style.transition = 'transform .3s'

    properties.startPoint = null
    document.removeEventListener('mousemove', handleMouseMove)
    style.transform = ''
}

const handleMove = (x: number, y: number) => {
    if (!properties.startPoint) return

    properties.offsetX = x - properties.startPoint.x
    properties.offsetY = y - properties.startPoint.y
    const rotate = properties.offsetX * 0.1
    style.transform = `translate(${properties.offsetX}px, ${properties.offsetY}px) rotate(${rotate}deg)`
}

const dismiss = (direction: 1 | -1) => {
    properties.startPoint = null
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
    // document.removeEventListener('touchend', handleTouchEnd)
    // document.removeEventListener('touchmove', handleTouchMove)
    style.transition = 'transform 1s'
    style.transform = `translate(${direction * window.innerWidth}px, ${
        properties.offsetY
    }px) rotate(${90 * direction}deg)`
    cardRef.value.classList.add('dismissing')
    setTimeout(() => {
        cardRef.value.remove()
    }, 1000)

    onDismiss()
    if (direction === 1) {
        onLike()
    }
    if (direction === -1) {
        onDislike()
    }
}

const onLike = () => {
    console.log('like')
}

const onDislike = () => {
    console.log('dislike')
}

const onDismiss = () => {
    console.log('dismiss')
}

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

watchEffect(() => {
    if (cardRef.value) {
        console.log('cardRef', cardRef.value)

        if (isTouchDevice()) {
            document.addEventListener('touchend', handleTouchEnd)
        } else {
            document.addEventListener('mouseup', handleMouseUp)
        }
    } else {
        // not mounted yet, or the element was unmounted (e.g. by v-if)
    }
})
</script>

<template>
    <ClientOnly>
        <div
            ref="cardRef"
            class="__info card absolute mx-auto flex w-[420px] cursor-pointer flex-col items-center gap-4 rounded-xl bg-white p-4"
            :style="{ '--index': index, ...style }"
            @drag="(e) => e.preventDefault()"
            @mousedown="handleCardMouseDown"
            @touchstart="handleCardTouchStart"
        >
            <div class="relative flex">
                <div class="__info__images flex w-full">
                    <PageOrgDatingRecImageCarousel
                        :images="infoWithImages.images"
                        :slides-per-view="1"
                        :preview-disabled="true"
                    />
                </div>

                <div
                    class="__info__text absolute bottom-0 flex w-full flex-col gap-4 rounded-lg bg-gradient-to-t from-black to-transparent p-4"
                    @click="$emit('showDetailBtnClick', infoWithImages)"
                >
                    <div class="flex flex-col">
                        <span class="text-2xl font-bold text-white"
                            >{{ infoWithImages.name }}, {{ age }}</span
                        >
                        <span
                            class="flex items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhMapPin weight="fill" size="18" />
                            {{ infoWithImages.location }}
                        </span>
                        <span
                            class="flex items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhGraduationCap weight="fill" size="18" />
                            {{ infoWithImages.education }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="actions flex items-start gap-6">
                <PageOrgDatingRecActionButton type="dislike" />
                <PageOrgDatingRecActionButton type="star" />
                <PageOrgDatingRecActionButton type="like" />
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped>
.card {
    transform: translateZ(calc(-3px * var(--index)))
        translateY(calc(-3px * var(--index))) rotate(calc(-1deg * var(--index)));
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.2);
}
</style>
