const cards = require("cards");
const sql = require("mssql");
const Discord = require("discord.js");
exports.run = (client, message, args) => {
    var deck = new cards.Deck();
    for (var i = 0; i < 8; i++) {
        ['club', 'diamond', 'heart', 'spade'].forEach(function (suit) {
            ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'].forEach(function (value) {
                deck.add(new cards.Card(suit, value));
            });
        });
    }
    deck.shuffleAll();
    console.log(deck);
    var hitCollector;
    var playerHand = [];
    var dealerHand = [];
    var bet;
    message.channel.send("Welcome to Blackjack.\nIm assuming You know how to play...\nHow much do you want to bet?\nRespond with a whole number");
    const collector1 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 20000 });
    collector1.on('collect', collectedMessage => {
        bet = parseInt(collectedMessage.content);
        if (bet > 500) {
            message.channel.send("Sorry that is too high.");
        } else {
            console.log("betting");
            asyncBet();
        }
    });

    const asyncBet = async () => {
        try {
            if (client.hasOwnProperty("sqlConnection")) {
                await client.sqlConnection.close();
                await sql.close();
            }
            client.sqlConnection = await sql.connect("mssql://bankowner:Wecollectca$h@bankmanagerbot.database.windows.net/casino?encrypt=true");
            client.sqlConnection.on("error", (err) => {
                console.log(err);
            });
            var result = await client.sqlConnection.request().query(`SELECT * FROM Chips WHERE UserID LIKE '${message.author.id}'`);
            result = result.recordset;
            console.log(result);
            if (result[0] == undefined || result[0].Chips < bet) {
                message.channel.send("You dont have enough poker chips.\nGet some at the cashier channel!");
                await client.sqlConnection.close();
                await sql.close();
            } else {
                console.log("Dealing");
                await client.sqlConnection.close();
                await sql.close();
                collector1.stop();
                deal();
            }
        } catch (err) {
            console.log(err);
        }
    }

    function deal() {
        playerHand.push(deck.draw());
        dealerHand.push(deck.draw());
        playerHand.push(deck.draw());
        dealerHand.push(deck.draw());
        console.log("delt");
        var total = calculateTotal(playerHand);
        if (total == "Black Jack!") {
            message.channel.send("You got Black Jack!");
            payout(1.5);
            return;
        }
        message.channel.send("You have: ");
        displayHand(playerHand);
        message.channel.send("The dealer shows a " + dealerHand[0].unicodeString());
        hitStand();
    }
    function displayHand(hand) {
        console.log("Displaying hand");
        for (var i = 0; i < hand.length; i++) {
            message.channel.send(hand[i].unicodeString());
        }
    }
    function hitStand() {
        console.log("Decision time");
        message.channel.send("Hit, Stand, or Double");
        hitCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 20000 });
        hitCollector.on("collect", decisionFunction);
    }
    function decisionFunction(decision, collector) {
        console.log("recieving decision");
        decision = decision.content.toLowerCase();
        if (decision == "hit") {
            console.log("hitting");
            var total = hit(playerHand);
            if (total == "Bust") {
                console.log("player bust");
                message.channel.send("Bust...");
                collector.stop();
                dealerMachine(0);
            } else {
                displayHand(playerHand);
                collector.stop();
                hitStand();
            }
        } else if (decision == "stand") {
            console.log("standing");
            collector.stop();
            dealerMachine(calculateTotal(playerHand));
        } else if (decision == "double") {
            console.log("doubling up");
            bet *= 2;
            var total = hit(playerHand);
            if (total == "Bust") {
                message.channel.send("Bust...");
                collector.stop();
                dealerMachine(0);
            } else {
                displayHand(playerHand);
                collector.stop();
                dealerMachine(total);
            }
        }
    }
    function hit(hand) {
        hand.push(deck.draw());
        return calculateTotal(hand);
    }
    function calculateTotal(hand) {
        var sum = 0;
        var aLocations = [];
        for (var i = 0; i < hand.length; i++) {
            if (["K", "Q", "J", "10"].includes(hand[i].value.toString())) {
                sum += 10;
            } else if (hand[i].value == "A") {
                aLocations.push(i);
            } else {
                sum += parseInt(hand[i].value);
            }
        }
        for (var j = 0; j < aLocations.length; j++) {
            if (sum > 10) {
                sum++;
            } else {
                sum += 11;
            }
        }
        console.log("Sum: " + sum);
        if (sum > 21) {
            return "Bust";
        } else if (sum == 21 && hand.length == 2) {
            return "Black Jack!";
        } else {
            return sum;
        }
    }
    function dealerMachine(playerTotal) {
        console.log("Dealer Going");
        var dealerTotal = calculateTotal(dealerHand);
        if (dealerTotal == "Bust") {
            dealerTotal = 0;
        }
        if (dealerTotal == "Black Jack!") {
            payout(-1.5);
        } else if (dealerTotal > 16 || dealerTotal == 0) {
            if (dealerTotal == playerTotal) {
                message.channel.send("Draw, Try again!\nDealers Hand:");
                displayHand(dealerHand);
                payout(0);
            } else if (dealerTotal > playerTotal) {
                message.channel.send("Dealer Wins, Better luck next time!\nDealers Hand:");
                displayHand(dealerHand);
                payout(-1);
            } else {
                message.channel.send("You Win!\nDealers Hand:");
                displayHand(dealerHand);
                payout(1);
            }
        } else {
            hit(dealerHand);
            dealerMachine(playerTotal);
        }
    }
    const payout = async (multiplier) => {
        try {
            if (client.hasOwnProperty("sqlConnection")) {
                await client.sqlConnection.close();
                await sql.close();
            }
            client.sqlConnection = await sql.connect("mssql://bankowner:Wecollectca$h@bankmanagerbot.database.windows.net/casino?encrypt=true");
            client.sqlConnection.on("error", (err) => {
                console.log(err);
            });
            var result = await client.sqlConnection.request().query(`SELECT * FROM Chips WHERE UserID LIKE '${message.author.id}'`);
            result = result.recordset[0].Chips;
            await client.sqlConnection.request().query(`UPDATE Chips SET Chips = ${Math.round(result + bet * multiplier)}`);
            await client.sqlConnection.close();
            await sql.close();
            message.channel.send("Your new balance is " + Math.round(result + bet * multiplier) + " Chips");
        } catch (err) {
            console.log(err);
        }
    }
};