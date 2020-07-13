export enum ControlType {
  Textbox = 'TextBox',
  DropDown = 'DropDown',
  RadioButton = 'RadioButton',
}

export const ControlType2LabelMapping: Record<ControlType, string> = {
  [ControlType.Textbox]: 'Textbox',
  [ControlType.DropDown]: 'DropDown',
  [ControlType.RadioButton]: 'RadioButton',
};
