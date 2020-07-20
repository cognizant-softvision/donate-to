export enum ControlType {
  Textbox = 'TextBox',
  DropDown = 'DropDown',
  RadioButton = 'RadioButton',
  Checkbox = 'Checkbox',
}
export const ControlType2LabelMapping: Record<ControlType, string> = {
  [ControlType.Textbox]: 'Textbox',
  [ControlType.DropDown]: 'DropDown',
  [ControlType.RadioButton]: 'RadioButton',
  [ControlType.Checkbox]: 'Checkbox',
};
