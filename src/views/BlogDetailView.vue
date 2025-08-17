<template>
  <div v-if="blog" class="blog-detail-view">
    <div class="blog-hero" :style="{ backgroundColor: getHeroColor(blog._id) }">
      <div class="blog-actions">
        <router-link
          :to="{ name: 'edit-blog', params: { id: blog._id } }"
          class="action-btn edit-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            ></path>
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            ></path>
          </svg>
          Edit Blog
        </router-link>
        <button class="action-btn delete-btn" @click="handleDelete(blog._id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-trash-2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Delete Blog
        </button>
      </div>

      <div class="image-container">
        <img
          :src="blog.images?.[0] || '/placeholder-image.jpg'"
          alt="Blog Image"
        />
      </div>

      <div class="hero-content">
        <div class="hashtags">
          <span v-for="tag in blog.hashtags" :key="tag" class="hashtag-pill">{{
            tag
          }}</span>
        </div>
        <h1>{{ blog.title }}</h1>
        <div class="blog-meta">
          <span class="author">{{ blog.author }}</span>
          <span class="date">{{ formatDate(blog.createdAt) }}</span>
        </div>
      </div>
    </div>

    <div class="blog-body">
      <div class="social-share">
        <a :href="getShareLink('facebook')" target="_blank" class="share-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.34h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </a>
        <a :href="getShareLink('twitter')" target="_blank" class="share-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M22.46 6c-.843.373-1.751.623-2.697.734a4.706 4.706 0 0 0 2.06-2.583 9.423 9.423 0 0 1-2.986 1.139 4.707 4.707 0 0 0-8.031 4.293 13.313 13.313 0 0 1-9.697-4.908 4.707 4.707 0 0 0 1.455 6.273 4.673 4.673 0 0 1-2.126-.587v.06a4.707 4.707 0 0 0 3.774 4.61 4.71 4.71 0 0 1-2.115.08 4.709 4.709 0 0 0 4.385 3.268 9.444 9.444 0 0 1-5.837 2.01c-.378 0-.75-.022-1.12-.066a13.33 13.33 0 0 0 7.218 2.112c8.665 0 13.407-7.17 13.407-13.406 0-.204-.005-.407-.013-.609A9.558 9.558 0 0 0 22.46 6z"
            />
          </svg>
        </a>
        <a :href="getShareLink('whatsapp')" target="_blank" class="share-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 2.094.558 4.053 1.528 5.75L.05 24l6.452-1.464A11.966 11.966 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.176 15.304a.973.973 0 0 1-.689.414c-.39.06-.92.05-2.07-.48-1.15-.53-2.677-.96-3.837-.96s-2.028.43-3.178.96c-1.15.53-2.52.88-3.08.77-.56-.11-1.28-.41-1.39-.45-.11-.04-.26-.06-.41-.01-.15.05-.22.19-.22.37v.01c0 .18.05.37.26.58.21.21.57.53.86.85s.57.65.68.85c.11.21.21.43.08.62-.13.19-.38.25-.57.29-.19.04-.31.06-.5.06h-.01c-.19 0-.31-.03-.5-.06-.19-.03-.41-.05-.7-.05s-.5.06-.72.08c-.22.02-.38.07-.61.16-.23.09-.34.21-.4.32-.06.11-.09.24-.09.38v.01c0 .14.03.25.09.36s.17.2.3.26c.13.06.27.09.43.09.28 0 .58-.08.88-.24.3-.16.65-.36.85-.47.2-.11.45-.27.6-.33.15-.06.31-.1.52-.15.21-.05.4-.08.6-.08.2 0 .4-.02.6-.06.2-.04.42-.08.67-.14s.5-.13.78-.13.56.02.83.13.48.27.67.43c.19.16.4.34.61.5.21.16.43.32.65.46.22.14.45.26.68.36.23.1.48.17.75.21.27.04.53.06.78.06.25 0 .5-.02.75-.06.25-.04.48-.11.75-.21.27-.1.5-.22.68-.36.18-.14.39-.32.6-.46.21-.16.42-.34.6-.5.18-.16.35-.34.52-.5.17-.16.32-.35.45-.55.13-.2.24-.4.32-.57.08-.17.13-.37.13-.57v-.01c0-.2-.05-.4-.13-.57-.08-.17-.18-.37-.32-.57-.14-.2-.3-.4-.48-.55s-.4-.32-.67-.48c-.27-.16-.54-.3-.8-.41s-.5-.2-.77-.24c-.27-.04-.55-.06-.8-.06s-.5.02-.75.06-.48.1-.75.21-.5.2-.77.34-.5.33-.7.54-.34.4-.53.53c-.19.13-.37.2-.5.25-.13.05-.25.07-.4.07h-.01c-.15 0-.25-.03-.4-.07-.15-.04-.27-.09-.4-.15-.13-.06-.25-.15-.4-.25-.15-.1-.28-.21-.4-.32-.12-.11-.2-.24-.26-.38-.06-.14-.09-.28-.09-.44v-.01c0-.16.03-.3.09-.44.06-.14.16-.27.3-.38s.29-.2.43-.26c.14-.06.28-.09.43-.09h.01c.21 0 .42.06.59.13.17.07.3.15.4.24.1.09.19.19.26.29.07.1.13.2.17.3z"
            />
          </svg>
        </a>
        <a :href="getShareLink('instagram')" target="_blank" class="share-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 2c-3.371 0-6.105 2.734-6.105 6.105v7.79c0 3.371 2.734 6.105 6.105 6.105h7.79c3.371 0 6.105-2.734 6.105-6.105v-7.79c0-3.371-2.734-6.105-6.105-6.105h-7.79zm0 2.238h7.79c2.13 0 3.867 1.737 3.867 3.867v7.79c0 2.13-1.737 3.867-3.867 3.867h-7.79c-2.13 0-3.867-1.737-3.867-3.867v-7.79c0-2.13 1.737-3.867 3.867-3.867z"
            />
            <path
              d="M12 7.749c-2.333 0-4.251 1.918-4.251 4.251s1.918 4.251 4.251 4.251 4.251-1.918 4.251-4.251-1.918-4.251-4.251-4.251z"
            />
            <path
              d="M12 7.749c-2.333 0-4.251 1.918-4.251 4.251s1.918 4.251 4.251 4.251 4.251-1.918 4.251-4.251-1.918-4.251-4.251-4.251zm0 2.238c1.111 0 2.013.902 2.013 2.013s-.902 2.013-2.013 2.013-2.013-.902-2.013-2.013.902-2.013 2.013-2.013z"
            />
            <circle cx="17.749" cy="6.251" r="1.501" />
          </svg>
        </a>
      </div>
      <div class="blog-content" v-html="blog.content"></div>
    </div>
  </div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <div v-else class="not-found">Blog not found.</div>

  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this blog post?</p>
      <p class="warning">This action cannot be reversed.</p>
      <div class="modal-actions">
        <button class="btn cancel-btn" @click="showDeleteModal = false">
          Cancel
        </button>
        <button class="btn delete-btn" @click="confirmDelete(blog._id)">
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBlog, deleteBlog as apiDeleteBlog } from "../api";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const blog = ref<any>(null);
const loading = ref(true);
const showDeleteModal = ref(false);

