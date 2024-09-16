import chalk from "chalk";
import { Contact } from "./contact";


const main = async () => {

    while (true) {

        Contact.menu();

        const rl = Contact.rl();

        rl.question('Masukkan pilihan Anda: ', async (answer) => {

            switch (answer) {

                case '1':
                    const name = await Contact.input(rl, 'Masukkan Nama: ');
                    const email = await Contact.input(rl, 'Masukkan Email: ');
                    const telephone = await Contact.input(rl, 'Masukkan Telephone: ');
                    const contact = Contact.create({
                        name,
                        email,
                        telephone
                    });
                    console.log(contact);
                    break;
                case '2':
                    const contacts = Contact.getContacts();
                    if (contacts !== undefined) {
                        console.log(contacts);
                    };
                    break;
                case '3':
                    const updatedContact = await Contact.update(rl, await Contact.input(rl, 'Masukkan Nama: '));
                    if (updatedContact !== undefined) {
                        console.log(updatedContact);
                    };
                    break;
                case '4':
                    const deletedContact = Contact.delete(await Contact.input(rl, 'Masukkan Nama: '));
                    console.log(deletedContact);
                    break;
                case '5':
                    break;
                default:
                    console.log(chalk.redBright('Invalid input!'));
                    break;
            };

            rl.close();
        });

        break;

    };

};
main();