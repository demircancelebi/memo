<template>
  <div class="questions">
    <div v-for="category in categories" :key="category.value">
      <button class="btn btn-secondary mb-1" @click="setCategory(category)">
        {{ category.text }}
      </button>
    </div>
    <div class="row input-group justify-content-center mt-3" v-if="curCategory">
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="Question"
          aria-label="inputQuestion"
          v-model="tempQuestion"
        />
      </div>
      <div class="col-3">
        <input
          type="text"
          class="form-control"
          placeholder="Answer"
          aria-label="inputAnswer"
          v-model="tempAnswer"
        />
      </div>
      <div class="col-2 card">
        <div v-for="(cat, key) in categories" :key="cat">
          <input type="checkbox" :id="key" v-model="tempTags" :value="cat.value"/>
          <label :for="key">{{ cat.value }}</label>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <button class="btn btn-success" @click="addQuestion">
            Add Question
          </button>
        </div>
      </div>
    </div>
    <h2>===</h2>
    <div
      class="row justify-content-center container-fluid mb-4"
      v-if="curCategory && currentQuestions"
    >
      <div
        class="card ml-2 col-4"
        v-for="quest in currentQuestions"
        :key="quest.q"
      >
        <div class="card-body">
          <h5 class="card-title">{{ quest.q }}</h5>
          <p class="card-text">{{ quest.a }}</p>
          <a
            href="#"
            class="btn btn-danger align-bottom"
            @click="removeQuestion(quest)"
            >X</a
          >
        </div>
      </div>
    </div>
    <h5 v-if="!curCategory">Please select a category to see relevant questions!</h5>
    <h5 v-else-if="!currentQuestions.length" class="mt-3">
      No question is available for the category
      <strong>{{ curCategory }}</strong
      >. Please add some!
    </h5>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      categories: [],
      questions: [],
      index: {},
      curCategory: '',
      tempQuestion: '',
      tempAnswer: '',
      tempTags: [],
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
    setCategory(category) {
      this.curCategory = category.value;
    },
    addQuestion() {
      if (!this.tempQuestion || !this.tempAnswer || this.tempTags.length === 0) {
        console.log('Please provide a valid question, answer and at least one tag!');
        return;
      }
      this.questions.push({
        q: this.tempQuestion,
        a: this.tempAnswer,
        tags: this.tempTags,
      });

      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.tempQuestion = '';
      this.tempAnswer = '';
      this.tempTags = [];
    },
    removeQuestion(quest) {
      const qIndex = this.questions.indexOf(quest);
      if (qIndex >= 0) {
        this.questions.splice(qIndex, 1);
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    },
  },
  computed: {
    currentQuestions() {
      return this.questions.filter((question) => question.tags.includes(this.curCategory));
    },
  },
};
</script>
