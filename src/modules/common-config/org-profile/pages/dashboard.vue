<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{ $t('globalTrans.CommonServiceConfiguration')}}</h4>
                    </template>
                    <template v-slot:body>
                        <b-overlay>
                            <b-row>
                            </b-row>
                        </b-overlay>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { core } from '@/config/pluginInit'

export default {
    name: 'CommonDashboard',
    data () {
        return {
        }
    },
    mounted () {
        core.index()
    }
}
</script>
