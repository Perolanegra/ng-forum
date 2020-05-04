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


*/


INSERT INTO user(`id`, `id_nivel`, `name`, `ddd`, `phone`, `created_at`,
 `deleted_at`, `updated_at`, `username`, `password`, `lastName`, `statusMsg` , `email`, `photoURL`, `birthDate`, `hasForgotPass`)
VALUES (null, 1, 'Igor', '071', '993337275', current_timestamp, '', '', 'perolanegra', 'ge7OBMv703BbeQZNnB52OA==', 'Alves', '', 'igoralves@devbaiano.com.br',
'', '', '0');