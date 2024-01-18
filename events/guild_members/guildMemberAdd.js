const { Collector } = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member, message) {
        const verificationCaptchaChannelId = '1195760610848288788' //id channel
        const roleMemberId = '1195761007411335330' //id role membre
        const codeCaptcha = stringGen(5);

        const verificationCaptchaChannel = member.guild.channels.cache.get(verificationCaptchaChannelId)

        function stringGen(codeCaptcha) {
            //Générer le captcha aléatoirement

            let charsGenerate = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let randomString = ''

            for (let i = 0; i < codeCaptcha; i++) {
                let randomNum = Math.floor(Math.random() * charsGenerate.length);
                randomString += charsGenerate.substring(randomNum, randomNum + 1);
            }

            return randomString;
        }

        //Envoyer le message de vérification dans le channel défini plus haut const verificationCaptchaChannel

        verificationCaptchaChannel.send(`Salut! Bienvenue sur le serveur! Pour accéder au reste du serveur, voici le code de vérification à rentrer : ${codeCaptcha}`)


        //Collecter le message de l'utilisateur et vérifier si le code est bon ou non (FAIL)

         collector.on('collect', m => {

            while (essais <= 3) {
                if (m.content === codeCaptcha) {
                    verificationCaptchaChannel.send(`Félicitations, tu as accès au reste du serveur! Lis bien les règles et amuse toi bien!`)
                    member.roles.add(roleMemberId);
                    break;
                }
    
                else {
                    essais++;
                    verificationCaptchaChannel.send(`Mauvais code, réessaye! Tu as encore ${3 - essais} essais.`)
                    if (essais === 3) {
                        member.kick();
                        verificationCaptchaChannel.send(`Trop de tentatives, tu as été kick...`)
                    }
                }
    
            }

        });

    }
}       