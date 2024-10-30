interface Theme {
  colors?: {
    primary?;
    primaryMedium?;
    primaryDark?;
    secondary?;
    secondaryMedium?;
    secondaryDark?;
    secondaryDark2?;
    white?;
    boneWhite;
    black?;
    grey0?;
    grey1?;
    grey2?;
    grey3?;
    grey4?;
    grey5?;
    greyOutline?;
    searchBg?;
    success?;
    error?;
    warning?;
    divider?;
  };
  font?: {
    regular?: string;
    bold?: string;
    timesNew?:string;
  }
}

const theme: Theme = {
  colors: {
    primary: '#D6AC60',
    primaryMedium:"#cc98b7",
    primaryDark:'#a05b85',
    secondary: '#9fcdd6',
    // secondary:"#00333a",
    boneWhite:"#F9F6EE",
    secondaryMedium:"#4596ac",
    secondaryDark:"#00333a",
    secondaryDark2:"#06626e",
    white: '#ffffff',
    black: '#000000',
    grey0:'#888888',
    grey1:'#e4e4e4',
    error:'#B00020'
  },
  font: {
    regular: 'Barlow-Regular',
    bold: 'Barlow-bold',
    timesNew:'times-new-roman'
  }
}

export default theme;