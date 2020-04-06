let language = 'ua';

export function setLanguage(val){
    language = val;
}

const strings = {
    "INTERFACE": {
        en: "Application language",
        ru: "Язык приложения",
        ua: "Мова аплікації"
    },
    "SETTINGS": {
        en: "Settings",
        ru: "Настройки",
        ua: "Налаштування"
    },
    "REGISTER": {
        en: "Sign up citizen",
        ru: "Регистрация гражданина",
        ua: "Реєстрація громадянина"
    },
    "SCREENING": {
        en: "Citizen's temperature",
        ru: "Температура гражданина",
        ua: "Температура громадянина"
    },
    WRONG_PHONE_NUMBER: {
        en: "Wrong phone number",
        ru: "Неверный номер телефона !",
        ua: "Невірний номер телефону !"
    },
    ADDRESS: {
        en: "Place of actual residence",
        ru: "Место фактического проживания",
        ua: "Місце фактичного мешкання"
    },
    BIRTHDAY: {
        en: "Birth day",
        ru: "Дата рождения",
        ua: "Дата народження"
    },
    LNAME: {
        en: "Last name",
        ru: "Фамилия",
        ua: "Прізвище"
    },
    FNAME: {
        en: "First name",
        ru: "Имя",
        ua: "Им'я"
    },
    SNAME: {
        en: "Second name",
        ru: "Отчество",
        ua: "По батькові"
    },
    SUBMIT: {
        en: "Submit",
        ru: "Отправить",
        ua: "Відправити"
    },
    TOO_SHORT: {
        en: "Too short!",
        ru: "Слишком коротко!",
        ua: "Занадто коротко!"
    },
    TOO_LONG: {
        en: "Too long!",
        ru: "Слишком длинно!",
        ua: "Занадто довго!"
    },
    DOC_NUMBER: {
        en: "Document number",
        ru: "№ Документа",
        ua: "№ Документа"
    },
    DOCUMENT_TYPE_REQUIRED: {
        en: "Choose document type",
        ru: "Выберите тип документа",
        ua: "Виберіть тип документа"
    },
    REQUIRED: {
        en: "Required field",
        ru: "Необходимое поле",
        ua: "Обов'язкове поле"
    },
    PASSPORT: {
        en: "Passport (old version)",
        ru: "Паспорт Гражданина старого образца",
        ua: "Паспорт Громадянина старого зразка"
    },
    ID_CARD: {
        en: "ID card",
        ru: "ID карта Гражданина",
        ua: "ID картка Громадянина"
    },
    DRIVER_LICENSE: {
        en: "Driver license",
        ru: "Водительские права",
        ua: "Посвідчення водія"
    },
    M: {
        en: "M",
        ru: "М",
        ua: "М"
    },
    W: {
        en: "W",
        ru: "Ж",
        ua: "Ж"
    },
    MAN: {
        en: "Man",
        ru: "Мужчина",
        ua: "Чоловік"
    },
    WOMAN: {
        en: "Woman",
        ru: "Женщина",
        ua: "Жінка"
    },
    GENDER: {
        en: "Gender",
        ru: "Пол",
        ua: "Стать"
    },
    TEMPERATURE: {
        en: "Citizen's temperature",
        ru: "Температура гражданина",
        ua: "Температура громадянина"
    },
};

export const L = (value) => {
    return strings[value][language];
};

export const WRONG_PHONE_NUMBER = "Неверный номер телефона !";
export const SETTINGS = "Настройки";
export const ADDRESS = "Место фактического проживания";
export const PHONE = "Контактный телефон";
export const BIRTHDAY = "Дата рождения";
export const LNAME = "Фамилия";
export const FNAME = "Имя";
export const SNAME = "Отчество";
export const SUBMIT = 'Сохранить';
export const DOC_NUMBER = "№ Документа";
export const DOCUMENT_TYPE_REQUIRED = 'Выберите тип документа';
export const TOO_SHORT = 'Слишком коротко!';
export const TOO_LONG = 'Слишком длинное!';
export const REQUIRED = "Необходимое поле";
export const PASSPORT = "Внутренний паспорт Гражданина";
export const ID_CARD = "ID карта Гражданина";
export const DRIVER_LICENSE = "Водительские права";
export const M = "М";
export const W = "Ж";
export const MAN = "Мужчина";
export const WOMAN = "Женщина";
export const GENDER = "Пол";
export const REGISTER = "Регистрация гражданина";
export const SCREENING = "Температура гражданина";
export const TEMPERATURE = "Температура тела";
