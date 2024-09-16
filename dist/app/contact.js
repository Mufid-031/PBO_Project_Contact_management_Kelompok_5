"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const validator_1 = __importDefault(require("validator"));
const chalk_1 = __importDefault(require("chalk"));
class Contact {
    static rl() {
        return readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    ;
    static read() {
        const file = fs_1.default.readFileSync("data/contacts.json", "utf-8");
        const contacts = JSON.parse(file);
        return contacts;
    }
    ;
    static menu() {
        console.log('-------------------------------');
        console.log(chalk_1.default.greenBright('Contact App'));
        console.log(chalk_1.default.blueBright('1. Create Contact'));
        console.log(chalk_1.default.blueBright('2. Read Contact'));
        console.log(chalk_1.default.blueBright('3. Update Contact'));
        console.log(chalk_1.default.blueBright('4. Delete Contact'));
        console.log(chalk_1.default.blueBright('5. Exit'));
        console.log('-------------------------------');
    }
    ;
    static create({ name, email, telephone }) {
        if (!fs_1.default.existsSync('./data')) {
            fs_1.default.mkdirSync('./data');
        }
        ;
        if (!fs_1.default.existsSync('./data/contacts.json')) {
            fs_1.default.writeFileSync('./data/contacts.json', '[]');
        }
        ;
        const contacts = Contact.read();
        const userCount = contacts.find((contact) => { var _a; return ((_a = contact.name) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === name.toLowerCase(); });
        if (userCount) {
            console.log(chalk_1.default.redBright('Contact already exists!'));
            return;
        }
        ;
        if (email) {
            if (!validator_1.default.isEmail(email)) {
                console.log(chalk_1.default.redBright('Invalid email!'));
                return;
            }
            ;
        }
        ;
        if (!validator_1.default.isMobilePhone(telephone)) {
            console.log(chalk_1.default.redBright('Invalid phone number!'));
            return;
        }
        ;
        contacts.push({ name, email, telephone });
        fs_1.default.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
        console.log(chalk_1.default.greenBright('Contact created successfully!'));
        return { name, email, telephone };
    }
    ;
    static delete(name) {
        const contacts = Contact.read();
        const newContacts = contacts.filter((contact) => { var _a; return ((_a = contact.name) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) !== name.toLowerCase(); });
        if (newContacts.length === contacts.length) {
            console.log(chalk_1.default.redBright('Contact not found!'));
            return;
        }
        ;
        fs_1.default.writeFileSync('./data/contacts.json', JSON.stringify(newContacts));
        console.log(chalk_1.default.greenBright('Contact deleted successfully!'));
        return { name };
    }
    ;
    static getContacts() {
        const contacts = Contact.read();
        if (contacts.length === 0) {
            console.log(chalk_1.default.redBright('No contacts found!'));
            return;
        }
        ;
        console.log(chalk_1.default.greenBright('Daftar Contacts:'));
        return contacts.forEach((contact) => {
            console.log('');
            console.log(chalk_1.default.blueBright(`Name: ${contact.name}`));
            console.log(chalk_1.default.blueBright(`Email: ${contact.email}`));
            console.log(chalk_1.default.blueBright(`Telephone: ${contact.telephone}`));
            console.log('');
        });
    }
    ;
    static detail(name) {
        const contacts = Contact.read();
        const contact = contacts.find((contact) => contact.name === name);
        if (!contact) {
            console.log(chalk_1.default.redBright('Contact not found!'));
            return;
        }
        ;
        console.log('Detail Contact:');
        console.log(chalk_1.default.blueBright(`Name: ${contact.name}`));
        console.log(chalk_1.default.blueBright(`Email: ${contact.email}`));
        console.log(chalk_1.default.blueBright(`Telephone: ${contact.telephone}`));
        console.log('');
    }
    ;
    static input(rl, text) {
        return new Promise((resolve, reject) => {
            rl.question(text, (answer) => {
                resolve(answer);
            });
        });
    }
    ;
    static update(rl, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = Contact.read();
            const contact = contacts.find((contact) => { var _a; return ((_a = contact.name) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === name.toLowerCase(); });
            if (!contact) {
                console.log(chalk_1.default.redBright('Contact not found!'));
                return;
            }
            ;
            console.log('Update Contact:');
            const newName = yield Contact.input(rl, 'Masukkan Nama: ');
            const newEmail = yield Contact.input(rl, 'Masukkan Email: ');
            const newTelephone = yield Contact.input(rl, 'Masukkan Telephone: ');
            const data = {
                name: newName || contact.name,
                email: newEmail || contact.email,
                telephone: newTelephone || contact.telephone
            };
            contacts.splice(contacts.indexOf(contact), 1, data);
            fs_1.default.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
            console.log(chalk_1.default.greenBright('Contact updated successfully!'));
            rl.close();
            return data;
        });
    }
    ;
}
exports.Contact = Contact;
;
