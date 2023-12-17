<template>
  <div>
    <h3>Upload image</h3>
    <input ref="fileInput" type="file" multiple accept="image/*"/>
    <br />
    <button @click="handleUpload">Upload</button>
  </div>
</template>

<script>
import blogModule from "../modules/blogModule";
import { ref } from "vue";
export default {
  setup() {
    const { state, uploadImage } = blogModule();
    const fileInput = ref(null);

    const handleUpload = () => {
      if (fileInput.value && fileInput.value.files.length > 0) {
        const files = fileInput.value.files;
        console.log(files); // Đã log ra danh sách các tệp
        uploadImage(files); // Gọi hàm uploadImage để thực hiện tải lên
      } else {
        console.log("No files selected.");
      }
    };

    return {
      state,
      handleUpload,
      fileInput,
      uploadImage,
    };
  },
};
</script>
