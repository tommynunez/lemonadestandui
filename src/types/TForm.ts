import { TFormFields } from "./TFormFields";

export type TForm = {
    name: string,
    formHasLoaded: boolean,
    formFields: Array<TFormFields>,
};