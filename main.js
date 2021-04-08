class Main {
    constructor() {
        this.readConfig();

        this.module = require('discord.js');
        this.methods = require('./components/methods.js');

        global.bot = new this.module.Client();

        this.uploadCommands();
        this.uploadEvents();
        this.loginBot();
    }

    loginBot() {
        bot.login( this.config.token ).catch(e => console.log(e));
    }

    readConfig() {
        this.config = JSON.parse( fs.readFileSync( './config.json', 'utf8' ) );
    }

    uploadEvents () {
        let events = require('./components/events.js');
        for (let el in events) {
            bot.on(el, events[el]);
        }
    }

    uploadCommands () {
        this.commands = {};

        let arrayOfCommands = [];

        fs.readdirSync( path.resolve( __dirname, './commands' ) ).forEach( src => {
            arrayOfCommands = arrayOfCommands.concat(require( './commands/' + src ));
        });

        arrayOfCommands.forEach( el => {
            for ( let com in el ) {
                this.commands[com] = el[com];
            }
        });
    }
}

global.fs = require('fs');
global.path = require('path');
global.discord = new Main();