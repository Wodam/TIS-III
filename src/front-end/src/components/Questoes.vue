<template>
  <Menu>
    <template v-slot:content class="questoes">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Nova Questão</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout wrap>
                <v-flex lg12 sm12>
                  <v-textarea v-model="text" label="Enunciado" auto-grow rows="1"></v-textarea>
                </v-flex>
                <template v-for="(option, index) in options">
                  <v-flex :key="index">
                    <v-checkbox v-model="correctAnswer" :value="option.value"></v-checkbox>
                  </v-flex>
                  <v-flex lg11 sm11 :key="index + option">
                    <v-textarea v-model="option.body" :label="option.label" auto-grow rows="1"></v-textarea>
                  </v-flex>
                </template>
                <v-flex lg12 sm12>
                  <v-autocomplete v-model="selectedSkills" :items="skills" chips item-text="name" label="Competências" multiple>
                    <template v-slot:no-data>
                      <v-list-tile>
                        <v-btn class="autocomplete-button">Criar</v-btn>
                      </v-list-tile>
                    </template>
                    <template v-slot:selection="data">
                      <v-chip>{{ data.item.name }}</v-chip>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-autocomplete  v-model="selectedAbilities" :items="abilities" chips label="Habilidades" multiple>
                    <template v-slot:no-data>
                      <v-list-tile>
                        <v-btn class="autocomplete-button">Criar</v-btn>
                      </v-list-tile>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue-grey" dark @click="handleClose()">Cancelar</v-btn>
            <v-btn color="blue-grey" dark @click="handleSave()">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex lg6 sm8>
            <v-card>
              <v-toolbar dark color="blue-grey">
                <v-toolbar-title class="text-md-center">Questões</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-layout justify-end>
                  <v-flex lg8 sm6 xs6>
                    <v-text-field
                      v-model="searchInput"
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Pesquisar"
                      class="hidden-sm-and-down"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-btn @click="createQuestion()" class="create-button" block dark color="blue-grey">
                    <v-icon>mdi-plus</v-icon>
                    <div class="button-text">CRIAR NOVA QUESTÃO</div>
                  </v-btn>
                </v-form>
                <v-card v-for="(question, index) in getListedQuestions()" :key="index" class="question-card">
                  <v-card-text>
                    <div>{{ question.text }}</div>
                    <div><span :class="question.answer === 'a' ? 'question-answer' : ''">a)</span> {{ question.a }}</div>
                    <div><span :class="question.answer === 'b' ? 'question-answer' : ''">b)</span> {{ question.b }}</div>
                    <div><span :class="question.answer === 'c' ? 'question-answer' : ''">c)</span> {{ question.c }}</div>
                    <div><span :class="question.answer === 'd' ? 'question-answer' : ''">d)</span> {{ question.d }}</div>
                    <div><span :class="question.answer === 'e' ? 'question-answer' : ''">e)</span> {{ question.e }}</div>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </Menu>
</template>
<script>
import Menu from './Menu.vue'
import axios from 'axios'

export default {
  name: "Questoes",
  components: { Menu },
  data() {
    return {
      answer: [],
      options: [
        { value: 'a', label: 'a)', body: '' },
        { value: 'b', label: 'b)', body: '' },
        { value: 'c', label: 'c)', body: '' },
        { value: 'd', label: 'd)', body: '' },
        { value: 'e', label: 'e)', body: '' }
      ],
      selectedSkills: [],
      selectedAbilities: [],
      text: '',
      skills: [ { name: 'batata' } ],
      abilities: [],
      dialog: false,
      questions: [
        {
          text: 'batata',
          a: 'plei',
          b: 'plei',
          c: 'plei',
          d: 'plei',
          e: 'plei',
          answer: 'b'
        }
      ],
      listedQuestions: [],
      searchStr: ''
    };
  },
  created: function() {
    this.listedQuestions = this.questions
    axios.defaults.baseURL = 'https://localhost:3000'
  },
  methods: {
    reload() {
      axios.get('/').then((response) => {
        questions = response.data;
      }).catch((error) => {
        console.log(error)
      })
    },
    createQuestion() {
      this.dialog = true;
    },
    handleClose() {
      this.setDefaultValues()
      this.dialog = false;
    },
    setDefaultValues() {
      this.answer = []
      this.text = ''
      this.selectedSkills = []
      this.selectedAbilities = []
      this.options.forEach((option) => {
        option.body = ''
      })
    },
    handleSave() {
      let newQuestion = {
        text: this.text,
        answer: this.answer.pop(),
      }
      this.options.forEach((option) => {
        newQuestion[option.value] = option.body
      })
      this.questions.push(newQuestion)
      axios.post('/', { ...newQuestion })
      this.handleClose()
    },
    getListedQuestions() {
      return (this.searchStr) ? this.listedQuestions : this.questions;
    }
  },
  computed: {
    correctAnswer: {
      get: function() {
        return this.answer
      },
      set: function(value) {
        this.answer = [value.pop()]
      }
    },
    searchInput: {
      get: function() {
        return this.searchStr
      },
      set: function(value) {
        this.searchStr = value
        this.listedQuestions = this.questions.filter((question) => {
          return question.text.includes(this.searchStr)
        })
      }
    }
  }
};
</script>
<style scoped>
.create-button {
  height: 50px;
}
.create-button .button-text {
  margin-top: 2px;
}
.question-card {
  margin-top: 15px;
}
.question-answer {
  font-weight: bold;
}
.autocomplete-button {
  width: 95%;
}
</style>
