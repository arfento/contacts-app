///mengambil argumen dari command line
/* 
const command = process.argv[2];
if (command === "add"){

} else if (command === "remove"){

}else if (command === "list"){

}
 */


/* const contacts = require('./contacts');
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

main(); */



///argumen menggunakan yargs

const yargs = require("yargs");
const contacts = require("./contacts");

/* yargs.command(
    'add', 
    'menambahkan contact baru',
     () => {}, 
     (argv) => {
        console.log(argv.nama);
    }
); */


//parameter dalam bentuk object
yargs.command({
    command : 'add',
    describe : 'menambahkan contact baru',
    builder : {
        nama : {
            describe : 'Nama Lengkap',
            demandOption : true,
            type: 'string',
        },
        noHP : {
            describe : 'No HP',
            demandOption : true,
            type : 'string'
        },
        alamat : {
            describe: 'Alamat',
            demandOption : false,
            type : 'string',
        },
    },
    handler : function(argv){
        /* const contact = {
            nama : argv.nama,
            noHP : argv.noHP,
            alamat : argv.alamat,
        };
        console.log(contact); */
        contacts.simpanContact(argv.nama, argv.noHP, argv.alamat);
    }

});

yargs.parse();