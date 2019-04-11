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
                  <v-btn @click="createQuestion()" class="create-button" block dark color="green">
                    <v-icon>mdi-plus</v-icon>
                    <div class="button-text">CRIAR NOVA QUESTÃO</div>
                  </v-btn>
                </v-form>
                <v-card v-for="(question, index) in getListedQuestions()" :key="index" class="question-card">
                  <v-card-text question-id=question.id>
                    <div>{{ question.texto_questao }}</div>
										<div v-for="(alternativa,index) in question.alternativas" :key="index">
											<div><span :class="+question.letra_alternativa === index+1 ? 'question-answer' : ''">{{letras[index]}}</span> {{ alternativa.desc_alternativa }}</div>
										</div>
                    <!-- <div><span :class="question.answer === '2' ? 'question-answer' : ''">b)</span> {{ question.b }}</div> -->
                    <!-- <div><span :class="question.answer === '3' ? 'question-answer' : ''">c)</span> {{ question.c }}</div> -->
                    <!-- <div><span :class="question.answer === '4' ? 'question-answer' : ''">d)</span> {{ question.d }}</div> -->
                    <!-- <div><span :class="question.answer === '5' ? 'question-answer' : ''">e)</span> {{ question.e }}</div> -->
                    <v-layout justify-end>
                      <div>
                        <v-btn flat icon @click="handleEdit(question)"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn flat icon @click="handleDelete(question)"><v-icon>mdi-delete</v-icon></v-btn>
                      </div>
                    </v-layout>
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
			letras: ['a)','b)','c)','d)','e)'],
      options: [
        { value: '1', label: 'a)', body: '' },
        { value: '2', label: 'b)', body: '' },
        { value: '3', label: 'c)', body: '' },
        { value: '4', label: 'd)', body: '' },
        { value: '5', label: 'e)', body: '' }
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
    axios.defaults.baseURL = 'http://localhost:3000';
		this.reload();
  },
  methods: {
    reload() {
      axios.get('/api/question').then((response) => {
        this.questions = response.data;
				console.log(this.questions)
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
			this.reload();
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
			let data = {
				questao: {
	        texto_questao: this.text,
	        letra_alternativa: this.answer.pop()
	      },
				alternativas: this.options.map(option => {return {desc_alternativa: option.body}})
			}
      // let newQuestion = {
      //   text: this.text,
      //   answer: this.answer.pop(),
      // }
      // this.options.forEach((option) => {
      //   newQuestion[option.value] = option.body
      // })
			console.log(data)
      // this.questions.push(newQuestion)
      axios.post('/api/question', data).then(_ => {
				this.handleClose()
			})
    },
    getListedQuestions() {
      return (this.searchStr) ? this.listedQuestions : this.questions;
    },
    handleEdit(questionToEdit) {
      this.answer = [questionToEdit.answer]
      this.text = questionToEdit.text
      this.options.forEach((option) => {
        option.body = questionToEdit[option.value]
      })
      this.questions = this.questions.filter((question) => {
        return JSON.stringify(question) !== JSON.stringify(questionToEdit)
      })
      this.dialog = true
    },
    handleDelete(questionToDelete) {
			console.log(questionToDelete)
      axios.delete('/api/question/'+questionToDelete.id_questao).then(_ => {
				this.reload()
			})
      // this.questions = this.questions.filter((question) => {
      //   return JSON.stringify(question) !== JSON.stringify(questionToDelete)
      // })
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
