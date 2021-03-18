<template>
    <div class="d-flex">
        <span v-if="label" class="body-2 mr-2 flex-shrink-0 d-inline-block" :style="labelWidth ? { width: labelWidth, textAlign: 'right'} : {}" style="margin-top: 6px;">{{ label }}</span>
        <div :style="width ? { width: width, maxWidth: width } : {}" class="flex-grow-1">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrsFormItem',
    props: {
        label: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: null,
        },
        labelWidth: {
            type: String,
            default: null,
        },
    },
};
</script>
