import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial stats with 0 values', () => {
    const stats = service.getStats();
    expect(stats.totalUsers).toBe(0);
    expect(stats.completedPickups).toBe(0);
    expect(stats.pendingPickups).toBe(0);
    expect(stats.activeOpportunities).toBe(0);
  });

  it('should return empty users array', () => {
    const users = service.getUsers();
    expect(users).toEqual([]);
  });

  it('should search users by name', () => {
    const result = service.searchUsers('test');
    expect(result).toEqual([]);
  });

  it('should return all users when search query is empty', () => {
    const result = service.searchUsers('');
    expect(result).toEqual([]);
  });
});