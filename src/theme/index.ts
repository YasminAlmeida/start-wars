import { Themes } from "../types/theme";

export const themes: Themes = {
    light: {
        token: {
            colorPrimary: '#ffff',
            colorBgContainer: '#ffffff',
            colorTextTitle: '#3c3c3c',
            colorTextSecondaryTitle: '#2c2c2c',
            colorTextTertiaryTitle: '#0000',
            colorTextSubtitle: '#9e9e9e',
            colorTextSecondarySubtitle: '#7a7a7a',
            colorTextTertiarySubtitle: '#666666',
            colorBorder: '#e0e0e0',
            colorLink: '#0288d1',
            colorWarning: '#ffca28',
            colorSuccess: '#81c784',
            height: '100vh',
            borderRadius: '5px',
        },
    },
    dark: {
        token: {
            colorBgContainer: '#000',
            colorTextTitle: '#ffffff',
            colorTextSecondaryTitle: '#e0e0e0',
            colorTextTertiaryTitle: '#f0f0f0',
            colorTextSubtitle: '#b0bec5',
            colorTextSecondarySubtitle: '#cfd8dc',
            colorTextTertiarySubtitle: '#90a4ae',
            colorBorder: '#37474f',
            colorLink: '#80d8ff',
            colorWarning: '#ff5252',
            colorSuccess: '#69f0ae',
            height: '100vh',
            colorPrimary: "#000",
            borderRadius: '5px',
        },
    },
};

export type ThemeType = keyof typeof themes;