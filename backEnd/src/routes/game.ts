import express from "express";
import client from "../database/client";
import { body, validationResult } from "express-validator";
const router = express.Router();

//return the amount of coins to be one according to the conditions else if nothing is fulfiled returns -1
function reawardCalculator(data: String[]) {
  if (data[0] == data[1]) {
    if (data[1] == data[2]) {
      switch (data[2]) {
        case "🍒":
          return 50;
        case "🍎":
          return 20;
        case "🍌":
          return 15;
        case "🍋":
          return 3;

        default:
          break;
      }
    } else {
      switch (data[1]) {
        case "🍒":
          return 40;
        case "🍎":
          return 10;
        case "🍌":
          return 5;

        default:
          break;
      }
    }
  }
  return -1;
}

//sends the result of the slot machine and coins won
router.get(
  "/getSlotMachineResult",
  (req: express.Request, res: express.Response) => {
    const reel1 = ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"]; //represents for first reel on the slot machine
    const reel2 = ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"]; //represents for second reel on the slot machine
    const reel3 = ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"]; //represents for third reel on the slot machine
    var temp: String[]; //a temporary variable to store the result of the slot machine
    var reward: Number = 0; // stores the number of coins the user won
    temp = [];
    //get a random value from the first reel and put it in the temporary table
    temp.push(reel1[Math.floor(Math.random() * (reel1.length - 1))]);
    //get a random value from the second reel and put it in the temporary table
    temp.push(reel2[Math.floor(Math.random() * (reel2.length - 1))]);
    //get a random value from the third reel and put it in the temporary table
    temp.push(reel3[Math.floor(Math.random() * (reel3.length - 1))]);
    reward = reawardCalculator(temp); //pass the temporary table to calculate the number of coins won
    //once everything calculated send the temporary table representing the random valus got from th reels
    //and the amount of coins won
    res.status(200).send({ result: temp, rewardCoins: reward });
  }
);

router.get(
  "/getSlotMachineResultV2",
  (req: express.Request, res: express.Response) => {
    const reel1 = ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"];
    const reel2 = ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"];
    const reel3 = ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"];
    var counter: number = 0;
    var temp: String[];
    var result: String[];
    var intervalId = setInterval(() => {
      if (counter < reel1.length - 1) {
        temp = [];
        temp.push(reel1[counter]);
        temp.push(reel2[counter]);
        temp.push(reel3[counter]);
        result = temp;
        temp = [];
        counter++;
      } else {
        counter = 0;
        temp = [];
      }
    }, 100);
    setTimeout(() => {
      res
        .status(200)
        .send({ result: result, rewardCoins: reawardCalculator(result) });
      clearInterval(intervalId);
    }, Math.floor(Math.random() * 5000));
  }
);

module.exports = router;
