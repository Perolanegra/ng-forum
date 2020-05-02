use ng_ba;

CREATE TABLE IF NOT EXISTS nivel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT NULL
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nivel INT NOT NULL DEFAULT 4,
    `password` VARCHAR(25) NOT NULL,
	`name` VARCHAR(50) DEFAULT '',
    username VARCHAR(25) NOT NULL UNIQUE,
	lastName VARCHAR(50) DEFAULT '',
	statusMsg VARCHAR(150) DEFAULT '',
	ddd VARCHAR(3) DEFAULT '',
	phone VARCHAR(20) DEFAULT '',
	email VARCHAR(70) NOT NULL,
	photoURL TEXT NOT NULL,
	birthDate VARCHAR(75) DEFAULT '',
	created_at TIMESTAMP DEFAULT current_timestamp,
    deleted_at VARCHAR(75) DEFAULT '',
    updated_at VARCHAR(75) DEFAULT '',
    FOREIGN KEY (id_nivel) REFERENCES `nivel` (`id`)
) ENGINE=INNODB;