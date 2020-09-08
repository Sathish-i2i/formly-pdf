import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
 import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('mostrecentconsent', { static: false }) recentConsent: TemplateRef<HTMLDivElement>;
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Formly is terrific!',
        required: true,
      },
    },
    {
      key: 'nested.story',
      type: 'textarea',
      templateOptions: {
        label: 'Some sweet story',
        placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
        description: '',
      },
      expressionProperties: {
        'templateOptions.focus': 'formState.awesomeIsForced',
        'templateOptions.description': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'And look! This field magically got focus!';
          }
        },
      },
    },
    {
      key: 'awesome',
      type: 'checkbox',
      templateOptions: { label: '' },
      expressionProperties: {
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.label': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        },
      },
    },
    {
      key: 'whyNot',
      type: 'textarea',
      expressionProperties: {
        'templateOptions.placeholder': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad... It really is awesome! Wasn\'t that cool?';
          } else {
            return 'Type in here... I dare you';
          }
        },
        'templateOptions.disabled': 'formState.awesomeIsForced',
      },
      hideExpression: 'model.awesome',
      templateOptions: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you',
      },
    },
    {
      key: 'custom',
      type: 'custom',
      templateOptions: {
        label: 'Custom inlined',
      },
    },
  ];

  onSubmit() {
    alert(
      JSON.stringify(this.model, null, 4)
    );
  }

  exportPdf() {
    const options = {
      margin:1,
      filename : 'Our_awesome_file.pdf',
      image: {'type':'jpeg'},
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const content : Element = document.getElementById("pdf-content");
    html2pdf().set({
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    });
    html2pdf().from(content).set(options).save();
  }

}
