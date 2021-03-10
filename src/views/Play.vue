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
              <p class="card-text">{{ questions[curCategory][index[curCategory]].q }}</p>
              <p v-if="isRevealed">{{ questions[curCategory][index[curCategory]].a }}</p>
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
    finished() {
      if (this.curCategory === '') {
        return false;
      }

      return this.questions[this.curCategory].length === this.index[this.curCategory];
    },
    allDone() {
      let finishedCategoryCount = 0;
      Object.keys(this.index).forEach((key) => {
        if (this.questions[key].length === this.index[key]) {
          finishedCategoryCount += 1;
        }
      });

      return finishedCategoryCount === Object.keys(this.questions).length;
    },
  },
  watch: {
    curCategory() {
      this.isRevealed = false;
    },
  },
  methods: {
    getQuestions() {
      const defaultQuestions = {
      };

      this.categories.forEach((category) => {
        defaultQuestions[category.value] = [];
      });

      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = defaultQuestions;
      }

      Object.keys(this.questions).forEach((question) => {
        this.index[question] = 0;
      });
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
    reveal() {
      this.isRevealed = true;
    },
    remembered() {
      this.nextQuestion();
    },
    notRemembered() {
      this.nextQuestion();
    },
    nextQuestion() {
      this.isRevealed = false;
      this.index[this.curCategory] += 1;
    },
  },
  data() {
    return {
      index: {},
      isRevealed: false,
      curCategory: '',
      categories: [],
      questions: {},
    };
  },
};
</script>

<style>

</style>
