
const { default: axios } = require("axios");
const path = require('path');
var fs = require('fs')
var ini = require('ini')
const contentPages = path.join(__dirname, '../../responses/fortnitegame.json');

function getVersionInfo(req) {
    const userAgent = req.headers["user-agent"];
    const version = userAgent.split('-')[1];
    const versionGlobal = version.split('.')[0];
    return { version, versionGlobal };
}

module.exports = {
    fortniteGame: async function(req, res){
        const content = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game').catch(() => {})).data;
        const { version, versionGlobal } = getVersionInfo(req);
        var fortnitegame = JSON.parse(fs.readFileSync(contentPages, 'utf8'));
        fortnitegame = Object.assign({}, fortnitegame, { eventscreens: content.eventscreens }, { battlepasspurchase: content.battlepasspurchase }, { crewscreendata: content.crewscreendata }, { emergencynotice: {"news":{"platform_messages":[],"_type":"Battle Royale News","messages":[{"hidden":false,"_type":"CommonUI Simple Message Base","subgame":"br","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.gg/carbon-897532507048796210","title":"Neonite V2","spotlight":false}]},"jcr:isCheckedOut":true,"_title":"emergencynotice","_noIndex":false,"alwaysShow":true,"jcr:baseVersion":"a7ca237317f1e761d4ee60-7c40-45a8-aa3e-bb0a2ffa9bb5","_activeDate":"2018-08-06T19:00:26.217Z","lastModified":"2020-10-30T04:50:59.198Z","_locale":"en-US"}}, {emergencynoticev2: {"jcr:isCheckedOut":true,"_title":"emergencynoticev2","_noIndex":false,"emergencynotices":{"_type":"Emergency Notices","emergencynotices":[{"hidden":false,"_type":"CommonUI Emergency Notice Base","title":"Neonite V2","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.gg/carbon-897532507048796210"}]},"_activeDate":"2018-08-06T19:00:26.217Z","lastModified":"2021-03-17T15:07:27.924Z","_locale":"en-US"}, battleroyalenewsv2:{"news":{"motds":[{"entryType":"Website","image":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","tileImage":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","videoMute":false,"hidden":false,"tabTitleOverride":"Neonite V2","_type":"CommonUI Simple Message MOTD","title":"Neonite","body":"Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.gg/carbon-897532507048796210","videoLoop":false,"videoStreamingEnabled":false,"sortingPriority":0,"id":"NeoniteNewsBR","videoAutoplay":false,"videoFullscreen":false,"spotlight":false,"websiteURL":"https://discord.gg/DJ6VUmD","websiteButtonText":"Join our discord"}]},"jcr:isCheckedOut":true,"_title":"battleroyalenewsv2","header":"","style":"None","_noIndex":false,"alwaysShow":false,"jcr:baseVersion":"a7ca237317f1e704b1a186-6846-4eaa-a542-c2c8ca7e7f29","_activeDate":"2020-01-21T14:00:00.000Z","lastModified":"2021-02-10T23:57:48.837Z","_locale":"en-US"}, shopCarousel:{"jcr:isCheckedOut":true,"itemsList":{"_type":"ShopCarouselItemList","items":[{"tileImage":"https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png","fullTitle":"Neonite","hidden":false,"_type":"ShopCarouselItem","landingPriority":100,"action":"ShowOfferDetails","offerId":null,"title":"Neonite"}]},"_title":"shop-carousel","_noIndex":false,"jcr:baseVersion":"a7ca237317f1e765be23f9-d0fd-4067-ae00-ef29af2376cc","_activeDate":"2020-09-25T12:00:00.000Z","lastModified":"2020-12-05T23:52:44.269Z","_locale":"en-US"}});
        const backgrounds = fortnitegame.dynamicbackgrounds.backgrounds.backgrounds;
        var config = ini.parse(fs.readFileSync(path.join(__dirname, '../../config.ini'), 'utf-8'));
        if(config.custom_background == true){
            backgrounds[0].stage = "defaultnotris"
            backgrounds[0].backgroundimage = config.image_url
            return res.json(fortnitegame);
        }
        if(config.custom_background == false)
        {
            switch (versionGlobal) {
                case "10":
                    backgrounds[0].stage = "seasonx";
                break;
                case "11":
                    if (version === "11.31" || version === "11.40") {
                        backgrounds[0].stage = "Winter19";
                    } 
                    else {
                        backgrounds[0].stage = "season11";
                    }
                break;
                case "12":
                    backgrounds[0].stage = "season12";
                break;
                case "13":
                    backgrounds[0].stage = "season13";
                break;
                case "14":
                    backgrounds[0].stage = "season14";
                break;
                case "15":
                    backgrounds[0].stage = "season15";
                    if(version === "15.10"){
                        backgrounds[0].stage = "season15xmas"
                        backgrounds[1].stage = "XmasStore2020"
                    }
                break;
                case "16":
                    backgrounds[0].stage = "season16";
                break;
                case "17":
                    backgrounds[0].stage = "season17";
                break;
                case "18":
                    backgrounds[0].stage = "season18";
                break;
                case "19":
                    if (version === "19.01") /*if it doesnt work i didnt get chance to test it cause the build has not been uploaded - unrealhybrid*/ {
                        backgrounds[0].stage = "winter2021";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
                    } 
                    else {
                        backgrounds[0].stage = "season19";
                    }
                break;
                case "20":
                    if (version === "20.40") {
                        backgrounds[0].stage = "season20";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg";
                    } 
                    else {
                        backgrounds[0].stage = "season20";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s20-landscapev4-2048x1024-2494a103ae6c.png"
                    }
                break;
                case "21":
                    if (version === "21.30") {
                        backgrounds[0].stage = "season2130";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/nss-lobbybackground-2048x1024-f74a14565061.jpg";
                    } 
                    else {
                        backgrounds[0].stage = "season2100";
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s21-lobby-background-2048x1024-2e7112b25dc3.jpg";
                    }
                break;
                case "22":
                    backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
                break;
                case "23":
                    if(version === "23.10")
                    {   
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png"
                    }
                    else{
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png"
                    }
                break;
                case "24":
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://static.wikia.nocookie.net/fortnite/images/e/e7/Chapter_4_Season_2_-_Lobby_Background_-_Fortnite.png"
                break;
                case "25":
                    backgrounds[0].stage = "defaultnotris"
                    backgrounds[0].backgroundimage = "https://static.wikia.nocookie.net/fortnite/images/c/ca/Chapter_4_Season_3_-_Lobby_Background_-_Fortnite.png"
                break;
                case "26":
                    if(version === "26.30")
                    {  
                        backgrounds[0].stage = "season2630"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s26-lobby-timemachine-final-2560x1440-a3ce0018e3fa.jpg"
                    }
                    else{
                        backgrounds[0].stage = "season2600"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/0814-ch4s4-lobby-2048x1024-2048x1024-e3c2cf8d342d.png"
                    }
                break;
                case "27":
                    if(version === "27.11"){
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/durianlobby2-4096x2048-242a51b6a8ee.jpg"
                    }
                    else{
                        backgrounds[0].stage = "season2700"
                    }
                break;
                case "28":
                    if(version === "28.20"){
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s28-tmnt-lobby-4096x2048-e6c06a310c05.jpg"
                    }
                    else{
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/ch5s1-lobbybg-3640x2048-0974e0c3333c.jpg"
                        backgrounds[0].stage = "defaultnotris"
                    }
                break;
                case "29":
                    if(version === "29.20"){
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/iceberg-lobby-3840x2160-217bb6ea8af9.jpg"                        
                    }
                    if(version === "29.40"){
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/mkart-2940-sw-fnbr-lobby-3840x2160-4f1f1486a54a.jpg"                        
                    }                    
                    else{
                        backgrounds[0].stage = "defaultnotris"
                        backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/br-lobby-ch5s2-4096x2304-a0879ccdaafc.jpg"
                    }
                break;
                default:
                    backgrounds[0].backgroundimage = content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage;
                    backgrounds[0].stage = content.dynamicbackgrounds.backgrounds.backgrounds[0].stage;
            }
            return res.json(fortnitegame);
        }
    },

    sparks: async function(req, res){
        const data = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/spark-tracks').catch(() => {})).data;
        res.json(data);
    },

    eventScreen: async function(req, res){
        const data = (await axios.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/eventscreens').catch(() => {})).data;
        res.json(data);
    },

    contentHash: function(req, res){
        res.json({
            "sessionId": req.body.sessionId,
            "sessionStartTimestamp": req.body.sessionStartTimestamp,
            "surfaces": [
              {
                "surfaceId": "br-motd",
                "contentMeta": [
                  "{\"c93adbc7a8a9f94a916de62aa443e2d6\":[\"93eff180-1465-496e-9be4-c02ef810ad82\"]}"
                ],
                "events": [
                  {
                    "contentHash": "c93adbc7a8a9f94a916de62aa443e2d6",
                    "type": "impression",
                    "count": 1,
                    "timestamp": "2023-12-03T10:17:41.387Z",
                    "lastTimestamp": "2023-12-03T10:17:41.387Z"
                  }
                ]
              }
            ]
        })
    },

    motd: function(req, res){
        res.json({
            "contentType": "collection",
            "contentId": "fortnite-br-br-motd-collection",
            "tcId": "8784961a-44e7-4fd5-82a6-8ef11e8c211d",
            "contentMeta": "{\"c93adbc7a8a9f94a916de62aa443e2d6\":[\"93eff180-1465-496e-9be4-c02ef810ad82\"]}",
            "contentItems": [
              {
                "contentType": "content-item",
                "contentId": "93eff180-1465-496e-9be4-c02ef810ad82",
                "tcId": "5085a6fa-108c-4f0c-abdd-3259c6406890",
                "contentFields": {
                  "Buttons": [
                    {
                      "Action": {
                        "_type": "MotdDiscoveryAction",
                        "category": "set_br_playlists",
                        "islandCode": "set_br_playlists",
                        "shouldOpen": true
                      },
                      "Style": "0",
                      "Text": "Play Now",
                      "_type": "Button"
                    }
                  ],
                  "FullScreenBackground": {
                    "Image": [
                      {
                        "width": 1920,
                        "height": 1080,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      },
                      {
                        "width": 960,
                        "height": 540,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      }
                    ],
                    "_type": "FullScreenBackground"
                  },
                  "FullScreenBody": "Made by kemo (@xkem0x)\nMaintained by Hybrid (@unrealhybrid).\nDiscord: https://discord.gg/carbon",
                  "FullScreenTitle": "Neonite V2",
                  "TeaserBackground": {
                    "Image": [
                      {
                        "width": 1024,
                        "height": 512,
                        "url": "https://raw.githubusercontent.com/NeoniteDev/NeoniteV2/main/public/Neonite1024.png"
                      }
                    ],
                    "_type": "TeaserBackground"
                  },
                  "TeaserTitle": " Neonite V2",
                  "VerticalTextLayout": false
                },
                "contentSchemaName": "DynamicMotd",
                "contentHash": "c93adbc7a8a9f94a916de62aa443e2d6"
              }
            ]
          })
    }
}