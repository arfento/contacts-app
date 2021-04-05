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




/* rl.question('Nama anada :  ', (nama) => {
    rl.question('Masukkan nomor Hp Anda : ', (noHP) => {
        rl.question('Alamat : ', (alamat) => {

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
        });
    });
}); */

///dalam bentuk promise

const pertanyaan1 = () => {
    return new Promise((resolve, reject) => {
        rl.question("Masukkan nama anda : ", (nama) => {
            resolve(nama);
        });
    });
};

const pertanyaan2 = () => {
    return new Promise((resolve, reject) => {
        rl.question("Masukkan No Hp Anda : ", (noHP) => {
            resolve(noHP);
        });
    });
}
const pertanyaan3 = () => {
    return new Promise((resolve, reject) => {
        rl.question("Masukkan Alamat Anda : ", (alamat) => {
            resolve(alamat);
        });
    });
}



const main = async () => {

    const nama = await pertanyaan1();
    const noHP = await pertanyaan2();
    const alamat = await pertanyaan3();
    

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

main();