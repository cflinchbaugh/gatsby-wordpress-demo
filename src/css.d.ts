//TypeScript import image config, see here: https://stackoverflow.com/questions/64732623/react-typescript-cannot-find-module-or-its-corresponding-type-declaration
declare module "*.svg" {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const css: { [key: string]: string };
    export default css;
}

declare module '*.sass' {
    const css: { [key: string]: string };
    export default css;
}

declare module 'react-markup';
declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';