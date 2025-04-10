<script>
import {defineComponent, ref, watch} from 'vue';
import ImageUploader from 'quill-image-uploader';
import {QuillEditor} from "@vueup/vue-quill";
import {useProductService} from "@/service/product-service";
import {Url} from "@/util/urls";

export default defineComponent({
  name: 'ProductDescription',
  components: {
    QuillEditor,
  },
  props: ['description'],
  emits: ['descriptionUpdate'],
  setup: (props, { emit }) => {


    const service = useProductService();
    const editorData = ref(props.description);

    const modules = {
      name: 'imageUploader',
      module: ImageUploader,
      options: {
        upload: file => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);

            service.http.post(Url.PRODUCT_UPLOAD_DESCRIPTION_FILE, formData)
            .then(res => {
              console.log(res)
              resolve(service.fileStorage + res.data.url);
            })
            .catch(err => {
              reject("Upload failed");
              console.error("Error:", err)
            })
          })
        }
      }
    };

    watch(() => editorData.value, () => {
      emit('descriptionUpdate', editorData.value)
    })

    return {
      modules,
      editorData
    }
  }
});
</script>

<template>
  <QuillEditor theme="snow"
               v-model:content="editorData"
               :modules="modules"
               class="w-full min-h-52"
               content-type="html"
               :toolbar="[['bold', 'italic', 'underline', 'strike'],
                          ['blockquote', 'code-block'],
                          [{ 'header': 1 }, { 'header': 2 }],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'script': 'sub'}, { 'script': 'super' }],
                          [{ 'indent': '-1'}, { 'indent': '+1' }],
                          [{ 'direction': 'rtl' }],
                          [{ 'size': ['small', false, 'large', 'huge'] }],
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'font': [] }],
                          [{ 'align': [] }],
                          ['clean'],
                          ['link', 'image', 'video']]">
  </QuillEditor>
</template>

<style>
.ql-container{
  height: inherit !important;
  border-radius: 0 0 1rem 1rem;
}

.ql-toolbar{
  border-radius: 1rem 1rem 0 0;
}
</style>
