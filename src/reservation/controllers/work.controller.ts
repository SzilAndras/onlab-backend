import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { WorkService } from '../services/work.service';
import { Work } from '../entities/work.entity';
import { AuthGuard } from '../../shared/auth.guard';
import { User } from '../../user/user.decorator';

@Controller('work')
export class WorkController {

  constructor(
    private readonly reservationService: ReservationService,
    private readonly workService: WorkService) {}

  @Post('/setWorkToResId=:id')
  async addWork(@Param('id') id: number, @Body() work: Work) {
    this.reservationService.findById(id).then((res) => {
      work.reservation = res;
      this.workService.saveWork(work);
    });
  }

 /* @UseGuards(new AuthGuard())
  async findAll(@User() user) {
    if (user.role === 'Admin') {
      return await this.userService.findAll();
    } else {
      return new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }*/




  @Delete('/deleteWork')
  async removeWork(@Body() work: Work){
    this.workService.removeWork(work);
  }

  @Get('/findWorksResId=:id')
  async findWorksByResId(@Param('id') id: number): Promise<Work[]> {
    return this.workService.findWorksByResId(id);
  }
}
