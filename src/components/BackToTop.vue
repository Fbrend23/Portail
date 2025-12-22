<script setup>
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<template>
    <div class="back-to-top-wrapper">
        <div class="scroll-up" @click="scrollToTop" aria-label="Back to top">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.back-to-top-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;
    position: relative;
    z-index: 10;
    pointer-events: auto;
}

.scroll-up {
    color: var(--accent, #d4f1ff);
    cursor: pointer;
    animation: bounce-up 2s infinite;
    padding: 1rem;
}

.scroll-up:hover {
    text-shadow: 0 0 10px var(--accent);
}

@keyframes bounce-up {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>
