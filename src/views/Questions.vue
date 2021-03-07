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
          <button class="btn btn-success" @click="addQuestion">Add Question</button>
        </div>
    <h2>===</h2>
    <div class="row justify-content-center container-fluid mb-4"
    v-if="currentCategory && catHasQuestions">
        <div class="card ml-2 col-4" v-for="quest in  questions[currentCategory]" :key="quest.q">
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
    this.getCategories();
    this.getQuestions();
  },
  methods: {
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
      const defaultQuestions = {};

      this.categories.forEach((category) => {
        defaultQuestions[category.value] = [];
      });

      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = defaultQuestions;
      }

      Object.keys(this.questions).forEach((question) => {
        this.index[question] = 0;
      });
    },
    showQuestions(category) {
      // console.log(`Showing questions for ${category.value}`);
      this.currentCategory = category.value;
    },
    addQuestion() {
      // questions = {
      //   art: [
      //     {
      //       q: 'Soru cumlesi',
      //       a: 'Cevap'
      //     },
      //     {
      //       q: '2. Soru cumlesi',
      //       a: '2. Cevap'
      //     },
      //   ]
      // }
      this.questions[this.currentCategory].push({
        q: this.tempQuestion,
        a: this.tempAnswer,
      });

      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.tempQuestion = '';
      this.tempAnswer = '';
    },
    removeQuestion(quest) {
      const qIndex = this.questions[this.currentCategory].indexOf(quest);
      this.questions[this.currentCategory].splice(qIndex, 1);
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
  },
  data() {
    return {
      categories: [],
      questions: {},
      index: {},
      currentCategory: '',
      tempQuestion: '',
      tempAnswer: '',
    };
  },
  computed: {
    catHasQuestions() {
      return this.questions[this.currentCategory].length > 0;
    },
  },
};
</script>
