import { COLORS } from '~/configs/theme.ts';

import type { ThemeConfig } from 'antd';

const antDesignTheme: ThemeConfig = {
  token: {
    colorPrimary: COLORS.POINT.PRIMARY,
    colorError: COLORS.STATUS['01'],
    colorErrorActive: COLORS.STATUS['01'],
    colorErrorHover: COLORS.STATUS['01'],
    colorWarning: COLORS.STATUS['02'],
    colorWarningActive: COLORS.STATUS['02'],
    colorWarningHover: COLORS.STATUS['02'],
    colorText: COLORS.FONT['80'],
  },

  // ? Ant Design Component 명 카멜 케이스 컨벤션 제외
  /* eslint-disable @typescript-eslint/naming-convention */
  components: {
    Switch: {
      trackHeight: 32,
      trackHeightSM: 24,
      trackMinWidth: 60,
      trackMinWidthSM: 45,
      trackPadding: 4,
      handleSize: 24,
      handleSizeSM: 18,
      innerMaxMargin: 27,
      innerMaxMarginSM: 18,
      innerMinMargin: 3,
      innerMinMarginSM: 6,
    },
    // Table: {
    //   headerBg: COLORS.GRAY['100'],
    //   headerBorderRadius: 6,
    //   headerSplitColor: 'transparent',
    //   borderColor: COLORS.GRAY['200'],
    //   selectionColumnWidth: 72,
    //   rowHoverBg: COLORS.GRAY['75'],
    //   rowSelectedBg: COLORS.GRAY['75'],
    //   rowSelectedHoverBg: COLORS.GRAY['75'],
    //   footerBg: COLORS.WHITE,
    //   borderRadius: 6,
    //   headerSortActiveBg: COLORS.GRAY['100'],
    //   headerSortHoverBg: COLORS.GRAY['100'],
    //   bodySortBg: 'transparent',
    // },
    Pagination: {
      itemActiveBg: 'transparent',
      itemBg: 'transparent',
    },
    Input: {
      inputFontSizeSM: 12,
      inputFontSize: 14,
      inputFontSizeLG: 14,
      // 좌우 패딩
      paddingInlineSM: 8,
      paddingInline: 12,
      paddingInlineLG: 16,
      // 상하 패딩
      paddingBlockSM: 0,
      paddingBlock: 0,
      paddingBlockLG: 0,
    },
    Form: {
      labelHeight: 40,
    },
    Radio: {
      dotSize: 10,
    },
    Dropdown: {
      paddingBlock: 0,
    },
    // Select: {
    //   selectorBg: COLORS.GRAY['50'],
    // },
    // Modal: {
    //   contentBg: COLORS.GRAY['50'],
    //   footerBg: COLORS.GRAY['50'],
    //   headerBg: COLORS.GRAY['50'],
    //   titleColor: COLORS.GRAY['1000'],
    //   titleFontSize: 18,
    //   titleLineHeight: 1.3333333333,
    // },
    Alert: {
      defaultPadding: 10,
      withDescriptionIconSize: 24,
      withDescriptionPadding: 0,
    },
  },
  /* eslint-enable @typescript-eslint/naming-convention */
};

export default antDesignTheme;
