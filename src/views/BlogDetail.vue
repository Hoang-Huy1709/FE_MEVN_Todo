<template lang="">
    <div>
        <h1>Detail blog page</h1>
        <h2>Title: {{ state.blog.title }}</h2>
        <div v-for="img in state.blog.imageUrls">
            <img :src="'http://localhost:3000' + img" alt="" />
        </div>
        <h2>Title: {{ state.blog.author }}</h2>

    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import blogsModule from '../modules/blogModule';
export default {

    props: ['id'],


    setup(props) {

        console.log(props.id)

        const { state, detailBlog } = blogsModule();

        onMounted(()=>{
            detailBlog(props.id);
        })


        return{
            state,
            detailBlog,
        }

    }
    
}
</script>

<style scoped>

img{
    width: 20em;
    border-radius: 10px;
    height: 20em;
    object-fit: cover;
    object-position: center;
}
    
</style>