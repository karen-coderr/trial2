/**
 * CareFlow Atomic Button Engine
 * Pure ES6 Module
 */
export class ButtonComponent {
  /**
   * @param {Object} options
   * @param {string} options.text - Button text label
   * @param {'primary'|'secondary'|'outline'|'danger'|'teal'} [options.variant] - Visual theme configuration
   * @param {boolean} [options.isLoading] - Triggers loading state animation spinner
   * @param {boolean} [options.disabled] - Toggles interactivity state block
   * @param {string} [options.className] - Additional utility overrides
   * @param {Function} [options.onClick] - Click execution interceptor
   */
  constructor({ text, variant = 'primary', isLoading = false, disabled = false, className = '', onClick = null }) {
    this.text = text;
    this.variant = variant;
    this.isLoading = isLoading;
    this.disabled = disabled;
    this.className = className;
    this.onClick = onClick;
    this.element = null;
  }

  render() {
    const baseStyles = 'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] disabled:active:scale-100';
    
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500/50',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-300/50',
      outline: 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 focus:ring-blue-500/50',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50',
      teal: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500/50',
    };

    const button = document.createElement('button');
    button.className = `${baseStyles} ${variants[this.variant]} ${this.className}`;
    button.disabled = this.disabled || this.isLoading;

    if (this.isLoading) {
      button.innerHTML = `
        <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        <span>Processing...</span>
      `;
    } else {
      button.innerHTML = `<span>${this.text}</span>`;
    }

    if (this.onClick && !this.disabled && !this.isLoading) {
      button.addEventListener('click', this.onClick);
    }

    this.element = button;
    return button;
  }

  updateLoading(isLoading) {
    this.isLoading = isLoading;
    if (this.element) {
      const parent = this.element.parentNode;
      if (parent) {
        const oldElement = this.element;
        const newElement = this.render();
        parent.replaceChild(newElement, oldElement);
      }
    }
  }
}