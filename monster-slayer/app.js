function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = {
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            logs: [],
            winner: null
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        }
    },

    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: "0%"};
            }
            return {width: this.monsterHealth + "%"};
        },

        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {width: "0%"};
            }
            return {width: this.playerHealth + "%"};
        },
        isSpecialAttackAvailable() {
            return this.currentRound % 3 !== 0;
        }
    },

    methods: {
        attackMonster() {
            let damage = getRandomValue(5, 12);
            this.monsterHealth -= damage;
            this.logs.push("Player hits Monster for " + damage);
            this.attackPlayer();
            this.currentRound++;
        },

        attackPlayer() {
            let playerDamage = getRandomValue(8, 15);
            this.playerHealth -= playerDamage;
            this.logs.push("Monster hits Player for " + playerDamage);
        },

        specialAttack() {
            let damage = getRandomValue(10, 25);
            this.monsterHealth -= damage;
            this.logs.push("Player hits Monster hard for " + damage);
            this.attackPlayer();
            this.currentRound++;
        },

        healPlayer() {
            let heal = getRandomValue(8, 20);
            if (this.playerHealth + heal > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += heal;
            }
            this.logs.push("Player heals for " + heal);
            this.attackPlayer();
            this.currentRound++;
        },

        giveUp() {
            this.playerHealth = 0;
            this.logs.push("Player gives up !!");
            this.winner = "monster";
        },

        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.logs = [];
            this.winner = null;
        }
    }
}


Vue
    .createApp(app)
    .mount("#game")