<template>
  <div class="play">
    <div class="container">
    <h4>Choose category</h4>
    <select name="" id="" v-model="currentTag">
      <option value="">Choose</option>
      <option v-for="tag in allTags" :key="tag">
        {{ tag }}
      </option>
    </select>
      <div class="mt-4 row justify-content-center" v-if="!finished && currentTag">
        <h2>Gunluk pratik</h2>
        <div class="col-8">
          <div class="card mb-3">
            <div class="card-body">
              <p class="card-text">{{ currentQuestion.q }}</p>
              <p v-if="isRevealed">{{ currentQuestion.a }}</p>
              <button class="btn btn-primary" @click="reveal" v-if="!isRevealed">Goster</button>
              <button class="btn btn-success" v-show="isRevealed"
              @click="remembered">Hatirladim</button>
              <button class="btn btn-danger" v-show="isRevealed"
              @click="notRemembered">Hatirlayamadim</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="finished">
        Gunluk pratigini tamamladin
      </div>
      <div class="card-body" v-if="allDone">
        Butun kategorileri tamamladin
      </div>
    </div>

        <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Play',
  // components: {
  //   HelloWorld,
  // },
  data() {
    return {
      answeredByTag: {},
      shownQuestions: [],
      answered: 0,
      isRevealed: false,
      currentTag: '',
      questions: [],
      allTags: [],
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
    this.getQuestions();
    this.getTags();
  },
  computed: {
    currentQuestion() {
      return this.currentQuestions[this.answeredByTag[this.currentTag]];
    },
    currentQuestions() {
      return this.questions.filter((question) => question.tags.includes(this.currentTag));
    },
    finished() {
      if (this.currentTag === '') {
        return false;
      }

      return this.currentQuestions.length === this.answeredByTag[this.currentTag];
    },
    allDone() {
      return this.answered === this.questions.length;
    },
  },
  watch: {
    currentTag() {
      this.isRevealed = false;
      this.skipAnsweredQuestions();
    },
  },
  methods: {
    getQuestions() {
      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = [];
      }
    },
    getTags() {
      this.questions.forEach((question) => {
        question.tags.forEach((tag) => {
          if (!this.allTags.includes(tag)) {
            this.allTags.push(tag);
          }
        });
      });
      this.allTags.forEach((tag) => {
        this.answeredByTag[tag] = 0;
      });
    },
    reveal() {
      this.isRevealed = true;
    },
    remembered() {
      this.nextQuestion();
    },
    notRemembered() {
      this.nextQuestion();
    },
    skipAnsweredQuestions() {
      while (this.shownQuestions.includes(this.questions.indexOf(this.currentQuestion))) {
        this.answeredByTag[this.currentTag] += 1;
      }
    },
    nextQuestion() {
      this.isRevealed = false;
      const currentQuestionIndex = this.questions.indexOf(this.currentQuestion);
      this.shownQuestions.push(currentQuestionIndex);
      this.answeredByTag[this.currentTag] += 1;
      this.answered += 1;
      this.skipAnsweredQuestions();
    },
  },
};
</script>

<style>

</style>
