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
INSERT INTO tags VALUES (NULL, 'BUG', current_timestamp(),'', '', 'crimson');
INSERT INTO tags VALUES (NULL, 'IMPLEMENTATION', current_timestamp(),'', '', '#22262e');
INSERT INTO tags VALUES (NULL, 'CLOSED', current_timestamp(),'', '', '#a6a6a6');
INSERT INTO tags VALUES (NULL, 'REOPEN', current_timestamp(),'', '', '#178ab4');
INSERT INTO tags VALUES (NULL, 'ERROR', current_timestamp(),'', '', '#ff4444');
INSERT INTO tags VALUES (NULL, 'RESOLVED', current_timestamp(),'', '', '#00C851');
INSERT INTO tags VALUES (NULL, 'QUESTION', current_timestamp(),'', '', 'yellow');
INSERT INTO tags VALUES (NULL, 'HOT', current_timestamp(),'', '', '#cc6633');
INSERT INTO tags VALUES (NULL, 'DEPRECATED', current_timestamp(),'', '', '#ffbb33');
######
*/

/*
## Execute para inserir dados na tabela roles
INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Administrador', 'Permissão para administrar o sistema');

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Noob', 'newbie');
*/