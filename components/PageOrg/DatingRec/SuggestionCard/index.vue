<script setup lang="ts">
import { CSSProperties, VNodeRef } from 'vue'

const emit = defineEmits([
    'showDetailBtnClick',
    'like',
    'dislike',
    'star',
    'dismiss',
])

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
    style.transition = 'transform .3s'
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

    if (Math.abs(properties.offsetX) > cardRef.value.clientWidth * 0.2) {
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
    const { clientX, clientY } = e
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

    const rotate = Math.min(Math.max(properties.offsetX * 0.1, -30), 30)
    style.transform = `translate(${properties.offsetX}px, ${properties.offsetY}px) rotate(${rotate}deg)`
}

const dismiss = (direction: 1 | -1) => {
    properties.startPoint = null
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('touchend', handleTouchEnd)
    document.removeEventListener('touchmove', handleTouchMove)
    style.transition = 'transform 1s'
    style.transform = `translate(${direction * window.innerWidth * 1.5}px, ${
        properties.offsetY
    }px) rotate(${45 * direction}deg)`
    cardRef.value.classList.add('dismissing')
    setTimeout(() => {
        cardRef.value.remove()
    }, 1000)

    emit('dismiss')

    if (direction === 1) {
        emit('like')
    }
    if (direction === -1) {
        emit('dislike')
    }
}

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

watchEffect(() => {
    if (cardRef.value) {
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
            class="__info recommendation-card absolute mx-auto flex w-full max-w-[570px] cursor-pointer select-none flex-col items-center gap-4 overflow-scroll rounded-xl bg-white p-4 md:w-[420px] md:overflow-auto"
            :style="{ '--index': index, ...style }"
            @drag="(e) => e.preventDefault()"
            @mousedown="handleCardMouseDown"
            @touchstart="handleCardTouchStart"
        >
            <div class="relative flex md:w-full">
                <div class="__info__images flex md:w-full">
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
                        <span
                            class="text-lg font-medium text-white xs:text-2xl xs:font-bold"
                            >{{ infoWithImages.name }}, {{ age }}</span
                        >
                        <span
                            v-if="infoWithImages.location"
                            class="flex items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhMapPin weight="fill" size="18" />
                            {{ infoWithImages.location }}
                        </span>
                        <span
                            v-if="infoWithImages.education"
                            class="flex items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhGraduationCap weight="fill" size="18" />
                            {{ infoWithImages.education }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="actions flex items-start gap-6">
                <PageOrgDatingRecActionButton
                    type="dislike"
                    @button-click="$emit('dismiss'), $emit('dislike')"
                />
                <PageOrgDatingRecActionButton
                    type="star"
                    @button-click.stop="$emit('star')"
                />
                <PageOrgDatingRecActionButton
                    type="like"
                    @button-click="$emit('dismiss'), $emit('like')"
                />
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped>
.recommendation-card {
    transform: translateZ(calc(-3px * var(--index)))
        translateY(calc(-3px * var(--index))) rotate(calc(-1deg * var(--index)));
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
        transform: none;
        box-shadow: none;
        overflow: hidden;
    }
}
</style>
