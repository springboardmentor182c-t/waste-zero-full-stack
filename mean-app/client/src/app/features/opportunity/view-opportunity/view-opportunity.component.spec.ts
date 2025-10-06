
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewOpportunity } from './view-opportunity';
import { By } from '@angular/platform-browser';

describe('ViewOpportunityComponent', () => {
  let component: ViewOpportunity;
  let fixture: ComponentFixture<ViewOpportunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [ViewOpportunity]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOpportunity);
    component = fixture.componentInstance;
  });

  //  TC_01 
  it('should display all opportunities with title, duration, skills, and description', () => {
    component.opportunities = [
      { id: 1, title: 'Web Developer', duration: '3 months', skills: 'Angular, HTML', description: 'Build frontend components' },
      { id: 2, title: 'Backend Engineer', duration: '6 months', skills: 'Node.js, MongoDB', description: 'Develop REST APIs' }
    ];
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.opportunity-item'));
    expect(items.length).toBe(2);

    const firstItemText = items[0].nativeElement.textContent;
    expect(firstItemText).toContain('Web Developer');
    expect(firstItemText).toContain('3 months');
    expect(firstItemText).toContain('Angular, HTML');
    expect(firstItemText).toContain('Build frontend components');
  });

  //TC_02 
  it('should display "No opportunities available" message when list is empty', () => {
    component.opportunities = [];
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('.opportunity-list'));
    expect(list.children.length).toBe(0);
});
});
