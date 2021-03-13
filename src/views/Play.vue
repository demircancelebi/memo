<template>
  <div class="play">
    <div class="container">
    <h4>Choose category</h4>
    <select name="" id="" v-model="curCategory">
      <option value="">Choose</option>
      <option v-for="opt in categories" v-bind:value="opt.value" v-bind:key="opt.value">
        {{ opt.text }}
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
      categories: [],
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
    this.getCategories();
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
  },
  watch: {
    curCategory() {
      this.isRevealed = false;
      this.skipAnsweredQuestions();
    },
  },
  methods: {
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

      this.categories.forEach((category) => {
        this.answeredByCategory[category.value] = 0;
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
