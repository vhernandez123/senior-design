-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userFirstName` VARCHAR(45) NOT NULL,
  `userLastName` VARCHAR(45) NOT NULL,
  `userEmail` VARCHAR(45) NOT NULL,
  `userPassword` VARCHAR(45) NOT NULL,
  `vetinarian` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pet` (
  `petId` INT NOT NULL AUTO_INCREMENT,
  `Owner_ownerId` INT NOT NULL,
  `petName` VARCHAR(100) NOT NULL,
  `petBreed` VARCHAR(100) NULL,
  `petAge` VARCHAR(45) NULL,
  `petColor` VARCHAR(100) NULL,
  `petWeight` VARCHAR(45) NULL,
  `petMicrochipNum` VARCHAR(45) NULL,
  `petFood` VARCHAR(100) NULL,
  PRIMARY KEY (`petId`),
  INDEX `fk_Pet_Owner_idx` (`Owner_ownerId` ASC) VISIBLE,
  CONSTRAINT `fk_Pet_Owner`
    FOREIGN KEY (`Owner_ownerId`)
    REFERENCES `mydb`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Medication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Medication` (
  `medicationId` INT NOT NULL AUTO_INCREMENT,
  `medicationName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`medicationId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vetinarian`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vetinarian` (
  `vetinarianID` INT NOT NULL AUTO_INCREMENT,
  `vetinarianName` VARCHAR(45) NOT NULL,
  `vetinarianAddress` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vetinarianID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pet_has_Medication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pet_has_Medication` (
  `Pet_petId` INT NOT NULL,
  `Medication_medicationId` INT NOT NULL,
  `durationInDays` INT NOT NULL,
  `dosage` INT NOT NULL,
  `instructions` VARCHAR(500) NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`Pet_petId`, `Medication_medicationId`),
  INDEX `fk_Pet_has_Medication_Medication1_idx` (`Medication_medicationId` ASC) VISIBLE,
  INDEX `fk_Pet_has_Medication_Pet1_idx` (`Pet_petId` ASC) VISIBLE,
  INDEX `fk_Pet_has_Medication_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  CONSTRAINT `fk_Pet_has_Medication_Pet1`
    FOREIGN KEY (`Pet_petId`)
    REFERENCES `mydb`.`Pet` (`petId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pet_has_Medication_Medication1`
    FOREIGN KEY (`Medication_medicationId`)
    REFERENCES `mydb`.`Medication` (`medicationId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pet_has_Medication_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Illness`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Illness` (
  `illnessId` INT NOT NULL AUTO_INCREMENT,
  `illnessName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`illnessId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pet_has_Illness`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pet_has_Illness` (
  `Pet_petId` INT NOT NULL,
  `Illness_illnessId` INT NOT NULL,
  `dateOfDiagnosis` VARCHAR(45) NOT NULL,
  `symptoms` VARCHAR(500) NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`Pet_petId`, `Illness_illnessId`),
  INDEX `fk_Pet_has_Illness_Illness1_idx` (`Illness_illnessId` ASC) VISIBLE,
  INDEX `fk_Pet_has_Illness_Pet1_idx` (`Pet_petId` ASC) VISIBLE,
  INDEX `fk_Pet_has_Illness_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  CONSTRAINT `fk_Pet_has_Illness_Pet1`
    FOREIGN KEY (`Pet_petId`)
    REFERENCES `mydb`.`Pet` (`petId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pet_has_Illness_Illness1`
    FOREIGN KEY (`Illness_illnessId`)
    REFERENCES `mydb`.`Illness` (`illnessId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pet_has_Illness_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Owner_has_Vetinarian`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Owner_has_Vetinarian` (
  `Owner_ownerId` INT NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`Owner_ownerId`, `Vetinarian_vetinarianID`),
  INDEX `fk_Owner_has_Vetinarian_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  INDEX `fk_Owner_has_Vetinarian_Owner1_idx` (`Owner_ownerId` ASC) VISIBLE,
  CONSTRAINT `fk_Owner_has_Vetinarian_Owner1`
    FOREIGN KEY (`Owner_ownerId`)
    REFERENCES `mydb`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Owner_has_Vetinarian_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pet_has_Vetinarian`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pet_has_Vetinarian` (
  `Pet_petId` INT NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`Pet_petId`, `Vetinarian_vetinarianID`),
  INDEX `fk_Pet_has_Vetinarian_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  INDEX `fk_Pet_has_Vetinarian_Pet1_idx` (`Pet_petId` ASC) VISIBLE,
  CONSTRAINT `fk_Pet_has_Vetinarian_Pet1`
    FOREIGN KEY (`Pet_petId`)
    REFERENCES `mydb`.`Pet` (`petId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pet_has_Vetinarian_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Bathroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Bathroom` (
  `bathroomId` INT NOT NULL AUTO_INCREMENT,
  `bathroomType` VARCHAR(45) NULL,
  PRIMARY KEY (`bathroomId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Food` (
  `foodId` INT NOT NULL AUTO_INCREMENT,
  `foodType` VARCHAR(45) NULL,
  PRIMARY KEY (`foodId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Behavior`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Behavior` (
  `behaviorId` INT NOT NULL,
  `behaviorType` VARCHAR(45) NULL,
  PRIMARY KEY (`behaviorId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Logs` (
  `logsId` INT NOT NULL AUTO_INCREMENT,
  `Pet_petId` INT NOT NULL,
  `logDate` VARCHAR(45) NOT NULL,
  `logEntry` VARCHAR(500) NULL,
  `Food_foodId` INT NOT NULL,
  `logFoodAmount` VARCHAR(45) NULL,
  `logFoodUnit` VARCHAR(45) NULL,
  `logWater` VARCHAR(45) NULL,
  `logDangerConsume` VARCHAR(45) NULL,
  `logDangerDescription` VARCHAR(500) NULL,
  `logBathroomNumber` VARCHAR(45) NULL,
  `Bathroom_bathroomId` INT NOT NULL,
  `logVomit` VARCHAR(45) NULL,
  `Behavior_behaviorId` INT NOT NULL,
  `Pet_has_Illness_Pet_petId` INT NOT NULL,
  `Pet_has_Illness_Illness_illnessId` INT NOT NULL,
  PRIMARY KEY (`logsId`),
  INDEX `fk_Logs_Pet1_idx` (`Pet_petId` ASC) VISIBLE,
  INDEX `fk_Logs_Bathroom1_idx` (`Bathroom_bathroomId` ASC) VISIBLE,
  INDEX `fk_Logs_Food1_idx` (`Food_foodId` ASC) VISIBLE,
  INDEX `fk_Logs_Behavior1_idx` (`Behavior_behaviorId` ASC) VISIBLE,
  INDEX `fk_Logs_Pet_has_Illness1_idx` (`Pet_has_Illness_Pet_petId` ASC, `Pet_has_Illness_Illness_illnessId` ASC) VISIBLE,
  CONSTRAINT `fk_Logs_Pet1`
    FOREIGN KEY (`Pet_petId`)
    REFERENCES `mydb`.`Pet` (`petId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Logs_Bathroom1`
    FOREIGN KEY (`Bathroom_bathroomId`)
    REFERENCES `mydb`.`Bathroom` (`bathroomId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Logs_Food1`
    FOREIGN KEY (`Food_foodId`)
    REFERENCES `mydb`.`Food` (`foodId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Logs_Behavior1`
    FOREIGN KEY (`Behavior_behaviorId`)
    REFERENCES `mydb`.`Behavior` (`behaviorId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Logs_Pet_has_Illness1`
    FOREIGN KEY (`Pet_has_Illness_Pet_petId` , `Pet_has_Illness_Illness_illnessId`)
    REFERENCES `mydb`.`Pet_has_Illness` (`Pet_petId` , `Illness_illnessId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Behavior`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Behavior` (
  `behaviorId` INT NOT NULL,
  `behaviorType` VARCHAR(45) NULL,
  PRIMARY KEY (`behaviorId`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
