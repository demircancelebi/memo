<template>
  <div class="categories">
    <div v-for="category in categories" :key="category.value">
      {{ category.text }}
    </div>
    <input type="text" v-model="newCategoryName">
    <button @click="addCategory">Add category</button>
    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop"
    @click="deleteCategory(newCategoryName)">Delete category</button>
  </div>
  <!-- Modal -->

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
    data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">WARNING</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div v-if ="canCategoryBeDeleted" class="modal-body">
        Category deleted !
      </div>
      <div v-if="!canCategoryBeDeleted" class="modal-body">
        This category cannot be deleted since it contains questions
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Categories',
  data() {
    return {
      newCategoryName: '',
      categories: [],
      questions: {},
    };
  },
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
          value: 'technology',
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

      this.questions[this.newCategoryName.trim().toLowerCase()] = [];
      localStorage.setItem('questions', JSON.stringify(this.questions));
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategoryName = '';
    },
    deleteCategory(categoryName) {
      this.questionsControl = JSON.parse(localStorage.getItem('questions'));
      if (this.questionsControl[categoryName.trim().toLowerCase()].length === 0) {
        this.canCategoryBeDeleted = true;
      } else {
        this.canCategoryBeDeleted = false;
      }
    },
  },

};
</script>
