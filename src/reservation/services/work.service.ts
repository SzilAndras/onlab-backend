import { Injectable, Logger } from '@nestjs/common';
import { Work } from '../entities/work.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class WorkService{
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) { }

  async saveWork(work: Work){
    return await this.workRepository.save(work);
  }

  async removeWork(work: Work){
    return await this.workRepository.remove(work).catch(error => {
      Logger.log(error);
    });
  }

  async findWorksByResId(reId: number): Promise<Work[]> {
    return await this.workRepository
      .createQueryBuilder('work')
      .where('work.reservation.id = :id', { id: reId })
      .getMany();
  }
}
