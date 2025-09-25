import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/waste-recycle/waste-recycle')
      .then(m => m.WasteRecycle)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/login/login')
      .then(m => m.Login) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/register/register')
      .then(m => m.Register) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard')
      .then(m => m.Dashboard) 
  },
  // 🔹 New Opportunity Routes
  { 
    path: 'opportunity/view', 
    loadComponent: () => import('./features/opportunity/view-opportunity/view-opportunity')
      .then(m => m.ViewOpportunity) 
  },
  { 
    path: 'opportunity/edit/:id', 
    loadComponent: () => import('./features/opportunity/edit-opportunity/edit-opportunity')
      .then(m => m.EditOpportunity) 
  },
  { 
    path: 'opportunity/add', 
    loadComponent: () => import('./features/opportunity/add-opportunity/add-opportunity')
      .then(m => m.AddOpportunity) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
