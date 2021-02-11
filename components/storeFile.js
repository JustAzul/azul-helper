const {writeFile} = require('graceful-fs');
const {duration} = require('moment');
const {normalize, dirname:GetDirName} = require('path');

//a = append, w = write
function storeFile(filePath, content, flag = 'a') {
    filePath = normalize(`${process.cwd()}/${filePath}`);

    const o = {
        flag
    };

    return new Promise(resolve => {

        writeFile(filePath, content, o, async err => {
            if (!err) return resolve();

            if (err.code === "ENOENT") {
                const dirname = await GetDirName(filePath);
                await createPath(dirname);
                return resolve(storeFile(...arguments));
            }

            //Log.Debug(`Failed to create path '${filePath}', trying again in a sec => ${err}`);

            return setTimeout(() => {
                resolve(storeFile(...arguments));
            }, duration(2, 'seconds'))

        });
    })
}

module.exports = storeFile;