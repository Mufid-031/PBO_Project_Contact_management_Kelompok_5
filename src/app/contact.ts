import fs from 'fs';
import readline from 'readline';
import validator from 'validator';
import chalk from 'chalk';
import { ContactInput, ContactOutput } from "../model/contact-model";

export class Contact {

    public static rl(): readline.Interface {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    };

    public static read(): ContactOutput[] {
        const file = fs.readFileSync("data/contacts.json", "utf-8");
        const contacts = JSON.parse(file);
        return contacts;
    };

    public static menu(): void {
        console.log('-------------------------------');
        console.log(chalk.greenBright('Contact App'));
        console.log(chalk.blueBright('1. Create Contact'));
        console.log(chalk.blueBright('2. Read Contact'));
        console.log(chalk.blueBright('3. Update Contact'));
        console.log(chalk.blueBright('4. Delete Contact'));
        console.log(chalk.blueBright('5. Exit'));
        console.log('-------------------------------');
    };

    public static create({ name, email, telephone }: ContactInput): ContactOutput | void {
        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data');
        };

        if (!fs.existsSync('./data/contacts.json')) {
            fs.writeFileSync('./data/contacts.json', '[]');
        };

        const contacts = Contact.read();

        const userCount = contacts.find((contact) => contact.name?.toLocaleLowerCase() === name.toLowerCase());

        if (userCount) {
            console.log(chalk.redBright('Contact already exists!'));
            return;
        };

        if (email) {
            if (!validator.isEmail(email)) {
                console.log(chalk.redBright('Invalid email!'));
                return;
            };
        };

        if (!validator.isMobilePhone(telephone)) {
            console.log(chalk.redBright('Invalid phone number!'));
            return;
        };

        contacts.push({ name, email, telephone });
        fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
        console.log(chalk.greenBright('Contact created successfully!'));
        return { name, email, telephone };
    };

    public static delete(name: string): ContactOutput | void {
        
        const contacts = Contact.read();

        const newContacts = contacts.filter((contact) => contact.name?.toLocaleLowerCase() !== name.toLowerCase());

        if (newContacts.length === contacts.length) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        };

        fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts));
        console.log(chalk.greenBright('Contact deleted successfully!'));
        return { name };
    };

    public static getContacts(): ContactOutput | void {

        const contacts = Contact.read();

        if (contacts.length === 0) {
            console.log(chalk.redBright('No contacts found!'));
            return;
        };

        console.log(chalk.greenBright('Daftar Contacts:'));
        return contacts.forEach((contact) => {
            console.log('');
            console.log(chalk.blueBright(`Name: ${contact.name}`));
            console.log(chalk.blueBright(`Email: ${contact.email}`));
            console.log(chalk.blueBright(`Telephone: ${contact.telephone}`));
            console.log('');
        });
    };

    public static detail(name: string): ContactOutput | void {

        const contacts = Contact.read();

        const contact = contacts.find((contact) => contact.name === name);

        if (!contact) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        };

        console.log('Detail Contact:');
        console.log(chalk.blueBright(`Name: ${contact.name}`));
        console.log(chalk.blueBright(`Email: ${contact.email}`));
        console.log(chalk.blueBright(`Telephone: ${contact.telephone}`));
        console.log('');
    };

    public static input(rl : readline.Interface, text: string): any {
        
        return new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                resolve(answer);
            })
        });

    };

    public static async update(rl : readline.Interface,name: string): Promise<ContactOutput | void> {

        const contacts = Contact.read();

        const contact = contacts.find((contact) => contact.name?.toLocaleLowerCase() === name.toLowerCase());

        if (!contact) {
            console.log(chalk.redBright('Contact not found!'));
            return;
        };


        console.log('Update Contact:');
        const newName = await Contact.input(rl, 'Masukkan Nama: ');
        const newEmail = await Contact.input(rl, 'Masukkan Email: ');
        const newTelephone = await Contact.input(rl, 'Masukkan Telephone: ');

        const data = {
            name: newName || contact.name,
            email: newEmail || contact.email,
            telephone: newTelephone || contact.telephone
        };

        contacts.splice(contacts.indexOf(contact), 1, data);

        fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
        console.log(chalk.greenBright('Contact updated successfully!'));
        rl.close();
        return data;

    };

};