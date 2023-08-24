CREATE TABLE `domaines` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `risques` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `domaine_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesures` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `risque_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `risques` ADD CONSTRAINT `risques_domaine_id_fkey` FOREIGN KEY (`domaine_id`) REFERENCES `domaines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mesures` ADD CONSTRAINT `mesures_risque_id_fkey` FOREIGN KEY (`risque_id`) REFERENCES `risques`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
**************************************************************************************************************************
INSERT INTO
    `arruSystem`.`domaine` (`titre`, `description`)
VALUES
    (
        'dom 1',
        'johndoe lkjfdlsqk imo qjflkdjfiorej ij duifdn il iozo j'
    );

UPDATE
    domaine
SET
    titre = 'domaine1111'


INSERT INTO `arruSystem`.`risque` (`titre`, `description`, `id_domaine`)
VALUES (
    'risque 1',
    'johndoe lkjfdlsqk imo qjflkdjfiorej ij duifdn il iozo j',
    1  -- Replace this with the appropriate `id_domaine` value that exists in the `domaine` table.
);


-- insert 4 employee

INSERT INTO `arruSystem`.`domaines` (`titre`, `description`)
VALUES
('dom1','EMP97Samantha Mackenzie'),
('dom2','EMP91Layla Benn'),
('dom3','EMP99Luis Alberto'),
('dom4','EMP70Rishaan');

INSERT INTO `arruSystem`.`risques` (`titre`, `description`,`domaine_id`)
VALUES
('risq1','EMP97Samantha Mackenzie',1),
('risq2','EMP91Layla Benn',1),
('risq3','EMP99Luis Alberto',2),
('risq4','EMP70Rishaan',2);

INSERT INTO `arruSystem`.`mesures` (`titre`, `description`,`risque_id`)
VALUES
('mesure1','EMP97Samantha Mackenzie',3),
('mesure2','EMP91Layla Benn',3),
('mesure3','EMP99Luis Alberto',3),
('mesure4','EMP70Rishaan',1);



INSERT INTO `arruSystem`.`gouvernorat` (`nom`)
VALUES
    ('Ariana'),
    ('Beja'),
    ('Ben Arous'),
    ('Bizerte'),
    ('Gabes'),
    ('Gafsa'),
    ('Jendouba'),
    ('Kairouan'),
    ('Kasserine'),
    ('Kebili'),
    ('Kef'),
    ('Mahdia'),
    ('Manouba'),
    ('Medenine'),
    ('Monastir'),
    ('Nabeul'),
    ('Sfax'),
    ('Sidi Bouzid'),
    ('Siliana'),
    ('Sousse'),
    ('Tataouine'),
    ('Tozeur'),
    ('Tunis'),
    ('Zaghouan');


  
INSERT INTO `arruSystem`.`commune` (`nom`,`gouvernorat_id`)
VALUES
('Ariana','1'),
('Ettadhamen','1'),
('Kalâat el-Andalous','1'),
('La Soukra','1'),
('Mnihla','1'),
('Raoued','1'),
('Sidi Thabet','1');


{
    "nom":"salim", "email":"s@gmail.com", "password":"236589"
}