import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // (for api)
import { PickupService } from '../services/pickup.service'; // adjust path if needed(for api)


@Component({
  selector: 'app-pickupui',
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Add RouterModule for api
  templateUrl: './pickupui.html',
  styleUrl: './pickupui.css'
})

export class Pickupui {
  constructor(private pickupService: PickupService) {}  //for api
activeTab = 'newPickup';
  currentStep = 1;
  searchQuery: string = '';
  
  pickupData = {
    address: '',
   // city: '',
    date: '',
    timeSlot: '',
    wasteTypes: [] as string[],
    notes: ''
  };

  pickupHistory = any[] = []; // now empty


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

  //(below code is for API integ)
 submitPickup() {
  const payload = {
    user: '652f1a2b8c9d4e0012345678', // Replace with dynamic ID if needed
    address: this.pickupData.address,
    // city: this.pickupData.city,
    pickupDate: this.pickupData.date,       // ✅ renamed
    pickupTime: this.pickupData.timeSlot,   // ✅ renamed
    wasteType: this.pickupData.wasteTypes[0]?.toLowerCase(),  // ✅ ensures lowercase match
    additionalNotes: this.pickupData.notes
  };
  if (!payload.address || !payload.pickupDate || !payload.pickupTime || !payload.wasteType) {
    alert('Please fill all required fields.');
    return;
  }


console.log('📤 Sending payload:', payload); // ✅ Add this here


  this.pickupService.schedulePickup(payload).subscribe({
    next: (res) => {
      alert('✅ Pickup scheduled successfully!');
      this.pickupHistory.push({
        date: this.pickupData.date,
        address: this.pickupData.address,
        city: this.pickupData.city,
        timeSlot: this.pickupData.timeSlot
      });
      this.pickupData = { address: '', city: '', date: '', timeSlot: '', wasteTypes: [], notes: '' };
      this.currentStep = 1;
    },
    error: (err) => {
      console.error('❌ Error scheduling pickup:', err);
      alert('Failed to schedule pickup. Please try again.');
    }
  });
}

}
