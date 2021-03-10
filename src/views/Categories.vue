<template>
  <div class="categories">
    <div v-for="category in categories" :key="category.value">
      {{ category.text }}
    </div>
    <input type="text" v-model="newCategoryName">
    <button @click="addCategory">Add category</button>
    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop"
    @click="deleteCategoryControl">Delete category</button>
  </div>
  <!-- Modal -->

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
    data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div v-if ="checkCategory" class="modal-body">
        Category deleted !
      </div>
      <div v-if="!checkCategory" class="modal-body">
        Category is full you can't delete it !
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<<<<<<< Updated upstream
=======
        <button type="button" class="btn btn-primary">Understood</button>
>>>>>>> Stashed changes
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Categories',
  created() {
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

      this.categories.forEach((category) => {
        defaultQuestions[category.value] = [];
      });
      console.log(defaultQuestions);

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
<<<<<<< Updated upstream
      this.questions[this.newCategoryName.trim().toLowerCase()] = [];
=======
      this.questions[this.newCategoryName] = [];
>>>>>>> Stashed changes
      localStorage.setItem('questions', JSON.stringify(this.questions));
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.newCategoryName = '';
    },
    deleteCategoryControl() {
      console.log(this.newCategoryName);
      console.log(this.categories.length);
      let i = 0;
      this.questionsControl = JSON.parse(localStorage.getItem('questions'));
      while (this.categories.length > i) {
        if (this.newCategoryName.trim().toLowerCase() === this.categories[i].value) {
          i = 0;
          if (this.questionsControl[this.newCategoryName.trim().toLowerCase()].length === 0) {
            this.checkCategory = true;
          } else {
            this.checkCategory = false;
          }
          return;
        }
        i += 1;
      }
    },
  },
  data() {
    return {
      newCategoryName: '',
      categories: [],
      questionsControl: {},
      questions: {},
      checkCategory: true,
    };
  },
};
</script>
