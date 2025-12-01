import { Injectable } from '@nestjs/common';

export interface Admission {
  date: string;
  count: number;
}

export interface Denial {
  reason: string;
  rate: number;
}

export interface Occupancy {
  ward: string;
  occupied: number;
  total: number;
}

@Injectable()
export class MetricsService {
  getAdmissions(): Admission[] {
 const startDate = new Date('2025-11-01');
    const data: Admission[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      data.push({
        date: date.toISOString().split('T')[0],
        count: 100 + Math.floor(Math.random() * 50),
      });
    }
    return data;
  }

  getDenials(): Denial[] {
    return [
      { reason: 'Missing Documentation', rate: 12.5 },
      { reason: 'Insurance Not Covered', rate: 18.3 },
      { reason: 'Coding Error', rate: 7.8 },
      { reason: 'Duplicate Claim', rate: 4.2 },
    ];
  }

  getBedOccupancy(): Occupancy[] {
    return [
      { ward: 'ICU', occupied: 42, total: 50 },
      { ward: 'Emergency', occupied: 38, total: 40 },
      { ward: 'General Ward', occupied: 215, total: 250 },
      { ward: 'Pediatrics', occupied: 28, total: 35 },
    ];
  }
}