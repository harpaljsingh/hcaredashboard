import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('admissions')
  getAdmissions() {
    return this.metricsService.getAdmissions();
  }

  @Get('denials')
  getDenials() {
    return this.metricsService.getDenials();
  }

  @Get('bed-occupancy')
  getBedOccupancy() {
    return this.metricsService.getBedOccupancy();
  }
}