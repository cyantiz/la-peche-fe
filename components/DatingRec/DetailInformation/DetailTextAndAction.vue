<script setup lang="ts">
import {
    PhMapPin,
    PhBriefcase,
    PhGraduationCap,
    PhForkKnife,
    PhFireSimple,
    PhRuler,
    PhDog,
    PhTranslate,
    PhLeaf,
    PhMoonStars,
    PhMartini,
    PhBaby,
    PhUserFocus,
} from 'phosphor-vue'

const props = defineProps<{
    info: IUserInformation
}>()
const age = computed(() => {
    return useNow().value.getFullYear() - (props.info?.yearOfBirth ?? 0)
})
</script>

<template>
    <div
        class="static flex w-full flex-col gap-2 px-5 pb-16 lg:relative lg:h-[512px] lg:w-96 lg:pl-0 lg:pr-2"
    >
        <div class="info flex flex-col gap-4 lg:overflow-y-auto">
            <div class="info__very-basic">
                <span class="mb-2 text-3xl font-bold"
                    >{{ info?.name }}, {{ age }}</span
                >
                <span
                    class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                >
                    <PhMapPin weight="fill" size="20" />
                    {{
                        removeAreaPrefix(
                            info?.location?.split(',').slice(3, 5).join(', ')
                        )
                    }}
                </span>
                <span
                    class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                >
                    <PhBriefcase weight="fill" size="20" />
                    {{ info?.job?.split(',').join(' at ') ?? info?.job }}
                </span>
                <span
                    class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                >
                    <PhGraduationCap weight="fill" size="20" />
                    {{ info?.education }}
                </span>
            </div>
            <div class="info__biographic">
                <div class="text-lg font-bold">About me</div>
                <div class="text-base">
                    {{ info?.biographic }}
                </div>
            </div>
            <div class="info__basic">
                <div class="mb-2 text-lg font-bold">Basic</div>
                <div class="items flex flex-wrap gap-2">
                    <DatingRecDetailInformationTag
                        v-show="info?.height"
                        :icon="PhRuler"
                        :text="info?.height + ' cm'"
                    />
                </div>
            </div>
            <div class="info__relationship">
                <div class="mb-2 text-lg font-bold">Relationship Expected</div>
                <div class="items flex flex-wrap gap-2">
                    <DatingRecDetailInformationTag
                        v-show="info?.orientation"
                        :icon="PhUserFocus"
                        :text="info?.orientation"
                    />
                    <!-- <DatingRecDetailInformationTag
                                        v-show="info?.relationshipGoal"
                                        :icon="PhEye"
                                        :text="info?.relationshipGoal"
                                    /> -->
                </div>
            </div>
            <div class="info__additional">
                <div class="mb-2 text-lg font-bold">Additional</div>
                <div class="items flex flex-wrap gap-2">
                    <DatingRecDetailInformationTag
                        v-show="info?.speaks"
                        :icon="PhTranslate"
                        :text="info?.speaks"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.offspring"
                        :icon="PhBaby"
                        :text="info?.offspring"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.pets"
                        :icon="PhDog"
                        :text="info?.pets"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.sign"
                        :icon="PhMoonStars"
                        :text="info?.sign"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.drugs"
                        :icon="PhLeaf"
                        :text="info?.drugs"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.smokes"
                        :icon="PhFireSimple"
                        :text="info?.smokes"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.diet"
                        :icon="PhForkKnife"
                        :text="info?.diet"
                    />
                    <DatingRecDetailInformationTag
                        v-show="info?.drinks"
                        :icon="PhMartini"
                        :text="info?.drinks"
                    />
                </div>
            </div>
        </div>
        <div
            class="actions absolute bottom-3 right-0 flex w-full justify-center gap-8 lg:bottom-0 lg:mb-0"
        >
            <DatingRecActionButton type="star" :shadow="false" />
            <div class="flex gap-6">
                <DatingRecActionButton type="dislike" :shadow="false" />
                <DatingRecActionButton type="like" :shadow="false" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.actions {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.7) 25%,
        rgba(255, 255, 255, 0.7) 50%,
        rgba(255, 255, 255, 1) 100%
    );
}
</style>
