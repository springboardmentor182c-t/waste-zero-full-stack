import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pickupui',
  imports: [CommonModule, FormsModule],
  templateUrl: './pickupui.html',
  styleUrl: './pickupui.css'
})

export class Pickupui {
activeTab = 'newPickup';
  currentStep = 1;
  searchQuery: string = '';
  
  pickupData = {
    address: '',
    city: '',
    date: '',
    timeSlot: '',
    wasteTypes: [] as string[],
    notes: ''
  };

  pickupHistory = [
    { date: '2025-10-01', address: '45 Green Street', city: 'Mumbai', timeSlot: '10 AM – 12 PM' },
    { date: '2025-09-28', address: '12 Hill Road', city: 'Pune', timeSlot: '2 PM – 4 PM' }
  ];




 // New pickup form fields
  newPickup = {
    date: '',
    address: '',
    city: '',
    timeSlot: ''
  };

  // 🔍 Computed filtered data (includes new pickups automatically)
  get filteredHistory() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.pickupHistory;
    return this.pickupHistory.filter(item =>
      item.address.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query) ||
      item.timeSlot.toLowerCase().includes(query)
    );
  }



  setTab(tab: string) {
    this.activeTab = tab;
    this.currentStep = 1;
  }

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  toggleWasteType(type: string) {
    const index = this.pickupData.wasteTypes.indexOf(type);
    if (index > -1) this.pickupData.wasteTypes.splice(index, 1);
    else this.pickupData.wasteTypes.push(type);
  }

  submitPickup() {
    alert('Pickup scheduled successfully!');
    this.pickupHistory.push({
      date: this.pickupData.date,
      address: this.pickupData.address,
      city: this.pickupData.city,
      timeSlot: this.pickupData.timeSlot
    });
    this.pickupData = { address: '', city: '', date: '', timeSlot: '', wasteTypes: [], notes: '' };
    this.currentStep = 1;
  }
}

