<template>
  <div class="play">
    <div class="container">
    <h4>Choose category</h4>
    <select name="" id="" v-model="curCategory">
      <option value="">Choose</option>
      <option v-for="t in seperateTags" :key="t">
        {{ t }}
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
      answeredQuestions: [],
      answered: 0,
      isRevealed: false,
      curCategory: '',
      categories: [],
      questions: [],
      seperateTags: [],
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
    this.getCategories();
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
  },
  watch: {
    curCategory() {
      this.isRevealed = false;
      this.skipAnsweredQuestions();
    },
  },
  methods: {
    getQuestions() {
      // const now = Date.now();
      // const qs = [
      //   {
      //     q: 'ilk soru',
      //     a: 'cevap',
      //     tags: ['science', 'tech'],
      //     remember_streak: 0,
      //     display_at: now,
      //   },
      //   {
      //     q: '2. soru',
      //     a: 'cevap',
      //     tags: ['history', 'science', 'tech'],
      //   },
      //   {
      //     q: '3. soru',
      //     a: 'cevap',
      //     tags: ['history', 'geography'],
      //   },
      //   {
      //     q: '4. soru',
      //     a: 'cevap',
      //     tags: ['tech', 'geography'],
      //   },
      // ];

      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = [];
      }

      this.questions.sort((a, b) => a.do_not_show_before - b.do_not_show_before);
      const now = Date.now();
      this.questions.forEach((question, index) => {
        if (question.do_not_show_before > now) {
          this.answeredQuestions.push(index);
        }
      });
    },
    getCategories() {
      for (let i = 0; i < this.questions.length; i += 1) {
        for (let j = 0; j < this.questions[i].tags.length; j += 1) {
          if (!this.seperateTags.includes(this.questions[i].tags[j])) {
            this.seperateTags.push(this.questions[i].tags[j]);
          }
        }
      }
      this.seperateTags.forEach((tag) => {
        this.answeredByCategory[tag] = 0;
      });
    },
    reveal() {
      this.isRevealed = true;
    },
    remembered() {
      const question = this.currentQuestion;

      const now = Date.now();
      const allowanceTime = ((2 ** (question.remember_streak)) * 1000 * 60) / 2;
      const lateness = now - question.do_not_show_before;
      const diff = Math.floor(lateness / allowanceTime);

      question.remember_streak = question.remember_streak - diff + 1;

      this.updateDisplayTime();
      this.nextQuestion();
    },
    notRemembered() {
      const question = this.currentQuestion;
      question.remember_streak = 0;
      this.updateDisplayTime();
      this.nextQuestion();
    },
    updateDisplayTime() {
      const question = this.currentQuestion;
      question.do_not_show_before = Date.now() + (2 ** question.remember_streak) * 1000 * 60;
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
    skipAnsweredQuestions() {
      while (this.answeredQuestions.includes(this.questions.indexOf(this.currentQuestion))) {
        this.answeredByCategory[this.curCategory] += 1;
      }
    },
    nextQuestion() {
      this.isRevealed = false;
      const currentQuestionIndex = this.questions.indexOf(this.currentQuestion);
      this.answeredQuestions.push(currentQuestionIndex);
      this.answeredByCategory[this.curCategory] += 1;
      this.answered += 1;
      this.skipAnsweredQuestions();
    },
  },
};
</script>

<style>

</style>
