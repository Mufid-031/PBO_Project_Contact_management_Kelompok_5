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
const chalk_1 = __importDefault(require("chalk"));
const contact_1 = require("./contact");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const contactApp = new contact_1.ContactApp();
    while (true) {
        contact_1.ContactApp.menu();
        const rl = contact_1.ContactApp.rl();
        const answer = yield contact_1.ContactApp.input(rl, 'Masukkan pilihan Anda: ');
        switch (answer) {
            case '1':
                const name = yield contact_1.ContactApp.input(rl, 'Masukkan Nama: ');
                const email = yield contact_1.ContactApp.input(rl, 'Masukkan Email: ');
                const telephone = yield contact_1.ContactApp.input(rl, 'Masukkan Telephone: ');
                const contact = contactApp.create({ name, email, telephone });
                if (contact) {
                    console.log(chalk_1.default.greenBright('Contact Created:'), contact);
                }
                break;
            case '2':
                const contacts = contactApp.getContacts();
                if (contacts) {
                    console.log(contacts);
                }
                break;
            case '3':
                const nameToUpdate = yield contact_1.ContactApp.input(rl, 'Masukkan Nama: ');
                const updatedContact = yield contact_1.ContactApp.update(rl, nameToUpdate);
                if (updatedContact) {
                    console.log(chalk_1.default.greenBright('Updated Contact:'), updatedContact);
                }
                break;
            case '4':
                const nameToDelete = yield contact_1.ContactApp.input(rl, 'Masukkan Nama: ');
                const deletedContact = contactApp.delete(nameToDelete);
                if (deletedContact) {
                    console.log(chalk_1.default.greenBright('Deleted Contact:'), deletedContact);
                }
                break;
            case '5':
                const nameToDetail = yield contact_1.ContactApp.input(rl, 'Masukkan Nama: ');
                const detailContact = contactApp.detail(nameToDetail);
                if (detailContact) {
                    console.log(detailContact);
                }
                break;
            case '6':
                console.log(chalk_1.default.greenBright('Exiting the application...'));
                rl.close();
                break;
            default:
                console.log(chalk_1.default.redBright('Invalid input!'));
                break;
        }
        rl.close();
        break;
    }
});
main();
