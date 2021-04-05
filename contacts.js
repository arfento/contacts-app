const fs = require('fs');

const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log('Folder data berhasil dibuat');
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
    console.log('File Contacts telah berhasil dibuat');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (tulis) =>{
            resolve(tulis);
        });
    });

};


const simpanContact = (nama, noHP, alamat) => {
    const contact = {
        nama,
        noHP,
        alamat,
    };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8', (err, data) => {});

    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('TerimaKasih telah memasukkan data.');
    rl.close();
};


module.exports = {
    tulisPertanyaan : tulisPertanyaan,
    simpanContact : simpanContact,
};