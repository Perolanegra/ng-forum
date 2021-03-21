/**
## Execute para Inserir dados na tabela nivel

INSERT INTO nivel(`id`, `description`)
VALUES (null, 'ADM');

INSERT INTO nivel(`id`, `description`)
VALUES (null, 'Mago');

INSERT INTO nivel(`id`, `description`)
VALUES (null, 'Moderador');

INSERT INTO nivel(`id`, `description`)
VALUES (null, 'Noob');
*/

/**
## Execute para inserir dados na tabela user

INSERT INTO user(`id`, `id_nivel`, `name`, `ddd`, `phone`, `created_at`,
 `deleted_at`, `updated_at`, `username`, `password`, `lastName`, `statusMsg` , `email`, `photoURL`, `birthDate`)
VALUES (null, 1, 'Igor', '071', '993337275', current_timestamp, '', '', 'perolanegra', 'ge7OBMv703BbeQZNnB52OA==', 'Alves', '', 'igoralves@devbaiano.com.br',
'', '');
**/
######
/**
## Execute para inserir dados na tabela tags
INSERT INTO tags VALUES (NULL, 'BUG', 'crimson', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'IMPLEMENTATION', '#22262e', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'CLOSED', '#a6a6a6', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'REOPEN', '#178ab4', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'ERROR', '#ff4444', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'RESOLVED', '#00C851', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'QUESTION', 'yellow', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'HOT', '#cc6633', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'DEPRECATED', '#ffbb33', current_timestamp(),'', '');
######
*/

/*
## Execute para inserir dados na tabela roles
INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Admin', 'Permissão para administrar o sistema');

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Noob', "'newbie' kkkkk");

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Moderador', "Staff moderação. Gestão da escalabilidade e organização de dados.
Tais como poder de fechamentos, edições, e bloqueios de visualização de Issues que violem 
a política do fórum, com base no bem estar de todos.");

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Membro', "Membro Comum");

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Membro Antigo', "Issues e posts são vistos com mais frequência.");

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Criador', 'Posts mais vistos. Capacidade de criar roles e permissões,
dentre outras features. Tags únicas. Maior taxa de recebimento de ngCoins.');

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Ancião', "É brother do Moderador, um Anciã(o) inclusive é um pré-mod. É aquele 
velho(a) postador assíduo, que hoje mais gerencia junto com o seu respectivo mod.");

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'A Putinha do ADM', "KKKKKKKK FAZ TUDO QUE O ADM MANDAR, MAS PODE TE BANIR KKKKKKKKK");
*/

/*
## Execute para inserir dados na tabela titles
INSERT INTO titles(`id`,`title`, `description`)
VALUES (null, 'MVP', 'Most Valuable Professional');

INSERT INTO titles(`id`,`title`, `description`)
VALUES (null, 'GDE', 'Google Developer Expert');
*/