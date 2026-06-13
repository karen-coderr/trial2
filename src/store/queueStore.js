
const INITIAL_QUEUE = [
  { id: '1', token: '#040', patientName: 'Chidi Nwosu', doctorAssigned: 'Dr. Okonkwo', serviceType: 'General Consult', time: '11:30', checkedInAt: '11:31 AM', waitTimeMins: 0, status: 'IN CONSULT', vitals: { bp: '120/80', temp: '36.7°C' } },
  { id: '2', token: '#041', patientName: 'Bola Adeyemi', doctorAssigned: 'Dr. Okonkwo', serviceType: 'General Consult', time: '09:15', checkedInAt: '09:15 AM', waitTimeMins: 2, status: 'COMPLETED', vitals: { bp: '118/75', temp: '36.5°C' } },
];

class QueueStore {
  constructor() {
    this.queue = [...INITIAL_QUEUE];
    this.listeners = new Set(); 
    this.isLoading = false;
    this.startAutoQueueManager(); // Boot up the 15-minute watcher
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  getState() {
    return {
      queue: this.queue,
      metrics: this.computeMetrics()
    };
  }

  async fetchQueue() {
    this.notify();
  }

  // Helper: Get minutes until an appointment
  getMinutesUntil(timeStr) {
    if (!timeStr) return 999;
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const aptTime = new Date();
    aptTime.setHours(hours, minutes, 0, 0);
    return Math.round((aptTime - now) / 60000);
  }

  addWalkIn(patientData) {
    const nextTokenNumber = this.queue.length + 41;
    
    // Check if the appointment is 15 minutes away or less
    const minsUntil = this.getMinutesUntil(patientData.time);
    const initialStatus = minsUntil <= 15 ? 'WAITING' : 'SCHEDULED';

    const newPatient = {
      id: crypto.randomUUID(),
      token: `#0${nextTokenNumber}`,
      checkedInAt: initialStatus === 'WAITING' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--',
      waitTimeMins: 0,
      status: initialStatus,
      vitals: null,
      ...patientData
    };

    this.queue.push(newPatient);
    this.notify();
    return newPatient;
  }

  precheckPatient(id, vitalsData) {
    this.queue = this.queue.map(p => p.id === id ? { ...p, status: 'PRECHECKED', vitals: vitalsData } : p);
    this.notify();
  }

  updateStatus(id, newStatus) {
    this.queue = this.queue.map(p => p.id === id ? { ...p, status: newStatus.toUpperCase() } : p);
    this.notify();
  }

  // Automatically moves SCHEDULED patients to WAITING when 15 mins away
  startAutoQueueManager() {
    setInterval(() => {
      let requiresUpdate = false;
      this.queue.forEach(p => {
        if (p.status === 'SCHEDULED' && p.time) {
          const minsUntil = this.getMinutesUntil(p.time);
          if (minsUntil <= 15) {
            p.status = 'WAITING';
            p.checkedInAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            requiresUpdate = true;
          }
        }
      });
      if (requiresUpdate) this.notify();
    }, 15000); // Check every 15 seconds
  }

  computeMetrics() {
    const metrics = { waiting: 0, inConsult: 0, completed: 0, scheduled: 0 };
    this.queue.forEach(p => {
      if (p.status === 'WAITING' || p.status === 'UP NEXT') metrics.waiting++;
      if (p.status === 'IN CONSULT') metrics.inConsult++;
      if (p.status === 'COMPLETED') metrics.completed++;
      if (p.status === 'SCHEDULED') metrics.scheduled++;
    });
    metrics.avgWaitTime = '12m';
    return metrics;
  }
}

export const queueStore = new QueueStore();