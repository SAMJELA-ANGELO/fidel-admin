<template>
  <div class="blog-create-wrapper">
    <div class="blog-create-card">
      <div class="blog-create-left">
        <div class="image-upload-box" @click="triggerImageInput">
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onImageChange"
          />
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Blog Image" />
          </div>
          <div v-else class="image-placeholder">
            <span class="image-icon">&#128247;</span>
            <span class="image-text">SELECT IMAGE</span>
          </div>
        </div>
      </div>
      <div class="blog-create-right">
        <form @submit.prevent="submitBlog">
          <div class="form-group">
            <label for="title"><b>Blog Title</b></label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Enter Blog Title"
              required
              class="input-text"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="author"><b>Author</b></label>
              <input
                id="author"
                v-model="author"
                type="text"
                placeholder="Joe Smith"
                required
                class="input-text"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="hashtags"><b>Hashtags</b></label>
            <input
              id="hashtags"
              v-model="hashtags"
              type="text"
              placeholder="e.g., cannabis, prerolls, hahholes"
              class="input-text"
            />
            <small
              >Separate hashtags with a comma (e.g., tag1, tag2, tag3).</small
            >
          </div>
          <div class="form-row allow-comments-row">
            <label>
              <input v-model="allowComments" type="checkbox" />
              <b>Allow Comments</b>
            </label>
          </div>
          <div class="form-group full-width">
            <label for="content">Blog Content</label>
            <quill-editor
              v-model:content="content"
              content-type="html"
              :options="editorOptions"
              class="quill-editor-custom"
            />
          </div>
          <div class="form-row create-social-row"></div>
          <div class="form-row btn-row">
            <button type="button" class="cancel-btn" @click="cancelBlog">
              CANCEL
            </button>
            <button type="submit" class="save-btn">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createBlog } from "../api";

const router = useRouter();

const title = ref("");
const author = ref("");
const allowComments = ref(true);
const content = ref("");
const hashtags = ref("");
const imagePreview = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const editorOptions = {
  theme: "snow",
};

const triggerImageInput = () => {
  imageInput.value?.click();
};

const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (ev) => {
      imagePreview.value = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const cancelBlog = () => {
  router.push({ path: "/blogs" });
};

const submitBlog = async () => {
  if (!title.value || !author.value || !content.value) {
    console.error("Please fill in all required fields.");
    return;
  }
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("author", author.value);
  formData.append("allowComments", String(allowComments.value));

  if (hashtags.value) {
    const tagsArr = hashtags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    for (const tag of tagsArr) {
      formData.append("hashtags[]", tag);
    }
  }

  if (imageFile.value) {
    formData.append("images", imageFile.value);
  }

  try {
    await createBlog(formData);
    console.log("Blog created successfully!");
    router.push({ path: "/blogs" });
  } catch (err) {
    console.error("Error creating blog:", err);
  }
};
</script>

<style scoped>
.blog-create-wrapper {
  background-color: #f0f2f5;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  width: 100%;
  max-width: 1100px;
  margin-bottom: 24px;
}
.add-blog-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
}
.blog-create-card {
  display: flex;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  gap: 40px;
  width: 100%;
  max-width: 1100px;
}
.blog-create-left {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.image-upload-box {
  width: 320px;
  height: 250px;
  background: #f7f7f7;
  border: 2px dashed #ccc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}
.image-icon {
  font-size: 60px;
  margin-bottom: 8px;
}
.image-text {
  font-size: 0.9rem;
  font-weight: bold;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.blog-create-right {
  flex: 2;
}
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 8px;
  color: #444;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}
.form-group small {
  margin-top: 4px;
  color: #888;
  font-size: 0.8rem;
}
.form-group.full-width {
  flex: none;
}
.allow-comments-row {
  margin-bottom: 20px;
}
.allow-comments-row label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-text {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: black;
}
/* Custom styles for Quill Editor */
.quill-editor-custom {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  height: 250px;
}
.quill-editor-custom .ql-container {
  border: none;
  font-size: 1rem;
  height: 250px;
}
.quill-editor-custom .ql-toolbar {
  border-bottom: 1px solid #ddd;
}
.create-social-row {
  margin-top: 20px;
  justify-content: flex-end;
}
.create-social-btn {
  background: none;
  border: none;
  color: #007bff;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
}
.plus-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}
.cancel-btn {
  background: #e0e0e0;
  color: #222;
  border: none;
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}
.save-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}
.save-btn:hover {
  background: #0056b3;
}
/* --- Mobile Responsive Styles --- */
@media (max-width: 768px) {
  .blog-create-card {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
  .blog-create-left,
  .blog-create-right {
    flex: none;
    width: 100%;
  }
  .image-upload-box {
    width: 100%;
    height: 200px;
  }
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
  .btn-row {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