const heroColors = ["#2c2f33", "#007bff", "#28a745", "#dc3545", "#ffc107"];

const getHeroColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % heroColors.length;
  return heroColors[index];
};

const fetchBlog = async () => {
  loading.value = true;
  try {
    const blogId = route.params.id as string;
    const res = await getBlog(blogId);
    blog.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getShareLink = (platform: string) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    `Check out this blog post: ${blog.value?.title}`
  );
  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${text}%20${url}`;
    case "instagram":
      return `https://www.instagram.com/share?url=${url}`;
    default:
      return "#";
  }
};

const handleDelete = (id: string) => {
  showDeleteModal.value = true;
};

const confirmDelete = async (id: string) => {
  showDeleteModal.value = false;
  try {
    await apiDeleteBlog(id);
    router.push("/blogs");
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
};

onMounted(fetchBlog);
</script>

<style scoped>
.blog-detail-view {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
}

.blog-hero {
  position: relative;
  background-color: #2c2f33;
  color: white;
  padding-bottom: 2rem;
  transition: background-color 0.5s ease;
}

.blog-actions {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.action-btn {
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #007bff;
}
.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
}
.delete-btn:hover {
  background-color: #c82333;
}

.action-btn svg {
  width: 18px;
  height: 18px;
  stroke: white;
}

.image-container {
  height: 400px;
  width: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}

.hashtags {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.hashtag-pill {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s;
}
.hashtag-pill:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.blog-meta {
  font-size: 0.9rem;
  color: #aaa;
}

.blog-body {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  position: relative;
}

.social-share {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
}

.social-share .share-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #eee;
  border-radius: 50%;
  color: #555;
  transition: background-color 0.3s;
}

.social-share .share-icon:hover {
  background-color: #ddd;
}

.social-share .share-icon svg {
  width: 20px;
  height: 20px;
  fill: #555;
}

.blog-content {
  flex-grow: 1;
  line-height: 1.6;
  color: #444;
}

.loading,
.not-found {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 4rem;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
}

.modal-content p {
  color: #555;
  margin-bottom: 1.5rem;
}

.modal-content .warning {
  color: #dc3545;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-actions .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.modal-actions .cancel-btn {
  background-color: #ccc;
  color: #333;
}

.modal-actions .delete-btn {
  background-color: #dc3545;
  color: white;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .blog-detail-view {
    padding: 0;
  }
  .blog-actions {
    top: 1rem;
    right: 1rem;
  }
  .image-container {
    height: 250px;
  }
  .hero-content {
    max-width: 100%;
    padding: 1rem;
  }
  h1 {
    font-size: 1.8rem;
  }
  .blog-body {
    flex-direction: column;
    padding: 1rem;
  }
  .social-share {
    flex-direction: row;
    justify-content: center;
    position: static;
    margin-bottom: 1rem;
  }
}
</style>
