-- --------           << Trabalho Final  >>             ------------ --
--                                                                   --
--                    SCRIPT DE CRIACAO (DDL)                        --
--                                                                   --
-- Data Criacao ..........: 31/03/2019                               --
-- Autor(es) .............: Guilherme                                --
-- Banco de Dados ........: MySQL                                    --
-- Base de Dados(nome) ...: iscool                                   --
--                                                                   --
-- Data Ultima Alteracao ..: 31/03/2019                              --
--    + Gerar script completo                                        --
--    + 12 tabelas                                                   --
--    + cria e seleciona a base iscool                               --
-- ----------------------------------------------------------------- --
create database if not exists iscool;
use iscool;

CREATE TABLE Prova (
id_prova int(10) PRIMARY KEY,
nome_prova varchar(255),
desc_prova text,
margem_prova int(2),
fonte_prova int(2),
data_criacao_prova date,
data_aplicacao_prova date,
id_professor int(10)
);

CREATE TABLE Aluno (
id_aluno int(10) PRIMARY KEY,
nome_aluno varchar(255)
);

CREATE TABLE gaba_tem_questoes (
id_gabarito int(10),
id_questao int(10)
);

CREATE TABLE questao_tem_habilidade (
id_questao int(10),
id_habilidade int(10)
);

CREATE TABLE Habilidade (
id_habilidade int(10) PRIMARY KEY,
nome_habilidade text,
id_competencia int(10)
);

CREATE TABLE Competencia (
id_competencia int(10) PRIMARY KEY,
desc_competencia text
);

CREATE TABLE disciplinas_tem_compe (
id_competencia int(10),
id_disciplina int(10),
FOREIGN KEY(id_competencia) REFERENCES Competencia (id_competencia) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Disciplina (
id_disciplina int(10) PRIMARY KEY,
nome_disciplina varchar(255)
);

CREATE TABLE Alternativa (
id_alternativa int(10) PRIMARY KEY,
veracidade varchar(1),
desc_alternativa varchar(1000),
id_questao int(10)
);

CREATE TABLE Questao (
id_questao int(10) PRIMARY KEY,
img_questao blob,
texto_questao text,
desc_questao text,
letra_alternativa char(1),
marcada boolean,
id_prova int(10),
id_disciplina int(10),
id_professor int(10),
FOREIGN KEY(id_prova) REFERENCES Prova (id_prova) ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY(id_disciplina) REFERENCES Disciplina (id_disciplina) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Gabarito (
id_gabarito int(10) PRIMARY KEY,
img_gabarito blob,
id_aluno int(10),
id_prova int(10),
FOREIGN KEY(id_aluno) REFERENCES Aluno (id_aluno) ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY(id_prova) REFERENCES Prova (id_prova) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Professor (
id_professor int(10) PRIMARY KEY,
login_professor varchar(20),
senha_professor varchar(20),
nome_professor varchar(255),
email_professor varchar(255),
coordenador_professor boolean
);

ALTER TABLE Prova ADD FOREIGN KEY(id_professor) REFERENCES Professor (id_professor) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE gaba_tem_questoes ADD FOREIGN KEY(id_gabarito) REFERENCES Gabarito (id_gabarito) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE gaba_tem_questoes ADD FOREIGN KEY(id_questao) REFERENCES Questao (id_questao) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE questao_tem_habilidade ADD FOREIGN KEY(id_questao) REFERENCES Questao (id_questao) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE questao_tem_habilidade ADD FOREIGN KEY(id_habilidade) REFERENCES Habilidade (id_habilidade) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE Habilidade ADD FOREIGN KEY(id_competencia) REFERENCES Competencia (id_competencia) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE disciplinas_tem_compe ADD FOREIGN KEY(id_disciplina) REFERENCES Disciplina (id_disciplina) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE Alternativa ADD FOREIGN KEY(id_questao) REFERENCES Questao (id_questao) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE Questao ADD FOREIGN KEY(id_professor) REFERENCES Professor (id_professor) ON UPDATE CASCADE ON DELETE RESTRICT;
