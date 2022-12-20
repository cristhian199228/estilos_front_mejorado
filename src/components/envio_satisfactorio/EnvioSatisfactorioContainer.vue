<template>
    <div>
        <v-card class="mx-auto mt-12" outlined color="transparent" max-width="800">
            <v-row dense>
                <v-col cols="12">
                    <v-card outlined color="transparent">
                        <v-img src="/app/emoticon_smile.svg" contain max-height="15vh" class="orange--text align-end">
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card class="mx-6" color="transparent" outlined>
                        <v-img src="/app/envio_satisfactorio.svg" max-height="30vh" contain
                            class="orange--text align-end">
                        </v-img>
                        <v-card-actions>
                            <div class="mx-auto">
                                <v-btn link class="mb-8 rounded-lg" tile dark color="#70142D"
                                    @click="terminarPromocion()">
                                    Finalizar
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cards: [
                {
                    title: "Pre-fab homes",
                    src: "/app/bannerinicio.svg",
                    flex: 12,
                },
                {
                    title: "Favorite road trips",
                    src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                    flex: 4,
                },
                {
                    title: "Best airlines",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 4,
                },
                {
                    title: "Best airliness",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 4,
                },
            ],
        };
    },
    computed: {},
    methods: {
        terminarPromocion() {
            this.$store.dispatch('promocion/terminarPromocion')
        }
    },
    created() { },
};
</script>