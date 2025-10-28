import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ✅ Test 1: Register user
  it('should register a user successfully', () => {
    const mockUser = { name: 'TestUser', email: 'test@example.com', password: 'test123', role: 'volunteer' };
    const mockResponse = { token: 'fake-jwt-token', user: mockUser };

    service.register(mockUser).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/v1/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // ✅ Test 2: Login user
  it('should login user successfully', () => {
    const loginData = { email: 'test@example.com', password: 'test123' };
    const mockResponse = { token: 'fake-jwt-token', user: { email: 'test@example.com' } };

    service.login(loginData).subscribe((res) => {
      expect(res.user.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne('/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // ✅ Test 3: Fail registration (missing fields)
  it('should fail registration when fields are missing', () => {
    const mockUser = { email: 'missing@example.com' }; // missing fields

    service.register(mockUser).subscribe({
      next: () => fail('should have failed'),
      error: (err) => expect(err.status).toBe(400)
    });

    const req = httpMock.expectOne('/api/v1/auth/register');
    req.flush({ message: 'Missing required fields' }, { status: 400, statusText: 'Bad Request' });
  });

  // ✅ Test 4: Fail login (wrong password)
  it('should fail login with wrong credentials', () => {
    const loginData = { email: 'test@example.com', password: 'wrongpassword' };

    service.login(loginData).subscribe({
      next: () => fail('should have failed'),
      error: (err) => expect([400, 401]).toContain(err.status)
    });

    const req = httpMock.expectOne('/api/v1/auth/login');
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
  });
});
