import { AbstractControl } from "@angular/forms";

export function WhiteSpaceValidator (control: AbstractControl) {

    if (control.value == null) {
        return;
      }
      let hasErrors = false;
    
      if (control.value.trim().length == 0) {
        hasErrors = true;
      }
    
      if (hasErrors) {
        return {onlyWhitespacesValidator: true};
      }
      return null;

}
