<template>
  <div class="questions">
    <div v-for="category in categories" :key="category.value">

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
          value: 'technology',
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
