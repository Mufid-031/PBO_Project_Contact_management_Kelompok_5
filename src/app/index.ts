import chalk from "chalk";
import { ContactApp } from "./contact";

const main = async () => {

    const contactApp = new ContactApp();

    while (true) {

        ContactApp.menu();
        const rl = ContactApp.rl();

        const answer = await ContactApp.input(rl, 'Masukkan pilihan Anda: ');

        switch (answer) {

            case '1':
                const name = await ContactApp.input(rl, 'Masukkan Nama: ');
                const email = await ContactApp.input(rl, 'Masukkan Email: ');
                const telephone = await ContactApp.input(rl, 'Masukkan Telephone: ');
                
                const contact = contactApp.create({ name, email, telephone });
                if (contact) {
                    console.log(chalk.greenBright('Contact Created:'), contact);
                }
                break;

            case '2':
                const contacts = contactApp.getContacts();
                if (contacts) {
                    console.log(contacts);
                }
                break;

            case '3':
                const nameToUpdate = await ContactApp.input(rl, 'Masukkan Nama: ');
                
                const updatedContact = await ContactApp.update(rl, nameToUpdate);
                if (updatedContact) {
                    console.log(chalk.greenBright('Updated Contact:'), updatedContact);
                }
                break;

            case '4':
                const nameToDelete = await ContactApp.input(rl, 'Masukkan Nama: ');
                
                const deletedContact = contactApp.delete(nameToDelete);
                if (deletedContact) {
                    console.log(chalk.greenBright('Deleted Contact:'), deletedContact);
                }
                break;

            case '5':
                console.log(chalk.greenBright('Exiting the application...'));
                rl.close();
                break;

            default:
                console.log(chalk.redBright('Invalid input!'));
                break;
        }

        rl.close();
        break;
    }

};

main();
