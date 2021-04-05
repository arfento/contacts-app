const contacts = require('./contacts');
//atau menggunakan 

// const {tulisPertanyaan, simpanContact} = require('./contacts');
const main = async () => {

    const nama = await contacts.tulisPertanyaan('Masukkan nama anda :');
    const noHP = await contacts.tulisPertanyaan('masukkan noHp anda :');
    const alamat = await contacts.tulisPertanyaan('masukkan alamat anda :');
    //   const nama = await tulisPertanyaan('Masukkan nama anda :');
    // const noHP = await tulisPertanyaan('masukkan noHp anda :');
    // const alamat = await tulisPertanyaan('masukkan alamat anda :');

    contacts.simpanContact(nama, noHP, alamat);


};

main();