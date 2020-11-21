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
INSERT INTO tags VALUES (NULL, 'bug', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'implementation', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'created', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'closed', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'reopen', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'error', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'resolved', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'question', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'hot', current_timestamp(),'', '');
INSERT INTO tags VALUES (NULL, 'deprecated', current_timestamp(),'', '');
######
*/



