import fs from 'fs';
import readline from 'readline';
import validator from 'validator';
import chalk from 'chalk';
import { ContactInput, ContactOutput } from '../model/contact-model';

class ContactModel {

    public readContacts(): ContactOutput[] {
        if (!fs.existsSync('./data/contacts.json')) {
            fs.writeFileSync('./data/contacts.json', '[]');
        }
        const file = fs.readFileSync('./data/contacts.json', 'utf-8');
        return JSON.parse(file);
    }

    public writeContacts(contacts: ContactOutput[]): void {
        fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    }

}

export class ContactApp extends ContactModel {

    public static rl(): readline.Interface {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    public static menu(): void {
        console.log('-------------------------------');
        console.log(chalk.greenBright('Contact App'));
        console.log(chalk.blueBright('1. Create Contact'));
        console.log(chalk.blueBright('2. Read Contact'));
        console.log(chalk.blueBright('3. Update Contact'));
        console.log(chalk.blueBright('4. Delete Contact'));
        console.log(chalk.blueBright('5. Contact Detail'));
        console.log(chalk.blueBright('6. Exit'));
        console.log('-------------------------------');
    }


    public create({ name, email, telephone }: ContactInput): ContactOutput | void {
        const contacts = this.readContacts();

        const userCount = contacts.find((contact) => contact.name?.toLocaleLowerCase() === name.toLowerCase());

        if (userCount) {
            console.log(chalk.redBright('Contact already exists!'));
            return;
        }

        if (email && !validator.isEmail(email)) {
            console.log(chalk.redBright('Invalid email!'));
            return;
        }

        if (!validator.isMobilePhone(telephone)) {
            console.log(chalk.redBright('Invalid phone number!'));
            return;
        }

        const newContact = { name, email, telephone };
        contacts.push(newContact);
        this.writeContacts(contacts);
        console.log(chalk.greenBright('Contact created successfully!'));
        return newContact;
    }

    public delete(name: string): ContactOutput | void {
        const contacts = this.readContacts();

        const newContacts = contacts.filter((contact) => contact.name?.toLocaleLowerCase() !== name.toLowerCase());

        if (newContacts.length === contacts.length) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        }

        this.writeContacts(newContacts);
        console.log(chalk.greenBright('Contact deleted successfully!'));
        return { name };
    }

    public getContacts(): ContactOutput[] | void {
        const contacts = this.readContacts();

        if (contacts.length === 0) {
            console.log(chalk.redBright('No contacts found!'));
            return;
        }

        console.log(chalk.greenBright('Daftar Contacts:'));
        contacts.forEach((contact) => {
            console.log('');
            console.log(chalk.blueBright(`Name: ${contact.name}`));
            console.log(chalk.blueBright(`Email: ${contact.email}`));
            console.log(chalk.blueBright(`Telephone: ${contact.telephone}`));
            console.log('');
        });

        return contacts;
    }

    public detail(name: string): ContactOutput | void {
        const contacts = this.readContacts();

        const contact = contacts.find((contact) => contact.name?.toLocaleLowerCase() === name.toLowerCase());

        if (!contact) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        }

        console.log('Detail Contact:');
        console.log(chalk.blueBright(`Name: ${contact.name}`));
        console.log(chalk.blueBright(`Email: ${contact.email}`));
        console.log(chalk.blueBright(`Telephone: ${contact.telephone}`));
        console.log('');
    }

    public static async update(rl: readline.Interface, name: string): Promise<ContactOutput | void> {
        const contacts = ContactApp.prototype.readContacts();
        const contact = contacts.find((contact) => contact.name?.toLocaleLowerCase() === name.toLowerCase());

        if (!contact) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        }

        console.log('Update Contact:');
        const newName = await ContactApp.input(rl, 'Masukkan Nama: ');
        const newEmail = await ContactApp.input(rl, 'Masukkan Email: ');
        const newTelephone = await ContactApp.input(rl, 'Masukkan Telephone: ');

        const updatedContact = {
            name: newName || contact.name,
            email: newEmail || contact.email,
            telephone: newTelephone || contact.telephone,
        };

        contacts.splice(contacts.indexOf(contact), 1, updatedContact);
        ContactApp.prototype.writeContacts(contacts);
        console.log(chalk.greenBright('Contact updated successfully!'));
        rl.close();
        return updatedContact;
    }

    public static input(rl: readline.Interface, text: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(text, (answer) => {
                resolve(answer);
            });
        });
    }
}
