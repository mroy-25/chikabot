"use strict";

//Module
const { 
    downloadContentFromMessage
 } = require("@adiwajshing/baileys-md");
const fs = require("fs");
const PhoneNumber = require('awesome-phonenumber')
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const xfar = require('xfarr-api');

//Library
const { color, bgcolor } = require("../lib/color");
const { ind } = require('../help/')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, convert, convertGif, convertSticker } = require("../lib/myfunc");
const setting = JSON.parse(fs.readFileSync('./config.json'));
let {
    ownerNumber,
    botName
} = setting

moment.tz.setDefault("Asia/Jakarta").locale("id");
     
module.exports = async(chika, msg, m) => {
    try {
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const fromMe = msg.key.fromMe
	const from = msg.key.remoteJid
	const type = Object.keys(msg.message)[0]
        const content = JSON.stringify(msg.message)
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : ''
        if (chika.multi){
		    var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/gi) : '#'
        } else {
            if (chika.nopref){
                prefix = ''
            } else {
                prefix = chika.prefa
            }
        }
	const args = chats.split(' ')
	const command = chats.toLowerCase().split(' ')[0] || ''
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const pushname = msg.pushName
        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = chika.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await chika.groupMetadata(from) : ''
	const groupName = isGroup ? groupMetadata.subject : ''
	const groupId = isGroup ? groupMetadata.id : ''
	const groupMembers = isGroup ? groupMetadata.participants : ''
	const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
	const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
	const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)

	const isUrl = (uri) => {
	    return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
	}
        const jsonformat = (json) => {
            return JSON.stringify(json, null, 2)
        }

        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

        (function(_0x579a38,_0x321515){const _0x3fe934=_0x4cee,_0x4e5312=_0x579a38();while(!![]){try{const _0x4d2635=parseInt(_0x3fe934(0x116))/0x1*(-parseInt(_0x3fe934(0x11a))/0x2)+-parseInt(_0x3fe934(0x113))/0x3*(parseInt(_0x3fe934(0x11c))/0x4)+-parseInt(_0x3fe934(0x112))/0x5+-parseInt(_0x3fe934(0x111))/0x6*(-parseInt(_0x3fe934(0x11e))/0x7)+parseInt(_0x3fe934(0x117))/0x8+parseInt(_0x3fe934(0x11b))/0x9*(-parseInt(_0x3fe934(0x11d))/0xa)+-parseInt(_0x3fe934(0x115))/0xb*(-parseInt(_0x3fe934(0x11f))/0xc);if(_0x4d2635===_0x321515)break;else _0x4e5312['push'](_0x4e5312['shift']());}catch(_0x42478d){_0x4e5312['push'](_0x4e5312['shift']());}}}(_0x462c,0x37847));function _0x4cee(_0x6f178f,_0x1e04ea){const _0x462c56=_0x462c();return _0x4cee=function(_0x4cee51,_0x4997b9){_0x4cee51=_0x4cee51-0x10f;let _0x2bea7c=_0x462c56[_0x4cee51];return _0x2bea7c;},_0x4cee(_0x6f178f,_0x1e04ea);}const downloadAndSaveMediaMessage=async(_0x5b0b27,_0x991ac6='undefined')=>{return new Promise(async(_0x14630f,_0x4772ef)=>{const _0x550282=_0x4cee;let _0x4630d9=_0x5b0b27+'Message',_0x294324;if(msg[_0x550282(0x10f)][_0x550282(0x110)]==null)_0x294324=await downloadContentFromMessage(msg[_0x550282(0x10f)][_0x4630d9],_0x5b0b27);else _0x294324=await downloadContentFromMessage(msg[_0x550282(0x10f)][_0x550282(0x110)][_0x550282(0x118)][_0x550282(0x121)][_0x4630d9],_0x5b0b27);let _0x3a2d08=Buffer[_0x550282(0x120)]([]);for await(const _0x4832d4 of _0x294324){_0x3a2d08=Buffer[_0x550282(0x119)]([_0x3a2d08,_0x4832d4]);}fs[_0x550282(0x114)](_0x991ac6,_0x3a2d08),_0x14630f(_0x991ac6);});};function _0x462c(){const _0x4c310a=['writeFileSync','95579HBylrG','1bffJLJ','1687112tSvLUE','contextInfo','concat','564762LygtbP','17604BINMtX','4gRNkKi','1660xBJrhG','141946LmptJe','732RyysSX','from','quotedMessage','message','extendedTextMessage','66hQHlHj','127440rrJAOq','312036dshzTU'];_0x462c=function(){return _0x4c310a;};return _0x462c();}


        const reply = (teks, men) => {
             return chika.sendMessage(from, { text: teks, mentions: men ? men : [] }, { quoted: msg })
        }
        const textImg = (teks, buffer = fs.readFileSync(setting.pathImg), mess, men) => {
             return chika.sendMessage(from, { text: teks, jpegThumbnail: buffer, mention: men ? men : [] }, { quoted: mess ? mess : msg })
        }
        const sendMess = (from, teks) => {
             return chika.sendMessage(from, { text: teks })
        }

        const sendContact = (jid, numbers, name, quoted, men) => {
            let number = numbers.replace(/[^0-9]/g, '')
            const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:' + name + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            return chika.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
        }

        const sendFileFromUrl = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return chika.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
                }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return chika.sendMessage(from, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: msg })
            }
            if(mime.split("/")[0] === "image"){
                return chika.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "video"){
                return chika.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            }
            if(mime.split("/")[0] === "audio"){
                return chika.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: msg })
            }
        }

        const sendButton = (type, from, text, buttons, men, quoted, options) => { 
            if (type == 'image') {
                chika.sendMessage(from, { caption: text, image: options ? options : fs.readFileSync(setting.pathImg), buttons: buttons, headerType: 'IMAGE', mentions: men }, {quoted: quoted})
            } else if (type == 'video') {
                if (options === undefined || options === null) return reply('illegal method, chat owner bot')
                chika.sendMessage(from, { caption: text, video: options, buttons: buttons, headerType: 'VIDEO', mentions: men }, {quoted: quoted})
            } else if (type == 'location') {
                chika.sendMessage(from, { caption: text, location: { jpegThumbnail: options ? options : fs.readFileSync(setting.pathImg) }, buttons: buttons, headerType: 'LOCATION', mentions: men })
            } else if (type == 'text') {
                chika.sendMessage(from, { text: text, buttons: buttons, headerType: 'TEXT', mentions: men }, {quoted: quoted})
            } else {
                reply('invalid type, please contact the owner bot')
            }
        }

        if (isCmd && !isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        if (isOwner){
            if (chats.startsWith("> ")){
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    textImg(`${evaled}`)
                } catch (err) {
                    textImg(`${err}`)
                }
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.slice(2), (err, stdout) => {
					if (err) return textImg(`${err}`)
					if (stdout) textImg(`${stdout}`)
				})
            }
        }

	switch (command) {
            //Sistem Command
            case prefix+'rule': case prefix+'rules':
                textImg(ind.rules(prefix))
            break
            case prefix+'tos': case prefix+'donate': case prefix+'donasi':
                textImg(ind.tos(ownerNumber[0].split('@')[0], prefix))
            break
            case prefix+'owner':
                for (let x of ownerNumber) {
                    sendContact(from, x.split('@s.whatsapp.net')[0], 'Owner of - ' + botNumber, msg)
                }
            break
            case prefix+'menu': case prefix+'help':{
                // I try buttonMessage in personal chats, not responding :(
                if (isGroup) {
                    let buttons = [
                        {buttonId: `${prefix}allmenu` buttonText: {displayText: '🔍 List Menu'}, type: 1},
                        {buttonId: `${prefix}rule`, buttonText: {displayText: '🎛️ Rules Bot' }, type: 1}
                    ]
                    sendButton('location', from, `Hai kak ${pushname} 👋, saya *${botName}*\n\nBot ini adalah Beta *Multi-Device* Whatsapp. Jika kamu menemukan semacam bug atau kesalahan mohon dimaklumi dulu ya 😖, Lapor Owner Jika Perlu atau Mendesak 🙏`, buttons)
               } else {
                   textImg(`Hai kak ${pushname} 👋, saya *${botName}*\n\nBot ini adalah Beta *Multi-Device* Whatsapp. \nJika kamu menemukan semacam bug atau kesalahan mohon dimaklumi dulu ya 😖, Lapor Owner Jika Perlu atau Mendesak 🙏\n\nKetik *${prefix}allmenu* untuk melihat list fitur bot`)
                }
            }
            break
            case prefix+'allmenu': {
                try {
                    var prof = await chika.profilePictureUrl(sender, 'image')
                } catch {
                    var prof = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                sendFileFromUrl(from, prof, ind.listMenu(time, salam, pushname, prefix), msg)
            }
            break
            // Owner
            case prefix+'join': case prefix+'joingc': {
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('chat.whatsapp.com')) return textImg(ind.wrongFormat(prefix))
                let query = q.split('https://chat.whatsapp.com/')[1]
                let data = await chika.groupAcceptInvite(query)
                await reply(jsonformat(data))
                }
            break
            case prefix+'setpp': case prefix+'setppbot':
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                if (isImage || isQuotedImage) {
                    let img = await downloadAndSaveMediaMessage('image','ppgroup.jpeg')
                    await chika.updateProfilePicture(botNumber, { url: img}).then(res => fs.unlinkSync(img))
                    await reply(ind.doneOwner())
                } else {
                    reply(ind.wrongFormat(prefix))
                }
            break
            //Group Sistem
            case prefix+'revoke':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                let link = await chika.groupRevokeInvite(from)
                await textImg(ind.ok() + `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
            break
            case prefix+'leave':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                reply('Sayonara~ 👋').then(async res => await chika.groupLeave(from))
            break
            case prefix+'group': case prefix+'grup':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (args.length === 1) return reply(ind.wrongFormat())
                if (args[1].toLowerCase() === 'open'){
                    await chika.groupSettingUpdate(from, 'not_announcement')
					reply(ind.ok())
                } else if (args[1].toLowerCase() === 'close'){
                    await chika.groupSettingUpdate(from, 'announcement')
                    reply(ind.ok())
                } else {
                    reply(ind.wrongFormat())
                }
            break
            //Weebs
            case prefix+'anime':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Anime(q).then(async data => {
                    let txt = `*-------「 ANIME-SEARCH 」-------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'character': case prefix+'karakter':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Character(q).then(async data => {
                    let txt = `*---「 CHARACTER-SEARCH 」---*\n\n`
                    for (let i of data) {
                        txt += `*📫 Character :* ${i.character}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'manga':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Manga('naruto').then(async data => {
                    let txt = `*------「 MANGA-SEARCH 」------*\n\n`
                    for (let i of data) {
                         txt += `*📫 Title :* ${i.judul}\n`
                         txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            //Misc
            case prefix+'film':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Film(q).then(async data => {
                    let txt = `*--------「 FILM-SEARCH 」--------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*🎞️ Type :* ${i.type}\n`
                        txt += `*📟 Quality :* ${i.quality}\n`
                        txt += `*📮Upload :* ${i.upload}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumb,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'pinterest': case prefix+'pin':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Pinterest(q).then(async data => {
                    await sendFileFromUrl(from,data.url,ind.ok(),msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'wattpad':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Wattpad(q).then(async data => {
                    let txt = `*----「 WATTPAD-SEARCH 」----*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*👀 Reads :* ${i.dibaca}\n`
                        txt += `*🗣️ Voting :* ${i.divote}\n`
                        txt += `*🗂️ Bab :* ${i.bab}\n`
                        txt += `*⏳Time :* ${i.waktu}\n`
                        txt += `*📚 Url :* ${i.url}\n`
                        txt += `*🏷️ Description :* ${i.description}\n -----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumb,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'drakor':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Drakor(q).then(async data => {
                    let txt = `*-----「 DRAKOR-SEARCH 」-----*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*📆 Years :* ${i.years}\n`
                        txt += `*🎥 Genre :* ${i.genre}\n`
                        txt += `*📚 Url :* ${i.url}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(from,data[0].thumbnail,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'webtonsearch': case prefix+'webtoon':
                if (!q) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Webtoons(q).then(async data => {
                    let txt = `*------「 WEBTOONS-SEARCH 」------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*👍🏻 Like :* ${i.like}\n`
                        txt += `*🤴🏻 Creator :* ${i.creator}\n`
                        txt += `*🎥 Genre :* ${i.genre}\n`
                        txt += `*📚 Url :* ${i.url}\n ----------------------------------------------------------\n`
                    }
                    await textImg(txt)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            //Convert and Media
            case prefix+'toimg': case prefix+'stickertoimg': case prefix+'stoimg': case prefix+'stikertoimg': 
				if (isQuotedSticker) {
			    	let media = await downloadAndSaveMediaMessage('sticker', 'sticker.webp')
			    	if (msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        await textImg(ind.wait())
                        await reply('Maaf, belum support gif')
					} else {
                        await textImg(ind.wait())
			    		let ran = getRandom('.png')
					    exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
						    fs.unlinkSync(media)
						    if (err) return textImg('Gagal :V')
						    await chika.sendMessage(from, { image: fs.readFileSync(ran), caption: ind.ok() }, { quoted: msg }).then(res => fs.unlinkSync(ran))
					    })
					}
                } else {
                    textImg(ind.wrongFormat(prefix))
                }
	        break
            //Downloader
            case prefix+'tiktok':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('tiktok.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Tiktok(args[1]).then(async data => {
                    let txt = `*----「 TIKTOK DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎞️ Type :* ${data.medias[0].extension}\n`
                    txt += `*📟 Quality :* ${data.medias[0].quality}\n`
                    txt += `*💾 Size :* ${data.medias[0].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    let prepare = await prepareMessage({ 'video': { url: data.medias[0].url} })
                    sendButtonVid(from, txt, `Informasi seputat bot ? Tekan button dibawah`, prepare.videoMessage, buttonsDefault)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'facebook': case prefix+'fb': case prefix+'fbdl': case prefix+'facebookdl':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('facebook.com') && !q.includes('fb.watch')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Facebook(args[1]).then(async data => {
                    let txt = `*----「 FACEBOOK DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎞️ Type :* ${data.medias[0].extension}\n`
                    txt += `*📟 Quality :* ${data.medias[0].quality}\n`
                    txt += `*💾 Size :* ${data.medias[0].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    sendFileFromUrl(from,data.medias[0].url,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'twtdl': case prefix+'twt': case prefix+'twitterdl': case prefix+'twitter':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('twitter.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Twitter(args[1]).then(async data => {
                    let txt = `*----「 TWITTER DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*📟 Quality :* ${data.medias[1].quality}\n`
                    txt += `*💾 Size :* ${data.medias[1].formattedSize}\n`
                    txt += `*📚 Url :* ${data.url}`
                    sendFileFromUrl(from,data.medias[1].url,txt,msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
           case prefix+'ig': case prefix+'igdl': case prefix+'instagram': case prefix+'instagramdl':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('instagram.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Instagram(args[1]).then(async data => {
                    let txt = `*----「 INSTAGRAM DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*🎥📸 Total File :* ${data.medias.length}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    await textImg(txt).then(async res => {
                        for (let i of data.medias) {
                            sendFileFromUrl(from, i.url, '', res)
                        }
                    })
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'ytdl': case prefix+'youtubedl': case prefix+'youtube':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('youtu.be') && !q.includes('youtube.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Youtube(args[1]).then(async (data) => {
                    const buttons = [
                        { quickReplyButton: { displayText: `🎥 Music`, id: `${prefix}ytmp3 ${args[1]}` } },
                        { quickReplyButton: { displayText: `🎶 Video`, id: `${prefix}ytmp4 ${args[1]}` } },
                    ]
                    let txt = `*----「 YOUTUBE DOWNLOADER 」----*\n\n`
                    txt += `*📫 Title :* ${data.title}\n`
                    txt += `*📟 Duration :* ${data.duration}\n`
                    txt += `*📚 Url :* ${data.url}`
                    let prepare = await prepareMessage({ 'location': { jpegThumbnail: await getBuffer(data.thumbnail) } })
                    sendButtonLoc(from, txt, `Silahkan pilih ekstensi yang anda inginkan`, prepare.locationMessage, buttons)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'mp4': case prefix+'ytmp4':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('youtu.be') && !q.includes('youtube.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Youtube(args[1]).then(async (data) => {
                    let txt = `*----「 YOUTUBE VIDEO 」----*\n\n`
                    txt += `*📟 Quality :* ${data.medias[1].quality}\n`
                    txt += `*🎞️ Type :* ${data.medias[1].extension}\n`
                    txt += `*💾 Size :* ${data.medias[1].formattedSize}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, msg)
                    let prepare = await prepareMessage({ 'video': { url: data.medias[1].url} })
                    sendButtonVid(from, ind.ok(), `Informasi seputat bot ? Tekan button dibawah`, prepare.videoMessage, buttonsDefault)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            case prefix+'mp3': case prefix+'ytmp3':
                if (!q) return textImg(ind.wrongFormat(prefix))
                if (!isUrl(q)) return textImg(ind.wrongFormat(prefix))
                if (!q.includes('youtu.be') && !q.includes('youtube.com')) return textImg(ind.wrongFormat(prefix))
                await textImg(ind.wait())
                xfar.Youtube(args[1]).then(async (data) => {
                    let txt = `*----「 YOUTUBE AUDIO 」----*\n\n`
                    txt += `*📟 Quality :* ${data.medias[7].quality}\n`
                    txt += `*🎞️ Type :* ${data.medias[7].extension}\n`
                    txt += `*💾 Size :* ${data.medias[7].formattedSize}\n`
                    txt += `*📚 Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, msg)
                    await sendFileFromUrl(from, data.medias[7].url, '', msg)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    textImg(ind.err())
                })
            break
            default:
            if (isCmd) {
                textImg(ind.cmdNotFound(command, prefix))
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
