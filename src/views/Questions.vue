<template>
  <div class="questions">
    <div class="container">
      <table class="table">
        <thead>
          <th>Actions</th>
          <th>Q</th>
          <th>A</th>
          <th>Remember Streak</th>
          <th>Do not show before</th>
          <th>Tags</th>
        </thead>
        <tbody>
          <tr v-for="q, qIndex in questions" :key="q.q">
            <td><a href="#" @click.prevent="removeQuestion(qIndex)">Remove question</a></td>
            <td>{{ q.q }}</td>
            <td>{{ q.a }}</td>
            <td>{{ q.remember_streak }}</td>
            <td>{{ new Date(q.do_not_show_before).toLocaleString() }}</td>
            <td>
              <span v-for="t, tagIndex in q.tags" :key="t">
                {{ t }}&nbsp;
                <a href="#" @click.prevent="removeTag(q.tags, tagIndex)"
                v-if="q.tags.length > 1">x</a>&nbsp;
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="input-group justify-content-center">
      <label for="questionInput">Question:
        <input id="questionInput" type="text" v-model="tempQuestion"/>
      </label>
      <label for="questionInput">Answer:
        <input id="answerInput" type="text" v-model="tempAnswer"/>
      </label>
      <label for="tagsInput">Tags:
        <input id="tagsInput" type="text" v-model="tempTags"/>
      </label>
      <button class="btn btn-success" @click="addQuestion">Add Question</button>
    </div>
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
    this.getQuestions();
  },
  methods: {
    removeQuestion(qIndex) {
      this.questions.splice(qIndex, 1);
      localStorage.setItem('questions', JSON.stringify(this.questions));
    },
    removeTag(tags, tagIndex) {
      if (tags.length > 1) {
        tags.splice(tagIndex, 1);
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    },
    getQuestions() {
      if (localStorage.getItem('questions')) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
      } else {
        this.questions = [];
      }
    },
    addQuestion() {
      const tags = this.tempTags.split(' ').map((item) => item.replace('#', '').toLowerCase());

      this.questions.push({
        q: this.tempQuestion,
        a: this.tempAnswer,
        tags,
        remember_streak: 0,
        do_not_show_before: Date.now(),
      });

      localStorage.setItem('questions', JSON.stringify(this.questions));
      this.tempQuestion = '';
      this.tempAnswer = '';
      this.tempTags = '';
    },
  },
  data() {
    return {
      questions: [],
      tempQuestion: '',
      tempAnswer: '',
      tempTags: '',
    };
  },
};
</script>
