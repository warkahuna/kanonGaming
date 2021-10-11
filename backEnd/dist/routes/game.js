"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//return the amount of coins to be one according to the conditions else if nothing is fulfiled returns -1
function reawardCalculator(data) {
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
        }
        else {
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
router.get("/getSlotMachineResult", function (req, res) {
    var reel1 = ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"]; //represents for first reel on the slot machine
    var reel2 = ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"]; //represents for second reel on the slot machine
    var reel3 = ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"]; //represents for third reel on the slot machine
    var temp; //a temporary variable to store the result of the slot machine
    var reward = 0; // stores the number of coins the user won
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
});
router.get("/getSlotMachineResultV2", function (req, res) {
    var reel1 = ["🍒", "🍋", "🍎", "🍋", "🍌", "🍌", "🍋", "🍋"];
    var reel2 = ["🍋", "🍎", "🍋", "🍋", "🍒", "🍎", "🍌", "🍋"];
    var reel3 = ["🍋", "🍎", "🍋", "🍎", "🍒", "🍋", "🍌", "🍋"];
    var counter = 0;
    var temp;
    var result;
    var intervalId = setInterval(function () {
        if (counter < reel1.length - 1) {
            temp = [];
            temp.push(reel1[counter]);
            temp.push(reel2[counter]);
            temp.push(reel3[counter]);
            result = temp;
            temp = [];
            counter++;
        }
        else {
            counter = 0;
            temp = [];
        }
    }, 100);
    setTimeout(function () {
        res
            .status(200)
            .send({ result: result, rewardCoins: reawardCalculator(result) });
        clearInterval(intervalId);
    }, Math.floor(Math.random() * 5000));
});
module.exports = router;
