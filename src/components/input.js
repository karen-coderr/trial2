/**
 * CareFlow Standardized Form Input Primitive
 * Pure ES6 Module
 */
export class InputComponent {
  /**
   * @param {Object} options
   * @param {string} options.id - Standard programmatic field ID anchor
   * @param {string} [options.label] - Upper section layout labeling text
   * @param {string} [options.type] - Input category declaration (text, email, password, date, tel)
   * @param {string} [options.placeholder] - Temporary data overlay hints
   * @param {string} [options.value] - Default state text loading asset
   * @param {string} [options.error] - Validation message block content text
   * @param {string} [options.className] - Sizing customization parameters
   */
  constructor({ id, label = '', type = 'text', placeholder = '', value = '', error = '', className = '' }) {
    this.id = id;
    this.label = label;
    this.type = type;
    this.placeholder = placeholder;
    this.value = value;
    this.error = error;
    this.className = className;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = `w-full flex flex-col gap-1.5 ${this.className}`;

    // Upper Section Label Injections
    if (this.label) {
      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', this.id);
      labelEl.className = 'text-xs font-bold text-slate-500 uppercase tracking-wider block';
      labelEl.textContent = this.label;
      wrapper.appendChild(labelEl);
    }

    // Input Control Layout Structuring
    const input = document.createElement('input');
    input.id = this.id;
    input.type = this.type;
    input.placeholder = this.placeholder;
    input.value = this.value;
    
    // Status Context Border Evaluations
    const normalStyles = 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500';
    const errorStyles = 'border-red-500 focus:ring-red-500/20 focus:border-red-500 text-red-900 placeholder-red-300';
    
    input.className = `w-full px-3.5 py-2.5 border rounded-xl text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-150 ${
      this.error ? errorStyles : normalStyles
    }`;

    wrapper.appendChild(input);

    // Validation Subtext Block Allocations
    if (this.error) {
      const errorEl = document.createElement('p');
      errorEl.className = 'text-xs font-semibold text-red-500 mt-0.5 animate-slide-in';
      errorEl.textContent = this.error;
      wrapper.appendChild(errorEl);
    }

    return wrapper;
  }
}