/* eslint-disable max-len */
<template>
  <div class="questions">
    <div v-for="category in categories" :key="category.value">
      <button class="btn btn-secondary mb-1" @click="showQuestions(category)"
      >{{ category.text }}</button>
    </div>
        <div class="input-group justify-content-center" v-if="currentCategory">
          <label for="questionInput">Question:
            <input id="questionInput" type="text" v-model="tempQuestion"/>
          </label>
          <label for="questionInput">Answer:
            <input id="answerInput" type="text" v-model="tempAnswer"/>
          </label>
          <div class="col-12">
            Please select the categories below that you want to add this question.
          </div>
          <div class="form-check form-switch" v-for="category in categories" :key="category.value">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
            v-model="categoryValueControl[category.value]">
            <label class="form-check-label">{{category.text}}</label>
          </div>
          <br>
          <button class="btn btn-success" @click="addQuestion">Add Question</button>
        </div>
    <h2>===</h2>
    <div class="row justify-content-center container-fluid mb-4"
    v-if="currentCategory && catHasQuestions">
        <div class="card ml-2 col-4" v-for="quest in currentQuestions" :key="quest.q">
            <div class="card-body">
              <h5 class="card-title">{{quest.q}}</h5>
              <p class="card-text">{{quest.a}}</p>
              <a href="#" class="btn btn-danger align-bottom" @click="removeQuestion(quest)">X</a>
            </div>
        </div>
    </div>
    <h5 v-if="!currentCategory"> Please select a category to see questions!</h5>
    <h5 v-else-if="!catHasQuestions" class="mt-3">No question is available for the category
      <strong>{{currentCategory}}</strong>. Please add some!</h5>
    <!-- {{ questions }}
    this is questions -->
  </div>
</template>

<script>
export default {
  name: 'Questions',
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
    this.getCategories();
    this.getQuestions();
    this.checkButton();
  },
  methods: {
    checkButton() {
      this.categories.forEach((category) => {
        this.categoryValueControl[category.value] = false;
      });
      console.log(this.categoryValueControl);
    },
    getCategories() {
      const defaultCategories = [
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
        this.categories = defaultCategories;
      }
    },
    getQuestions() {
      const qs = [
        {
          q: 'ilk soru',
          a: 'cevap',
          tags: ['science', 'tech'],
        },
        {
          q: '2. soru',
          a: 'cevap',
          tags: ['history', 'science', 'tech'],
        },
        {
          q: '3. soru',
          a: 'cevap',
          tags: ['history', 'geography'],
        },
        {
          q: '4. soru',
          a: 'cevap',
          tags: ['tech', 'geography'],
        },
      ];

      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = qs;
      }
    },
    showQuestions(category) {
      this.currentCategory = category.value;
    },
    addQuestion() {
      Object.keys(this.categoryValueControl).forEach((key) => {
        if (this.categoryValueControl[key]) {
          this.selectedCategories.push(key);
        }
      });
      this.questions.push({
        q: this.tempQuestion,
        a: this.tempAnswer,
        tags: this.selectedCategories,
      });

      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.tempQuestion = '';
      this.tempAnswer = '';
      console.log(this.categoryValueControl);
      console.log(this.selectedCategories);
    },
    removeQuestion(quest) {
      const qIndex = this.questions.indexOf(quest);
      if (qIndex >= 0) {
        this.questions.splice(qIndex, 1);
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    },
  },
  data() {
    return {
      categories: [],
      questions: [],
      index: {},
      currentCategory: '',
      tempQuestion: '',
      tempAnswer: '',
      categoryValueControl: {},
      selectedCategories: [],
    };
  },
  computed: {
    catHasQuestions() {
      return this.questions.length > 0;
    },
    currentQuestions() { // array olarak döner
      return this.questions.filter((question) => question.tags.includes(this.currentCategory));
    },
  },
};
</script>
