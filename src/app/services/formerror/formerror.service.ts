import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormerrorService {

    // return list of error messages
    public validationMessages() {
        const messages = {
            email: 'This email address is invalid',
            required: 'This field is required',
            not_allowed_characters: (matches: any[]) => {
                let matchedCharacters = matches;

                matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
                    let string = characterString;
                    string += character;

                    if (matchedCharacters.length !== index + 1) {
                        string += ', ';
                    }

                    return string;
                }, '');

                return `These characters are not allowed: ${matchedCharacters}`;
            },
        };

        return messages;
    };

    // Validate form instance
    // check_dirty true will only emit errors if the field is touched
    // check_dirty false will check all fields independent of
    // being touched or not. Use this as the last check before submitting
    public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
        const form = formToValidate;

        for (const field in formErrors) {
            if (field) {
                formErrors[field] = '';
                const control = form.get(field);

                const messages = this.validationMessages();
                if (control && !control.valid) {
                    if (!checkDirty || (control.dirty || control.touched)) {
                        for (const key in control.errors) {
                            if (key && key !== 'not_allowed_characters') {
                                formErrors[field] = formErrors[field] || messages[key];
                            } else {
                                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
                            }
                        }
                    }
                }
            }
        }
        return formErrors;
    }
}