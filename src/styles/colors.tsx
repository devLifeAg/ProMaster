// src/styles/colors.ts

const colors = {
  topLeftGradient: '#DB2C2C',
  bottomRightGradient: '#7C1325',
  redGradient: function() {
    return `linear-gradient(to bottom right, ${this.topLeftGradient}, ${this.bottomRightGradient})`;
  },
  redRuby: '#C01E1E',
  blackDark: '#3B3B3B',
  greyCalm: '#DFDFDF',
  greyInputText: '#CBCBCB',
  whiteCloud: '#FFFFFF',
  greyIron: '#585858',
  greyShadow: '#8B8B8B',
  warningTitle: '#2D2C2C',
  greyLight:  '#F3F3F3',

  availableStatus: '#059669',
  brookedStatus: '#3B82F6',
  reserveStatus: '#F97316',

  activeStatus: '#25AD5E',
  waitingStatus: '#F5C30B'
};

export function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


export default colors;
