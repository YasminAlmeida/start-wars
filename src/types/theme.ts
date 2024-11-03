export interface ThemeToken {
    colorPrimary: string;
    colorBgContainer: string;
    colorTextTitle: string;
    colorTextSecondaryTitle: string;
    colorTextTertiaryTitle: string;
    colorTextSubtitle: string;
    colorTextSecondarySubtitle: string;
    colorTextTertiarySubtitle: string;
    colorBorder: string;
    colorLink: string;
    colorWarning: string;
    colorSuccess: string;
    height: string;
    borderRadius: string;
}

export interface Themes {
    light: {
        token: ThemeToken;
    };
    dark: {
        token: ThemeToken;
    };
}