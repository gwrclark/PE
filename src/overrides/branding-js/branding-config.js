/*
    Customer can provide their own theming using this override:
    The themes should be added to the themes object as shown below:

    export const themes = {
        theme1: 'customerTheme1',
        theme2: 'customerTheme2',
        theme3: 'customerTheme3',
    }

     Once the themes are defined, they can call it through query search param or using hostname
     e.g. https://anyurl.com/producer-engage?branding=theme1 or
          theme1.guidewire.com.

    The defaultTheme param can be used if search query param is not used explicitly.

    If themes and defaultTheme are not defined, guidewire uses default theme.

    export const defaultTheme = 'theme1';

*/