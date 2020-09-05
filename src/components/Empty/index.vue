<template functional>
    <div class="empty-style">
        <slot/>
    </div>
</template>
<style scoped>
.empty-style {
    height: 100%;display: flex; justify-content: center;align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ccc;
    font-size: 16px;
}
</style>
