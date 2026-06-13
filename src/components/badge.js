/**
 * CareFlow Automated Queue Status Badge Primitive
 * Pure ES6 Module
 */
export class BadgeComponent {
  /**
   * @param {string} status - Authorized string values: 'WAITING' | 'UP NEXT' | 'IN CONSULT' | 'COMPLETED' | 'NO SHOW'
   */
  constructor(status) {
    this.status = status ? status.toUpperCase() : 'WAITING';
  }

  render() {
    const badgeMap = {
      'WAITING': 'bg-rose-50 text-rose-600 border border-rose-100',
      'UP NEXT': 'bg-amber-50 text-amber-600 border border-amber-100',
      'IN CONSULT': 'bg-blue-50 text-blue-600 border border-blue-100',
      'COMPLETED': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      'NO SHOW': 'bg-slate-100 text-slate-500 border border-slate-200',
    };

    const targetClass = badgeMap[this.status] || 'bg-slate-50 text-slate-600 border border-slate-100';
    
    const span = document.createElement('span');
    span.className = `px-2.5 py-1 rounded-full text-xs font-bold tracking-wide inline-flex items-center justify-center whitespace-nowrap uppercase ${targetClass}`;
    span.textContent = this.status;

    // Add this entry inside your badge.js color assignment map
const STYLES = {
  'SCHEDULED': 'bg-purple-50 text-purple-700 border-purple-100',
  'PRECHECKED': 'bg-indigo-50 text-indigo-700 border-indigo-100', // Added for the new triage state
  'WAITING': 'bg-amber-50 text-amber-700 border-amber-100',
  'IN CONSULT': 'bg-blue-50 text-blue-700 border-blue-100',
  'COMPLETED': 'bg-emerald-50 text-emerald-700 border-emerald-100'
};

    return span;
  }
}