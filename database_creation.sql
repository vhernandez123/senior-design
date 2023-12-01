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
  `userID` INT NOT NULL AUTO_INCREMENT,
  `userFirstName` VARCHAR(500) NOT NULL,
  `userLastName` VARCHAR(500) NOT NULL,
  `userEmail` VARCHAR(500) NOT NULL,
  `userPassword` VARCHAR(500) NOT NULL,
  `vetinarian` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `userEmail_UNIQUE` (`userEmail` ASC) VISIBLE,
  UNIQUE INDEX `userId_UNIQUE` (`userID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vetinarian`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vetinarian` (
  `vetinarianID` INT NOT NULL AUTO_INCREMENT,
  `vetinarianFirstName` VARCHAR(100) NULL,
  `vetinarianLastName` VARCHAR(100) NULL,
  `vetinarianStreetAddress` VARCHAR(500) NULL,
  `vetinarianCity` VARCHAR(500) NULL,
  `vetinarianState` VARCHAR(500) NULL,
  `vetinarianZipCode` VARCHAR(100) NULL,
  PRIMARY KEY (`vetinarianID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pet` (
  `petID` INT NOT NULL AUTO_INCREMENT,
  `petName` VARCHAR(200) NOT NULL,
  `petBreed` VARCHAR(200) NULL,
  `petGender` VARCHAR(100) NULL,
  `petAge` VARCHAR(45) NULL,
  `petColor` VARCHAR(100) NULL,
  `petWeight` VARCHAR(45) NULL,
  `petMicrochipNum` VARCHAR(45) NULL,
  `User_userID` INT NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`petID`, `User_userID`),
  UNIQUE INDEX `petId_UNIQUE` (`petID` ASC) VISIBLE,
  INDEX `fk_Pet_User1_idx` (`User_userID` ASC) VISIBLE,
  INDEX `fk_Pet_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  CONSTRAINT `fk_Pet_User1`
    FOREIGN KEY (`User_userID`)
    REFERENCES `mydb`.`User` (`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Pet_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Logs` (
  `logsID` INT NOT NULL AUTO_INCREMENT,
  `logDate` VARCHAR(100) NOT NULL,
  `logEntry` VARCHAR(500) NOT NULL,
  `Pet_petID` INT NOT NULL,
  `Pet_User_userID` INT NOT NULL,
  PRIMARY KEY (`logsID`, `Pet_petID`, `Pet_User_userID`),
  UNIQUE INDEX `logsID_UNIQUE` (`logsID` ASC) VISIBLE,
  INDEX `fk_Logs_Pet1_idx` (`Pet_petID` ASC, `Pet_User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Logs_Pet1`
    FOREIGN KEY (`Pet_petID` , `Pet_User_userID`)
    REFERENCES `mydb`.`Pet` (`petID` , `User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Medication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Medication` (
  `medicationID` INT NOT NULL AUTO_INCREMENT,
  `medicationName` VARCHAR(200) NULL,
  `medicationDosage` VARCHAR(150) NULL,
  `medicationDuration` VARCHAR(150) NULL,
  `medicationInstructions` VARCHAR(500) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`medicationID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`, `Vetinarian_vetinarianID`),
  INDEX `fk_Medication_Logs1_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  INDEX `fk_Medication_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  CONSTRAINT `fk_Medication_Logs1`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Medication_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Illness`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Illness` (
  `illnessID` INT NOT NULL AUTO_INCREMENT,
  `illnessName` VARCHAR(150) NULL,
  `illnessInitialDate` VARCHAR(150) NULL,
  `illnessDateDiagnosis` VARCHAR(150) NULL,
  `illnessSymptoms` VARCHAR(500) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  `Vetinarian_vetinarianID` INT NOT NULL,
  PRIMARY KEY (`illnessID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`, `Vetinarian_vetinarianID`),
  INDEX `fk_Illness_Logs1_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  INDEX `fk_Illness_Vetinarian1_idx` (`Vetinarian_vetinarianID` ASC) VISIBLE,
  CONSTRAINT `fk_Illness_Logs1`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Illness_Vetinarian1`
    FOREIGN KEY (`Vetinarian_vetinarianID`)
    REFERENCES `mydb`.`Vetinarian` (`vetinarianID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Behavior`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Behavior` (
  `behaviorID` INT NOT NULL AUTO_INCREMENT,
  `behaviorActivity` VARCHAR(100) NULL,
  `behaviorAggression` VARCHAR(100) NULL,
  `behaviorChanges` VARCHAR(100) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  PRIMARY KEY (`behaviorID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`),
  INDEX `fk_Behavior_Logs2_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Behavior_Logs2`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Behavior`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Behavior` (
  `behaviorID` INT NOT NULL AUTO_INCREMENT,
  `behaviorActivity` VARCHAR(100) NULL,
  `behaviorAggression` VARCHAR(100) NULL,
  `behaviorChanges` VARCHAR(100) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  PRIMARY KEY (`behaviorID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`),
  INDEX `fk_Behavior_Logs2_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Behavior_Logs2`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Bathroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Bathroom` (
  `bathroomID` INT NOT NULL AUTO_INCREMENT,
  `bathroomNumber` VARCHAR(100) NULL,
  `bathroomPoop` VARCHAR(100) NULL,
  `bathroomUrine` VARCHAR(100) NULL,
  `bathroomVomit` VARCHAR(100) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  PRIMARY KEY (`bathroomID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`),
  INDEX `fk_Bathroom_Logs1_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Bathroom_Logs1`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Food` (
  `foodID` INT NOT NULL AUTO_INCREMENT,
  `foodType` VARCHAR(200) NULL,
  `foodAmount` VARCHAR(100) NULL,
  `foodUnit` VARCHAR(100) NULL,
  `foodWater` VARCHAR(100) NULL,
  `foodDanger` VARCHAR(100) NULL,
  `foodDangerDescription` VARCHAR(500) NULL,
  `Logs_logsID` INT NOT NULL,
  `Logs_Pet_petID` INT NOT NULL,
  `Logs_Pet_User_userID` INT NOT NULL,
  PRIMARY KEY (`foodID`, `Logs_logsID`, `Logs_Pet_petID`, `Logs_Pet_User_userID`),
  INDEX `fk_Food_Logs1_idx` (`Logs_logsID` ASC, `Logs_Pet_petID` ASC, `Logs_Pet_User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Food_Logs1`
    FOREIGN KEY (`Logs_logsID` , `Logs_Pet_petID` , `Logs_Pet_User_userID`)
    REFERENCES `mydb`.`Logs` (`logsID` , `Pet_petID` , `Pet_User_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
