<template>
  <div class="play">
    <div class="container">
    <h4>Choose category</h4>
    <select name="" id="" v-model="curCategory">
      <option value="">Choose</option>
      <option v-for="opt in categories" v-bind:value="opt" v-bind:key="opt">
        {{ opt }}
      </option>
    </select>
      <div class="row" v-if="!finished && curCategory">
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
      answeredByCategory: {},
      shownQuestions: [],
      answered: 0,
      isRevealed: false,
      curCategory: '',
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
    this.getQuestions();
  },
  computed: {
    currentQuestion() {
      return this.currentQuestions[this.answeredByCategory[this.curCategory]];
    },
    currentQuestions() {
      return this.questions.filter((question) => question.tags.includes(this.curCategory));
    },
    finished() {
      if (this.curCategory === '') {
        return false;
      }

      return this.currentQuestions.length === this.answeredByCategory[this.curCategory];
    },
    allDone() {
      return this.answered === this.questions.length;
    },
    categories() {
      const cats = [];
      this.questions.forEach((element) => {
        element.tags.forEach((tag) => {
          if (!cats.includes(tag)) {
            cats.push(tag);
            this.answeredByCategory[tag] = 0;
          }
        });
      });
      return cats;
    },
  },
  watch: {
    curCategory() {
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
        this.answeredByCategory[this.curCategory] += 1;
      }
    },
    nextQuestion() {
      this.isRevealed = false;
      const currentQuestionIndex = this.questions.indexOf(this.currentQuestion);
      this.shownQuestions.push(currentQuestionIndex);
      this.answeredByCategory[this.curCategory] += 1;
      this.answered += 1;
      this.skipAnsweredQuestions();
    },
  },
};
</script>

<style>

</style>
