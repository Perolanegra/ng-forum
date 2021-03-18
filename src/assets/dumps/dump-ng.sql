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
VALUES (null, 'Administrador', 'Permissão para administrar o sistema');

INSERT INTO roles(`id`,`role`, `description`)
VALUES (null, 'Noob', 'newbie');
*/