import { IMenu } from "../../hooks/interface/IMenu";
import { IUser } from "../../hooks/interface/ISignin";
import themeConfig from "../../util/theme";

export interface initialStateInferface {
    locale: 'kh' | 'en' | string;
    mode: boolean,
    currentTheme: keyof typeof themeConfig;
    theme: typeof themeConfig.light | typeof themeConfig.dark;
    onBoading: boolean,
    auth: IUser | null,
    cartList: IMenu[],
    keyIncrease: number,
    incorrectCode: number,
    countNotify: number
}
