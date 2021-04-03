<template>
  <div class="questions">
    <div class="container">
      <div class="row align-items-center justify-content-center mb-3">
        <div class="col-auto">
          <label for="questionInput">Question:</label>
        </div>
        <div class="col-4">
          <input
            class="form-control"
            id="questionInput"
            type="text"
            v-model="tempQuestion"
          />
        </div>
        <div class="col-auto">
          <label for="questionInput">Answer:</label>
        </div>
        <div class="col-auto">
          <input
            class="form-control"
            id="answerInput"
            type="text"
            v-model="tempAnswer"
          />
        </div>
        <div class="col-auto">
          <label for="tagsInput">Tags:</label>
        </div>
        <div class="col-auto">
          <input
            class="form-control"
            id="tagsInput"
            type="text"
            v-model="tempTags"
            @keyup.enter="addQuestion"
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-success m-1" @click="addQuestion">
            Add Question
          </button>
        </div>
      </div>
      <div class="scrollable-area">
        <div v-if="questions.length === 0">
          <div class="row justify-content-center">
            <div class="col-4">
              <div class="card">
                <div class="card-body p-5">
                  <h3 class="text-center mb-0">Add some cards!</h3>
                  <p class="lead mt-3 mb-0">
                    They will show up here as you add them
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table
          class="table table-striped table-bordered"
          v-if="questions.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col" class="col-2">Answer</th>
              <th scope="col" v-if="false">Remember Streak</th>
              <th scope="col" v-if="false">Do not show before</th>
              <th scope="col" class="col-2">Tags</th>
              <th scope="col" class="col-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(q, qIndex) in questions" :key="q.q">
              <th class="align-middle" scope="row">{{ qIndex + 1 }}</th>
              <td class="align-middle">{{ q.q }}</td>
              <td class="align-middle">{{ q.a }}</td>
              <td class="align-middle" v-if="false">{{ q.remember_streak }}</td>
              <td class="align-middle" v-if="false">
                {{ q.do_not_show_before }}
              </td>
              <td class="align-middle">
                <span
                  v-for="(t, tagIndex) in q.tags"
                  :key="t"
                  @click.prevent="removeTag(q.tags, tagIndex)"
                >
                  <span :class="{ 'can-be-deleted': q.tags.length > 1 }">{{
                    t
                  }}</span
                  >&nbsp;
                </span>
              </td>
              <td class="align-middle">
                <a
                  href="#"
                  class="action-button text-secondary me-2"
                  v-if="false"
                >
                  <span class="fa fa-edit"></span>
                </a>
                <a
                  href="#"
                  class="action-button text-danger"
                  @click.prevent="removeQuestion(qIndex)"
                >
                  <span class="fa fa-trash"></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      const tags = this.tempTags
        .split(' ')
        .map((item) => item.replace('#', ''));

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

<style>
table a.action-button {
  display: none;
}

.table tr:hover a.action-button {
  display: inline-block;
}

.scrollable-area {
  height: 400px;
  overflow: scroll;
}

.can-be-deleted:hover {
  color: red;
  text-decoration: line-through;
  cursor: pointer;
}
</style>
