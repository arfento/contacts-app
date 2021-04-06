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


const loadContact = () =>{
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8', (err, data) => {});
    const contacts = JSON.parse(fileBuffer);
    return contacts;

};

const simpanContact = (nama, noHP, alamat) => {
    const contact = {
        nama,
        noHP,
        alamat,
    };
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8', (err, data) => {});
    // const contacts = JSON.parse(fileBuffer);

    const contacts = loadContact();

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



const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Data Contacts Anda : '));
    contacts.forEach((contact, i ) => {
        console.log(`${i +1 }. ${contact.nama} - ${contact.noHP} - ${contact.alamat}`)
    });
};
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase() );
    if (!contact){
       console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
       return false;  
    };
    
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.alamat){
        console.log(contact.alamat);
    };

};


const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase() );
    if (contacts.length === newContact.length){
       console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
       return false;  
    };
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
    console.log(chalk.green.inverse.bold(`Data contact ${nama} berhasil dihapus!`))
};



module.exports = {
    // tulisPertanyaan : tulisPertanyaan,
    simpanContact : simpanContact,
    listContact : listContact,
    detailContact : detailContact,
    deleteContact : deleteContact,
};