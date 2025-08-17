<template>
  <div class="blogs-view">
    <div class="page-header">
      <div class="header-content">
        <h1>Our Articles</h1>
        <p>
          This is a melting pot of insights, tips, and innovative ways to use
          Myria UI, tailored for professionals who thrive on web development.
        </p>
      </div>
      <div class="search-and-tags">
        <input type="text" placeholder="Search..." class="search-input" />
        <select class="tags-select">
          <option>Tags</option>
        </select>
      </div>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="articles-grid">
      <div v-for="blog in blogs" :key="blog._id" class="article-card">
        <router-link :to="`/blogs/${blog._id}`" class="article-link">
          <div class="article-image">
            <img
              :src="
                blog.images?.[0] ||
                'https://via.placeholder.com/300x200.png?text=No+Image'
              "
              alt="Blog Image"
            />
          </div>
          <div class="article-content">
            <h3>{{ blog.title }}</h3>
            <p class="description">{{ truncateContent(blog.content, 100) }}</p>
            <div class="article-meta">
              <span class="author">{{ blog.author }}</span>
              <span class="date">{{ formatDate(blog.createdAt) }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getBlogs, deleteBlog as apiDeleteBlog } from "../api";

const blogs = ref<any[]>([]);
const loading = ref(true);

const fetchBlogs = async () => {
  loading.value = true;
  try {
    const res = await getBlogs();
    blogs.value = res.data;
  } catch (err) {
    // handle error
  } finally {
    loading.value = false;
  }
};

const formatDate = (date: string) => {
  // Assuming createdAt is an ISO string
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const truncateContent = (content: string, length: number) => {
  const plainText = content.replace(/<[^>]*>/g, "");
  if (plainText.length <= length) {
    return plainText;
  }
  return plainText.substring(0, length) + "...";
};

const deleteBlog = async (id: string) => {
  if (!confirm("Delete this blog?")) return;
  await apiDeleteBlog(id);
  await fetchBlogs();
};

onMounted(fetchBlogs);
</script>

<style scoped>
.blogs-view {
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #f7f7f7;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  background-color: #2c2f33;
  color: #fff;
  padding: 4rem 2rem;
  border-radius: 10px;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://res.cloudinary.com/day7o4yjq/image/upload/v1755434971/blogs/hd2onxowdfkj7ui1whcq.jpg")
    repeat;
  opacity: 0.1;
  z-index: 1;
}

.header-content,
.search-and-tags {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.page-header p {
  font-size: 1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-and-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.search-input,
.tags-select {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.search-input::placeholder {
  color: #aaa;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.article-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #999;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}
</style>
