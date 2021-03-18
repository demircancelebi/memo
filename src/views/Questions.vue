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
          <div class="col-12 mb-3 mt-2">
            Please select the categories below that you want to add this question.
          </div>
          <ul class="list-group" >
            <li class="list-group-item  text-start"
            v-for="category in categories" :key="category.value">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
              v-model="categoryValueControl[category.value]">
              <label class="form-check-label">{{category.text}}</label>
            </li>
          </ul>
        </div>
        <button class="btn btn-success mt-4" @click="addQuestion">Add Question</button>
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
        <div v-if="showOtherCategories">
          <div class="mt-4 container">
            Please select the categories below that you want to delete this question.
            <table class="table table-striped">
              <thead>
                <th>Category Name</th>
                <th>Action</th>
              </thead>
              <tbody>
              <tr v-for="t, tagIndex in currentQuestion.tags" :key="t">
                <td>{{ t }}</td>
                <td>
                  <a href="#" class="btn btn-danger" role="button"
                    @click.prevent="deleteCategory(tagIndex)">Delete
                  </a>
                </td>
              </tr>
              <tr>
                <div>
                  <a href="#" class="btn btn-danger" type="button"
                  @click="deleteEverywhere(currentQuestion)">
                  Delete Everywhere</a>
                </div>
              </tr>
              </tbody>
            </table>
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
    this.showOtherCategories = false;
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
      this.showOtherCategories = false;
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
      this.selectedCategories = [];
      console.log(this.categoryValueControl);
      console.log(this.selectedCategories);
    },
    deleteEverywhere(quest) {
      const qIndex = this.questions.indexOf(quest);
      if (qIndex >= 0) {
        this.questions.splice(qIndex, 1);
        localStorage.setItem('questions', JSON.stringify(this.questions));
        this.showOtherCategories = false;
      }
    },
    removeQuestion(quest) {
      this.currentQuestion = quest;
      if (this.currentQuestion.tags.length <= 1 || this.deleteAll) {
        this.showOtherCategories = false;
        const qIndex = this.questions.indexOf(quest);
        if (qIndex >= 0) {
          this.questions.splice(qIndex, 1);
          localStorage.setItem('questions', JSON.stringify(this.questions));
          this.deleteAll = false;
        }
      } else {
        this.showOtherCategories = true;
      }
    },
    deleteCategory(tagIndex) {
      const qIndex = this.questions.indexOf(this.currentQuestion);
      this.currentQuestion.tags.splice(tagIndex, 1);
      this.questions.splice(qIndex, 1, this.currentQuestion);
      if (this.currentQuestion.tags.length === 0) {
        this.showOtherCategories = false;
        this.removeQuestion(this.currentQuestion);
      } else {
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
      showOtherCategories: false,
      currentQuestion: {},
    };
  },
  computed: {
    catHasQuestions() {
      return this.questions.length > 0;
    },
    currentQuestions() { // array olarak döner
      return this.questions.filter((question) => question.tags.includes(this.currentCategory));
    },
    cindex(category) {
      return category;
    },
  },
};
</script>
