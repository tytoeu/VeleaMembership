import { IUser } from "../../hooks/interface/ISignin";
import themeConfig from "../../util/theme";

export interface initialStateInferface {
    locale: string;
    mode: boolean,
    currentTheme: keyof typeof themeConfig;
    theme: typeof themeConfig.light | typeof themeConfig.dark;
    onBoading: boolean,
    auth: IUser | null
}

