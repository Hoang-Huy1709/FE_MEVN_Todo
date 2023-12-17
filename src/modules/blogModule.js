import { ref } from 'vue'

const getBlogs = () => {

    const state = ref({
        // Add a new blog
        blogs: [],
        blog: [],
        title: '',
        content: '',
        imageUrl: '',
        imageUrls: [],
        imageFileName: '',
        category: 'Tất cả',
        timeAdd: '',
        dateAdd: '',
        showInfo: '',
        categorySelected: 'Tất cả',

        // Show error
        showEmptyTitle: '',
        showEmptyContent: '',



    })

    //Get all blogs
    const getAllBlogs = async () => {
        try {

            const token = localStorage.getItem('token');

            const requesOption = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const category = state.value.categorySelected;
            const url = category === 'Tất cả'
                ? 'http://localhost:3000/blogs'
                : `http://localhost:3000/blogs?category=${category}`;

            const response = await fetch(url, requesOption);
            const data = await response.json();

            state.value.blogs = data;

            // await fetch('http://localhost:3000/blogs', requesOption)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         state.value.blogs = data;
            //         console.log("Success get blogs")
            //     })

            // console.log(state.value.blogs)

        } catch (error) {
            console.error(error);
            console.log('False get all blogs')
        }
    }


    //Add a new blog
    const newBlog = async () => {

        if (state.value.title === '') {
            state.value.showEmptyTitle = 'Bạn chưa nhập tiêu đề'
        } else if (state.value.content === '') {
            state.value.showEmptyContent = 'Bạn chưa nhập nội dung'
        } else {
            state.value.timeAdd = getTime();
            state.value.dateAdd = getDate();

            //get token from localstorage
            const token = localStorage.getItem('token');

            const requesOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: state.value.title,
                    content: state.value.content,
                    imageUrls: state.value.imageUrls,
                    category: state.value.category,
                    timeAdd: state.value.timeAdd,
                    dateAdd: state.value.dateAdd,
                })
            }
            await fetch('http://localhost:3000/blogs/new/', requesOption);
            state.value.showInfo = 'Tạo bài viết thành công !'
            state.value.title = '';
            state.value.content = '';
            state.value.imageFileName = '';
        }


    }

    //Detail blog
    const detailBlog = async (id) => {

        await fetch('http://localhost:3000/blogs/id='+ id,{ method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
            state.value.blog = data;
        })
        console.log(state.value.blog)


        // const token = localStorage.getItem('token');

        // const requesOption = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`,
        //     },
        // };
        // await fetch(`http://localhost:3000/blogs/id=${id}`, requesOption)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         state.value.blog = data;
        //     })
        // console.log(state.value.blog)
    }

    //Upload images
    const uploadImage = async (files) => {
        const formData = new FormData();

        for (const file of files) {
            formData.append('images[]', file);
        }

        try {
            const response = await fetch('http://localhost:3000/blogs/upload/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            state.value.imageUrls = data.imageUrls; // Update the imageUrl in the state
            newBlog()
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    //Function get local time
    const getTime = () => {
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeString;
    }

    const getDate = () => {
        const currentDate = new Date().toLocaleDateString();
        return currentDate;
    }

    return {
        state,
        newBlog,
        getAllBlogs,
        uploadImage,
        detailBlog
    }


}

export default getBlogs