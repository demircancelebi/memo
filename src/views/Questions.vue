<template>
  <div class="questions">
    <div v-if="!showQuestionAddMenu">
      <div v-for="category in categories" :key="category.value">
        <button class="btn btn-dark mb-1" @click="showQuestions(category)"
        >{{ category.text }}</button>
      </div>
    </div>
    <button v-if="!showQuestionAddMenu" class="mb-4 btn btn-primary"
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
              <button v-if="!selectedForAdd[category.value]"
              @click="selectOtherCategoriesToAdd(category.value)"
              class="list-group-item list-group-item-action mt-2">{{ category.text }}</button>
              <button v-if="selectedForAdd[category.value]"
              @click="selectOtherCategoriesToAdd(category.value)"
              class="list-group-item list-group-item-action active mt-2"
              aria-current="true">
                {{ category.text }}
              </button>
            </li>
          </ul>
          <button class="mt-3 col-12 btn btn-success" @click="addSelected">Add</button>
        </div>
      </div>
    </div>
    <div v-if="showAddSuccess" class="mt-4 mb-4 success-message">
      Question successfully added to categories:
      <span v-for="cat in categoriesToAdd" :key="cat">
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
      <div v-if="showDeleteSelection">
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
                <button v-if="!selectedForDelete[tag]" @click="selectOtherCategoriesToDelete(tag)"
                class="list-group-item list-group-item-action mt-2">{{ tag }}</button>
                <button v-if="selectedForDelete[tag]" @click="selectOtherCategoriesToDelete(tag)"
                class="list-group-item list-group-item-action active mt-2"
                aria-current="true">
                  {{ tag }}
                </button>
              </li>
            </ul>
            <button class="mt-3 col-12 btn btn-danger" @click="deleteSelected">Delete</button>
          </div>
        </div>
      </div>
      <div v-if="showDeleteSuccess" class="mt-4 error-message">
        Question successfully deleted from categories:
        <span v-for="cat in categoriesToDelete" :key="cat">
          ({{ cat }})
        </span>
      </div>
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
      this.showAddSuccess = false;
      this.showDeleteSuccess = false;
      this.showDeleteSelection = false;
      this.currentCategory = category.value;
    },
    showAddQuestion() {
      this.tempQuestion = '';
      this.tempAnswer = '';
      this.currentCategory = '';
      this.showDeleteSuccess = false;
      this.showAddSuccess = false;
      Object.keys(this.selectedForAdd).forEach((key) => {
        this.selectedForAdd[key] = false;
      });
      if (this.showQuestionAddMenu) {
        this.showQuestionAddMenu = false;
      } else {
        this.showQuestionAddMenu = true;
      }
    },
    selectQuestionToRemove(quest) {
      this.showAddSuccess = false;
      this.showDeleteSuccess = false;
      Object.keys(this.selectedForDelete).forEach((key) => {
        this.selectedForDelete[key] = false;
      });
      const qIndex = this.currentQuestions.indexOf(quest);
      this.indexOfCurrentQuestion = qIndex;
      if (qIndex >= 0) {
        if (this.currentQuestions[qIndex].tags.length > 1) {
          this.showDeleteSelection = true;
          this.otherTagsOfCurrentQuestion = [];
          this.currentQuestions[qIndex].tags.forEach((category) => {
            if (category !== this.currentCategory) {
              this.otherTagsOfCurrentQuestion.push(category);
            }
          });
        } else {
          this.deleteSelected();
        }
      }
    },
    selectOtherCategoriesToDelete(chosenTag) {
      if (!this.selectedForDelete) {
        this.otherTagsOfCurrentQuestion.forEach((tag) => {
          this.selectedForDelete[tag] = false;
        });
      }
      if (this.selectedForDelete[chosenTag]) {
        this.selectedForDelete[chosenTag] = false;
      } else {
        this.selectedForDelete[chosenTag] = true;
      }
    },
    selectOtherCategoriesToAdd(chosenCategory) {
      if (!this.selectedForAdd) {
        this.otherTagsOfCurrentQuestion.forEach((category) => {
          this.selectedForAdd[category] = false;
        });
      }
      if (this.selectedForAdd[chosenCategory]) {
        this.selectedForAdd[chosenCategory] = false;
      } else {
        this.selectedForAdd[chosenCategory] = true;
      }
    },
    deleteSelected() {
      this.categoriesToDelete = [];
      Object.keys(this.selectedForDelete).forEach((key) => {
        if (this.selectedForDelete[key]) {
          this.categoriesToDelete.push(key);
        }
      });
      const qIndex = this.questions.indexOf(this.currentQuestions[this.indexOfCurrentQuestion]);
      this.categoriesToDelete.push(this.currentCategory);
      this.categoriesToDelete.forEach((cat) => {
        const catIndex = this.questions[qIndex].tags.indexOf(cat);
        this.questions[qIndex].tags.splice(catIndex, 1);
      });
      if (this.questions[qIndex].tags.length === 0) {
        this.questions.splice(qIndex, 1);
      }
      this.showDeleteSelection = false;
      this.showDeleteSuccess = true;
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
    addSelected() {
      if (!this.tempQuestion || !this.tempAnswer) {
        return;
      }
      this.categoriesToAdd = [];
      this.questions.push({
        q: this.tempQuestion,
        a: this.tempAnswer,
        tags: [],
      });
      Object.keys(this.selectedForAdd).forEach((key) => {
        if (this.selectedForAdd[key]) {
          this.categoriesToAdd.push(key);
          this.questions[this.questions.length - 1].tags.push(key);
        }
      });
      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.tempQuestion = '';
      this.tempAnswer = '';
      this.showQuestionAddMenu = false;
      this.showAddSuccess = true;
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
      categoriesToDelete: [],
      categoriesToAdd: [],
      selectedForDelete: {},
      selectedForAdd: {},
      otherTagsOfCurrentQuestion: [],
      showQuestionAddMenu: false,
      showAddSuccess: false,
      showDeleteSuccess: false,
      showDeleteSelection: false,
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
