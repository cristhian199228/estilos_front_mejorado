<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card color="transparent" outlined>
                    <v-card-body>
                        <v-img src="/app/emoticon_smile.svg" contain max-height="15vh" class="my-4">
                        </v-img>
                        <v-img src="/app/envio_satisfactorio.svg" contain max-height="30vh"  class="ma-8">
                        </v-img>
                    </v-card-body>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn link class="ml-5 rounded" dark color="#70142D" @click="terminarPromocion()">
                            Finalizar
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
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