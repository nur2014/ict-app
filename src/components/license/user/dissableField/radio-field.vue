<template>
    <b-col md="12" sm="12" lg="12">
            <b-form-group
                label-cols-sm="4"
                :label-for="data.field_name"
            >
                <template v-slot:label>
                    {{ local === 'bn' ? data.label_bn : data.label }}
                </template>
                    <p class="text-bold" style="font-weight: 600;" v-if="data.value.length">: {{ data.value.toString() }}</p>
                    <p class="text-bold" style="font-weight: 600;" v-else>: ..................</p>
            </b-form-group>
    </b-col>
</template>
<script>
export default {
    props: ['data'],
    components: {
    },
    data () {
        return {
           listData: []
        }
    }
}
</script>
