import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingRO } from './rating.RO';
import { UserService } from '../user/user.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private userService: UserService
  ) { }

  async save(rating: Rating){
    return await this.ratingRepository.save(rating);
  }

  async delete(rating: Rating){
    return await this.ratingRepository.remove(rating);
  }

  async findAll(){
    const ratings = await this.ratingRepository.find();
    const response = new Array<RatingRO>();
    for (const r of ratings) {
      const user = await this.userService.findOneById(r.authorId);
      response.push({
        id: r.id,
        points: r.points,
        description: r.description,
        authorId: r.authorId,
        authorName: user.fullName,
      });
    }
    return response;
  }
}
