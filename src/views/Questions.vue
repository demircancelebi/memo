<template>
  <div class="questions">
    <div v-if="!showQuestionAddMenu">
      <span class="ms-2" v-for="category in categories" :key="category.value">
        <button class="btn btn-dark mb-1" @click="showQuestions(category)"
        >{{ category.text }}</button>
      </span>
    </div>
    <button v-if="!showQuestionAddMenu" class="mb-4 mt-4 btn btn-primary"
    @click="showAddQuestion">Show Question Add Menu</button>
    <button v-if="showQuestionAddMenu" class="mb-4 btn btn-primary"
    @click="showAddQuestion">Hide Question Add Menu</button>
    <div class="input-group justify-content-center" v-if="showQuestionAddMenu">
      <label for="questionInput">Question:
        <input id="questionInput" type="text" v-model="tempQuestion"/>
      </label>
      <label class="ms-4" for="questionInput">Answer:
        <input id="answerInput" type="text" v-model="tempAnswer"/>
      </label>
    </div>
    <div class="mt-4" v-if="showQuestionAddMenu">
      <div class="mt-2 row justify-content-center">
        <div class="col-3">
          <div class="col-12">
            Please select the categories below that you want to add this question.
          </div>
          <ul class="list-group">
            <li class="list-group" v-for="category in categories" :key="category.value">
              <button v-if="!selectedFor[currentOperation][category.value]"
              @click="selectOtherCategoriesToDo(category.value)"
              class="list-group-item list-group-item-action mt-2">{{ category.text }}</button>
              <button v-if="selectedFor[currentOperation][category.value]"
              @click="selectOtherCategoriesToDo(category.value)"
              class="list-group-item list-group-item-action active mt-2"
              aria-current="true">
                {{ category.text }}
              </button>
            </li>
          </ul>
          <button class="mt-3 col-12 btn btn-success" @click="doSelectedOperation">Add</button>
        </div>
      </div>
    </div>
    <div v-if="showSuccessMessage.add" class="mt-4 mb-4 success-message">
      Question successfully added to categories:
      <span v-for="cat in categoriesTo[currentOperation]" :key="cat">
        ({{ cat }})
      </span>
    </div>
    <div class="row justify-content-center container-fluid mb-4"
    v-if="currentCategory && catHasQuestions && !showQuestionAddMenu">
      <div class="card ml-2 col-4" v-for="quest in  currentQuestions" :key="quest.q">
          <div class="card-body">
            <h5 class="card-title">{{quest.q}}</h5>
            <p class="card-text">{{quest.a}}</p>
            <a href="#" class="btn btn-danger align-bottom"
            @click="selectQuestionToRemove(quest)">X</a>
          </div>
      </div>
      <div v-if="showDeleteSelectionMenu">
        <div>This question is also included in:
        <span v-for="tag in otherTagsOfCurrentQuestion" :key="tag">
          <span>(<b>{{ tag }}</b>) </span>
        </span></div>
        <div class="mt-4">Delete this question from the <b>{{ currentCategory }}</b>
        and also delete from the selected categories below. (If you don't make a selection this
        question will delete from just <b>{{ currentCategory }}</b>)</div>
        <div class="mt-2 row justify-content-center">
          <div class="col-3">
            <ul class="list-group">
              <li class="list-group" v-for="tag in otherTagsOfCurrentQuestion" :key="tag">
                <button v-if="!selectedFor[currentOperation][tag]"
                @click="selectOtherCategoriesToDo(tag)"
                class="list-group-item list-group-item-action mt-2">{{ tag }}</button>
                <button v-if="selectedFor[currentOperation][tag]"
                @click="selectOtherCategoriesToDo(tag)"
                class="list-group-item list-group-item-action active mt-2"
                aria-current="true">
                  {{ tag }}
                </button>
              </li>
            </ul>
            <button class="mt-3 col-12 btn btn-danger" @click="doSelectedOperation">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSuccessMessage.delete" class="mt-4 error-message">
      Question successfully deleted from categories:
      <span v-for="cat in categoriesTo[currentOperation]" :key="cat">
        ({{ cat }})
      </span>
    </div>
    <h5 v-if="!currentCategory && !showQuestionAddMenu"> Please select a category
      to see questions!</h5>
    <h5 v-else-if="!catHasQuestions && !showQuestionAddMenu" class="mt-3">No question is
      available for the category
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
    showQuestions(category) {
      Object.keys(this.showSuccessMessage).forEach((key) => {
        this.showSuccessMessage[key] = false;
      });
      this.showDeleteSelectionMenu = false;
      this.currentCategory = category.value;
      this.currentOperation = 'delete';
    },
    showAddQuestion() {
      this.currentOperation = 'add';
      this.tempQuestion = '';
      this.tempAnswer = '';
      this.currentCategory = '';
      Object.keys(this.showSuccessMessage).forEach((key) => {
        this.showSuccessMessage[key] = false;
      });
      Object.keys(this.selectedFor[this.currentOperation]).forEach((key) => {
        this.selectedFor[this.currentOperation][key] = false;
      });
      if (this.showQuestionAddMenu) {
        this.showQuestionAddMenu = false;
      } else {
        this.showQuestionAddMenu = true;
      }
    },
    selectQuestionToRemove(quest) {
      Object.keys(this.showSuccessMessage).forEach((key) => {
        this.showSuccessMessage[key] = false;
      });
      Object.keys(this.selectedFor[this.currentOperation]).forEach((key) => {
        this.selectedFor[this.currentOperation][key] = false;
      });
      const qIndex = this.currentQuestions.indexOf(quest);
      this.indexOfCurrentQuestion = qIndex;
      if (qIndex >= 0) {
        if (this.currentQuestions[qIndex].tags.length > 1) {
          this.showDeleteSelectionMenu = true;
          this.otherTagsOfCurrentQuestion = [];
          this.currentQuestions[qIndex].tags.forEach((category) => {
            if (category !== this.currentCategory) {
              this.otherTagsOfCurrentQuestion.push(category);
            }
          });
        } else {
          this.doSelectedOperation(this.currentOperation);
        }
      }
    },
    selectOtherCategoriesToDo(chosenTag) {
      if (!this.selectedFor[this.currentOperation]) {
        this.otherTagsOfCurrentQuestion.forEach((tag) => {
          this.selectedFor[this.currentOperation][tag] = false;
        });
      }
      if (this.selectedFor[this.currentOperation][chosenTag]) {
        this.selectedFor[this.currentOperation][chosenTag] = false;
      } else {
        this.selectedFor[this.currentOperation][chosenTag] = true;
      }
    },
    doSelectedOperation() {
      this.categoriesTo[this.currentOperation] = [];
      if (this.currentOperation === 'delete') {
        Object.keys(this.selectedFor.delete).forEach((key) => {
          if (this.selectedFor.delete[key]) {
            this.categoriesTo.delete.push(key);
          }
        });
        const qIndex = this.questions.indexOf(this.currentQuestions[this.indexOfCurrentQuestion]);
        this.categoriesTo.delete.push(this.currentCategory);
        this.categoriesTo.delete.forEach((category) => {
          const cIndex = this.questions[qIndex].tags.indexOf(category);
          this.questions[qIndex].tags.splice(cIndex, 1);
        });
        if (this.questions[qIndex].tags.length === 0) {
          this.questions.splice(qIndex, 1);
        }
        this.showDeleteSelectionMenu = false;
      } else if (this.currentOperation === 'add') {
        if (!this.tempQuestion || !this.tempAnswer) {
          return;
        }
        this.questions.push({
          q: this.tempQuestion,
          a: this.tempAnswer,
          tags: [],
        });
        Object.keys(this.selectedFor.add).forEach((key) => {
          if (this.selectedFor.add[key]) {
            this.categoriesTo.add.push(key);
            this.questions[this.questions.length - 1].tags.push(key);
          }
        });
        this.tempQuestion = '';
        this.tempAnswer = '';
        this.showQuestionAddMenu = false;
      }
      this.showSuccessMessage[this.currentOperation] = true;
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
  },
  data() {
    return {
      categories: [],
      questions: [],
      currentCategory: '',
      tempQuestion: '',
      tempAnswer: '',
      indexOfCurrentQuestion: 0,
      otherTagsOfCurrentQuestion: [],
      currentOperation: null,
      categoriesTo: {
        delete: [],
        add: [],
      },
      selectedFor: {
        delete: {},
        add: {},
      },
      showSuccessMessage: {
        delete: false,
        add: false,
      },
      showQuestionAddMenu: false,
      showDeleteSelectionMenu: false,
    };
  },
  computed: {
    catHasQuestions() {
      return this.currentQuestions.length > 0;
    },
    currentQuestions() {
      return this.questions.filter((question) => question.tags.includes(this.currentCategory));
    },
  },
};
</script>

<style>
.error-message {
    font-size: 85%;
    color:red;
}
.success-message {
    font-size: 85%;
    color:green;
}
</style>
