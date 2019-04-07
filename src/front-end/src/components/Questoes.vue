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
                  <v-textarea v-model="statement" label="Enunciado" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex>
                  <v-checkbox v-model="correctAnswer" value="a"></v-checkbox>
                </v-flex>
                <v-flex lg11 sm11>
                  <v-textarea label="a)" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex>
                  <v-checkbox v-model="correctAnswer" value="b"></v-checkbox>
                </v-flex>
                <v-flex lg11 sm11>
                  <v-textarea label="b)" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex>
                  <v-checkbox v-model="correctAnswer" value="c"></v-checkbox>
                </v-flex>
                <v-flex lg11 sm11>
                  <v-textarea label="c)" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex>
                  <v-checkbox v-model="correctAnswer" value="d"></v-checkbox>
                </v-flex>
                <v-flex lg11 sm11>
                  <v-textarea label="d)" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex>
                  <v-checkbox v-model="correctAnswer" value="e"></v-checkbox>
                </v-flex>
                <v-flex lg11 sm11>
                  <v-textarea label="e)" auto-grow rows="1"></v-textarea>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-autocomplete :items="skills" chips label="Competências" multiple>
                    <template v-slot:no-data>
                      <v-list-tile>
                        <v-btn>Criar</v-btn>
                      </v-list-tile>
                    </template>
                    <template v-slot:selection="data">
                      <v-chip>{{ data.item.name }}</v-chip>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex lg12 sm12>
                  <v-autocomplete v-model="abilities" chips label="Habilidades" multiple>
                    <template v-slot:no-data>
                      <v-list-tile>
                        <v-btn>Criar</v-btn>
                      </v-list-tile>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue-grey" dark @click="dialogClose()">Close</v-btn>
            <v-btn color="blue-grey" dark>Save</v-btn>
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
                  <v-flex lg8 sm2>
                    <v-text-field
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
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
                <v-card v-for="(question, index) in questions" :key="index" class="question-card">
                  <v-card-text>{{ question.statement }}</v-card-text>
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
export default {
  name: "Questoes",
  components: { Menu },
  data() {
    return {
      answer: [],
      statement: '',
      skills: [ { name: 'batata' } ],
      abilities: [],
      dialog: false,
      questions: [ { statement: 'Batatao batao batatao' }, { statement: 'cachorro cachorro cachorro' }, { statement: 'cachorro cachorro cachorro' }, { statement: 'cachorro cachorro cachorro' }, { statement: 'cachorro cachorro cachorro' }, { statement: 'cachorro cachorro cachorro' } ]
    };
  },
  methods: {
    createQuestion() {
      this.dialog = true;
    },
    dialogClose() {
      this.setDefaultValues()
      this.dialog = false;
    },
    setDefaultValues() {
      this.answer = []
      this.statement = ''
      this.skills = [ { name: 'batata' } ]
      this.abilities = []
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
</style>
