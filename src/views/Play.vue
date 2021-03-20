<template>
  <div class="play">
    <div class="card-body" v-if="!questionsCheck">
      <h4>No question to play</h4>
      <router-link to="/questions">Click to add question</router-link>
    </div>
    <div class="container" v-if="questionsCheck">
    <h4>Choose tag</h4>
    <select name="" id="" v-model="curTag">
      <option value="">Choose</option>
      <option v-for="t in allTags" :key="t">
        {{ t }}
      </option>
    </select>
      <div class="row" v-if="!finished && curTag">
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
      <div class="card-body" v-if="allDone && questionsCheck">
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
      curTag: '',
      allTags: [],
      questions: [],
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
    this.getTag();
  },
  computed: {
    currentQuestion() {
      return this.currentQuestions[this.answeredByTag[this.curTag]];
    },
    currentQuestions() {
      return this.questions.filter((question) => question.tags.includes(this.curTag));
    },
    finished() {
      if (this.curTag === '') {
        return false;
      }

      return this.currentQuestions.length === this.answeredByTag[this.curTag];
    },
    allDone() {
      return this.answered === this.questions.length;
    },
    questionsCheck() {
      if (this.questions.length < 1) {
        return false;
      }
      return true;
    },
  },
  watch: {
    curTag() {
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
    getTag() {
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
        this.answeredByTag[this.curTag] += 1;
      }
    },
    nextQuestion() {
      this.isRevealed = false;
      const currentQuestionIndex = this.questions.indexOf(this.currentQuestion);
      this.shownQuestions.push(currentQuestionIndex);
      this.answeredByTag[this.curTag] += 1;
      this.answered += 1;
      this.skipAnsweredQuestions();
    },
  },
};
</script>

<style>

</style>
