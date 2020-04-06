import {systemConfig} from "../config/AppConfig";

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
    ERROR: {
        en: "Error occurred!",
        ru: "Произошла ошибка!",
        ua: "Виникла помилка!"
    },
    REGISTER_SUCCESS: {
        en: "Citizen has been registered successfully!",
        ru: "Гражданин зарегистрирован успешно!",
        ua: "Громадянин зареєстрований успішно!"
    }
};

export const L = (value) => {
    return strings[value][systemConfig.getLanguage()];
};
