<template>
    <div class="flex h-screen w-screen justify-center">
        <div>
            <div
                class="flex w-full max-w-[512px] flex-col gap-4 self-start py-6 px-14 lg:w-[512px]"
            >
                <Logo is-with-text />
                <slot />
            </div>
        </div>
        <div class="hidden w-full p-6 lg:block">
            <img
                src="https://via.placeholder.com/1000/C4C4C4?text="
                alt="bg"
                class="h-full w-full rounded-tl-3xl rounded-br-3xl object-cover"
            />
        </div>
    </div>
</template>

<style lang="less" scoped></style>
