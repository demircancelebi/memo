<template>
  <div class="play">
    <div class="container">
      <h5>Categories</h5>
      <div class="mb-4">
        <a href="#"
        class="btn btn-sm me-2"
        v-for="tag in seperateTags"
        :key="tag"
        :class="curCategory === tag ? 'btn-primary' : 'btn-light'"
        @click.prevent="curCategory=tag">{{tag}}</a>
      </div>
      finished: {{ finished }} <br>
      categoryFinished('c3'): {{ categoryFinished('c3') }} <br>
      categoryFinished('cars'): {{ categoryFinished('cars') }}

      <h2 class="mb-4">Daily Practice</h2>

      <div v-if="!curCategory||finished||allDone">
        <div class="row justify-content-center ms-4 me-4">
          <div class="col-12 col-sm-11 col-md-6 col-lg-7 col-xl-8">
            <div class="default-card card border border-3 border-dark">
              <div class="card-body mt-4">
                <div class="card-body mt-5 mb-5" v-if="finished">
                  <h5>You have completed your daily practice!</h5>
                </div>
                <div class="card-body mt-5 mb-5" v-if="allDone">
                  <h5>You have completed all the categories!</h5>
                </div>
                <div v-if="!curCategory" class="card-body mt-5 mb-5">
                  <h5>Please select a category on the right.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!finished && curCategory">
        <div class="row justify-content-center ms-4 me-4">
          <div class="col-12 col-sm-11 col-md-6 col-lg-7 col-xl-8">
            <div v-if="!isRemembered && !isNotRemembered">
              <div class="default-card card border border-3 border-dark">
                <div class="card-body mt-4">
                  <div class="card-title">{{ currentQuestion.q }}</div><hr>
                  <div class="mt-3 mb-2" v-if="!isRevealed"> - ? - </div>
                  <div class="mt-4 mb-5" v-if="isRevealed">{{ currentQuestion.a }}</div>
                  <button class="btn btn-dark mt-5
                  col-11 col-sm-5 col-md-6 col-lg-5 col-xl-5" @click="reveal"
                  v-if="!isRevealed">Show Answer</button>
                  <button class="remembered btn btn-dark mx-2
                  col-11 col-sm-5 col-md-6 col-lg-4 col-xl-4" v-show="isRevealed"
                  @click="remembered">Remembered</button>
                  <button class="notRemembered btn btn-dark mx-2
                  col-11 col-sm-5 col-md-7 col-lg-5 col-xl-4" v-show="isRevealed"
                  @click="notRemembered">Not Remembered</button>
                </div>
              </div>
            </div>
            <div v-if="isRemembered || isNotRemembered">
              <div
              :class="{
                'remembered-card-color': isRemembered && !isTimeoutStarted,
                'remembered-card-color2': isRemembered && isTimeoutStarted,
                'not-remembered-card-color': isNotRemembered && !isTimeoutStarted,
                'not-remembered-card-color2': isNotRemembered && isTimeoutStarted
              }"
              class="card border border-3 border-dark">
                <div class="card-body mt-5 mb-5">
                  <h2 class="mt-5 mb-5">
                    <span v-if="isRemembered">CONGRATS!!</span>
                    <span v-if="isNotRemembered">BETTER LUCK NEXT TIME!!</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      isRemembered: false,
      isNotRemembered: false,
      isTimeoutStarted: false,
      colorPicker: [this.pickFirstColor, this.pickSecondColor],
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
      console.log('===this.currentQuestions');
      console.log(this.currentQuestions);
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
    categoryQuestions(category) {
      return this.questions.filter((question) => question.tags.includes(category));
    },
    categoryFinished(category) {
      // console.log('category');
      // console.log(category);
      if (category === '') {
        return false;
      }

      console.log('category2');
      console.log(category);
      console.log(this.categoryQuestions(category).length);
      console.log(this.answeredByCategory[category]);
      return this.categoryQuestions(category).length === this.answeredByCategory[category];
    },
    getQuestions() {
      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = [];
      }

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

      // this.seperateTags.forEach((tag) => {
      //   this.curCategory = tag;
      // });
      // this.curCategory = '';
    },
    reveal() {
      this.isRevealed = true;
    },
    timeoutStarter() {
      for (let time = 0; time < 1200; time += 0) {
        this.colorPicker.forEach((color) => {
          window.setTimeout(color, time);
          time += 200;
        });
      }
    },
    pickFirstColor() {
      this.isTimeoutStarted = true;
    },
    pickSecondColor() {
      this.isTimeoutStarted = false;
    },
    remembered() {
      this.isRemembered = true;
      this.timeoutStarter();
      const question = this.currentQuestion;
      question.remember_streak += 1;
      this.updateDisplayTime();
      window.setTimeout(this.nextQuestion, 1200);
    },
    notRemembered() {
      this.isNotRemembered = true;
      this.timeoutStarter();
      const question = this.currentQuestion;
      question.remember_streak = 0;
      this.updateDisplayTime();
      window.setTimeout(this.nextQuestion, 1400);
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
      console.log('skipping...');
      if (this.curCategory === 'c3') {
        console.log('this.curCategory');
        console.log(this.curCategory);
        console.log('this.currentQuestion');
        console.log(this.currentQuestion);
        console.log('this.questions.indexOf(this.currentQuestion)');
        console.log(this.questions.indexOf(this.currentQuestion));
        console.log('this.answeredQuestions');
        console.log(this.answeredQuestions);
        console.log('this.answeredByCategory[this.curCategory]');
        console.log(this.answeredByCategory[this.curCategory]);
      }
    },
    nextQuestion() {
      this.isRemembered = false;
      this.isNotRemembered = false;
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
.default-card {
  color: white;
  background: darkslategray;
}
.other-categories {
  color: white;
  background: slategray;
}
.scrollable-category-area {
  height: 250px;
  overflow: auto
}
.remembered:hover{
  background-color: green;
}
.notRemembered:hover{
  background-color: darkred;
}
.remembered-card-color {
  color: white;
  background: green;
}
.remembered-card-color2 {
  color: white;
  background: seagreen;
}
.not-remembered-card-color {
  color: white;
  background: firebrick;
}
.not-remembered-card-color2 {
  color: white;
  background: darkred;
}
</style>
