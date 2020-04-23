<template>
    <section>
        <div class="egl-main-page-info" v-if="!pageTitle">
            <div class="egl-flash-pix-wrapper"></div>
            <article class="well">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                    takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                    est Lorem ipsum dolor sit amet.
                </p>
                <p>

                    Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming
                    id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
                    ea commodo consequat.
                </p>
            </article>
        </div>
    </section>
</template>

<script>
    import VegetablePix from '../../../assets/img/lettuces_002.jpg';
    export default {
        name: "Intro",
        props: ['pageTitle'],
        data(){
            return {
              vegetablePix: VegetablePix,
            };
        }
    }
</script>

<style scoped>

</style>