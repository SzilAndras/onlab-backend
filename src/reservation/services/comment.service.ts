import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';

Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async saveComment(comment: Comment){
    await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.reservation.id = :id', { id: comment.reservation.id })
      .getCount().then(value => {
        comment.commentNumber = value;
        this.commentRepository.save(comment);
      });
  }

  async findCommentsByResId(reId: number): Promise<Comment[]> {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.reservation.id = :id', { id: reId })
      .orderBy('comment.number')
      .getMany();
  }
}
