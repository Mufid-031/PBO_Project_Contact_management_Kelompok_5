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
    while (true) {
        contact_1.Contact.menu();
        const rl = contact_1.Contact.rl();
        rl.question('Masukkan pilihan Anda: ', (answer) => __awaiter(void 0, void 0, void 0, function* () {
            switch (answer) {
                case '1':
                    const name = yield contact_1.Contact.input(rl, 'Masukkan Nama: ');
                    const email = yield contact_1.Contact.input(rl, 'Masukkan Email: ');
                    const telephone = yield contact_1.Contact.input(rl, 'Masukkan Telephone: ');
                    const contact = contact_1.Contact.create({
                        name,
                        email,
                        telephone
                    });
                    console.log(contact);
                    break;
                case '2':
                    const contacts = contact_1.Contact.getContacts();
                    if (contacts !== undefined) {
                        console.log(contacts);
                    }
                    ;
                    break;
                case '3':
                    const updatedContact = yield contact_1.Contact.update(rl, yield contact_1.Contact.input(rl, 'Masukkan Nama: '));
                    if (updatedContact !== undefined) {
                        console.log(updatedContact);
                    }
                    ;
                    break;
                case '4':
                    const deletedContact = contact_1.Contact.delete(yield contact_1.Contact.input(rl, 'Masukkan Nama: '));
                    console.log(deletedContact);
                    break;
                case '5':
                    break;
                default:
                    console.log(chalk_1.default.redBright('Invalid input!'));
                    break;
            }
            ;
            rl.close();
        }));
        break;
    }
    ;
});
main();
