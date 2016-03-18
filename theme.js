import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

import * as Colors from 'material-ui/lib/styles/colors';

const CHARMröd = "#aa2010";
const kårblå = "#3030BB";

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: CHARMröd,
    primary2Color: ColorManipulator.fade(CHARMröd, 0.3),
    primary3Color: ColorManipulator.fade(CHARMröd, 0.7),
    accent1Color: kårblå,
    accent2Color: ColorManipulator.fade(kårblå, 0.3),
    accent3Color: ColorManipulator.fade(kårblå, 0.7),
    textColor: Colors.fullBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};
