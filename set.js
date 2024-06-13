const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BMSkV1ZTRUTGI4UHMweUl4WlJPR2RreG9EeHU4azlobW9EajErdWVrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDRodzBqRzczM29pR0VVa0lVdnNSakVrN1ZCTnZLUm1FN29QdlNrU253ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrS29GUkU2am5PWk15U1NBUzdGRjZJdzk4WjQwbWZDcVVLNHJMQUJmTVdZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMN3IwM1BzZGduNk5OOUdodWJuTENaMDlveTZZVjZBTDk5U2tDUkljRUhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklIVUc5ZVE4UERZcWJBaG1yRjBKVlgxOE03Y25qUStZMWplWDQycWdYRkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZrWmNFQzhaYksyQS8wZCtBWVhSZXRBTWZDVWZicWxUT1BXakR3ejZVemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lmaXdmV1ZmQlo1MEk0Q01udkw5MkV4N3g5MS96T0E4ZlhScUZuakhGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWJybW5pT1h3Mk5sbzhzU3cwdVUzaUM0MG8rQXFCYXJxcjBOZmw5SWR6MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlTQS9Lc2ZxTmtYUFR2NE00SWVGZDc2Nm9xa1V2RXRRM2NXKzZlWFJCTU9UYlhXdTZXZzlEWmgyUkJRL0RTd0RNL1pSMHRKSGJWY3lYVlp5UXFNM2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6IjVIOE1EQTFSVjhyQzB5TE8rbmNaaDJwWnJGekgzOFlZZUVrR0xTM0lRUk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZjLUdEQzk2UlF1QUVlWE51dDdXNlEiLCJwaG9uZUlkIjoiN2I0ZGYxOTItYjdhMS00ZmRjLTk4MzAtNTA0NGM2NzM4N2ZjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdhYmdxTCtSTTlvcktoaUk1RDZ5MUV4UmYzZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrZE9jS0d5SFlYYURJdEV4bDJIYTFKYy8wRDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWlM5ODE1TjUiLCJtZSI6eyJpZCI6IjIyNTY1NjUxNDIwOjM4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlvMv82HU8y/zYfMt8y/zYdkzL/Nh37Mv82HQcy/zYdhzL/Nh3LMv82Hb8y/zYfMuMy/zYduzYfMv10gzL/NhyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTktyK3J3R0VQYUVyTE1HR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaGFuYUh4Mk9vNW9rZVVHVFB2Yk9BQzN4emdUT3NhRzNkeHV3ZTE2T253az0iLCJhY2NvdW50U2lnbmF0dXJlIjoicGpPeTczVm5hV05uVTE0WTNWMTcrU0doeGJwS3pkdnVqQ2dqTDZ0QlF4amo2VXRJeG05RUtCbFN2elpIL01OYVFEakgyT1BzakRBbE5sL3hJTmtUQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IlJ6UGFkdDQzZEJ5anU0eHcrWmcwVXlpeWlheEhaMFd4TGxzV3RrcUdReDVSVlVFTDVtNjAzbUpSekFvQVJHcGZIaEc1ejV2KzBPQzJtUGx6MUNLaml3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1NjU2NTE0MjA6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWVdwMmg4ZGpxT2FKSGxCa3o3MnpnQXQ4YzRFenJHaHQzY2JzSHRlanA4SiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODI4OTAyN30=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "SD~Aaron",
    NUMERO_OWNER : process.env.NUMERO_OWNER ||"2250565651420",              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'AARON_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
