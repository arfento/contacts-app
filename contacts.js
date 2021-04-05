const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//tidak digunakan lagi setalah menggunakan yargs
/* const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); */

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
//tulis pertnyaan tidak terpakai
/* const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (tulis) =>{
            resolve(tulis);
        });
    });

}; */


const simpanContact = (nama, noHP, alamat) => {
    const contact = {
        nama,
        noHP,
        alamat,
    };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8', (err, data) => {});

    const contacts = JSON.parse(fileBuffer);


    //cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama );
    if(duplikat){
        console.log(chalk.red.inverse.bold("contact sudah terdaftar!!, Gunakan nama lain"));
        return false;
    }

    // cek email valid tidaknya 
    /* if(email){
        if (!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold("Email tidak valid!"));
            return false;
        }
    } */

    if (!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
        return false;
    }


    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('TerimaKasih telah memasukkan data.'));
    // rl.close();
};


module.exports = {
    // tulisPertanyaan : tulisPertanyaan,
    simpanContact : simpanContact,
};