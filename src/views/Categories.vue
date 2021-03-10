<template>
  <div class="categories">
    <div v-for="category in categories" :key="category.value">
      {{ category.text }}
    </div>
    <input type="text" v-model="newCategoryName">
    <button @click="addCategory">Add category</button>
  </div>
</template>

<script>

export default {
  name: 'Categories',
  created() {
    if (localStorage.getItem('currentUser')) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    if (!this.currentUser) {
      this.$router.back();
    }
    this.getDefaultCategories();
    this.getQuestions();
  },
  methods: {
    getDefaultCategories() {
      const defaultOptions = [
        {
          text: 'Geography',
          value: 'geography',
        },
        {
          text: 'History',
          value: 'history',
        },
        {
          text: 'Science',
          value: 'science',
        },
        {
          text: 'Technology',
          value: 'tech',
        },
      ];

      if (localStorage.getItem('categories')) {
        this.categories = JSON.parse(localStorage.getItem('categories'));
      } else {
        this.categories = defaultOptions;
      }
    },
    getQuestions() {
      const defaultQuestions = {
      };

      this.categories.forEach((category) => {
        defaultQuestions[category.value] = [];
      });

      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = defaultQuestions;
      }
    },
    addCategory() {
      this.categories.push({
        text: this.newCategoryName,
        value: this.newCategoryName.trim().toLowerCase(),
      });

      this.questions[this.newCategoryName] = [];
      localStorage.setItem('questions', JSON.stringify(this.questions));
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategoryName = '';
    },
  },
  data() {
    return {
      newCategoryName: '',
      categories: [],
      questions: {},
    };
  },
};
</script>
